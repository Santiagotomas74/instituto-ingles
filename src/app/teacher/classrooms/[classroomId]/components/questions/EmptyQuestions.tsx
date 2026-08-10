"use client";

import { MessageCircleQuestion } from "lucide-react";

export default function EmptyQuestions() {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        border
        border-slate-200
        shadow-sm
        py-20
        px-8
        flex
        flex-col
        items-center
        justify-center
        text-center
      "
    >
      <div
        className="
          w-20
          h-20
          rounded-full
          bg-cyan-100
          flex
          items-center
          justify-center
          mb-6
        "
      >
        <MessageCircleQuestion size={40} className="text-cyan-600" />
      </div>

      <h2 className="text-2xl font-bold text-slate-900">
        No hay consultas todavía
      </h2>

      <p className="mt-3 text-slate-500 max-w-lg">
        Cuando un estudiante realice una consulta aparecerá aquí para que puedas
        responderla.
      </p>
    </div>
  );
}
