"use client";

import Link from "next/link";

import { MessageCircle, ChevronRight, Clock3 } from "lucide-react";

import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

import { Question } from "./Questions";

type Props = {
  question: Question;
};

export default function QuestionCard({ question }: Props) {
  const params = new URLSearchParams(window.location.search);

  params.set("tab", "questions");
  params.set("question", question.id);
  return (
    <Link
      href={`?tab=questions&question=${question.id}`}
      className="
        group
        block
        bg-white
        rounded-3xl
        border
        border-slate-200
        hover:border-cyan-300
        hover:shadow-xl
        transition
      "
    >
      <div className="p-7">
        <div className="flex justify-between">
          <div>
            <h3
              className="
                text-xl
                font-bold
                text-slate-900
                group-hover:text-cyan-600
                transition
              "
            >
              {question.titulo}
            </h3>

            <p className="mt-3 text-slate-600 line-clamp-2">
              {question.contenido}
            </p>
          </div>

          <ChevronRight
            className="
              text-slate-400
              group-hover:text-cyan-600
            "
          />
        </div>

        <div
          className="
            mt-6
            flex
            justify-between
            items-center
            border-t
            pt-5
          "
        >
          <div>
            <p className="font-semibold text-slate-800">
              {question.student_name} {question.student_lastname}
            </p>

            <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
              <Clock3 size={15} />

              {formatDistanceToNow(new Date(question.created_at), {
                addSuffix: true,
                locale: es,
              })}
            </div>
          </div>

          <div
            className="
              flex
              items-center
              gap-2
              text-cyan-600
              font-semibold
            "
          >
            <MessageCircle size={18} />
            {question.replies} respuestas
          </div>
        </div>
      </div>
    </Link>
  );
}
