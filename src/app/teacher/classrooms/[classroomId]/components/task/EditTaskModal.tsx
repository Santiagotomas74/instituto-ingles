"use client";

import { useEffect, useState } from "react";
import {
  X,
  Save,
  CalendarDays,
  Clock,
  Paperclip,
  FileText,
  ExternalLink,
} from "lucide-react";
import { ClassroomTask } from "../TasksTab";

type Props = {
  open: boolean;
  task: ClassroomTask;
  onClose: () => void;
  onSuccess: () => void;
};

export default function EditTaskModal({
  open,
  task,
  onClose,
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [archivoActual, setArchivoActual] = useState<string | null>(null);
  const [archivoNuevo, setArchivoNuevo] = useState<File | null>(null);

  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    due_date: "",
    due_time: "",
    allow_submission: true,
    submission_type: "individual",
    is_published: false,
  });

  useEffect(() => {
    if (!open) return;

    setForm({
      titulo: task.titulo ?? "",
      descripcion: task.descripcion ?? "",
      due_date: task.due_date
        ? new Date(task.due_date).toISOString().split("T")[0]
        : "",
      due_time: task.due_time ? task.due_time.slice(0, 5) : "",
      allow_submission: task.allow_submission ?? true,
      submission_type: task.submission_type ?? "individual",
      is_published: task.is_published ?? false,
    });

    setArchivoActual(task.archivo ?? null);
    setArchivoNuevo(null);
    setError("");
  }, [open, task]);

  if (!open) return null;

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.titulo.trim()) {
      setError("El título es obligatorio.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      let archivoUrl = archivoActual;

      // Si seleccionó otro archivo, subirlo primero.
      if (archivoNuevo) {
        const uploadFormData = new FormData();
        uploadFormData.append("file", archivoNuevo);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: uploadFormData,
        });

        const uploadData = await uploadRes.json();

        if (!uploadRes.ok || !uploadData.success || !uploadData.url) {
          throw new Error(uploadData.message || "No se pudo subir el archivo.");
        }

        archivoUrl = uploadData.url;
      }

      // Guardar la tarea con la URL actualizada.
      const res = await fetch(`/api/teacher/tasks/${task.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titulo: form.titulo,
          descripcion: form.descripcion,
          due_date: form.due_date || null,
          due_time: form.due_time || null,
          allow_submission: form.allow_submission,
          submission_type: form.submission_type,
          max_score: task.max_score ?? 100,
          is_published: form.is_published,
          archivo: archivoUrl,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "No se pudo actualizar la tarea.");
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.error("Error actualizando tarea:", err);

      setError(
        err instanceof Error ? err.message : "No se pudo actualizar la tarea.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !loading) onClose();
      }}
    >
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        {/* Encabezado */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5 sm:px-8">
          <div>
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
              Editar tarea
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Modificá la información y el material de la actividad.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            aria-label="Cerrar"
            className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-6 sm:p-8">
          {/* Título */}
          <div>
            <label
              htmlFor="titulo"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Título
            </label>
            <input
              id="titulo"
              name="titulo"
              value={form.titulo}
              onChange={handleChange}
              required
              className="h-12 w-full rounded-xl border border-slate-200 px-4 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
              placeholder="Ej. Presentación personal"
            />
          </div>

          {/* Descripción */}
          <div>
            <label
              htmlFor="descripcion"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Descripción
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              rows={4}
              className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
              placeholder="Descripción de la tarea..."
            />
          </div>

          {/* Fecha y hora */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="due_date"
                className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"
              >
                <CalendarDays size={16} className="text-cyan-600" />
                Fecha de entrega
              </label>
              <input
                id="due_date"
                type="date"
                name="due_date"
                value={form.due_date}
                onChange={handleChange}
                className="h-12 w-full rounded-xl border border-slate-200 px-4 text-slate-700 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
              />
            </div>

            <div>
              <label
                htmlFor="due_time"
                className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"
              >
                <Clock size={16} className="text-cyan-600" />
                Hora de entrega
              </label>
              <input
                id="due_time"
                type="time"
                name="due_time"
                value={form.due_time}
                onChange={handleChange}
                className="h-12 w-full rounded-xl border border-slate-200 px-4 text-slate-700 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
              />
            </div>
          </div>

          {/* Tipo de entrega */}
          <div>
            <label
              htmlFor="submission_type"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Tipo de entrega
            </label>
            <select
              id="submission_type"
              name="submission_type"
              value={form.submission_type}
              onChange={handleChange}
              className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-slate-700 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
            >
              <option value="individual">Individual</option>
              <option value="pool">Grupal</option>
            </select>
          </div>

          {/* Archivo adjunto */}
          <section className="rounded-2xl border border-slate-200 p-4 sm:p-5">
            <div className="mb-4 flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
                <Paperclip size={21} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">
                  Archivo adjunto
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Podés conservar el archivo actual o seleccionar uno nuevo para
                  reemplazarlo.
                </p>
              </div>
            </div>

            {archivoActual && (
              <a
                href={archivoActual}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-4 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 transition hover:border-cyan-300 hover:bg-cyan-50"
              >
                <FileText size={22} className="shrink-0 text-cyan-700" />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-slate-800">
                    Archivo actualmente adjunto
                  </span>
                  <span className="block text-xs text-slate-500">
                    Abrir archivo
                  </span>
                </span>
                <ExternalLink size={17} className="shrink-0 text-slate-500" />
              </a>
            )}

            <label
              htmlFor="archivo"
              className="block cursor-pointer rounded-xl border-2 border-dashed border-slate-300 p-5 text-center transition hover:border-cyan-400 hover:bg-cyan-50/50"
            >
              <Paperclip size={24} className="mx-auto mb-2 text-cyan-700" />
              <span className="block text-sm font-semibold text-slate-800">
                {archivoNuevo
                  ? "Seleccionar otro archivo"
                  : archivoActual
                    ? "Reemplazar archivo actual"
                    : "Seleccionar archivo"}
              </span>
              <span className="mt-1 block text-xs text-slate-500">
                Seleccioná el archivo desde tu dispositivo
              </span>

              <input
                id="archivo"
                type="file"
                accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.jpg,.jpeg,.png"
                disabled={loading}
                onChange={(e) => {
                  setArchivoNuevo(e.target.files?.[0] ?? null);
                  setError("");
                }}
                className="sr-only"
              />
            </label>

            {archivoNuevo && (
              <div className="mt-3 flex items-center gap-3 rounded-xl bg-cyan-50 p-3">
                <FileText size={20} className="shrink-0 text-cyan-700" />
                <span className="min-w-0 flex-1 break-all text-sm font-medium text-slate-800">
                  {archivoNuevo.name}
                </span>
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => setArchivoNuevo(null)}
                  aria-label="Cancelar selección del archivo nuevo"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-white hover:text-red-600 disabled:opacity-50"
                >
                  <X size={17} />
                </button>
              </div>
            )}

            <p className="mt-3 text-xs text-slate-500">
              El archivo actual se conservará si no seleccionás uno nuevo.
            </p>
          </section>

          {/* Opciones */}
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-slate-200 p-4 transition hover:bg-slate-50">
              <div>
                <p className="font-semibold text-slate-800">
                  Permitir entregas
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Los alumnos podrán enviar respuestas.
                </p>
              </div>
              <input
                type="checkbox"
                name="allow_submission"
                checked={form.allow_submission}
                onChange={handleChange}
                className="h-5 w-5 accent-cyan-600"
              />
            </label>

            <label className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-slate-200 p-4 transition hover:bg-slate-50">
              <div>
                <p className="font-semibold text-slate-800">Publicar tarea</p>
                <p className="mt-1 text-xs text-slate-500">
                  Visible para los alumnos.
                </p>
              </div>
              <input
                type="checkbox"
                name="is_published"
                checked={form.is_published}
                onChange={handleChange}
                className="h-5 w-5 accent-cyan-600"
              />
            </label>
          </div>

          {/* Error */}
          {error && (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          {/* Acciones */}
          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="h-11 w-full rounded-xl border border-slate-200 px-5 font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50 sm:w-auto"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-5 font-semibold text-white shadow-lg transition hover:from-cyan-700 hover:to-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              <Save size={18} />
              {loading
                ? archivoNuevo
                  ? "Subiendo y guardando..."
                  : "Guardando..."
                : "Guardar cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
