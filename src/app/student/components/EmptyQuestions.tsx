"use client";

import { MessageCircleQuestion } from "lucide-react";

type EmptyQuestionsProps = {
  onCreate?: () => void;
};

export default function EmptyQuestions({ onCreate }: EmptyQuestionsProps) {
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
        Todavía no hay consultas
      </h2>

      <p className="mt-3 max-w-lg text-slate-500 leading-relaxed">
        Sé el primero en realizar una consulta al profesor. Todas las respuestas
        quedarán organizadas en un hilo para que cualquier compañero pueda
        consultarlas.
      </p>

      {onCreate && (
        <button
          onClick={onCreate}
          className="
            mt-8
            h-12
            px-8
            rounded-2xl
            bg-cyan-600
            hover:bg-cyan-500
            text-white
            font-semibold
            transition
          "
        >
          Crear primera consulta
        </button>
      )}
    </div>
  );
}
