"use client";

import { useTranslation } from "react-i18next";
import {
  GraduationCap,
  School,
  CalendarDays,
  Eye,
  MessageSquareText,
} from "lucide-react";

import { Grade } from "./Grades";

type Props = {
  grade: Grade;
  onClick: () => void;
};

export default function GradeCard({ grade, onClick }: Props) {
  const { t } = useTranslation();

  const percentage =
    grade.max_score > 0 ? Math.round((grade.grade / grade.max_score) * 100) : 0;

  const getBadgeStyle = () => {
    if (percentage >= 90)
      return "bg-emerald-50 text-emerald-700 border-emerald-200";

    if (percentage >= 70) return "bg-blue-50 text-blue-700 border-blue-200";

    if (percentage >= 60) return "bg-amber-50 text-amber-700 border-amber-200";

    return "bg-rose-50 text-rose-700 border-rose-200";
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "-";

    const [year, month, day] = dateStr.split("T")[0].split("-");

    if (!year || !month || !day) return dateStr;

    return `${day}/${month}/${year}`;
  };

  return (
    <div className="group bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200 p-5 sm:p-6 flex flex-col gap-6">
      {/* CABECERA */}
      <div className="flex flex-col-reverse sm:flex-row justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors truncate">
            {grade.titulo}
          </h2>

          {grade.descripcion && (
            <p className="mt-1.5 text-sm text-slate-500 line-clamp-2 leading-relaxed">
              {grade.descripcion}
            </p>
          )}
        </div>

        <div
          className={`shrink-0 px-4 py-1.5 rounded-xl font-bold text-lg border ${getBadgeStyle()}`}
        >
          {grade.grade}{" "}
          <span className="opacity-60 text-sm font-medium">
            / {grade.max_score}
          </span>
        </div>
      </div>

      {/* METADATOS */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-slate-600">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0 text-slate-400">
            <School className="w-4 h-4" />
          </div>

          <div className="min-w-0">
            <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
              {t("grades.card.classroom")}
            </p>

            <p
              className="font-medium text-slate-700 truncate"
              title={grade.classroom}
            >
              {grade.classroom}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0 text-slate-400">
            <GraduationCap className="w-4 h-4" />
          </div>

          <div className="min-w-0">
            <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
              {t("grades.card.teacher")}
            </p>

            <p
              className="font-medium text-slate-700 truncate"
              title={grade.teacher}
            >
              {grade.teacher}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 col-span-2 md:col-span-1">
          <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0 text-slate-400">
            <CalendarDays className="w-4 h-4" />
          </div>

          <div>
            <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
              {t("grades.card.graded_at")}
            </p>

            <p className="font-medium text-slate-700">
              {formatDate(grade.graded_at)}
            </p>
          </div>
        </div>
      </div>

      {/* FEEDBACK */}
      <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-end sm:items-center">
        <div className="flex-1 w-full">
          {grade.teacher_feedback ? (
            <div className="flex gap-3 bg-amber-50/50 border border-amber-100/50 rounded-2xl p-3">
              <MessageSquareText className="text-amber-500 shrink-0 w-5 h-5 mt-0.5" />

              <div>
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block mb-0.5">
                  {t("grades.card.feedback")}
                </span>

                <p className="text-sm text-slate-700 line-clamp-2">
                  &quot;{grade.teacher_feedback}&quot;
                </p>
              </div>
            </div>
          ) : (
            <div className="hidden sm:block" />
          )}
        </div>

        <button
          type="button"
          onClick={onClick}
          className="w-full sm:w-auto shrink-0 h-10 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-medium text-sm flex items-center justify-center gap-2 transition-all shadow-sm"
        >
          <Eye className="w-4 h-4" />
          {t("grades.card.view_detail")}
        </button>
      </div>
    </div>
  );
}
