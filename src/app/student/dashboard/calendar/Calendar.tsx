"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CalendarView from "./CalendarView";

export type CalendarEvent = {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  hora: string;
  tipo: string;
  classroom_id: string;
  classroom_nombre: string;
};

export default function Calendar() {
  const { t } = useTranslation();

  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCalendar = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/student/calendar");

      if (!res.ok) {
        throw new Error("Error loading calendar");
      }

      const data = await res.json();

      setEvents(data.events ?? []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCalendar();
  }, []);

  if (loading) {
    return (
      <div
        className="
          bg-white
          rounded-[32px]
          border
          border-slate-200
          shadow-sm
          p-16
          flex
          flex-col
          items-center
          justify-center
        "
      >
        <div className="relative">
          <div
            className="
              absolute
              inset-0
              rounded-full
              border-4
              border-cyan-200
              border-t-cyan-600
              animate-spin
            "
          />

          <div
            className="
              w-24
              h-24
              rounded-full
              bg-white
              flex
              items-center
              justify-center
              p-2
            "
          >
            <img
              src="/logo2.png"
              alt="Instituto"
              className="w-20 h-20 object-contain"
            />
          </div>
        </div>

        <h2 className="mt-8 text-2xl font-bold text-slate-900">
          {t("calendar.loading_title")}
        </h2>

        <p className="mt-3 text-slate-500">{t("calendar.loading_subtitle")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Principal */}
      <div className="bg-white rounded-[28px] border border-slate-200/80 p-6 md:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600 shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t("calendar.title")}
            </h1>

            <p className="text-sm text-slate-500 mt-0.5">
              {t("calendar.description")}
            </p>
          </div>
        </div>

        {/* Indicator Badge */}
        <div className="inline-flex items-center gap-2 self-start sm:self-center bg-slate-50 border border-slate-200/80 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-600">
          <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
          {events.length}{" "}
          {t("calendar.event", {
            count: events.length,
          })}
        </div>
      </div>

      {/* Contenido del Calendario */}
      <CalendarView events={events} />
    </div>
  );
}
