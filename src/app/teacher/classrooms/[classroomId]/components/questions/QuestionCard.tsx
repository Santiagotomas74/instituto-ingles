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
        rounded-3xl
        border
        border-slate-200
        shadow-sm
        p-6
      "
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold text-slate-900">
            {question.titulo}
          </h3>

          <p className="mt-2 text-slate-600 line-clamp-2">
            {question.contenido}
          </p>

          <div className="flex items-center gap-6 mt-5 text-sm text-slate-500">
            <span>
              {question.student_name} {question.student_lastname}
            </span>

            <span className="flex items-center gap-1">
              <Clock size={15} />

              {format(new Date(question.created_at), "dd/MM/yyyy HH:mm", {
                locale: es,
              })}
            </span>

            <span className="flex items-center gap-1">
              <MessageCircle size={15} />
              {question.replies_count} respuestas
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-3">
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

          <button
            onClick={onOpen}
            className="
              text-cyan-600
              font-semibold
              hover:text-cyan-700
            "
          >
            Ver conversación →
          </button>
        </div>
      </div>
    </div>
  );
}
