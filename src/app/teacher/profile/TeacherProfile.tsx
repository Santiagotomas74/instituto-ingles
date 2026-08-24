"use client";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type PointerEvent,
} from "react";

import {
  User,
  Mail,
  IdCard,
  Upload,
  FileSignature,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Image as ImageIcon,
  PenLine,
  Type,
  Eraser,
  RotateCcw,
} from "lucide-react";

export type TeacherProfileData = {
  id: string;
  dni: number | string | null;
  nombre: string | null;
  apellido: string | null;
  email: string | null;
  fecha_nacimiento: Date | null;
  firma_url: string | null;
};

type TeacherProfileProps = {
  teacher: TeacherProfileData;
};

type FirmaMode = "upload" | "draw" | "text";

export default function TeacherProfile({ teacher }: TeacherProfileProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [firmaUrl, setFirmaUrl] = useState<string | null>(
    teacher.firma_url ?? null,
  );

  const [mode, setMode] = useState<FirmaMode>("upload");

  const [firmaNombre, setFirmaNombre] = useState(
    `${teacher.nombre ?? ""} ${teacher.apellido ?? ""}`.trim(),
  );

  const [uploading, setUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [isDrawing, setIsDrawing] = useState(false);

  /*
  =====================================================
  CONFIGURACIÓN DEL CANVAS
  =====================================================
  */

  const CANVAS_WIDTH = 900;
  const CANVAS_HEIGHT = 300;

  /*
  =====================================================
  INICIALIZAR CANVAS
  =====================================================
  */

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const context = canvas.getContext("2d");

    if (!context) return;

    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    context.lineWidth = 3;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = "#111827";
  }, [mode]);

  /*
  =====================================================
  OBTENER POSICIÓN DEL PUNTERO
  =====================================================
  */

  const getPointerPosition = (event: PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return {
        x: 0,
        y: 0,
      };
    }

    const rect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY,
    };
  };

  /*
  =====================================================
  COMENZAR A DIBUJAR
  =====================================================
  */

  const handlePointerDown = (event: PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    canvas.setPointerCapture(event.pointerId);

    const context = canvas.getContext("2d");

    if (!context) return;

    const { x, y } = getPointerPosition(event);

    context.beginPath();
    context.moveTo(x, y);

    setIsDrawing(true);
  };

  /*
  =====================================================
  DIBUJAR
  =====================================================
  */

  const handlePointerMove = (event: PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;

    if (!canvas) return;

    const context = canvas.getContext("2d");

    if (!context) return;

    const { x, y } = getPointerPosition(event);

    context.lineTo(x, y);
    context.stroke();
  };

  /*
  =====================================================
  FINALIZAR DIBUJO
  =====================================================
  */

  const handlePointerUp = (event: PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;

    if (canvas) {
      try {
        canvas.releasePointerCapture(event.pointerId);
      } catch {
        // No hacer nada si el pointer ya fue liberado.
      }
    }

    setIsDrawing(false);
  };

  /*
  =====================================================
  LIMPIAR CANVAS
  =====================================================
  */

  const clearCanvas = () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const context = canvas.getContext("2d");

    if (!context) return;

    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  };

  /*
  =====================================================
  GENERAR FIRMA DESDE TEXTO
  =====================================================
  */

  const generateTextSignature = (): string | null => {
    const canvas = document.createElement("canvas");

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    const context = canvas.getContext("2d");

    if (!context) return null;

    /*
    Fondo transparente.
    */

    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    /*
    Intentamos utilizar fuentes cursivas disponibles
    en el navegador.
    */

    context.font =
      'italic 72px "Brush Script MT", "Segoe Script", "Lucida Handwriting", cursive';

    context.fillStyle = "#111827";
    context.textAlign = "center";
    context.textBaseline = "middle";

    context.fillText(firmaNombre.trim(), CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);

    /*
    Línea decorativa debajo.
    */

    context.beginPath();

    context.strokeStyle = "#111827";
    context.lineWidth = 3;
    context.lineCap = "round";

    context.moveTo(180, 205);
    context.quadraticCurveTo(CANVAS_WIDTH / 2, 235, 720, 205);

    context.stroke();

    return canvas.toDataURL("image/png");
  };

  /*
  =====================================================
  OBTENER IMAGEN DEL CANVAS
  =====================================================
  */

  const getDrawnSignature = (): string | null => {
    const canvas = canvasRef.current;

    if (!canvas) return null;

    return canvas.toDataURL("image/png");
  };

  /*
  =====================================================
  DATA URL -> FILE
  =====================================================
  */

  const dataUrlToFile = (dataUrl: string, fileName: string): File => {
    const [header, base64] = dataUrl.split(",");

    const mime = header.match(/:(.*?);/)?.[1] ?? "image/png";

    const binary = atob(base64);

    const bytes = new Uint8Array(binary.length);

    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }

    return new File([bytes], fileName, {
      type: mime,
    });
  };

  /*
  =====================================================
  SUBIR FIRMA AL BACKEND
  =====================================================
  */

  const uploadSignature = async (file: File) => {
    setErrorMsg("");
    setSuccessMsg("");

    if (!file.type.startsWith("image/")) {
      setErrorMsg("La firma debe ser una imagen.");

      return;
    }

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      setErrorMsg("La imagen de la firma no puede superar los 5 MB.");

      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();

      formData.append("firma", file);

      const response = await fetch("/api/teacher/profile/firma", {
        method: "PATCH",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "No se pudo actualizar la firma.");
      }

      setFirmaUrl(data.firma_url ?? null);

      setSuccessMsg("Firma actualizada correctamente.");
    } catch (error) {
      console.error("Error actualizando firma:", error);

      if (error instanceof Error) {
        setErrorMsg(error.message);
      } else {
        setErrorMsg("No se pudo actualizar la firma.");
      }
    } finally {
      setUploading(false);
    }
  };

  /*
  =====================================================
  SELECCIONAR IMAGEN
  =====================================================
  */

  const handleSelectFirma = () => {
    fileInputRef.current?.click();
  };

  /*
  =====================================================
  SUBIR IMAGEN
  =====================================================
  */

  const handleFirmaChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    await uploadSignature(file);

    event.target.value = "";
  };

  /*
  =====================================================
  GUARDAR FIRMA DIBUJADA
  =====================================================
  */

  const handleSaveDrawnSignature = async () => {
    const dataUrl = getDrawnSignature();

    if (!dataUrl) {
      setErrorMsg("No se pudo obtener la firma.");

      return;
    }

    /*
    Verificamos que realmente haya algo dibujado.
    */

    const canvas = canvasRef.current;

    if (!canvas) return;

    const context = canvas.getContext("2d");

    if (!context) return;

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    let hasDrawing = false;

    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] > 0) {
        hasDrawing = true;
        break;
      }
    }

    if (!hasDrawing) {
      setErrorMsg("Primero debes dibujar tu firma.");

      return;
    }

    const file = dataUrlToFile(dataUrl, "firma-profesor.png");

    await uploadSignature(file);
  };

  /*
  =====================================================
  GUARDAR FIRMA ESCRITA
  =====================================================
  */

  const handleSaveTextSignature = async () => {
    const nombre = firmaNombre.trim();

    if (!nombre) {
      setErrorMsg("Escribe tu nombre para generar la firma.");

      return;
    }

    const dataUrl = generateTextSignature();

    if (!dataUrl) {
      setErrorMsg("No se pudo generar la firma.");

      return;
    }

    const file = dataUrlToFile(dataUrl, "firma-profesor.png");

    await uploadSignature(file);
  };

  /*
  =====================================================
  RENDER
  =====================================================
  */

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div>
        <h1 className="text-2xl font-bold text-slate-900">Mi perfil</h1>

        <p className="text-sm text-slate-500 mt-1">
          Consulta tus datos personales y administra tu firma para los
          boletines.
        </p>
      </div>

      {/* =====================================================
          MENSAJES
      ===================================================== */}

      {errorMsg && (
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

          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
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

          <span>{successMsg}</span>
        </div>
      )}

      {/* =====================================================
          DATOS PERSONALES
      ===================================================== */}

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
            <User size={22} className="text-cyan-600" />
          </div>

          <div>
            <h2 className="font-bold text-slate-900">Datos personales</h2>

            <p className="text-sm text-slate-500">
              Información asociada a tu cuenta de profesor.
            </p>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* NOMBRE */}

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Nombre
            </label>

            <div
              className="
                h-11
                px-4
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                flex
                items-center
                text-sm
                text-slate-700
              "
            >
              {teacher.nombre || "-"}
            </div>
          </div>

          {/* APELLIDO */}

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Apellido
            </label>

            <div
              className="
                h-11
                px-4
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                flex
                items-center
                text-sm
                text-slate-700
              "
            >
              {teacher.apellido || "-"}
            </div>
          </div>

          {/* DNI */}

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              DNI
            </label>

            <div
              className="
                h-11
                px-4
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                flex
                items-center
                gap-2
                text-sm
                text-slate-700
              "
            >
              <IdCard size={16} className="text-slate-400" />

              {teacher.dni || "-"}
            </div>
          </div>

          {/* EMAIL */}

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Email
            </label>

            <div
              className="
                h-11
                px-4
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                flex
                items-center
                gap-2
                text-sm
                text-slate-700
              "
            >
              <Mail size={16} className="text-slate-400" />

              {teacher.email || "-"}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FIRMA
      ===================================================== */}

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
            <h2 className="font-bold text-slate-900">Firma</h2>

            <p className="text-sm text-slate-500">
              Esta firma aparecerá en los boletines que hayas creado.
            </p>
          </div>
        </div>

        <div className="p-6 space-y-6">
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
                      alt="Firma del profesor"
                      className="
                        max-w-full
                        max-h-32
                        object-contain
                      "
                    />
                  </div>

                  <p className="text-xs text-slate-500">
                    Esta es la firma que se utilizará en los boletines.
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
                    Puedes subirla, dibujarla o generarla a partir de tu nombre.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* =================================================
              OPCIONES
          ================================================= */}

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Crear o cargar firma
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* SUBIR */}

              <button
                type="button"
                onClick={() => setMode("upload")}
                className={`
                  h-12
                  rounded-xl
                  border
                  font-semibold
                  text-sm
                  flex
                  items-center
                  justify-center
                  gap-2
                  transition
                  ${
                    mode === "upload"
                      ? "bg-cyan-600 text-white border-cyan-600"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                  }
                `}
              >
                <Upload size={18} />
                Subir imagen
              </button>

              {/* DIBUJAR */}

              <button
                type="button"
                onClick={() => setMode("draw")}
                className={`
                  h-12
                  rounded-xl
                  border
                  font-semibold
                  text-sm
                  flex
                  items-center
                  justify-center
                  gap-2
                  transition
                  ${
                    mode === "draw"
                      ? "bg-cyan-600 text-white border-cyan-600"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                  }
                `}
              >
                <PenLine size={18} />
                Dibujar firma
              </button>

              {/* ESCRIBIR */}

              <button
                type="button"
                onClick={() => setMode("text")}
                className={`
                  h-12
                  rounded-xl
                  border
                  font-semibold
                  text-sm
                  flex
                  items-center
                  justify-center
                  gap-2
                  transition
                  ${
                    mode === "text"
                      ? "bg-cyan-600 text-white border-cyan-600"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                  }
                `}
              >
                <Type size={18} />
                Escribir nombre
              </button>
            </div>
          </div>

          {/* =================================================
              SUBIR IMAGEN
          ================================================= */}

          {mode === "upload" && (
            <div
              className="
                rounded-2xl
                bg-cyan-50
                border
                border-cyan-100
                p-5
              "
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                <div>
                  <h3 className="font-semibold text-cyan-900">
                    {firmaUrl ? "Cambiar firma" : "Subir firma"}
                  </h3>

                  <p className="text-sm text-cyan-700 mt-1">
                    Selecciona una imagen de tu firma.
                  </p>

                  <p className="text-xs text-cyan-600 mt-2">
                    PNG, JPG o WEBP. Máximo 5 MB.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleSelectFirma}
                  disabled={uploading}
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
                  {uploading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Subiendo...
                    </>
                  ) : (
                    <>
                      <Upload size={18} />
                      {firmaUrl ? "Cambiar firma" : "Subir firma"}
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

          {/* =================================================
              DIBUJAR
          ================================================= */}

          {mode === "draw" && (
            <div
              className="
                rounded-2xl
                bg-slate-50
                border
                border-slate-200
                p-5
                space-y-4
              "
            >
              <div>
                <h3 className="font-semibold text-slate-900">
                  Dibuja tu firma
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Utiliza el mouse, trackpad o pantalla táctil.
                </p>
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
                  width={CANVAS_WIDTH}
                  height={CANVAS_HEIGHT}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                  onPointerLeave={(event) => {
                    if (isDrawing) {
                      handlePointerUp(event);
                    }
                  }}
                  className="
                    w-full
                    h-auto
                    cursor-crosshair
                    touch-none
                  "
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={clearCanvas}
                  disabled={uploading}
                  className="
                    h-11
                    px-5
                    rounded-xl
                    border
                    border-slate-300
                    bg-white
                    hover:bg-slate-50
                    text-slate-700
                    font-semibold
                    text-sm
                    flex
                    items-center
                    justify-center
                    gap-2
                  "
                >
                  <Eraser size={18} />
                  Limpiar
                </button>

                <button
                  type="button"
                  onClick={handleSaveDrawnSignature}
                  disabled={uploading}
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
                  {uploading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Guardando...
                    </>
                  ) : (
                    <>
                      <FileSignature size={18} />
                      Guardar firma
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* =================================================
              ESCRIBIR NOMBRE
          ================================================= */}

          {mode === "text" && (
            <div
              className="
                rounded-2xl
                bg-slate-50
                border
                border-slate-200
                p-5
                space-y-5
              "
            >
              <div>
                <h3 className="font-semibold text-slate-900">Generar firma</h3>

                <p className="text-sm text-slate-500 mt-1">
                  Escribe tu nombre y lo convertiremos en una firma.
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Nombre para la firma
                </label>

                <input
                  type="text"
                  value={firmaNombre}
                  onChange={(event) => setFirmaNombre(event.target.value)}
                  placeholder="Ej. Juan Pérez"
                  className="
                    w-full
                    h-11
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
              </div>

              {/* PREVIEW */}

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Vista previa
                </label>

                <div
                  className="
                    bg-white
                    border
                    border-slate-200
                    rounded-2xl
                    min-h-48
                    flex
                    items-center
                    justify-center
                    overflow-hidden
                  "
                >
                  {firmaNombre.trim() ? (
                    <div
                      style={{
                        fontFamily:
                          '"Brush Script MT", "Segoe Script", "Lucida Handwriting", cursive',
                      }}
                      className="
                        text-6xl
                        italic
                        text-slate-900
                        px-6
                        text-center
                      "
                    >
                      {firmaNombre}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-400">
                      Escribe tu nombre para ver la firma.
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setFirmaNombre(
                      `${teacher.nombre ?? ""} ${teacher.apellido ?? ""}`.trim(),
                    )
                  }
                  disabled={uploading}
                  className="
                    h-11
                    px-5
                    rounded-xl
                    border
                    border-slate-300
                    bg-white
                    hover:bg-slate-50
                    text-slate-700
                    font-semibold
                    text-sm
                    flex
                    items-center
                    justify-center
                    gap-2
                  "
                >
                  <RotateCcw size={18} />
                  Restaurar nombre
                </button>

                <button
                  type="button"
                  onClick={handleSaveTextSignature}
                  disabled={uploading || !firmaNombre.trim()}
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
                  {uploading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Guardando...
                    </>
                  ) : (
                    <>
                      <FileSignature size={18} />
                      Guardar firma
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          INFORMACIÓN
      ===================================================== */}

      <section
        className="
          bg-cyan-50
          border
          border-cyan-100
          rounded-3xl
          p-6
        "
      >
        <h2 className="font-bold text-cyan-900">Firma en boletines</h2>

        <p className="text-sm text-cyan-700 mt-2 leading-relaxed">
          La firma que guardes en tu perfil se asociará a tu usuario y podrá
          utilizarse automáticamente en los boletines creados por ti.
        </p>
      </section>
    </div>
  );
}
