"use client";

import {
  CalendarDays,
  Download,
  FileText,
  MessageSquare,
  UserCircle2,
  Image as ImageIcon,
  ExternalLink,
} from "lucide-react";

import { Submission } from "./TaskSubmissionsModal";
import GradeSubmissionForm from "./GradeSubmissionForm";

type Props = {
  submission: Submission | null;
  onUpdated: () => void;
};

export default function SubmissionViewer({ submission, onUpdated }: Props) {
  const maxScore = 100;

  if (!submission) {
    return (
      <div className="flex-1 flex items-center justify-center text-slate-500">
        Seleccioná una entrega para verla.
      </div>
    );
  }

  const hasSubmission = submission.submitted_at !== null;

  /*
   * Detectar extensión del archivo
   */
  const fileName = submission.archivo_nombre || "";
  const fileUrl = submission.archivo_url || "";

  const extension = fileName.split(".").pop()?.toLowerCase();

  const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp", "bmp", "svg"];

  const isImage = extension ? imageExtensions.includes(extension) : false;

  const isPdf = extension === "pdf";

  /*
   * Formatear tamaño
   */
  function formatFileSize(size: number | null) {
    if (!size) return null;

    if (size < 1024) {
      return `${size} B`;
    }

    if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(1)} KB`;
    }

    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  }

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
            {/* Información de la entrega */}

            <section className="rounded-3xl border bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <CalendarDays className="text-cyan-600" size={22} />

                <h3 className="text-xl font-bold text-gray-700">
                  Información de la entrega
                </h3>
              </div>

              <p className="font-medium text-slate-700">
                {new Date(submission.submitted_at!).toLocaleString("es-AR")}
              </p>
            </section>

            {/* Respuesta */}

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

            {/* ARCHIVO */}

            {submission.archivo_url && (
              <section className="rounded-3xl border bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center gap-3">
                  {isImage ? (
                    <ImageIcon className="text-cyan-600" size={22} />
                  ) : (
                    <FileText className="text-cyan-600" size={22} />
                  )}

                  <div>
                    <h3 className="text-xl font-bold text-slate-800">
                      Archivo entregado
                    </h3>

                    <p className="text-sm text-slate-500">
                      {fileName || "Archivo adjunto"}
                    </p>
                  </div>
                </div>

                {/* =========================
                    IMAGEN
                   ========================= */}

                {isImage && (
                  <div className="overflow-hidden rounded-2xl border bg-slate-100">
                    <div className="flex min-h-[300px] items-center justify-center p-4">
                      <img
                        src={fileUrl}
                        alt={fileName || "Archivo entregado por el estudiante"}
                        className="max-h-[700px] max-w-full rounded-xl object-contain shadow-sm"
                      />
                    </div>
                  </div>
                )}

                {/* =========================
                    PDF
                   ========================= */}

                {isPdf && (
                  <div className="overflow-hidden rounded-2xl border bg-slate-100">
                    <iframe
                      src={fileUrl}
                      title={fileName || "PDF entregado por el estudiante"}
                      className="h-[700px] w-full"
                    />
                  </div>
                )}

                {/* =========================
                    INFORMACIÓN + ACCIONES
                   ========================= */}

                <div className="mt-5 flex flex-col gap-4 rounded-2xl border bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-slate-800">
                      {fileName || "Archivo entregado"}
                    </p>

                    <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                      {extension && (
                        <span className="uppercase">{extension}</span>
                      )}

                      {submission.archivo_size && (
                        <>
                          <span>•</span>

                          <span>{formatFileSize(submission.archivo_size)}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex shrink-0 gap-2">
                    <a
                      href={fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 font-medium text-slate-700 transition hover:bg-slate-100"
                    >
                      <ExternalLink size={17} />
                      Abrir
                    </a>

                    <a
                      href={fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      download={fileName || undefined}
                      className="flex h-11 items-center justify-center gap-2 rounded-xl bg-cyan-600 px-5 font-medium text-white transition hover:bg-cyan-700"
                    >
                      <Download size={18} />
                      Descargar
                    </a>
                  </div>
                </div>
              </section>
            )}

            {/* Calificación */}

            <GradeSubmissionForm
              submissionId={submission.id}
              maxScore={maxScore}
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
