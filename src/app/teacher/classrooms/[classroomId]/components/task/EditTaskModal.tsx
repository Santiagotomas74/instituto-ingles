"use client";

import { useEffect, useState } from "react";
import { X, Save, CalendarDays, Clock } from "lucide-react";
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
          is_published: form.is_published,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "No se pudo actualizar la tarea.");
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error ? err.message : "No se pudo actualizar la tarea.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-slate-950/50
        backdrop-blur-sm
        p-4
      "
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="
          w-full
          max-w-2xl
          max-h-[90vh]
          overflow-y-auto
          bg-white
          rounded-3xl
          shadow-2xl
        "
      >
        {/* Header */}

        <div
          className="
            sticky
            top-0
            z-10
            flex
            items-center
            justify-between
            px-6
            sm:px-8
            py-5
            border-b
            border-slate-200
            bg-white
          "
        >
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Editar tarea
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Modificá la información de la actividad.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              w-10
              h-10
              rounded-xl
              flex
              items-center
              justify-center
              text-slate-500
              hover:bg-slate-100
              hover:text-slate-700
              transition
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          {/* Título */}

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Título
            </label>

            <input
              name="titulo"
              value={form.titulo}
              onChange={handleChange}
              className="
                w-full
                h-12
                rounded-xl
                border
                border-slate-200
                px-4
                text-slate-900
                outline-none
                focus:border-cyan-500
                focus:ring-2
                focus:ring-cyan-500/20
                transition
              "
              placeholder="Ej. Presentación personal"
            />
          </div>

          {/* Descripción */}

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Descripción
            </label>

            <textarea
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              rows={4}
              className="
                w-full
                rounded-xl
                border
                border-slate-200
                px-4
                py-3
                text-slate-900
                resize-none
                outline-none
                focus:border-cyan-500
                focus:ring-2
                focus:ring-cyan-500/20
                transition
              "
              placeholder="Descripción de la tarea..."
            />
          </div>

          {/* Fecha y hora */}

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                <CalendarDays size={16} className="text-cyan-600" />
                Fecha de entrega
              </label>

              <input
                type="date"
                name="due_date"
                value={form.due_date}
                onChange={handleChange}
                className="
                  w-full
                  h-12
                  rounded-xl
                  border
                  border-slate-200
                  px-4
                  text-slate-700
                  outline-none
                  focus:border-cyan-500
                  focus:ring-2
                  focus:ring-cyan-500/20
                "
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                <Clock size={16} className="text-cyan-600" />
                Hora de entrega
              </label>

              <input
                type="time"
                name="due_time"
                value={form.due_time}
                onChange={handleChange}
                className="
                  w-full
                  h-12
                  rounded-xl
                  border
                  border-slate-200
                  px-4
                  text-slate-700
                  outline-none
                  focus:border-cyan-500
                  focus:ring-2
                  focus:ring-cyan-500/20
                "
              />
            </div>
          </div>

          {/* Tipo de entrega */}

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Tipo de entrega
            </label>

            <select
              name="submission_type"
              value={form.submission_type}
              onChange={handleChange}
              className="
                w-full
                h-12
                rounded-xl
                border
                border-slate-200
                px-4
                text-slate-700
                bg-white
                outline-none
                focus:border-cyan-500
                focus:ring-2
                focus:ring-cyan-500/20
              "
            >
              <option value="individual">Individual</option>
              <option value="pool">Grupal</option>
            </select>
          </div>

          {/* Opciones */}

          <div className="grid sm:grid-cols-2 gap-4">
            <label
              className="
                flex
                items-center
                justify-between
                gap-4
                rounded-2xl
                border
                border-slate-200
                p-4
                cursor-pointer
                hover:bg-slate-50
                transition
              "
            >
              <div>
                <p className="font-semibold text-slate-800">
                  Permitir entregas
                </p>

                <p className="text-xs text-slate-500 mt-1">
                  Los alumnos podrán enviar respuestas.
                </p>
              </div>

              <input
                type="checkbox"
                name="allow_submission"
                checked={form.allow_submission}
                onChange={handleChange}
                className="w-5 h-5 accent-cyan-600"
              />
            </label>

            <label
              className="
                flex
                items-center
                justify-between
                gap-4
                rounded-2xl
                border
                border-slate-200
                p-4
                cursor-pointer
                hover:bg-slate-50
                transition
              "
            >
              <div>
                <p className="font-semibold text-slate-800">Publicar tarea</p>

                <p className="text-xs text-slate-500 mt-1">
                  Visible para los alumnos.
                </p>
              </div>

              <input
                type="checkbox"
                name="is_published"
                checked={form.is_published}
                onChange={handleChange}
                className="w-5 h-5 accent-cyan-600"
              />
            </label>
          </div>

          {/* Error */}

          {error && (
            <div
              className="
                rounded-xl
                border
                border-red-200
                bg-red-50
                px-4
                py-3
                text-sm
                text-red-700
              "
            >
              {error}
            </div>
          )}

          {/* Actions */}

          <div
            className="
              flex
              flex-col-reverse
              sm:flex-row
              sm:justify-end
              gap-3
              pt-2
            "
          >
            <button
              type="button"
              onClick={onClose}
              className="
                w-full
                sm:w-auto
                px-5
                h-11
                rounded-xl
                border
                border-slate-200
                text-slate-600
                font-medium
                hover:bg-slate-50
                transition
              "
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                sm:w-auto
                px-5
                h-11
                rounded-xl
                bg-gradient-to-r
                from-cyan-600
                to-blue-600
                hover:from-cyan-700
                hover:to-blue-700
                text-white
                font-semibold
                flex
                items-center
                justify-center
                gap-2
                shadow-lg
                disabled:opacity-50
                transition
              "
            >
              <Save size={18} />

              {loading ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
