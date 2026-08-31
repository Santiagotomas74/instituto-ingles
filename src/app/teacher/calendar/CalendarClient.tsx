"use client";

import Image from "next/image";
import { Loader2, CalendarDays } from "lucide-react";
import { useTeacherCalendar } from "./hooks/useTeacherCalendar";
import CalendarView from "./components/CalendarView";

export default function CalendarClient() {
  const { events, loading, error, loadCalendar } = useTeacherCalendar();

  if (loading) {
    return (
      <div
        className="
        min-h-screen
        flex
        flex-col
        items-center
        justify-center
        text-slate-500
        "
      >
        <Image src="/logo2.png" alt="logo" width={120} height={120} />

        <Loader2
          className="
          animate-spin
          mt-5
          "
        />

        <p>Cargando calendario...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="
        min-h-screen
        flex
        items-center
        justify-center
        "
      >
        <div>
          <p>{error}</p>

          <button onClick={loadCalendar}>Reintentar</button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-8 space-y-6">
      {/* Header Principal para Docente */}
      <div className="bg-white rounded-[28px] border border-slate-200/80 p-6 md:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600 shrink-0">
            <CalendarDays className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Calendario Docente
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Gestiona tu cronograma de clases, entregas y fechas importantes.
            </p>
          </div>
        </div>

        {/* Badge de estado de eventos */}
        <div className="inline-flex items-center gap-2 self-start sm:self-center bg-slate-50 border border-slate-200/80 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-600">
          <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
          {events.length}{" "}
          {events.length === 1 ? "evento programado" : "eventos programados"}
        </div>
      </div>

      {/* Componente del Calendario */}
      <CalendarView events={events} />
    </main>
  );
}
