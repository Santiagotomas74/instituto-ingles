"use client";

import {
  CalendarDays,
  Download,
  FileText,
  MessageSquare,
  UserCircle2,
} from "lucide-react";

import { Submission } from "./TaskSubmissionsModal";
import GradeSubmissionForm from "./GradeSubmissionForm";

type Props = {
  submission: Submission | null;
  onUpdated: () => void;
};

export default function SubmissionViewer({ submission, onUpdated }: Props) {
  if (!submission) {
    return (
      <div className="flex-1 flex items-center justify-center text-slate-500">
        Seleccioná una entrega para verla.
      </div>
    );
  }

  const hasSubmission = submission.submitted_at !== null;

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50">
      {/* Header */}

      <div className="sticky top-0 z-10 border-b bg-white p-8">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-100">
            <UserCircle2 className="text-cyan-700" size={34} />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              {submission.nombre} {submission.apellido}
            </h2>

            <p
              className={
                hasSubmission
                  ? "font-medium text-emerald-600"
                  : "text-slate-500"
              }
            >
              {hasSubmission
                ? "Entrega realizada"
                : "Todavía no entregó la tarea"}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-8 p-8">
        {!hasSubmission ? (
          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-10 text-center">
            <h3 className="text-2xl font-bold text-amber-700">
              El alumno todavía no realizó la entrega
            </h3>

            <p className="mt-3 text-amber-600">
              Cuando entregue la tarea aparecerá aquí.
            </p>
          </div>
        ) : (
          <>
            <section className="rounded-3xl border bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <CalendarDays className="text-cyan-600" size={22} />

                <h3 className="text-xl font-bold text-gray-700">
                  Información de la entrega
                </h3>
              </div>

              <p className="font-medium text-slate-700">
                {new Date(submission.submitted_at!).toLocaleString()}
              </p>
            </section>

            <section className="rounded-3xl border bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <MessageSquare className="text-cyan-600" size={22} />

                <h3 className="text-xl font-bold text-gray-600">
                  Respuesta del estudiante
                </h3>
              </div>

              <div className="min-h-[220px] whitespace-pre-wrap rounded-2xl border bg-slate-50 p-6 leading-7 text-slate-700">
                {submission.comentario ||
                  "El estudiante no escribió ningún comentario."}
              </div>
            </section>

            {submission.archivo_url && (
              <section className="rounded-3xl border bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center gap-3">
                  <FileText className="text-cyan-600" size={22} />

                  <h3 className="text-xl font-bold">Archivo entregado</h3>
                </div>

                <div className="flex items-center justify-between rounded-2xl border p-5">
                  <div>
                    <p className="font-semibold">{submission.archivo_nombre}</p>

                    {submission.archivo_size && (
                      <p className="mt-1 text-sm text-slate-500">
                        {(submission.archivo_size / 1024).toFixed(1)} KB
                      </p>
                    )}
                  </div>

                  <a
                    href={submission.archivo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 items-center gap-2 rounded-xl bg-cyan-600 px-5 text-white hover:bg-cyan-700"
                  >
                    <Download size={18} />
                    Descargar
                  </a>
                </div>
              </section>
            )}

            <GradeSubmissionForm
              submissionId={submission.id}
              maxScore={submission.max_score}
              currentGrade={submission.grade}
              currentFeedback={submission.teacher_feedback}
              onSaved={onUpdated}
            />
          </>
        )}
      </div>
    </div>
  );
}
