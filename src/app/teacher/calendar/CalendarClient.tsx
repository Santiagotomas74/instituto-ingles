"use client";

import Image from "next/image";

import { Loader2 } from "lucide-react";

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
    <main
      className="
      min-h-screen
      bg-slate-50
      p-8
      "
    >
      <h1
        className="
        text-4xl
        font-bold
        mb-8
        text-slate-700
        "
      >
        Calendario
      </h1>

      <CalendarView events={events} />
    </main>
  );
}
