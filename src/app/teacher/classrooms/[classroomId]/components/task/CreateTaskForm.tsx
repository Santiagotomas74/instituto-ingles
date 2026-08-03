"use client";

import { useState } from "react";

type Props = {
  classroomId: string;
  onCreated: () => void;
};

export default function CreateTaskForm({ classroomId, onCreated }: Props) {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");

  const [allowSubmission, setAllowSubmission] = useState(true);

  const [submissionType, setSubmissionType] = useState<"individual" | "pool">(
    "individual",
  );

  const [isPublished, setIsPublished] = useState(true);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!titulo.trim()) return;

    try {
      setLoading(true);

      const res = await fetch("/api/teacher/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          classroom_id: classroomId,

          titulo,
          descripcion,

          instructions: null,

          due_date: dueDate || null,
          due_time: dueTime || null,

          allow_submission: allowSubmission,

          submission_type: allowSubmission ? submissionType : "none",

          max_score: 100,

          is_published: isPublished,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message);
      }

      setTitulo("");
      setDescripcion("");
      setDueDate("");
      setDueTime("");
      setAllowSubmission(true);
      setSubmissionType("individual");

      onCreated();
    } catch (error) {
      console.error(error);
      alert("Error creando tarea.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-gray-600">
      {/* Título */}

      <div>
        <label className="block text-sm font-semibold mb-2">Título</label>

        <input
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="
            w-full
            border
            rounded-xl
            px-4
            py-3
            outline-none
            focus:ring-2
            focus:ring-cyan-500
          "
          placeholder="Ej: Trabajo Práctico N°3"
        />
      </div>

      {/* Descripción */}

      <div>
        <label className="block text-sm font-semibold mb-2">Descripción</label>

        <textarea
          rows={5}
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="
            w-full
            border
            rounded-xl
            px-4
            py-3
            outline-none
            resize-none
            focus:ring-2
            focus:ring-cyan-500
          "
          placeholder="Descripción de la actividad..."
        />
      </div>

      {/* Fecha */}

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold mb-2">
            Fecha límite
          </label>

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="
              w-full
              border
              rounded-xl
              px-4
              py-3
            "
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Hora límite
          </label>

          <input
            type="time"
            value={dueTime}
            onChange={(e) => setDueTime(e.target.value)}
            className="
              w-full
              border
              rounded-xl
              px-4
              py-3
            "
          />
        </div>
      </div>

      {/* Opciones */}

      <div className="rounded-2xl border bg-slate-50 p-5 space-y-5">
        <div className="flex items-center justify-between">
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
            className="w-5 h-5"
          />
        </div>

        {allowSubmission && (
          <div>
            <label className="block font-semibold mb-2">Tipo de entrega</label>

            <select
              value={submissionType}
              onChange={(e) =>
                setSubmissionType(e.target.value as "individual" | "pool")
              }
              className="
                w-full
                border
                rounded-xl
                px-4
                py-3
              "
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
          <div
            className="
              rounded-xl
              bg-amber-50
              border
              border-amber-200
              p-4
              text-sm
              text-amber-700
            "
          >
            Esta tarea será presencial. Los alumnos no podrán subir archivos
            desde la plataforma.
          </div>
        )}

        <div className="flex items-center justify-between">
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
            className="w-5 h-5"
          />
        </div>
      </div>

      {/* Botón */}

      <button
        disabled={loading}
        className="
          w-full
          h-12
          rounded-xl
          bg-cyan-600
          hover:bg-cyan-700
          disabled:opacity-50
          text-white
          font-semibold
          transition
        "
      >
        {loading ? "Creando tarea..." : "Crear tarea"}
      </button>
    </form>
  );
}
