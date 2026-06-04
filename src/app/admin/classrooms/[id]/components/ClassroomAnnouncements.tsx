"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Plus,
  Pencil,
  Trash2,
  X,
  Megaphone,
  AlertTriangle,
} from "lucide-react";

type Announcement = {
  id: string;
  titulo: string;
  contenido: string;
  is_important: boolean;
  created_at: string;
};

type Props = {
  classroomId: string;
  announcements: Announcement[];
};

export default function ClassroomAnnouncements({
  classroomId,
  announcements: initialAnnouncements,
}: Props) {
  const router = useRouter();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  console.log(announcements);

  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    content: "",
    is_important: false,
  });

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "¿Seguro que querés eliminar este anuncio?",
    );

    if (!confirmed) return;

    try {
      const res = await fetch(`/api/admin/classrooms/announcements/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message);
        return;
      }

      setAnnouncements((prev) =>
        prev.filter((announcement) => announcement.id !== id),
      );
    } catch (error) {
      console.error(error);
    }
  };
  const handleEdit = (announcement: Announcement) => {
    setEditingId(announcement.id);

    setForm({
      title: announcement.titulo,
      content: announcement.contenido,
      is_important: announcement.is_important,
    });

    setOpen(true);
  };
  const handleSubmit = async () => {
    try {
      setLoading(true);

      const endpoint = editingId
        ? `/api/admin/classrooms/announcements/${editingId}`
        : "/api/admin/classrooms/announcements";

      const method = editingId ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          classroom_id: classroomId,
          title: form.title,
          content: form.content,
          is_important: form.is_important,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message);
        return;
      }

      if (editingId) {
        setAnnouncements((prev) =>
          prev.map((announcement) =>
            announcement.id === editingId ? data.announcement : announcement,
          ),
        );
      } else {
        setAnnouncements((prev) => [data.announcement, ...prev]);
      }

      setEditingId(null);

      setForm({
        title: "",
        content: "",
        is_important: false,
      });

      setOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Anuncios</h2>

          <button
            onClick={() => setOpen(true)}
            className="
              h-12
              px-5
              rounded-2xl
              bg-cyan-500
              hover:bg-cyan-400
              transition
              text-white
              flex
              items-center
              gap-2
            "
          >
            <Plus size={18} />
            Nuevo anuncio
          </button>
        </div>

        {announcements.length === 0 ? (
          <div
            className="
              bg-white
              rounded-[28px]
              p-10
              shadow-lg
              text-center
            "
          >
            <Megaphone size={48} className="mx-auto text-slate-300" />

            <h3 className="mt-4 text-xl font-semibold text-slate-800">
              No hay anuncios
            </h3>

            <p className="mt-2 text-slate-500">
              Todavía no se publicó ningún anuncio.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {announcements.map((announcement) => (
              <article
                key={announcement.id}
                className="
        bg-white
        rounded-[32px]
        p-7
        shadow-lg
        border
        border-slate-100
      "
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-xl font-bold text-slate-900">
                        {announcement.titulo}
                      </h3>

                      {announcement.is_important && (
                        <span
                          className="
                  inline-flex
                  items-center
                  gap-1
                  px-3
                  py-1
                  rounded-full
                  bg-red-100
                  text-red-700
                  text-xs
                  font-semibold
                "
                        >
                          <AlertTriangle size={14} />
                          Importante
                        </span>
                      )}
                    </div>

                    <p className="mt-4 text-slate-600 leading-relaxed">
                      {announcement.contenido}
                    </p>

                    <p className="mt-5 text-sm text-slate-400">
                      {new Date(announcement.created_at).toLocaleDateString(
                        "es-AR",
                      )}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(announcement)}
                      className="
              h-10
              w-10
              rounded-xl
              flex
              items-center
              justify-center
            
              transition
              bg-blue-500
            "
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => handleDelete(announcement.id)}
                      className="
              h-10
              w-10
              rounded-xl
              flex
              items-center
              justify-center
              text-red-500
              hover:bg-red-50
              transition
            "
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* MODAL */}

      {open && (
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
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-slate-900">
                {editingId ? "Editar anuncio" : "Crear anuncio"}
              </h3>

              <button onClick={() => setOpen(false)}>
                <X />
              </button>
            </div>

            <div className="space-y-4 text-gray-700">
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
                  border-slate-200
                "
              />

              <textarea
                placeholder="Contenido"
                rows={6}
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
                  border-slate-200
                "
              />

              <label className="flex items-center gap-3">
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

                <span className="text-slate-700">Marcar como importante</span>
              </label>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => {
                  setOpen(false);
                  setEditingId(null);

                  setForm({
                    title: "",
                    content: "",
                    is_important: false,
                  });
                }}
                className="
    px-5
    h-12
    rounded-2xl
    border
    border-slate-200
    bg-red-500
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
    hover:bg-cyan-400
    text-white
    font-semibold
  "
              >
                {loading
                  ? editingId
                    ? "Guardando..."
                    : "Publicando..."
                  : editingId
                    ? "Guardar cambios"
                    : "Publicar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
