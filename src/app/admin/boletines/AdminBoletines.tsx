"use client";

import Link from "next/link";
import {
  useMemo,
  useRef,
  useState,
  useEffect,
  type PointerEvent as ReactPointerEvent,
} from "react";

import {
  Search,
  FileText,
  User,
  GraduationCap,
  CalendarDays,
  Eye,
  X,
  Upload,
  FileSignature,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Image as ImageIcon,
  PenTool,
  Type,
  Trash2,
} from "lucide-react";

/*
=====================================================
TIPO PERFIL ADMIN
=====================================================
*/

export type AdminProfileData = {
  id: string;

  nombre: string | null;

  apellido: string | null;

  email: string | null;

  firma_url: string | null;
};

/*
=====================================================
TIPO BOLETÍN
=====================================================
*/

export type AdminBoletin = {
  id: string;

  teacher_id: string;

  dni: number | string | null;

  estudiante_nombre: string | null;

  estudiante_apellido: string | null;

  profesor_nombre: string | null;

  profesor_apellido: string | null;

  anio: number | null;

  nivel: string | null;

  es_mayor_edad: boolean | null;

  nota_1: number | null;

  nota_2: number | null;

  nota_3: number | null;

  promedio: number | null;

  behaviour_1: string | null;

  behaviour_2: string | null;

  behaviour_3: string | null;

  ausentes: number | null;

  ausentes_2: number | null;

  ausentes_3: number | null;

  ausentes_promedio: number | null;

  observaciones_1: string | null;

  observaciones_2: string | null;

  observaciones_3: string | null;

  behaviour_final: string | null;

  observaciones_final: string | null;

  created_at: string | null;

  updated_at: string | null;

  teacher_nombre: string | null;

  teacher_apellido: string | null;

  teacher_email: string | null;

  teacher_firma_url: string | null;
};

/*
=====================================================
PROPS
=====================================================
*/

type Props = {
  boletines: AdminBoletin[];

  admin: AdminProfileData;
};

/*
=====================================================
TIPO MODO FIRMA
=====================================================
*/

type FirmaMode = "draw" | "name" | "upload";

/*
=====================================================
COMPONENTE
=====================================================
*/

