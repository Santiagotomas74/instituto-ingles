"use client";

import { X } from "lucide-react";

import { useState } from "react";

type Props = {
  open: boolean;

  setOpen: (value: boolean) => void;

  editingId: string | null;

  setEditingId: (value: string | null) => void;

  form: {
    title: string;

    content: string;

    is_important: boolean;
  };

  setForm: (value: any) => void;

  classroomId: string;

  loadClassroom: () => void;
};

export default function CreateAnnouncementModal({
  open,

  setOpen,

  editingId,

  setEditingId,

  form,

  setForm,

  classroomId,

  loadClassroom,
}: Props) {
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async () => {
    if (!form.title.trim() || !form.content.trim()) {
      alert("Completa título y contenido");

      return;
    }

    try {
      setLoading(true);

      const method = editingId ? "PUT" : "POST";

      const url = editingId
        ? `/api/teacher/classrooms/announcements/${editingId}`
        : "/api/teacher/classrooms/announcements";

      const res = await fetch(url, {
        method,

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          classroom_id: classroomId,

          titulo: form.title,

          contenido: form.content,

          is_important: form.is_important,
        }),
      });

      if (!res.ok) throw new Error();

      setOpen(false);

      setEditingId(null);

      setForm({
        title: "",

        content: "",

        is_important: false,
      });

      loadClassroom();
    } catch (error) {
      console.error(error);

      alert("Error guardando anuncio");
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
flex
items-center
justify-center
z-50
p-4
"
    >
      <div
        className="
bg-white
rounded-[28px]
w-full
max-w-2xl
p-6
"
      >
        <div
          className="
flex
justify-between
items-center
mb-6
"
        >
          <h3
            className="
text-2xl
font-bold
text-slate-900
"
          >
            {editingId ? "Editar anuncio" : "Crear anuncio"}
          </h3>

          <button onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>

        <div
          className="
space-y-4
text-gray-700
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
h-14
px-5
rounded-2xl
border
"
          />

          <textarea
            rows={6}
            placeholder="Contenido"
            value={form.content}
            onChange={(e) =>
              setForm({
                ...form,

                content: e.target.value,
              })
            }
            className="
w-full
p-5
rounded-2xl
border
"
          />

          <label
            className="
flex
gap-3
items-center
"
          >
            <input
              type="checkbox"
              checked={form.is_important}
              onChange={(e) =>
                setForm({
                  ...form,

                  is_important: e.target.checked,
                })
              }
            />
            Importante
          </label>
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
h-12
rounded-2xl
bg-red-500
text-white
"
          >
            Cancelar
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="
px-6
h-12
rounded-2xl
bg-cyan-500
text-white
font-semibold
"
          >
            {loading
              ? "Guardando..."
              : editingId
                ? "Guardar cambios"
                : "Publicar"}
          </button>
        </div>
      </div>
    </div>
  );
}
