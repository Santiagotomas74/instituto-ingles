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
      <div className="bg-white rounded-3xl shadow p-12 text-center">
        Cargando calendario...
      </div>
    );
  }

  return (
    <div>
      <CalendarView events={events} />
    </div>
  );
}
