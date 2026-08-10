"use client";

import { CheckCircle2 } from "lucide-react";

export default function EmptyPendingTasks() {
  return (
    <div
      className="
      rounded-3xl
      border
      bg-white
      p-20
      text-center
    "
    >
      <div
        className="
        mx-auto
        w-20
        h-20
        rounded-full
        bg-emerald-100
        flex
        items-center
        justify-center
      "
      >
        <CheckCircle2 className="text-emerald-600" size={42} />
      </div>

      <h2 className="text-3xl font-bold mt-8 text-slate-600">
        ¡No tienes tareas pendientes!
      </h2>

      <p className="text-slate-500 mt-3">
        Ya entregaste todas las actividades disponibles.
      </p>
    </div>
  );
}
