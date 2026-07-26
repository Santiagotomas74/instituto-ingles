"use client";

import { useState } from "react";

type Props = {
  open: boolean;

  setOpen: (value: boolean) => void;

  classroomId: string;

  loadDates: () => Promise<void>;
};

export default function ImportantDateModal({
  open,
  setOpen,
  classroomId,
  loadDates,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",

    date: "",

    time: "",

    type: "clase",

    description: "",
  });

  if (!open) return null;

  const handleCreate = async () => {
    if (
      !form.title.trim() ||
      !form.date ||
      !form.time ||
      !form.description.trim()
    ) {
      alert("Completa todos los campos");

      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/teacher/classrooms/important-dates", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          classroom_id: classroomId,

          titulo: form.title,

          descripcion: form.description,

          fecha: form.date,

          hora: form.time,

          tipo: form.type,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error();
      }

      setForm({
        title: "",

        date: "",

        time: "",

        type: "clase",

        description: "",
      });

      setOpen(false);

      await loadDates();
    } catch (error) {
      console.error(error);

      alert("Error creando fecha importante");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
fixed
inset-0
bg-black/40
backdrop-blur-sm
flex
items-center
justify-center
z-50
"
    >
      <div
        className="
bg-white
rounded-3xl
w-full
max-w-xl
p-8
shadow-2xl
"
      >
        <h2
          className="
text-2xl
font-bold
text-gray-700
mb-6
"
        >
          Nueva fecha importante
        </h2>

        <div
          className="
space-y-5
"
        >
          <input
            type="text"
            placeholder="Título"
            value={form.title}
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value,
              })
            }
            className="
w-full
border
rounded-xl
p-3
text-gray-700
"
          />

          <input
            type="date"
            value={form.date}
            onChange={(e) =>
              setForm({
                ...form,
                date: e.target.value,
              })
            }
            className="
w-full
border
rounded-xl
p-3
text-gray-700
"
          />

          <input
            type="time"
            value={form.time}
            onChange={(e) =>
              setForm({
                ...form,
                time: e.target.value,
              })
            }
            className="
w-full
border
rounded-xl
p-3
text-gray-700
"
          />

          <select
            value={form.type}
            onChange={(e) =>
              setForm({
                ...form,
                type: e.target.value,
              })
            }
            className="
w-full
border
rounded-xl
p-3
text-gray-700
"
          >
            <option value="clase">Clase</option>

            <option value="examen">Examen</option>

            <option value="evento">Evento</option>

            <option value="reunion">Reunión</option>
          </select>

          <textarea
            rows={4}
            placeholder="Descripción"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
            className="
w-full
border
rounded-xl
p-3
text-gray-700
"
          />
        </div>

        <div
          className="
flex
justify-end
gap-3
mt-8
"
        >
          <button
            onClick={() => setOpen(false)}
            className="
px-5
py-3
rounded-xl
border
"
          >
            Cancelar
          </button>

          <button
            onClick={handleCreate}
            disabled={loading}
            className="
px-5
py-3
rounded-xl
bg-cyan-500
text-white
hover:bg-cyan-600
disabled:opacity-60
"
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
}
