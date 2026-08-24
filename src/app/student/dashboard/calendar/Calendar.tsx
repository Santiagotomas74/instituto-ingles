"use client";

import { useEffect, useState } from "react";

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
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCalendar = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/student/calendar");

      if (!res.ok) {
        throw new Error("Error cargando calendario");
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
          Cargando calendario...
        </h2>
        <p className="mt-3 text-slate-500">Aguarde unos segundos.</p>
      </div>
    );
  }

  return (
    <div>
      <CalendarView events={events} />
    </div>
  );
}
