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
    const graded = task.grade !== null;

    const overdue =
      !submitted &&
      task.due_date &&
      new Date(`${task.due_date}T${task.due_time ?? "23:59:00"}`) < new Date();

    if (graded) {
      return {
        label: t("tasks.status.graded"),
        color: "bg-emerald-50 text-emerald-700 border-emerald-200",
      };
    }

    if (submitted) {
      return {
        label: t("tasks.status.submitted"),
        color: "bg-blue-50 text-blue-700 border-blue-200",
      };
    }

    if (overdue) {
      return {
        label: t("tasks.status.overdue"),
        color: "bg-rose-50 text-rose-700 border-rose-200",
      };
    }

    return {
      label: t("tasks.status.pending"),
      color: "bg-amber-50 text-amber-700 border-amber-200",
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

  return (
    <div
      className={`rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden ${
        highlighted ? "ring-2 ring-cyan-500 border-transparent" : ""
      }`}
    >
      <div className="p-4 sm:p-6 md:p-8">
        {/* ENCABEZADO */}

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 leading-snug">
                {task.titulo}
              </h2>

              <span
                className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold border ${status.color}`}
              >
                {status.label}
              </span>
            </div>

            {task.descripcion && (
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {task.descripcion}
              </p>
            )}
          </div>

          {/* BOTONES */}

          <div className="flex items-center gap-2 sm:gap-3 pt-2 md:pt-0 shrink-0">
            {!task.submission_id && task.allow_submission && (
              <button
                onClick={() => setOpenSubmit(true)}
                className="w-full sm:w-auto h-10 sm:h-11 px-5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-medium flex items-center justify-center gap-2 text-sm sm:text-base transition-colors shadow-sm"
              >
                <Upload size={18} />

                {t("tasks.actions.submit")}
              </button>
            )}

            {task.submission_id && (
              <button
                onClick={() => setOpenSubmission(true)}
                className="w-full sm:w-auto h-10 sm:h-11 px-5 rounded-xl border border-cyan-600/40 text-cyan-700 hover:bg-cyan-50 font-medium flex items-center justify-center gap-2 text-sm sm:text-base transition-colors"
              >
                <Eye size={18} />

                {task.grade == null
                  ? t("tasks.actions.view_submission")
                  : t("tasks.actions.view_feedback")}
              </button>
            )}
          </div>
        </div>

        {/* METADATOS */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-6 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-100 text-slate-600 text-xs sm:text-sm">
          {/* FECHA */}

          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-slate-400 shrink-0" />

            <div className="truncate">
              <span className="text-slate-400 block text-[10px] sm:text-xs uppercase font-semibold">
                {t("tasks.metadata.due_date")}
              </span>

              <span className="font-medium">{formatDate(task.due_date)}</span>
            </div>
          </div>

          {/* HORA */}

          <div className="flex items-center gap-2">
            <Clock size={16} className="text-slate-400 shrink-0" />

            <div className="truncate">
              <span className="text-slate-400 block text-[10px] sm:text-xs uppercase font-semibold">
                {t("tasks.metadata.due_time")}
              </span>

              <span className="font-medium">
                {task.due_time ? task.due_time.substring(0, 5) : "-"}
              </span>
            </div>
          </div>

          {/* PUNTAJE */}

          <div className="flex items-center gap-2">
            <FileText size={16} className="text-slate-400 shrink-0" />

            <div className="truncate">
              <span className="text-slate-400 block text-[10px] sm:text-xs uppercase font-semibold">
                {t("tasks.metadata.max_score")}
              </span>

              <span className="font-medium">
                {task.max_score} {t("tasks.metadata.points")}
              </span>
            </div>
          </div>

          {/* MODALIDAD */}

          <div className="flex items-center gap-2">
            {task.submission_type === "pool" ? (
              <Users size={16} className="text-slate-400 shrink-0" />
            ) : (
              <User size={16} className="text-slate-400 shrink-0" />
            )}

            <div className="truncate">
              <span className="text-slate-400 block text-[10px] sm:text-xs uppercase font-semibold">
                {t("tasks.metadata.mode")}
              </span>

              <span className="font-medium capitalize">
                {task.submission_type === "pool"
                  ? t("tasks.submission_type.pool")
                  : t("tasks.submission_type.individual")}
              </span>
            </div>
          </div>
        </div>

        {/* INSTRUCCIONES */}

        {task.instrucciones && (
          <div className="mt-6 rounded-xl sm:rounded-2xl bg-white border border-slate-200 p-4 sm:p-5">
            <h4 className="font-semibold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 mb-2 text-slate-700">
              <ClipboardCheck size={16} className="text-cyan-600" />

              {t("tasks.instructions")}
            </h4>

            <p className="whitespace-pre-wrap text-slate-600 text-xs sm:text-sm leading-relaxed">
              {task.instrucciones}
            </p>
          </div>
        )}

        {/* CALIFICACIÓN */}

        {task.grade !== null && (
          <div className="mt-5 rounded-xl sm:rounded-2xl bg-emerald-50 border border-emerald-200 p-4">
            <div className="flex items-center justify-between text-emerald-800 font-bold text-sm sm:text-base">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={20} className="text-emerald-600" />

                <span>{t("tasks.grade.assigned")}</span>
              </div>

              <span className="text-emerald-900 bg-emerald-100 px-3 py-1 rounded-lg text-sm sm:text-base">
                {task.grade} / {task.max_score}
              </span>
            </div>
          </div>
        )}

        {/* ENTREGA EN REVISIÓN */}

        {task.grade === null && task.submission_id && (
          <div className="mt-5 rounded-xl sm:rounded-2xl bg-blue-50 border border-blue-200 p-4">
            <div className="flex items-center gap-2 text-blue-800 text-xs sm:text-sm">
              <AlertCircle size={18} className="text-blue-600 shrink-0" />

              <span>{t("tasks.submission.in_review")}</span>
            </div>
          </div>
        )}
      </div>

      {/* ENTREGA GRUPAL */}

      {task.submission_type === "pool" && (
        <div className="border-t border-slate-100 bg-slate-50/50">
          <PoolSubmissions taskId={task.id} />
        </div>
      )}

      <SubmitTaskModal
        open={openSubmit}
        onClose={() => setOpenSubmit(false)}
        classroomId={classroomId}
        taskId={task.id}
      />

      <SubmissionDetailModal
        open={openSubmission}
        onClose={() => setOpenSubmission(false)}
        task={task}
      />
    </div>
  );
}