export default function AdminBoletines({ boletines, admin }: Props) {
  /*
  =====================================================
  BUSCADOR
  =====================================================
  */

  const [search, setSearch] = useState("");

  /*
  =====================================================
  FIRMA
  =====================================================
  */

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

  /*
  =====================================================
  FILTRAR BOLETINES
  =====================================================
  */

  const filteredBoletines = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) {
      return boletines;
    }

    return boletines.filter((boletin) => {
      const estudiante = [
        boletin.estudiante_nombre,
        boletin.estudiante_apellido,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const profesor = [
        boletin.teacher_nombre ?? boletin.profesor_nombre,
        boletin.teacher_apellido ?? boletin.profesor_apellido,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const dni = String(boletin.dni ?? "").toLowerCase();

      const nivel = String(boletin.nivel ?? "").toLowerCase();

      const anio = String(boletin.anio ?? "").toLowerCase();

      return (
        estudiante.includes(normalizedSearch) ||
        profesor.includes(normalizedSearch) ||
        dni.includes(normalizedSearch) ||
        nivel.includes(normalizedSearch) ||
        anio.includes(normalizedSearch)
      );
    });
  }, [boletines, search]);

  /*
  =====================================================
  CONFIGURAR CANVAS
  =====================================================
  */

  useEffect(() => {
    if (firmaMode !== "draw") {
      return;
    }

    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const ratio = window.devicePixelRatio || 1;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    canvas.width = width * ratio;
    canvas.height = height * ratio;

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    context.scale(ratio, ratio);

    context.lineCap = "round";
    context.lineJoin = "round";
    context.lineWidth = 2.5;
    context.strokeStyle = "#111827";
  }, [firmaMode]);

  /*
  =====================================================
  OBTENER POSICIÓN DEL POINTER
  =====================================================
  */

  const getCanvasPosition = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return null;
    }

    const rect = canvas.getBoundingClientRect();

    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  /*
  =====================================================
  COMENZAR DIBUJO
  =====================================================
  */

  const handlePointerDown = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);

    const position = getCanvasPosition(event);

    if (!position) {
      return;
    }

    const canvas = canvasRef.current;

    const context = canvas?.getContext("2d");

    if (!context) {
      return;
    }

    context.beginPath();

    context.moveTo(position.x, position.y);

    setIsDrawing(true);
  };

  /*
  =====================================================
  DIBUJAR
  =====================================================
  */

  const handlePointerMove = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) {
      return;
    }

    const position = getCanvasPosition(event);

    if (!position) {
      return;
    }

    const canvas = canvasRef.current;

    const context = canvas?.getContext("2d");

    if (!context) {
      return;
    }

    context.lineTo(position.x, position.y);

    context.stroke();
  };

  /*
  =====================================================
  TERMINAR DIBUJO
  =====================================================
  */

  const handlePointerUp = () => {
    setIsDrawing(false);
  };

  /*
  =====================================================
  LIMPIAR CANVAS
  =====================================================
  */

  const clearCanvas = () => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  /*
  =====================================================
  CREAR FIRMA DESDE NOMBRE
  =====================================================
  */

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

    if (!context) {
      return null;
    }

    /*
    Fondo transparente
    */

    context.clearRect(0, 0, canvas.width, canvas.height);

    /*
    Estilo de firma
    */

    context.fillStyle = "#111827";

    context.textAlign = "center";
    context.textBaseline = "middle";

    /*
    Fuente cursiva.
    
    Si posteriormente cargamos una fuente específica
    podemos reemplazarla por una más manuscrita.
    */

    context.font =
      "italic 72px 'Brush Script MT', 'Segoe Script', 'Comic Sans MS', cursive";

    context.fillText(name, canvas.width / 2, canvas.height / 2);

    /*
    Línea inferior decorativa
    */

    context.beginPath();

    context.strokeStyle = "#111827";

    context.lineWidth = 3;

    context.lineCap = "round";

    context.moveTo(220, 205);

    context.quadraticCurveTo(500, 245, 780, 205);

    context.stroke();

    return canvas.toDataURL("image/png");
  };

  /*
  =====================================================
  SUBIR BLOB A CLOUDINARY
  =====================================================
  */

  const uploadBlobToCloudinary = async (
    blob: Blob,
    filename = "firma-admin.png",
  ) => {
    const file = new File([blob], filename, {
      type: "image/png",
    });

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

  /*
  =====================================================
  GUARDAR URL DE FIRMA EN ADMIN
  =====================================================
  */

  const saveFirmaUrl = async (url: string) => {
    const response = await fetch("/api/admin/profile/firma", {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        firma_url: url,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(
        data.message || "No se pudo guardar la firma del administrador.",
      );
    }

    return data.firma_url ?? url;
  };

  /*
  =====================================================
  GUARDAR FIRMA DIBUJADA
  =====================================================
  */

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
      /*
      Canvas -> Blob
      */

      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob((result) => resolve(result), "image/png", 1);
      });

      if (!blob) {
        throw new Error("No se pudo generar la imagen de la firma.");
      }

      /*
      Cloudinary
      */

      const uploadedUrl = await uploadBlobToCloudinary(blob);

      /*
      Base de datos
      */

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

  /*
  =====================================================
  GUARDAR FIRMA DESDE NOMBRE
  =====================================================
  */

  const handleSaveNameSignature = async () => {
    setFirmaError("");
    setFirmaSuccess("");

    const dataUrl = createSignatureFromName();

    if (!dataUrl) {
      return;
    }

    setUploadingFirma(true);

    try {
      /*
      Data URL -> Blob
      */

      const response = await fetch(dataUrl);

      const blob = await response.blob();

      /*
      Cloudinary
      */

      const uploadedUrl = await uploadBlobToCloudinary(
        blob,
        "firma-admin-nombre.png",
      );

      /*
      Base de datos
      */

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

  /*
  =====================================================
  SELECCIONAR ARCHIVO
  =====================================================
  */

  const handleSelectFirma = () => {
    if (uploadingFirma) {
      return;
    }

    fileInputRef.current?.click();
  };

  /*
  =====================================================
  SUBIR IMAGEN
  =====================================================
  */

  const handleFirmaChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setFirmaError("");
    setFirmaSuccess("");

    /*
    Tipo
    */

    if (!file.type.startsWith("image/")) {
      setFirmaError("La firma debe ser una imagen.");

      event.target.value = "";

      return;
    }

    /*
    Tamaño
    */

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      setFirmaError("La imagen de la firma no puede superar los 5 MB.");

      event.target.value = "";

      return;
    }

    setUploadingFirma(true);

    try {
      /*
      1. Cloudinary
      */

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

      if (!uploadedUrl) {
        throw new Error("Cloudinary no devolvió la URL de la imagen.");
      }

      /*
      2. Guardar en DB
      */

      const savedUrl = await saveFirmaUrl(uploadedUrl);

      /*
      3. Preview
      */

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

  /*
  =====================================================
  RENDER
  =====================================================
  */

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-10">
      {/* =================================================
          HEADER
      ================================================= */}

      <div>
        <h1 className="text-2xl font-bold text-slate-900">Boletines</h1>

        <p className="text-sm text-slate-500 mt-1">
          Consulta todos los boletines creados por los profesores y administra
          tu firma.
        </p>
      </div>

      {/* =================================================
          MI FIRMA
      ================================================= */}

      <section
        className="
          bg-white
          border
          border-slate-200
          rounded-3xl
          shadow-sm
          overflow-hidden
        "
      >
        {/* HEADER */}

        <div
          className="
            border-b
            border-slate-200
            bg-slate-50
            px-6
            py-5
            flex
            items-center
            gap-3
          "
        >
          <div
            className="
              w-11
              h-11
              rounded-2xl
              bg-cyan-100
              flex
              items-center
              justify-center
            "
          >
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
          {/* =================================================
              MENSAJES
          ================================================= */}

          {firmaError && (
            <div
              className="
                p-4
                rounded-2xl
                bg-red-50
                border
                border-red-200
                text-red-700
                text-sm
                flex
                items-center
                gap-3
              "
            >
              <AlertCircle size={18} />

              <span>{firmaError}</span>
            </div>
          )}

          {firmaSuccess && (
            <div
              className="
                p-4
                rounded-2xl
                bg-green-50
                border
                border-green-200
                text-green-700
                text-sm
                flex
                items-center
                gap-3
              "
            >
              <CheckCircle2 size={18} />

              <span>{firmaSuccess}</span>
            </div>
          )}

          {/* =================================================
              FIRMA ACTUAL
          ================================================= */}

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Firma actual
            </label>

            <div
              className="
                min-h-48
                rounded-2xl
                border
                border-dashed
                border-slate-300
                bg-slate-50
                flex
                items-center
                justify-center
                p-6
              "
            >
              {firmaUrl ? (
                <div className="text-center space-y-4">
                  <div
                    className="
                      bg-white
                      border
                      border-slate-200
                      rounded-2xl
                      p-5
                      shadow-sm
                      inline-flex
                      items-center
                      justify-center
                      min-w-64
                      min-h-32
                    "
                  >
                    <img
                      src={firmaUrl}
                      alt="Firma del administrador"
                      className="
                        max-w-full
                        max-h-32
                        object-contain
                      "
                    />
                  </div>

                  <p className="text-xs text-slate-500">
                    Esta es la firma actualmente registrada.
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <div
                    className="
                      w-14
                      h-14
                      rounded-2xl
                      bg-slate-100
                      flex
                      items-center
                      justify-center
                      mx-auto
                      mb-3
                    "
                  >
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

          {/* =================================================
              SELECTOR DE MODO
          ================================================= */}

          <div>
            <p className="text-sm font-semibold text-slate-700 mb-3">
              Crear o cambiar firma
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* DIBUJAR */}

              <button
                type="button"
                onClick={() => {
                  setFirmaMode("draw");
                  setFirmaError("");
                  setFirmaSuccess("");
                }}
                className={`
                  p-4
                  rounded-2xl
                  border
                  text-left
                  transition
                  ${
                    firmaMode === "draw"
                      ? "border-cyan-500 bg-cyan-50"
                      : "border-slate-200 bg-white hover:bg-slate-50"
                  }
                `}
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

              {/* NOMBRE */}

              <button
                type="button"
                onClick={() => {
                  setFirmaMode("name");
                  setFirmaError("");
                  setFirmaSuccess("");
                }}
                className={`
                  p-4
                  rounded-2xl
                  border
                  text-left
                  transition
                  ${
                    firmaMode === "name"
                      ? "border-cyan-500 bg-cyan-50"
                      : "border-slate-200 bg-white hover:bg-slate-50"
                  }
                `}
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

              {/* SUBIR */}

              <button
                type="button"
                onClick={() => {
                  setFirmaMode("upload");
                  setFirmaError("");
                  setFirmaSuccess("");
                }}
                className={`
                  p-4
                  rounded-2xl
                  border
                  text-left
                  transition
                  ${
                    firmaMode === "upload"
                      ? "border-cyan-500 bg-cyan-50"
                      : "border-slate-200 bg-white hover:bg-slate-50"
                  }
                `}
              >
                <Upload
                  size={20}
                  className={
                    firmaMode === "upload" ? "text-cyan-600" : "text-slate-400"
                  }
                />

                <p className="font-semibold text-slate-800 mt-2">
                  Subir imagen
                </p>

                <p className="text-xs text-slate-500 mt-1">
                  Subí una firma que ya tengas.
                </p>
              </button>
            </div>
          </div>

          {/* =================================================
              DIBUJAR
          ================================================= */}

          {firmaMode === "draw" && (
            <div
              className="
                rounded-2xl
                border
                border-slate-200
                bg-slate-50
                p-5
                space-y-4
              "
            >
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
                  className="
                    h-9
                    px-3
                    rounded-lg
                    bg-white
                    border
                    border-slate-200
                    hover:bg-slate-100
                    text-slate-600
                    text-xs
                    font-medium
                    flex
                    items-center
                    gap-2
                  "
                >
                  <Trash2 size={14} />
                  Limpiar
                </button>
              </div>

              <div
                className="
                  bg-white
                  border
                  border-slate-300
                  rounded-2xl
                  overflow-hidden
                  touch-none
                "
              >
                <canvas
                  ref={canvasRef}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                  onPointerLeave={handlePointerUp}
                  className="
                    w-full
                    h-56
                    block
                    cursor-crosshair
                    touch-none
                  "
                />
              </div>

              <button
                type="button"
                onClick={handleSaveDrawnSignature}
                disabled={uploadingFirma}
                className="
                  h-11
                  px-5
                  rounded-xl
                  bg-cyan-600
                  hover:bg-cyan-700
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                  text-white
                  font-semibold
                  text-sm
                  flex
                  items-center
                  justify-center
                  gap-2
                "
              >
                {uploadingFirma ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <FileSignature size={18} />
                    Guardar firma dibujada
                  </>
                )}
              </button>
            </div>
          )}

          {/* =================================================
              ESCRIBIR NOMBRE
          ================================================= */}

          {firmaMode === "name" && (
            <div
              className="
                rounded-2xl
                border
                border-slate-200
                bg-slate-50
                p-5
                space-y-5
              "
            >
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
                className="
                  w-full
                  h-12
                  px-4
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  text-slate-800
                  outline-none
                  focus:border-cyan-500
                  focus:ring-2
                  focus:ring-cyan-100
                "
              />

              {/* PREVIEW */}

              <div
                className="
                  min-h-40
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  flex
                  items-center
                  justify-center
                  overflow-hidden
                "
              >
                {nombreFirma.trim() ? (
                  <div className="text-center">
                    <p
                      className="
                        text-5xl
                        italic
                        text-slate-900
                        leading-none
                      "
                      style={{
                        fontFamily:
                          "'Brush Script MT', 'Segoe Script', 'Comic Sans MS', cursive",
                      }}
                    >
                      {nombreFirma}
                    </p>

                    <div
                      className="
                        h-0.5
                        bg-slate-800
                        rounded-full
                        w-64
                        mx-auto
                        mt-4
                      "
                    />
                  </div>
                ) : (
                  <p className="text-sm text-slate-400">
                    Escribí tu nombre para ver la firma.
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={handleSaveNameSignature}
                disabled={uploadingFirma || !nombreFirma.trim()}
                className="
                  h-11
                  px-5
                  rounded-xl
                  bg-cyan-600
                  hover:bg-cyan-700
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                  text-white
                  font-semibold
                  text-sm
                  flex
                  items-center
                  justify-center
                  gap-2
                "
              >
                {uploadingFirma ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Generando...
                  </>
                ) : (
                  <>
                    <FileSignature size={18} />
                    Generar y guardar firma
                  </>
                )}
              </button>
            </div>
          )}

          {/* =================================================
              SUBIR IMAGEN
          ================================================= */}

          {firmaMode === "upload" && (
            <div
              className="
                rounded-2xl
                bg-cyan-50
                border
                border-cyan-100
                p-5
              "
            >
              <div
                className="
                  flex
                  flex-col
                  md:flex-row
                  md:items-center
                  justify-between
                  gap-5
                "
              >
                <div>
                  <h3 className="font-semibold text-cyan-900">Subir firma</h3>

                  <p className="text-sm text-cyan-700 mt-1">
                    Seleccioná una imagen de tu firma.
                  </p>

                  <p className="text-xs text-cyan-600 mt-2">
                    PNG, JPG o WEBP. Máximo 5 MB.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleSelectFirma}
                  disabled={uploadingFirma}
                  className="
                    h-11
                    px-5
                    rounded-xl
                    bg-cyan-600
                    hover:bg-cyan-700
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                    text-white
                    font-semibold
                    text-sm
                    flex
                    items-center
                    justify-center
                    gap-2
                    transition
                    shrink-0
                  "
                >
                  {uploadingFirma ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Subiendo...
                    </>
                  ) : (
                    <>
                      <Upload size={18} />
                      Seleccionar imagen
                    </>
                  )}
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  onChange={handleFirmaChange}
                  className="hidden"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =================================================
          BUSCADOR
      ================================================= */}

      <section
        className="
          bg-white
          border
          border-slate-200
          rounded-3xl
          shadow-sm
          p-5
        "
      >
        <div className="relative">
          <Search
            size={19}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por alumno, DNI, profesor, nivel o año..."
            className="
              text-slate-800
              w-full
              h-12
              pl-11
              pr-11
              rounded-xl
              border
              border-slate-200
              bg-white
              text-sm
              outline-none
              focus:border-cyan-500
              focus:ring-2
              focus:ring-cyan-100
            "
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                w-8
                h-8
                rounded-lg
                hover:bg-slate-100
                flex
                items-center
                justify-center
                text-slate-400
              "
              aria-label="Limpiar búsqueda"
            >
              <X size={17} />
            </button>
          )}
        </div>

        <div
          className="
            flex
            flex-col
            sm:flex-row
            sm:items-center
            sm:justify-between
            gap-2
            mt-4
          "
        >
          <p className="text-sm text-slate-500">
            {filteredBoletines.length}{" "}
            {filteredBoletines.length === 1
              ? "boletín encontrado"
              : "boletines encontrados"}
          </p>

          {search && (
            <p className="text-xs text-slate-400">Buscando: {search}</p>
          )}
        </div>
      </section>

      {/* =================================================
          LISTADO
      ================================================= */}

      {filteredBoletines.length === 0 ? (
        <section
          className="
            bg-white
            border
            border-slate-200
            rounded-3xl
            shadow-sm
            p-12
            text-center
          "
        >
          <div
            className="
              w-16
              h-16
              rounded-2xl
              bg-slate-100
              flex
              items-center
              justify-center
              mx-auto
              mb-4
            "
          >
            <FileText size={28} className="text-slate-400" />
          </div>

          <h2 className="font-bold text-slate-800">
            No se encontraron boletines
          </h2>

          <p className="text-sm text-slate-500 mt-2">
            Probá con otro término de búsqueda.
          </p>

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="
                mt-5
                inline-flex
                items-center
                gap-2
                h-10
                px-4
                rounded-xl
                bg-slate-100
                hover:bg-slate-200
                text-slate-700
                text-sm
                font-medium
              "
            >
              <X size={16} />
              Limpiar búsqueda
            </button>
          )}
        </section>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          {filteredBoletines.map((boletin) => {
            const estudiante = [
              boletin.estudiante_apellido,
              boletin.estudiante_nombre,
            ]
              .filter(Boolean)
              .join(", ");

            const profesor = [
              boletin.teacher_nombre ?? boletin.profesor_nombre,
              boletin.teacher_apellido ?? boletin.profesor_apellido,
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <article
                key={boletin.id}
                className="
                    bg-white
                    border
                    border-slate-200
                    rounded-3xl
                    shadow-sm
                    overflow-hidden
                    hover:shadow-md
                    transition
                  "
              >
                {/* HEADER CARD */}

                <div
                  className="
                      bg-slate-50
                      border-b
                      border-slate-200
                      px-5
                      py-4
                      flex
                      items-start
                      justify-between
                      gap-4
                    "
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <div
                        className="
                            w-10
                            h-10
                            rounded-xl
                            bg-cyan-100
                            flex
                            items-center
                            justify-center
                            shrink-0
                          "
                      >
                        <User size={19} className="text-cyan-600" />
                      </div>

                      <div className="min-w-0">
                        <h2 className="font-bold text-slate-900 truncate">
                          {estudiante || "Alumno sin nombre"}
                        </h2>

                        <p className="text-xs text-slate-500 mt-0.5">
                          DNI: {boletin.dni ?? "-"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <span
                    className="
                        shrink-0
                        px-3
                        py-1.5
                        rounded-full
                        bg-cyan-100
                        text-cyan-700
                        text-xs
                        font-semibold
                      "
                  >
                    {boletin.anio ?? "-"}
                  </span>
                </div>

                {/* BODY */}

                <div className="p-5 space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-slate-400 mb-1">Nivel</p>

                      <div className="flex items-center gap-2 text-sm text-slate-700">
                        <GraduationCap size={16} className="text-slate-400" />

                        {boletin.nivel || "-"}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-slate-400 mb-1">Promedio</p>

                      <p className="text-lg font-bold text-cyan-700">
                        {boletin.promedio !== null &&
                        boletin.promedio !== undefined
                          ? Number(boletin.promedio).toFixed(2)
                          : "-"}
                      </p>
                    </div>
                  </div>

                  {/* PROFESOR */}

                  <div
                    className="
                        rounded-2xl
                        bg-slate-50
                        border
                        border-slate-200
                        p-4
                      "
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="
                            w-9
                            h-9
                            rounded-xl
                            bg-white
                            border
                            border-slate-200
                            flex
                            items-center
                            justify-center
                          "
                      >
                        <GraduationCap size={17} className="text-cyan-600" />
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs text-slate-400">Profesor</p>

                        <p className="text-sm font-semibold text-slate-700 truncate">
                          {profesor || "Profesor no disponible"}
                        </p>
                      </div>
                    </div>

                    {boletin.teacher_firma_url && (
                      <div className="mt-3 pt-3 border-t border-slate-200">
                        <p className="text-xs text-slate-400 mb-2">
                          Firma registrada
                        </p>

                        <div
                          className="
                              bg-white
                              border
                              border-slate-200
                              rounded-xl
                              p-3
                              inline-flex
                              min-w-40
                              min-h-16
                              items-center
                              justify-center
                            "
                        >
                          <img
                            src={boletin.teacher_firma_url}
                            alt="Firma del profesor"
                            className="
                                h-12
                                max-w-40
                                object-contain
                              "
                          />
                        </div>
                      </div>
                    )}

                    {!boletin.teacher_firma_url && (
                      <div className="mt-3 pt-3 border-t border-slate-200">
                        <p className="text-xs text-slate-400">
                          El profesor no tiene una firma registrada.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* FECHA */}

                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <CalendarDays size={14} />

                    <span>
                      Creado{" "}
                      {boletin.created_at
                        ? new Date(boletin.created_at).toLocaleDateString(
                            "es-AR",
                          )
                        : "-"}
                    </span>
                  </div>

                  {/* ACCIÓN */}

                  <Link
                    href={`/boletin/${boletin.dni}`}
                    className="
                        w-full
                        h-11
                        rounded-xl
                        bg-cyan-600
                        hover:bg-cyan-700
                        text-white
                        font-semibold
                        text-sm
                        flex
                        items-center
                        justify-center
                        gap-2
                        transition
                      "
                  >
                    <Eye size={18} />
                    Ver boletín
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
