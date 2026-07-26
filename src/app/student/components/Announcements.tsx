"use client";

import { useEffect, useState } from "react";
import { Megaphone, CalendarDays, User } from "lucide-react";

interface Props {
  classroomId: string;
}

interface Announcement {
  id: string;
  titulo: string;
  contenido: string;
  created_at: string;
  is_important: boolean;
}

export default function Announcements({ classroomId }: Props) {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await fetch(
          `/api/student/classroom/${classroomId}/announcements`,
          {
            cache: "no-store",
          },
        );

        const data = await res.json();

        if (data.success) {
          setAnnouncements(data.announcements);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, [classroomId]);

  if (loading) {
    return (
      <div className="text-center py-20 text-slate-500">
        Cargando anuncios...
      </div>
    );
  }

  if (announcements.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-10 border border-slate-200 text-center">
        <Megaphone size={40} className="mx-auto text-slate-300 mb-4" />

        <h2 className="text-2xl font-bold text-slate-700">No hay anuncios</h2>

        <p className="text-slate-500 mt-2">
          Cuando el profesor publique un anuncio aparecerá aquí.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {announcements.map((announcement) => (
        <div
          key={announcement.id}
          className={`
    rounded-[32px]
    shadow-sm
    hover:shadow-xl
    transition
    overflow-hidden
    border

    ${
      announcement.is_important
        ? "border-red-300 bg-gradient-to-br from-red-50 via-white to-red-50"
        : "border-slate-200 bg-white"
    }
  `}
        >
          <div
            className={`h-2 ${
              announcement.is_important
                ? "bg-gradient-to-r from-red-500 via-orange-500 to-red-500"
                : "bg-gradient-to-r from-cyan-500 to-blue-600"
            }`}
          />

          <div className="p-8">
            <div className="flex justify-between items-start gap-6">
              <div className="flex gap-5">
                <div
                  className={`
            w-16
            h-16
            rounded-2xl
            flex
            items-center
            justify-center
            shrink-0

            ${announcement.is_important ? "bg-red-100" : "bg-cyan-100"}
          `}
                >
                  <Megaphone
                    size={28}
                    className={
                      announcement.is_important
                        ? "text-red-600"
                        : "text-cyan-600"
                    }
                  />
                </div>

                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <h2 className="text-2xl font-bold text-slate-900">
                      {announcement.titulo}
                    </h2>

                    {announcement.is_important && (
                      <span
                        className="
                  px-4
                  py-1.5
                  rounded-full
                  bg-red-600
                  text-white
                  text-sm
                  font-bold
                  uppercase
                  tracking-wide
                  animate-pulse
                  shadow-lg
                "
                      >
                        🚨 IMPORTANTE
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mt-4 text-sm text-slate-500">
                    <CalendarDays size={16} />

                    {new Date(announcement.created_at).toLocaleDateString(
                      "es-AR",
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`
        mt-8
        rounded-2xl
        p-6
        border

        ${
          announcement.is_important
            ? "bg-red-50 border-red-200"
            : "bg-slate-50 border-slate-200"
        }
      `}
            >
              <p
                className={`
          whitespace-pre-wrap
          leading-8

          ${
            announcement.is_important
              ? "text-red-900 font-medium text-lg"
              : "text-slate-700"
          }
        `}
              >
                {announcement.contenido}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
