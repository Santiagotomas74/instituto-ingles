"use client";

import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  Calendar,
  Clock,
  FileText,
  Upload,
  Users,
  CheckCircle2,
  ClipboardCheck,
  AlertCircle,
  Eye,
  User,
} from "lucide-react";

import SubmitTaskModal from "./SubmitTaskModal";
import PoolSubmissions from "./PoolSubmissions";
import SubmissionDetailModal from "./SubmissionDetailModal";

type Props = {
  classroomId: string;
  task: any;
  highlighted: boolean;
};

export default function TaskCard({ classroomId, task, highlighted }: Props) {
  const { t } = useTranslation();

  const [openSubmit, setOpenSubmit] = useState(false);
  const [openSubmission, setOpenSubmission] = useState(false);

  const status = useMemo(() => {
    const submitted = !!task.submission_id;
    const graded = task.grade !== null && task.grade !== undefined;

    const overdue =
      !submitted &&
      task.due_date &&
      new Date(`${task.due_date}T${task.due_time ?? "23:59:00"}`) < new Date();

    if (graded) {
      return {
        label: t("tasks.status.graded"),
        color: "bg-emerald-50 text-emerald-700 border-emerald-200",
        accent: "bg-emerald-500",
      };
    }

    if (submitted) {
      return {
        label: t("tasks.status.submitted"),
        color: "bg-blue-50 text-blue-700 border-blue-200",
        accent: "bg-blue-500",
      };
    }

    if (overdue) {
      return {
        label: t("tasks.status.overdue"),
        color: "bg-rose-50 text-rose-700 border-rose-200",
        accent: "bg-rose-500",
      };
    }

    return {
      label: t("tasks.status.pending"),
      color: "bg-amber-50 text-amber-700 border-amber-200",
      accent: "bg-cyan-500",
    };
  }, [task, t]);

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "-";

    const date = new Date(dateStr);

    return date.toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "UTC",
    });
  };

  const isGraded = task.grade !== null && task.grade !== undefined;

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
        highlighted
          ? "border-cyan-400 shadow-lg shadow-cyan-100/60 ring-2 ring-cyan-500/20"
          : "border-slate-200/80 shadow-sm hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50"
      }`}
    >
      {/* LÍNEA SUPERIOR DE ESTADO */}
      <div className={`h-1 w-full ${status.accent}`} />

      <div className="p-4 sm:p-6 md:p-7">
        {/* ENCABEZADO */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 flex-1 space-y-4">
            {/* ETIQUETAS */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-700 ring-1 ring-inset ring-cyan-100">
                <ClipboardCheck size={13} />
                {t("tasks.instructions") === "tasks.instructions"
                  ? "Actividad"
                  : "Actividad"}
              </span>

              <span
                className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${status.color}`}
              >
                {status.label}
              </span>
            </div>

            {/* TÍTULO Y DESCRIPCIÓN */}
            <div className="space-y-2">
              <h2 className="break-words text-xl font-bold leading-tight tracking-tight text-slate-900 sm:text-2xl">
                {task.titulo}
              </h2>

              {task.descripcion && (
                <p className="whitespace-pre-line text-sm leading-6 text-slate-600 sm:text-base">
                  {task.descripcion}
                </p>
              )}
            </div>

            {/* MATERIAL ADJUNTO DEL DOCENTE */}
            {task.archivo && (
              <a
                href={task.archivo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abrir material adjunto de la tarea"
                className="group/attachment flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/80 p-3 transition-all duration-200 hover:border-cyan-300 hover:bg-cyan-50/70 sm:gap-4 sm:p-4"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-cyan-700 shadow-sm ring-1 ring-slate-200/80 transition-colors group-hover/attachment:text-cyan-600 sm:h-12 sm:w-12">
                  <FileText size={22} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-slate-500">
                    Material de la tarea
                  </p>

                  <p className="mt-0.5 text-sm font-bold text-slate-800">
                    Archivo adjunto del docente
                  </p>

                  <p className="mt-0.5 text-xs text-slate-500">
                    Ver o descargar material
                  </p>
                </div>

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 transition-all group-hover/attachment:bg-cyan-600 group-hover/attachment:text-white">
                  <Eye size={17} />
                </div>
              </a>
            )}
          </div>

          {/* BOTONES DE ACCIÓN */}
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row lg:flex-col">
            {!task.submission_id && task.allow_submission && (
              <button
                type="button"
                onClick={() => setOpenSubmit(true)}
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-cyan-600/20 transition-all hover:bg-cyan-700 hover:shadow-md active:scale-[0.98] sm:w-auto"
              >
                <Upload size={17} />
                {t("tasks.actions.submit")}
              </button>
            )}

            {task.submission_id && (
              <button
                type="button"
                onClick={() => setOpenSubmission(true)}
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-700 sm:w-auto"
              >
                <Eye size={17} />

                {task.grade == null
                  ? t("tasks.actions.view_submission")
                  : t("tasks.actions.view_feedback")}
              </button>
            )}
          </div>
        </div>

        {/* SEPARADOR */}
        <div className="my-6 border-t border-slate-100" />

        {/* METADATOS */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {/* FECHA */}
          <div className="flex min-w-0 items-start gap-3 rounded-xl border border-slate-200/80 bg-slate-50/70 p-3.5 transition-colors hover:bg-slate-50">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-cyan-700 shadow-sm ring-1 ring-slate-200/70">
              <Calendar size={17} />
            </div>

            <div className="min-w-0">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {t("tasks.metadata.due_date")}
              </span>

              <span className="mt-1 block break-words text-sm font-semibold text-slate-800">
                {formatDate(task.due_date)}
              </span>
            </div>
          </div>

          {/* HORA */}
          <div className="flex min-w-0 items-start gap-3 rounded-xl border border-slate-200/80 bg-slate-50/70 p-3.5 transition-colors hover:bg-slate-50">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-cyan-700 shadow-sm ring-1 ring-slate-200/70">
              <Clock size={17} />
            </div>

            <div className="min-w-0">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {t("tasks.metadata.due_time")}
              </span>

              <span className="mt-1 block text-sm font-semibold text-slate-800">
                {task.due_time ? task.due_time.substring(0, 5) : "-"}
              </span>
            </div>
          </div>

          {/* PUNTAJE */}
          <div className="flex min-w-0 items-start gap-3 rounded-xl border border-slate-200/80 bg-slate-50/70 p-3.5 transition-colors hover:bg-slate-50">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-cyan-700 shadow-sm ring-1 ring-slate-200/70">
              <FileText size={17} />
            </div>

            <div className="min-w-0">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {t("tasks.metadata.max_score")}
              </span>

              <span className="mt-1 block text-sm font-semibold text-slate-800">
                {task.max_score} {t("tasks.metadata.points")}
              </span>
            </div>
          </div>

          {/* MODALIDAD */}
          <div className="flex min-w-0 items-start gap-3 rounded-xl border border-slate-200/80 bg-slate-50/70 p-3.5 transition-colors hover:bg-slate-50">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-cyan-700 shadow-sm ring-1 ring-slate-200/70">
              {task.submission_type === "pool" ? (
                <Users size={17} />
              ) : (
                <User size={17} />
              )}
            </div>

            <div className="min-w-0">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {t("tasks.metadata.mode")}
              </span>

              <span className="mt-1 block break-words text-sm font-semibold text-slate-800">
                {task.submission_type === "pool"
                  ? t("tasks.submission_type.pool")
                  : t("tasks.submission_type.individual")}
              </span>
            </div>
          </div>
        </div>

        {/* INSTRUCCIONES */}
        {task.instrucciones && (
          <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
            <h4 className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-800">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-50 text-cyan-700">
                <ClipboardCheck size={17} />
              </div>

              {t("tasks.instructions")}
            </h4>

            <p className="whitespace-pre-wrap break-words text-sm leading-6 text-slate-600">
              {task.instrucciones}
            </p>
          </div>
        )}

        {/* CALIFICACIÓN */}
        {isGraded && (
          <div className="mt-5 overflow-hidden rounded-2xl border border-emerald-200 bg-emerald-50/70">
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm ring-1 ring-emerald-100">
                  <CheckCircle2 size={22} />
                </div>

                <div>
                  <p className="text-sm font-bold text-emerald-900">
                    {t("tasks.grade.assigned")}
                  </p>

                  <p className="mt-0.5 text-xs text-emerald-700">
                    {t("tasks.actions.view_feedback")}
                  </p>
                </div>
              </div>

              <span className="rounded-xl border border-emerald-200 bg-white px-4 py-2 text-lg font-bold tabular-nums text-emerald-800">
                {task.grade}{" "}
                <span className="text-sm font-medium text-emerald-500">
                  / {task.max_score}
                </span>
              </span>
            </div>
          </div>
        )}

        {/* ENTREGA EN REVISIÓN */}
        {!isGraded && task.submission_id && (
          <div className="mt-5 flex items-center gap-3 rounded-xl border border-blue-200 bg-blue-50/70 p-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm ring-1 ring-blue-100">
              <AlertCircle size={19} />
            </div>

            <div>
              <p className="text-sm font-semibold text-blue-900">
                {t("tasks.submission.in_review")}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ENTREGA GRUPAL */}
      {task.submission_type === "pool" && (
        <div className="border-t border-slate-200 bg-slate-50/70">
          <PoolSubmissions taskId={task.id} />
        </div>
      )}

      {/* MODAL DE ENTREGA */}
      <SubmitTaskModal
        open={openSubmit}
        onClose={() => setOpenSubmit(false)}
        classroomId={classroomId}
        taskId={task.id}
      />

      {/* MODAL DE ENTREGA / DEVOLUCIÓN */}
      <SubmissionDetailModal
        open={openSubmission}
        onClose={() => setOpenSubmission(false)}
        task={task}
      />
    </div>
  );
}
