"use client";

import { MessageCircle, Clock, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

type Props = {
  question: {
    id: string;
    titulo: string;
    contenido: string;
    student_name: string;
    student_lastname: string;
    created_at: string;
    replies_count: number;
    is_closed: boolean;
  };
  onOpen: () => void;
};

export default function QuestionCard({ question, onOpen }: Props) {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        sm:rounded-3xl
        border
        border-slate-200
        shadow-sm
        p-4
        sm:p-6
        flex
        flex-col
      "
    >
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-6">
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-3 sm:hidden mb-2">
            {/* Estado en móvil (arriba a la derecha) */}
            <div className="shrink-0">
              {question.is_closed ? (
                <span className="flex items-center gap-1.5 rounded-full bg-green-100 text-green-700 px-2.5 py-1 text-xs font-semibold">
                  <CheckCircle2 size={14} />
                  Resuelta
                </span>
              ) : (
                <span className="rounded-full bg-yellow-100 text-yellow-700 px-2.5 py-1 text-xs font-semibold">
                  Pendiente
                </span>
              )}
            </div>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-slate-900 break-words">
            {question.titulo}
          </h3>

          <p className="mt-1.5 sm:mt-2 text-sm sm:text-base text-slate-600 line-clamp-2">
            {question.contenido}
          </p>

          <div className="flex flex-wrap items-center gap-3 sm:gap-6 mt-4 sm:mt-5 text-[11px] sm:text-sm text-slate-500">
            <span className="font-medium text-slate-700">
              {question.student_name} {question.student_lastname}
            </span>

            <span className="flex items-center gap-1.5 shrink-0">
              <Clock size={14} className="sm:w-[15px] sm:h-[15px]" />
              {format(new Date(question.created_at), "dd/MM/yyyy HH:mm", {
                locale: es,
              })}
            </span>

            <span className="flex items-center gap-1.5 shrink-0">
              <MessageCircle size={14} className="sm:w-[15px] sm:h-[15px]" />
              {question.replies_count} respuestas
            </span>
          </div>
        </div>

        {/* Panel derecho (Desktop) / Abajo (Mobile) */}
        <div className="flex flex-col items-start sm:items-end gap-3 sm:gap-4 w-full sm:w-auto shrink-0 mt-2 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-0 border-slate-100">
          {/* Estado en desktop */}
          <div className="hidden sm:block">
            {question.is_closed ? (
              <span className="flex items-center gap-2 rounded-full bg-green-100 text-green-700 px-3 py-1 text-sm font-semibold">
                <CheckCircle2 size={15} />
                Resuelta
              </span>
            ) : (
              <span className="rounded-full bg-yellow-100 text-yellow-700 px-3 py-1 text-sm font-semibold">
                Pendiente
              </span>
            )}
          </div>

          <button
            onClick={onOpen}
            className="
              w-full
              sm:w-auto
              flex
              items-center
              justify-center
              sm:justify-end
              h-10
              sm:h-auto
              rounded-xl
              sm:rounded-none
              bg-cyan-50
              sm:bg-transparent
              text-cyan-600
              font-semibold
              text-sm
              sm:text-base
              hover:bg-cyan-100
              sm:hover:bg-transparent
              hover:text-cyan-700
              transition
            "
          >
            Ver conversación →
          </button>
        </div>
      </div>
    </div>
  );
}
