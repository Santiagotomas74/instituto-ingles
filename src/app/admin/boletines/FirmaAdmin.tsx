"use client";

import {
  useRef,
  useState,
  useEffect,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  FileSignature,
  AlertCircle,
  CheckCircle2,
  Image as ImageIcon,
  PenTool,
  Type,
  Upload,
  Trash2,
  Loader2,
} from "lucide-react";
import type { AdminProfileData } from "./AdminBoletines"; // Ajustá la ruta según tu estructura

type FirmaMode = "draw" | "name" | "upload";

type Props = {
  admin: AdminProfileData;
};

export default function FirmaAdmin({ admin }: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [firmaUrl, setFirmaUrl] = useState<string | null>(
    admin.firma_url ?? null,
  );
  const [firmaMode, setFirmaMode] = useState<FirmaMode>("draw");
  const [nombreFirma, setNombreFirma] = useState(
    [admin.nombre, admin.apellido].filter(Boolean).join(" "),
  );

  const [isDrawing, setIsDrawing] = useState(false);
  const [uploadingFirma, setUploadingFirma] = useState(false);
  const [firmaSuccess, setFirmaSuccess] = useState("");
  const [firmaError, setFirmaError] = useState("");

  useEffect(() => {
    if (firmaMode !== "draw") return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ratio = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    canvas.width = width * ratio;
    canvas.height = height * ratio;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.scale(ratio, ratio);
    context.lineCap = "round";
    context.lineJoin = "round";
    context.lineWidth = 2.5;
    context.strokeStyle = "#111827";
  }, [firmaMode]);

  const getCanvasPosition = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    const position = getCanvasPosition(event);
    if (!position) return;
    const context = canvasRef.current?.getContext("2d");
    if (!context) return;
    context.beginPath();
    context.moveTo(position.x, position.y);
    setIsDrawing(true);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const position = getCanvasPosition(event);
    if (!position) return;
    const context = canvasRef.current?.getContext("2d");
    if (!context) return;
    context.lineTo(position.x, position.y);
    context.stroke();
  };

  const handlePointerUp = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const createSignatureFromName = (): string | null => {
    const name = nombreFirma.trim();
    if (!name) {
      setFirmaError("Escribí tu nombre para generar la firma.");
      return null;
    }

    const canvas = document.createElement("canvas");
    canvas.width = 1000;
    canvas.height = 300;
    const context = canvas.getContext("2d");
    if (!context) return null;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#111827";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font =
      "italic 72px 'Brush Script MT', 'Segoe Script', 'Comic Sans MS', cursive";
    context.fillText(name, canvas.width / 2, canvas.height / 2);

    context.beginPath();
    context.strokeStyle = "#111827";
    context.lineWidth = 3;
    context.lineCap = "round";
    context.moveTo(220, 205);
    context.quadraticCurveTo(500, 245, 780, 205);
    context.stroke();

    return canvas.toDataURL("image/png");
  };

  const uploadBlobToCloudinary = async (
    blob: Blob,
    filename = "firma-admin.png",
  ) => {
    const file = new File([blob], filename, { type: "image/png" });
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(
        data.message || "No se pudo subir la firma a Cloudinary.",
      );
    }
    if (!data.url) {
      throw new Error("Cloudinary no devolvió la URL de la firma.");
    }
    return data.url as string;
  };

  const saveFirmaUrl = async (url: string) => {
    const response = await fetch("/api/admin/profile/firma", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firma_url: url }),
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(
        data.message || "No se pudo guardar la firma del administrador.",
      );
    }
    return data.firma_url ?? url;
  };

  const handleSaveDrawnSignature = async () => {
    setFirmaError("");
    setFirmaSuccess("");
    const canvas = canvasRef.current;
    if (!canvas) {
      setFirmaError("No se pudo acceder al área de firma.");
      return;
    }

    setUploadingFirma(true);
    try {
      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob((result) => resolve(result), "image/png", 1);
      });
      if (!blob) throw new Error("No se pudo generar la imagen de la firma.");

      const uploadedUrl = await uploadBlobToCloudinary(blob);
      const savedUrl = await saveFirmaUrl(uploadedUrl);
      setFirmaUrl(savedUrl);
      setFirmaSuccess("Firma dibujada y guardada correctamente.");
    } catch (error) {
      console.error("Error guardando firma dibujada:", error);
      setFirmaError(
        error instanceof Error ? error.message : "No se pudo guardar la firma.",
      );
    } finally {
      setUploadingFirma(false);
    }
  };

  const handleSaveNameSignature = async () => {
    setFirmaError("");
    setFirmaSuccess("");
    const dataUrl = createSignatureFromName();
    if (!dataUrl) return;

    setUploadingFirma(true);
    try {
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const uploadedUrl = await uploadBlobToCloudinary(
        blob,
        "firma-admin-nombre.png",
      );
      const savedUrl = await saveFirmaUrl(uploadedUrl);
      setFirmaUrl(savedUrl);
      setFirmaSuccess("Firma generada y guardada correctamente.");
    } catch (error) {
      console.error("Error generando firma:", error);
      setFirmaError(
        error instanceof Error ? error.message : "No se pudo guardar la firma.",
      );
    } finally {
      setUploadingFirma(false);
    }
  };

  const handleSelectFirma = () => {
    if (uploadingFirma) return;
    fileInputRef.current?.click();
  };

  const handleFirmaChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFirmaError("");
    setFirmaSuccess("");

    if (!file.type.startsWith("image/")) {
      setFirmaError("La firma debe ser una imagen.");
      event.target.value = "";
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setFirmaError("La imagen de la firma no puede superar los 5 MB.");
      event.target.value = "";
      return;
    }

    setUploadingFirma(true);
    try {
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);
      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: uploadFormData,
      });
      const uploadData = await uploadResponse.json();
      if (!uploadResponse.ok || !uploadData.success) {
        throw new Error(
          uploadData.message || "No se pudo subir la imagen de la firma.",
        );
      }

      const uploadedUrl = uploadData.url;
      if (!uploadedUrl)
        throw new Error("Cloudinary no devolvió la URL de la imagen.");

      const savedUrl = await saveFirmaUrl(uploadedUrl);
      setFirmaUrl(savedUrl);
      setFirmaSuccess("Firma actualizada correctamente.");
    } catch (error) {
      console.error("Error actualizando firma:", error);
      setFirmaError(
        error instanceof Error
          ? error.message
          : "No se pudo actualizar la firma.",
      );
    } finally {
      setUploadingFirma(false);
      event.target.value = "";
    }
  };

  return (
    <section className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
      <div className="border-b border-slate-200 bg-slate-50 px-6 py-5 flex items-center gap-3">
        <div className="w-11 h-11 rounded-2xl bg-cyan-100 flex items-center justify-center">
          <FileSignature size={22} className="text-cyan-600" />
        </div>
        <div>
          <h2 className="font-bold text-slate-900">Mi firma</h2>
          <p className="text-sm text-slate-500">
            Dibujá, escribí o subí tu firma.
          </p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {firmaError && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-3">
            <AlertCircle size={18} />
            <span>{firmaError}</span>
          </div>
        )}

        {firmaSuccess && (
          <div className="p-4 rounded-2xl bg-green-50 border border-green-200 text-green-700 text-sm flex items-center gap-3">
            <CheckCircle2 size={18} />
            <span>{firmaSuccess}</span>
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            Firma actual
          </label>
          <div className="min-h-48 rounded-2xl border border-dashed border-slate-300 bg-slate-50 flex items-center justify-center p-6">
            {firmaUrl ? (
              <div className="text-center space-y-4">
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm inline-flex items-center justify-center min-w-64 min-h-32">
                  <img
                    src={firmaUrl}
                    alt="Firma del administrador"
                    className="max-w-full max-h-32 object-contain"
                  />
                </div>
                <p className="text-xs text-slate-500">
                  Esta es la firma actualmente registrada.
                </p>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-3">
                  <ImageIcon size={24} className="text-slate-400" />
                </div>
                <p className="font-medium text-slate-700">
                  No tienes una firma cargada
                </p>
                <p className="text-sm text-slate-500 mt-1">
                  Elegí una de las opciones para crear tu firma.
                </p>
              </div>
            )}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-700 mb-3">
            Crear o cambiar firma
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => {
                setFirmaMode("draw");
                setFirmaError("");
                setFirmaSuccess("");
              }}
              className={`p-4 rounded-2xl border text-left transition ${firmaMode === "draw" ? "border-cyan-500 bg-cyan-50" : "border-slate-200 bg-white hover:bg-slate-50"}`}
            >
              <PenTool
                size={20}
                className={
                  firmaMode === "draw" ? "text-cyan-600" : "text-slate-400"
                }
              />
              <p className="font-semibold text-slate-800 mt-2">Dibujar</p>
              <p className="text-xs text-slate-500 mt-1">
                Dibujá tu firma con el mouse o táctil.
              </p>
            </button>

            <button
              type="button"
              onClick={() => {
                setFirmaMode("name");
                setFirmaError("");
                setFirmaSuccess("");
              }}
              className={`p-4 rounded-2xl border text-left transition ${firmaMode === "name" ? "border-cyan-500 bg-cyan-50" : "border-slate-200 bg-white hover:bg-slate-50"}`}
            >
              <Type
                size={20}
                className={
                  firmaMode === "name" ? "text-cyan-600" : "text-slate-400"
                }
              />
              <p className="font-semibold text-slate-800 mt-2">
                Escribir nombre
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Convierte tu nombre en una firma.
              </p>
            </button>

            <button
              type="button"
              onClick={() => {
                setFirmaMode("upload");
                setFirmaError("");
                setFirmaSuccess("");
              }}
              className={`p-4 rounded-2xl border text-left transition ${firmaMode === "upload" ? "border-cyan-500 bg-cyan-50" : "border-slate-200 bg-white hover:bg-slate-50"}`}
            >
              <Upload
                size={20}
                className={
                  firmaMode === "upload" ? "text-cyan-600" : "text-slate-400"
                }
              />
              <p className="font-semibold text-slate-800 mt-2">Subir imagen</p>
              <p className="text-xs text-slate-500 mt-1">
                Subí una firma que ya tengas.
              </p>
            </button>
          </div>
        </div>

        {firmaMode === "draw" && (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="font-semibold text-slate-800">
                  Dibujá tu firma
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Usá el mouse, trackpad o pantalla táctil.
                </p>
              </div>
              <button
                type="button"
                onClick={clearCanvas}
                disabled={uploadingFirma}
                className="h-9 px-3 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 text-xs font-medium flex items-center gap-2"
              >
                <Trash2 size={14} /> Limpiar
              </button>
            </div>
            <div className="bg-white border border-slate-300 rounded-2xl overflow-hidden touch-none">
              <canvas
                ref={canvasRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                onPointerLeave={handlePointerUp}
                className="w-full h-56 block cursor-crosshair touch-none"
              />
            </div>
            <button
              type="button"
              onClick={handleSaveDrawnSignature}
              disabled={uploadingFirma}
              className="h-11 px-5 rounded-xl bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm flex items-center justify-center gap-2"
            >
              {uploadingFirma ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Guardando...
                </>
              ) : (
                <>
                  <FileSignature size={18} /> Guardar firma dibujada
                </>
              )}
            </button>
          </div>
        )}

        {firmaMode === "name" && (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-5">
            <div>
              <h3 className="font-semibold text-slate-800">
                Escribí tu nombre
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                El sistema generará una imagen de firma a partir del nombre.
              </p>
            </div>
            <input
              type="text"
              value={nombreFirma}
              onChange={(event) => setNombreFirma(event.target.value)}
              placeholder="Ej: Juan Pérez"
              className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white text-slate-800 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
            />
            <div className="min-h-40 rounded-2xl border border-slate-200 bg-white flex items-center justify-center overflow-hidden">
              {nombreFirma.trim() ? (
                <div className="text-center">
                  <p
                    className="text-5xl italic text-slate-900 leading-none"
                    style={{
                      fontFamily:
                        "'Brush Script MT', 'Segoe Script', 'Comic Sans MS', cursive",
                    }}
                  >
                    {nombreFirma}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-slate-400">
                  La vista previa aparecerá aquí
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={handleSaveNameSignature}
              disabled={uploadingFirma || !nombreFirma.trim()}
              className="h-11 px-5 rounded-xl bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm flex items-center justify-center gap-2"
            >
              {uploadingFirma ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Guardando...
                </>
              ) : (
                <>
                  <Type size={18} /> Guardar firma escrita
                </>
              )}
            </button>
          </div>
        )}

        {firmaMode === "upload" && (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-4">
            <div>
              <h3 className="font-semibold text-slate-800">
                Subir imagen de firma
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Formatos soportados: PNG, JPG (Max 5MB)
              </p>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFirmaChange}
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              onClick={handleSelectFirma}
              disabled={uploadingFirma}
              className="h-11 px-5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed text-slate-700 font-semibold text-sm flex items-center justify-center gap-2 w-full"
            >
              {uploadingFirma ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Subiendo...
                </>
              ) : (
                <>
                  <Upload size={18} /> Seleccionar archivo
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
