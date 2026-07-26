"use client";

import { useCallback, useEffect, useState } from "react";

import { CalendarEvent } from "../types";

export function useTeacherCalendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const loadCalendar = useCallback(async () => {
    try {
      setLoading(true);

      setError(null);

      const res = await fetch("/api/teacher/calendar", {
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Error cargando calendario");
      }

      setEvents(data.events ?? []);
    } catch (error: any) {
      console.error(error);

      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCalendar();
  }, [loadCalendar]);

  return {
    events,

    loading,

    error,

    loadCalendar,
  };
}
