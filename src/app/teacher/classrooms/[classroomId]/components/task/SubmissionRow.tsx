"use client";

import { CheckCircle2, CalendarDays, Star } from "lucide-react";

import { Submission } from "./TaskSubmissionsModal";

type Props = {
  submission: Submission;
  active: boolean;
  onClick: () => void;
};

export default function SubmissionRow({ submission, active, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full
        text-left
        p-5
        border-b
        transition

        ${
          active
            ? "bg-cyan-50 border-l-4 border-cyan-600"
            : "hover:bg-slate-100"
        }
      `}
    >
      <div className="flex justify-between">
        <div>
          <p className="font-semibold text-slate-900">
            {submission.nombre} {submission.apellido}
          </p>

          <p className="text-xs text-slate-500 mt-1">{submission.email}</p>
        </div>

        <CheckCircle2 className="text-green-600" size={22} />
      </div>

      {submission.submitted_at && (
        <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
          <CalendarDays size={14} />

          {new Date(submission.submitted_at).toLocaleString()}
        </div>
      )}

      {submission.grade !== null && (
        <div className="mt-3 flex items-center justify-between">
          <div
            className="
              flex
              items-center
              gap-1
              text-amber-500
              text-xs
              font-semibold
            "
          >
            <Star size={14} />
            Corregada
          </div>

          <div
            className="
              px-2.5
              py-1
              rounded-lg
              bg-emerald-100
              text-emerald-700
              text-xs
              font-bold
            "
          >
            {submission.grade}
          </div>
        </div>
      )}
    </button>
  );
}
