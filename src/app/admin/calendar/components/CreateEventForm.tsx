"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

import { Classroom } from "../types";

type Props = {
  global: boolean;
  classrooms: Classroom[];
  closeModal: () => void;
  reload: () => void;
};

export default function CreateEventForm({
  global,
  classrooms,
  closeModal,
  reload,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    tipo: "clase",
    fecha: "",
    hora: "",
    classroomId: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.title ||
      !form.fecha ||
      !form.hora ||
      (!global && !form.classroomId)
    ) {
      alert("Completá todos los campos obligatorios");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/admin/calendar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          global,
          classroomId: form.classroomId,
          title: form.title,
          description: form.description,
          tipo: form.tipo,
          fecha: form.fecha,
          hora: form.hora,
        }),
      });

      if (!response.ok) {
        throw new Error();
      }

      await reload();

      closeModal();

      alert(
        global
          ? "Fecha creada para todas las aulas"
          : "Fecha creada correctamente",
      );
    } catch (error) {
      console.error(error);
      alert("Error creando la fecha");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-black">
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Título *
        </label>

        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="
            w-full
            h-12
            rounded-2xl
            border
            border-slate-300
            px-4
            outline-none
            focus:ring-2
            focus:ring-cyan-500
            text-slate-700
          "
          placeholder="Ej: Examen Final B1"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Descripción
        </label>

        <textarea
          rows={4}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="
            w-full
            rounded-2xl
            border
            border-slate-300
            px-4
            py-3
            outline-none
            focus:ring-2
            focus:ring-cyan-500
          "
          placeholder="Detalles de la fecha importante..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Tipo *
          </label>

          <select
            value={form.tipo}
            onChange={(e) => setForm({ ...form, tipo: e.target.value })}
            className="
              w-full
              h-12
              rounded-2xl
              border
              border-slate-300
              px-4
              outline-none
              focus:ring-2
              focus:ring-cyan-500
            "
          >
            <option value="clase">📘 Clase</option>
            <option value="examen">📝 Examen</option>
            <option value="evento">🎉 Evento</option>
            <option value="reunion">👥 Reunión</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Fecha *
          </label>

          <input
            type="date"
            value={form.fecha}
            onChange={(e) => setForm({ ...form, fecha: e.target.value })}
            className="
              w-full
              h-12
              rounded-2xl
              border
              border-slate-300
              px-4
              outline-none
              focus:ring-2
              focus:ring-cyan-500
            "
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Hora *
        </label>

        <input
          type="time"
          value={form.hora}
          onChange={(e) => setForm({ ...form, hora: e.target.value })}
          className="
            w-full
            h-12
            rounded-2xl
            border
            border-slate-300
            px-4
            outline-none
            focus:ring-2
            focus:ring-cyan-500
          "
        />
      </div>

      {!global && (
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Aula *
          </label>

          <select
            value={form.classroomId}
            onChange={(e) => setForm({ ...form, classroomId: e.target.value })}
            className="
              w-full
              h-12
              rounded-2xl
              border
              border-slate-300
              px-4
              outline-none
              focus:ring-2
              focus:ring-cyan-500
            "
          >
            <option value="">Seleccionar aula</option>

            {classrooms.map((classroom) => (
              <option key={classroom.id} value={classroom.id}>
                {classroom.nombre}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={closeModal}
          className="
            h-11
            px-5
            rounded-2xl
            border
            border-slate-300
            text-slate-700
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
            h-11
            px-6
            rounded-2xl
            bg-cyan-600
            hover:bg-cyan-700
            text-white
            font-semibold
            transition
            disabled:opacity-50
            flex
            items-center
            gap-2
          "
        >
          {loading && <Loader2 size={18} className="animate-spin" />}
          Guardar fecha
        </button>
      </div>
    </form>
  );
}
