"use client";

import { useEffect, useState } from "react";
import { Megaphone, CalendarDays, Loader2, AlertCircle } from "lucide-react";

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
        console.error("Error al obtener los anuncios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, [classroomId]);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-slate-500 gap-3">
        <Loader2 size={32} className="animate-spin text-cyan-600" />
        <span className="text-sm font-medium">Cargando anuncios...</span>
      </div>
    );
  }

  if (announcements.length === 0) {
    return (
      <div className="rounded-2xl sm:rounded-3xl border border-dashed border-slate-300 bg-slate-50/50 p-8 sm:p-12 text-center text-slate-500 flex flex-col items-center justify-center gap-3">
        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
          <Megaphone size={24} />
        </div>
        <p className="text-base font-medium text-slate-600">No hay anuncios</p>
        <p className="text-xs sm:text-sm text-slate-400">
          Cuando el profesor publique un anuncio aparecerá aquí.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {announcements.map((announcement) => (
        <article
          key={announcement.id}
          className={`rounded-2xl sm:rounded-3xl border transition-shadow shadow-sm hover:shadow-md overflow-hidden bg-white ${
            announcement.is_important
              ? "border-rose-200 bg-gradient-to-br from-rose-50/40 via-white to-rose-50/20"
              : "border-slate-200/80"
          }`}
        >
          {/* Barra de acento superior */}
          <div
            className={`h-1.5 ${
              announcement.is_important
                ? "bg-gradient-to-r from-rose-500 via-orange-500 to-rose-500"
                : "bg-gradient-to-r from-cyan-500 to-blue-600"
            }`}
          />

          <div className="p-4 sm:p-6 md:p-8 space-y-4">
            {/* Cabecera del Anuncio */}
            <div className="flex items-start gap-3.5 sm:gap-4">
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 ${
                  announcement.is_important
                    ? "bg-rose-100 text-rose-600"
                    : "bg-cyan-100 text-cyan-600"
                }`}
              >
                <Megaphone className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-base sm:text-lg md:text-xl font-bold text-slate-800 leading-snug">
                    {announcement.titulo}
                  </h2>

                  {announcement.is_important && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-600 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-sm animate-pulse">
                      <AlertCircle size={12} />
                      Importante
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-400">
                  <CalendarDays size={14} className="shrink-0" />
                  <span>{formatDate(announcement.created_at)} hs</span>
                </div>
              </div>
            </div>

            {/* Contenido del Anuncio */}
            <div
              className={`rounded-xl sm:rounded-2xl p-4 sm:p-5 border ${
                announcement.is_important
                  ? "bg-rose-50/60 border-rose-200/80 text-rose-950"
                  : "bg-slate-50 border-slate-100 text-slate-700"
              }`}
            >
              <p className="whitespace-pre-wrap text-xs sm:text-sm leading-relaxed font-normal">
                {announcement.contenido}
              </p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
