"use client";

import { useRef, useState } from "react";
import { FileText, Upload, X, FileImage, File } from "lucide-react";

type Props = {
  classroomId: string;
  onCreated: () => void;
};

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

const ALLOWED_EXTENSIONS = [
  ".pdf",
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".gif",
  ".doc",
  ".docx",
];

export default function CreateTaskForm({ classroomId, onCreated }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");

  const [archivo, setArchivo] = useState<File | null>(null);

  const [allowSubmission, setAllowSubmission] = useState(true);

  const [submissionType, setSubmissionType] = useState<"individual" | "pool">(
    "individual",
  );

  const [isPublished, setIsPublished] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];

    setErrorMessage("");

    if (!selectedFile) return;

    const extension = selectedFile.name
      .slice(selectedFile.name.lastIndexOf("."))
      .toLowerCase();

    if (!ALLOWED_EXTENSIONS.includes(extension)) {
      setErrorMessage(
        "Formato no permitido. Seleccioná un PDF, una imagen o un documento Word.",
      );

      e.target.value = "";
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setErrorMessage("El archivo no puede superar los 10 MB.");

      e.target.value = "";
      return;
    }

    setArchivo(selectedFile);
  }

  function removeFile() {
    setArchivo(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function uploadFile(): Promise<string | null> {
    if (!archivo) return null;

    const uploadData = new FormData();

    // El endpoint /api/upload espera el campo "file".
    uploadData.append("file", archivo);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: uploadData,
    });

    const data = await res.json();

    if (!res.ok || !data.success || !data.url) {
      throw new Error(data.message || "No se pudo subir el archivo.");
    }

    return data.url as string;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setErrorMessage("");

    if (!titulo.trim()) {
      setErrorMessage("El título de la tarea es obligatorio.");
      return;
    }

    try {
      setLoading(true);

      // 1. Subir el archivo a Cloudinary, si se seleccionó uno.
      const archivoUrl = await uploadFile();

      // 2. Crear la tarea guardando la URL obtenida.
      const res = await fetch("/api/teacher/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          classroom_id: classroomId,
          titulo: titulo.trim(),
          descripcion: descripcion.trim() || null,
          instructions: null,
          due_date: dueDate || null,
          due_time: dueTime || null,
          allow_submission: allowSubmission,
          submission_type: allowSubmission ? submissionType : "none",
          max_score: 100,
          is_published: isPublished,
          archivo: archivoUrl,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Error creando la tarea.");
      }

      // 3. Limpiar el formulario.
      setTitulo("");
      setDescripcion("");
      setDueDate("");
      setDueTime("");
      setArchivo(null);
      setAllowSubmission(true);
      setSubmissionType("individual");
      setIsPublished(true);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      onCreated();
    } catch (error) {
      console.error(error);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Ocurrió un error al crear la tarea.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-gray-600">
      {/* Título */}
      <div>
        <label className="mb-2 block text-sm font-semibold">Título</label>

        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500"
          placeholder="Ej: Trabajo Práctico N°3"
          required
        />
      </div>

      {/* Descripción */}
      <div>
        <label className="mb-2 block text-sm font-semibold">Descripción</label>

        <textarea
          rows={5}
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="w-full resize-none rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500"
          placeholder="Descripción de la actividad..."
        />
      </div>

      {/* Archivo adjunto */}
      <div>
        <label className="mb-2 block text-sm font-semibold">
          Archivo de la actividad{" "}
          <span className="font-normal text-slate-400">(opcional)</span>
        </label>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.png,.jpg,.jpeg,.webp,.gif,.doc,.docx"
          onChange={handleFileChange}
          disabled={loading}
          className="hidden"
        />

        {!archivo ? (
          <button
            type="button"
            disabled={loading}
            onClick={() => fileInputRef.current?.click()}
            className="flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center transition hover:border-cyan-500 hover:bg-cyan-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm">
              <Upload className="h-6 w-6 text-cyan-600" />
            </div>

            <span className="font-semibold text-slate-700">
              Seleccionar archivo
            </span>

            <span className="mt-2 text-sm text-slate-500">
              PDF, imágenes o documentos Word
            </span>

            <span className="mt-1 text-xs text-slate-400">
              Tamaño máximo: 10 MB
            </span>
          </button>
        ) : (
          <div className="flex items-center gap-3 rounded-2xl border border-cyan-200 bg-cyan-50 p-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white">
              {archivo.type.startsWith("image/") ? (
                <FileImage className="h-6 w-6 text-cyan-600" />
              ) : archivo.name.toLowerCase().endsWith(".pdf") ? (
                <FileText className="h-6 w-6 text-red-500" />
              ) : (
                <File className="h-6 w-6 text-blue-600" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="break-words text-sm font-semibold text-slate-800">
                {archivo.name}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {(archivo.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>

            <button
              type="button"
              onClick={removeFile}
              disabled={loading}
              aria-label="Quitar archivo"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white hover:text-red-600 disabled:opacity-50"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      {/* Fecha y hora */}
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold">
            Fecha límite
          </label>

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full rounded-xl border px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold">
            Hora límite
          </label>

          <input
            type="time"
            value={dueTime}
            onChange={(e) => setDueTime(e.target.value)}
            className="w-full rounded-xl border px-4 py-3"
          />
        </div>
      </div>

      {/* Opciones */}
      <div className="space-y-5 rounded-2xl border bg-slate-50 p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-semibold">Permitir entrega virtual</p>

            <p className="text-sm text-slate-500">
              Los estudiantes podrán subir su respuesta.
            </p>
          </div>

          <input
            type="checkbox"
            checked={allowSubmission}
            onChange={(e) => setAllowSubmission(e.target.checked)}
            className="h-5 w-5 shrink-0"
          />
        </div>

        {allowSubmission && (
          <div>
            <label className="mb-2 block font-semibold">Tipo de entrega</label>

            <select
              value={submissionType}
              onChange={(e) =>
                setSubmissionType(e.target.value as "individual" | "pool")
              }
              className="w-full rounded-xl border px-4 py-3"
            >
              <option value="individual">
                Individual (cada alumno sólo ve su entrega)
              </option>

              <option value="pool">
                Pool de entregas (todos pueden ver las respuestas)
              </option>
            </select>
          </div>
        )}

        {!allowSubmission && (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">
            Esta tarea será presencial. Los alumnos no podrán subir archivos
            desde la plataforma.
          </div>
        )}

        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-semibold">Publicar inmediatamente</p>

            <p className="text-sm text-slate-500">
              Si está desactivado quedará como borrador.
            </p>
          </div>

          <input
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            className="h-5 w-5 shrink-0"
          />
        </div>
      </div>

      {/* Error */}
      {errorMessage && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {errorMessage}
        </div>
      )}

      {/* Botón */}
      <button
        type="submit"
        disabled={loading}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading && (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
        )}

        {loading
          ? archivo
            ? "Subiendo archivo y creando tarea..."
            : "Creando tarea..."
          : "Crear tarea"}
      </button>
    </form>
  );
}
