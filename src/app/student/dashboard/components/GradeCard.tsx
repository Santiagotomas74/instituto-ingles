"use client";

import { GraduationCap, School, Star, CalendarDays, Eye } from "lucide-react";

import { Grade } from "./Grades";

type Props = {
  grade: Grade;
  onClick: () => void;
};

export default function GradeCard({ grade, onClick }: Props) {
  const percentage = Math.round((grade.grade / grade.max_score) * 100);

  const badgeColor =
    percentage >= 90
      ? "bg-emerald-100 text-emerald-700"
      : percentage >= 70
        ? "bg-cyan-100 text-cyan-700"
        : percentage >= 60
          ? "bg-amber-100 text-amber-700"
          : "bg-red-100 text-red-700";

  return (
    <div
      className="
        bg-white
        rounded-3xl
        border
        shadow-sm
        hover:shadow-md
        transition
        p-6
      "
    >
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-slate-700">{grade.titulo}</h2>

          {grade.descripcion && (
            <p className="mt-2 text-slate-600">{grade.descripcion}</p>
          )}
        </div>

        <div
          className={`
            px-4
            py-2
            rounded-2xl
            font-bold
            text-slate-600
            text-lg
            ${badgeColor}
          `}
        >
          {grade.grade} / {grade.max_score}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-5 mt-7">
        <div className="flex gap-3">
          <School className="text-cyan-600" />

          <div>
            <p className="text-xs text-slate-500">Aula</p>

            <p className="font-medium text-slate-600">{grade.classroom}</p>
          </div>
        </div>

        <div className="flex gap-3">
          <GraduationCap className="text-cyan-600" />

          <div>
            <p className="text-xs text-slate-500">Profesor</p>

            <p className="font-medium text-slate-600">{grade.teacher}</p>
          </div>
        </div>

        <div className="flex gap-3">
          <CalendarDays className="text-cyan-600" />

          <div>
            <p className="text-xs text-slate-500">Fecha de corrección</p>

            <p className="font-medium text-slate-600">
              {grade.graded_at
                ? new Date(grade.graded_at).toLocaleDateString()
                : "-"}
            </p>
          </div>
        </div>
      </div>

      {grade.teacher_feedback && (
        <div
          className="
            mt-6
            rounded-2xl
            bg-slate-50
            border
            p-5
          "
        >
          <div className="flex items-center gap-2 mb-2">
            <Star className="text-amber-500" size={18} />

            <span className="font-semibold text-slate-600">
              Observación del profesor
            </span>
          </div>

          <p className="text-slate-600 line-clamp-2">
            {grade.teacher_feedback}
          </p>
        </div>
      )}

      <div className="flex justify-end mt-6">
        <button
          onClick={onClick}
          className="
            h-11
            px-5
            rounded-xl
            bg-cyan-600
            hover:bg-cyan-700
            text-white
            flex
            items-center
            gap-2
          "
        >
          <Eye size={18} />
          Ver detalle
        </button>
      </div>
    </div>
  );
}
