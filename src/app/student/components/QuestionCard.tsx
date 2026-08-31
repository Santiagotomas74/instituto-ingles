"use client";

import Link from "next/link";
import { MessageCircle, ChevronRight, Clock3 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { es, enUS } from "date-fns/locale";
import { useTranslation } from "react-i18next";

import { Question } from "./Questions";

type Props = {
  question: Question;
};

export default function QuestionCard({ question }: Props) {
  const { t, i18n } = useTranslation();

  const dateLocale = i18n.language.startsWith("en") ? enUS : es;

  const formattedDate = formatDistanceToNow(new Date(question.created_at), {
    addSuffix: true,
    locale: dateLocale,
  });

  const initials =
    `${question.student_name?.[0] || ""}${
      question.student_lastname?.[0] || ""
    }`.toUpperCase() || "U";

  return (
    <Link
      href={`?tab=questions&question=${question.id}`}
      className="group block bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 hover:border-cyan-300 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
    >
      <div className="p-5 sm:p-7 space-y-4 sm:space-y-5">
        {/* Encabezado */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1.5 flex-1 min-w-0">
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-800 group-hover:text-cyan-600 transition-colors line-clamp-2">
              {question.titulo}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
              {question.contenido}
            </p>
          </div>

          <ChevronRight
            size={20}
            className="text-slate-400 group-hover:text-cyan-600 group-hover:translate-x-1 transition-all shrink-0 mt-1"
          />
        </div>

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 text-xs sm:text-sm">
          {/* Autor */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-bold text-xs flex items-center justify-center shrink-0 border border-slate-200">
              {initials}
            </div>

            <div className="min-w-0">
              <p className="font-semibold text-slate-800 truncate text-xs sm:text-sm">
                {question.student_name} {question.student_lastname}
              </p>

              <div className="flex items-center gap-1 text-[11px] sm:text-xs text-slate-400 mt-0.5">
                <Clock3 size={13} className="shrink-0" />

                <span className="capitalize">{formattedDate}</span>
              </div>
            </div>
          </div>

          {/* Respuestas */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 text-cyan-700 text-xs font-semibold border border-cyan-100/80">
            <MessageCircle size={14} className="text-cyan-600" />

            <span>
              {question.replies}{" "}
              {question.replies === 1
                ? t("questions.reply_one")
                : t("questions.reply_other")}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
