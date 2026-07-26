"use client";

import { useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { AlertTriangle, Megaphone, Pencil, Trash2 } from "lucide-react";

import { Announcement } from "../types";

import CreateAnnouncementModal from "./CreateAnnouncementModal";

type Props = {
  classroomId: string;
};

export default function AnnouncementsTab({ classroomId }: Props) {
  const router = useRouter();

  const searchParams = useSearchParams();

  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "",
    content: "",
    is_important: false,
  });

  const loadAnnouncements = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `/api/teacher/classroom/${classroomId}/announcements`,
      );

      if (!response.ok) {
        throw new Error("Error cargando anuncios");
      }

      const data = await response.json();

      setAnnouncements(data.announcements ?? []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (classroomId) {
      loadAnnouncements();
    }
  }, [classroomId]);

  useEffect(() => {
    if (
      searchParams.get("tab") === "announcements" &&
      searchParams.get("new") === "true"
    ) {
      setEditingId(null);

      setForm({
        title: "",
        content: "",
        is_important: false,
      });

      setOpen(true);

      router.replace(`/teacher/classrooms/${classroomId}?tab=announcements`);
    }
  }, [searchParams, classroomId, router]);

  const handleEdit = (announcement: Announcement) => {
    setEditingId(announcement.id);

    setForm({
      title: announcement.titulo,
      content: announcement.contenido,
      is_important: announcement.is_important ?? false,
    });

    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    const confirmed = confirm("¿Eliminar anuncio?");

    if (!confirmed) return;

    try {
      const response = await fetch(
        `/api/teacher/classrooms/announcements/${id}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error();
      }

      setAnnouncements((prev) =>
        prev.filter((announcement) => announcement.id !== id),
      );
    } catch (error) {
      console.error(error);

      alert("Error eliminando anuncio");
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border p-8 text-center text-gray-500">
        Cargando anuncios...
      </div>
    );
  }

  return (
    <section>
      <div
        className="
        flex
        justify-between
        items-center
        mb-6
      "
      >
        <h2
          className="
          text-3xl
          font-bold
          text-gray-900
        "
        >
          Anuncios
        </h2>

        <button
          onClick={() => {
            setEditingId(null);

            setForm({
              title: "",
              content: "",
              is_important: false,
            });

            setOpen(true);
          }}
          className="
          px-5
          py-3
          rounded-xl
          bg-cyan-500
          text-white
        "
        >
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
          <Megaphone
            size={48}
            className="
            mx-auto
            text-slate-300
          "
          />

          <h3
            className="
            mt-4
            text-xl
            font-semibold
            text-slate-800
          "
          >
            No hay anuncios
          </h3>

          <p
            className="
            mt-2
            text-slate-500
          "
          >
            Todavía no se publicó ningún anuncio.
          </p>
        </div>
      ) : (
        <div
          className="
          space-y-6
        "
        >
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
              <div
                className="
                flex
                items-start
                justify-between
                gap-6
              "
              >
                <div className="flex-1">
                  <div
                    className="
                    flex
                    flex-wrap
                    items-center
                    gap-3
                  "
                  >
                    <h3
                      className="
                      text-xl
                      font-bold
                      text-slate-900
                    "
                    >
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

                  <p
                    className="
                    mt-4
                    text-slate-600
                    leading-relaxed
                  "
                  >
                    {announcement.contenido}
                  </p>

                  <p
                    className="
                    mt-5
                    text-sm
                    text-slate-400
                  "
                  >
                    {new Date(announcement.created_at).toLocaleDateString(
                      "es-AR",
                    )}
                  </p>
                </div>

                <div
                  className="
                  flex
                  items-center
                  gap-2
                "
                >
                  <button
                    onClick={() => handleEdit(announcement)}
                    className="
                    h-10
                    w-10
                    rounded-xl
                    flex
                    items-center
                    justify-center
                    bg-blue-500
                    text-white
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

      <CreateAnnouncementModal
        open={open}
        setOpen={setOpen}
        editingId={editingId}
        setEditingId={setEditingId}
        form={form}
        setForm={setForm}
        classroomId={classroomId}
        loadClassroom={loadAnnouncements}
      />
    </section>
  );
}
