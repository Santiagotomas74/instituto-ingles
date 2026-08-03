"use client";

import SubmissionRow from "./SubmissionRow";
import { Submission } from "./TaskSubmissionsModal";

type Props = {
  loading: boolean;
  submissions: Submission[];
  selected: Submission | null;
  onSelect: (submission: Submission) => void;
};

export default function SubmissionList({
  loading,
  submissions,
  selected,
  onSelect,
}: Props) {
  return (
    <div
      className="
        w-[360px]
        border-r
        bg-slate-50
        flex
        flex-col
      "
    >
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold">Entregas</h2>

        <p className="text-sm text-slate-500 mt-1">
          {submissions.length} entregas
        </p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="p-8 text-center text-slate-500">Cargando...</div>
        ) : submissions.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            Nadie entregó esta tarea todavía.
          </div>
        ) : (
          submissions.map((submission) => (
            <SubmissionRow
              key={submission.id}
              submission={submission}
              active={selected?.id === submission.id}
              onClick={() => onSelect(submission)}
            />
          ))
        )}
      </div>
    </div>
  );
}
