"use client";

import { ClipboardList } from "lucide-react";

export default function EmptyTasks() {
  return (
    <div
      className="
        rounded-3xl
        border-2
        border-dashed
        border-slate-300
        bg-white
        py-20
        flex
        flex-col
        items-center
      "
    >
      <ClipboardList size={54} className="text-slate-300" />

      <h3 className="mt-5 text-xl font-bold text-slate-700">No hay tareas</h3>

      <p className="mt-2 text-slate-500">
        Crea la primera actividad para esta classroom.
      </p>
    </div>
  );
}
