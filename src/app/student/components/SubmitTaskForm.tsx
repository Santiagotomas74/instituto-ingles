"use client";

import { useRef, useState } from "react";

import {
  Send,
  FileText,
  Paperclip,
  AlertCircle,
  Loader2,
  X,
} from "lucide-react";

type Props = {
  classroomId: string;
  taskId: string;
  onSuccess: () => void;
};

type UploadedFile = {
  url: string;
  name: string;
  size: number;
};

export default function SubmitTaskForm({
  classroomId,
  taskId,
  onSuccess,
}: Props) {
  const [texto, setTexto] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    setError(null);
    setFile(selectedFile);
  }

  function removeFile() {
    setFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function uploadFile(): Promise<UploadedFile | null> {
    if (!file) return null;

    setUploading(true);

    try {
      const formData = new FormData();

      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "No se pudo subir el archivo.");
      }

      if (!data.url) {
        throw new Error("El servidor no devolvió la URL del archivo.");
      }

      return {
        url: data.url,
        name: file.name,
        size: file.size,
      };
    } finally {
      setUploading(false);
    }
  }

  async function submit() {
    if (!texto.trim() && !file) {
      setError("Escribí una respuesta o adjuntá un archivo.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 1. Subir archivo a Cloudinary
      const uploadedFile = await uploadFile();

      // 2. Guardar entrega en DB
      const res = await fetch(`/api/student/tasks/${taskId}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          classroom_id: classroomId,
          comentario: texto.trim() || null,
          archivo_url: uploadedFile?.url ?? null,
          archivo_nombre: uploadedFile?.name ?? null,
          archivo_size: uploadedFile?.size ?? null,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "No se pudo entregar la tarea.");
      }

      // 3. Cerrar el formulario / modal
      onSuccess();

      // 4. Recargar completamente la página
      window.location.reload();
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error ? err.message : "Ocurrió un error inesperado.",
      );
    } finally {
      setLoading(false);
    }
  }

  const isBusy = loading || uploading;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-slate-900">Entregar tarea</h2>

        <p className="mt-2 text-slate-500">
          Escribí tu respuesta o adjuntá un archivo antes de enviar la entrega.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-rose-700">
          <AlertCircle size={20} className="shrink-0 mt-0.5" />

          <div>
            <p className="font-semibold">No se pudo entregar la tarea</p>

            <p className="text-sm mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Editor */}
      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b bg-slate-50 px-6 py-4 flex items-center gap-3">
          <FileText className="text-cyan-600" size={20} />

          <span className="font-semibold text-slate-700">
            Respuesta escrita
          </span>
        </div>

        <textarea
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          rows={12}
          placeholder="Escribí aquí tu respuesta..."
          disabled={isBusy}
          className="
            w-full
            resize-none
            outline-none
            px-6
            py-5
            text-[15px]
            leading-7
            text-slate-700
            disabled:bg-slate-50
            disabled:cursor-not-allowed
          "
        />

        <div className="border-t bg-slate-50 px-6 py-3 flex items-center justify-between">
          <span className="text-sm text-slate-500">
            {texto.length} caracteres
          </span>

          <span className="text-xs text-slate-400">
            Se guarda cuando envíes la tarea.
          </span>
        </div>
      </div>

      {/* Adjuntos */}
      <div className="rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center">
        <Paperclip className="mx-auto text-slate-400" size={36} />

        <h3 className="mt-4 font-semibold text-slate-700">Adjuntar archivo</h3>

        <p className="mt-2 text-sm text-slate-500">
          Podés subir un PDF, documento Word, imagen, presentación u otro
          archivo permitido.
        </p>

        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          disabled={isBusy}
          className="hidden"
          accept="
            .pdf,
            .doc,
            .docx,
            .xls,
            .xlsx,
            .ppt,
            .pptx,
            .txt,
            .jpg,
            .jpeg,
            .png,
            .webp
          "
        />

        {!file ? (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isBusy}
            className="
              mt-5
              px-5
              h-11
              rounded-xl
              bg-white
              border
              border-slate-300
              hover:bg-slate-100
              text-slate-700
              font-medium
              transition
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            Seleccionar archivo
          </button>
        ) : (
          <div className="mt-5 max-w-lg mx-auto rounded-2xl border border-slate-200 bg-white p-4 flex items-center justify-between gap-4 text-left">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
                <FileText size={20} />
              </div>

              <div className="min-w-0">
                <p className="font-semibold text-slate-700 truncate">
                  {file.name}
                </p>

                <p className="text-xs text-slate-400 mt-0.5">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={removeFile}
              disabled={isBusy}
              className="
                w-9
                h-9
                rounded-lg
                flex
                items-center
                justify-center
                text-slate-400
                hover:bg-rose-50
                hover:text-rose-600
                transition
                shrink-0
              "
              title="Quitar archivo"
            >
              <X size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Botones */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onSuccess}
          disabled={isBusy}
          className="
            h-12
            px-6
            rounded-xl
            border
            border-slate-300
            hover:bg-slate-100
            transition
            disabled:opacity-50
          "
        >
          Cancelar
        </button>

        <button
          type="button"
          onClick={submit}
          disabled={isBusy || (!texto.trim() && !file)}
          className="
            h-12
            px-7
            rounded-xl
            bg-cyan-600
            hover:bg-cyan-700
            disabled:opacity-50
            disabled:cursor-not-allowed
            text-white
            font-medium
            flex
            items-center
            gap-2
            transition
          "
        >
          {isBusy ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              {uploading ? "Subiendo archivo..." : "Enviando..."}
            </>
          ) : (
            <>
              <Send size={18} />
              Entregar tarea
            </>
          )}
        </button>
      </div>
    </div>
  );
}
