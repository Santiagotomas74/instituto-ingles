"use client";

import { CheckCircle2, PartyPopper } from "lucide-react";

export default function EmptyPendingTasks() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-8 sm:p-12 md:p-16 text-center max-w-3xl mx-auto flex flex-col items-center justify-center min-h-[400px]">
      {/* CONTENEDOR DEL ICONO */}
      <div className="relative inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-[32px] sm:rounded-[40px] bg-emerald-100 text-emerald-600 ring-8 ring-emerald-50 mb-6 sm:mb-8">
        <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />

        {/* Pequeño icono decorativo flotante */}
        <div className="absolute -top-3 -right-3 w-10 h-10 rounded-2xl bg-white shadow-sm border border-emerald-100 flex items-center justify-center rotate-12">
          <PartyPopper className="w-5 h-5 text-amber-500" />
        </div>
      </div>

      {/* TEXTO */}
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
        ¡No tienes tareas pendientes!
      </h2>

      <p className="mt-3 text-sm sm:text-base text-gray-500 max-w-sm mx-auto leading-relaxed">
        Ya entregaste todas las actividades disponibles o aún no te asignaron
        nuevas. ¡Buen trabajo!
      </p>
    </div>
  );
}
