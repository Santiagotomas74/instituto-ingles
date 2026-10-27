"use client";

import { useTranslation } from "react-i18next";
import Link from "next/link";
import {
  CalendarDays,
  Clock,
  GraduationCap,
  School,
  ArrowRight,
  AlertTriangle,
  FileText,
  Download,
} from "lucide-react";

type Props = {
  task: {
    id: string;
    classroom_id: string;
    titulo: string;
    descripcion: string;
    classroom: string;
    teacher: string;
    due_date: string | null;
    due_time: string | null;
    max_score: number;
    archivo?: string | null;
  };
};

export default function PendingTaskCard({ task }: Props) {
  const { t } = useTranslation();

  const taskUrl = `/student/classroom/${task.classroom_id}?tab=tasks&task=${task.id}`;

  // Formateo seguro de fecha evitando desfases de zona horaria UTC
  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return t("tasks2.pending.no_due_date");

    const cleanDate = dateStr.split("T")[0];
    const [year, month, day] = cleanDate.split("-");

    if (!year || !month || !day) return dateStr;

    return `${day}/${month}/${year}`;
  };

  // Cálculo de estado/urgencia de la entrega
  const getDueDateStatus = () => {
    if (!task.due_date) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [year, month, day] = task.due_date
      .split("T")[0]
      .split("-")
      .map(Number);

    const dueDate = new Date(year, month - 1, day);

    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return {
        label: t("tasks2.pending.status.overdue"),
        color: "bg-rose-50 text-rose-700 border-rose-200",
      };
    }

    if (diffDays === 0) {
      return {
        label: t("tasks2.pending.status.due_today"),
        color: "bg-amber-50 text-amber-800 border-amber-200",
      };
    }

    if (diffDays === 1) {
      return {
        label: t("tasks2.pending.status.due_tomorrow"),
        color: "bg-blue-50 text-blue-700 border-blue-200",
      };
    }

    return null;
  };

  const status = getDueDateStatus();

  return (
    <div className="group bg-white rounded-2xl border border-gray-200/90 p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200 flex flex-col justify-between gap-5">
      {/* SECCIÓN SUPERIOR */}

      <div className="space-y-4">
        {/* Aula y estado de la tarea */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-slate-200">
              <School className="h-4 w-4 text-slate-600" />
            </div>

            <div className="min-w-0">
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Aula
              </span>
              <span className="block max-w-[180px] truncate text-xs font-semibold text-slate-700 sm:text-sm">
                {task.classroom}
              </span>
            </div>
          </div>

          {status && (
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${status.color}`}
            >
              <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
              {status.label}
            </span>
          )}
        </div>

        {/* Título y descripción */}
        <div className="space-y-2">
          <h3 className="text-lg font-bold leading-snug tracking-tight text-slate-900 transition-colors duration-200 group-hover:text-blue-700 sm:text-xl">
            {task.titulo}
          </h3>

          {task.descripcion && (
            <p className="line-clamp-3 whitespace-pre-line text-sm leading-6 text-slate-600">
              {task.descripcion}
            </p>
          )}
        </div>

        {/* Archivo adjunto */}
        {task.archivo && (
          <a
            href={task.archivo}
            target="_blank"
            rel="noopener noreferrer"
            className="group/file flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50/70 p-3 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:shadow-sm"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm ring-1 ring-blue-100 transition-transform duration-200 group-hover/file:scale-105">
              <FileText className="h-5 w-5" />
            </div>

            <div className="min-w-0 flex-1">
              <span className="block text-sm font-semibold text-slate-800">
                Material adjunto
              </span>
              <span className="block text-xs text-slate-500">
                {t("tasks2.pending.download_file")}
              </span>
            </div>

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-blue-600 transition-colors group-hover/file:bg-white">
              <Download className="h-4 w-4" />
            </div>
          </a>
        )}
      </div>

      {/* METADATOS Y ACCIÓN */}
      <div className="space-y-4 pt-3 border-t border-gray-100">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs sm:text-sm text-gray-600">
          {/* Profesor */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <GraduationCap className="w-4 h-4" />
            </div>

            <div className="min-w-0">
              <p className="text-[11px] font-medium text-gray-400">
                {t("tasks2.pending.teacher")}
              </p>

              <p
                className="font-medium text-gray-800 truncate"
                title={task.teacher}
              >
                {task.teacher}
              </p>
            </div>
          </div>

          {/* Fecha límite */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <CalendarDays className="w-4 h-4" />
            </div>

            <div>
              <p className="text-[11px] font-medium text-gray-400">
                {t("tasks2.pending.due_date")}
              </p>

              <p className="font-medium text-gray-800">
                {formatDate(task.due_date)}
              </p>
            </div>
          </div>

          {/* Hora límite */}
          <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </div>

            <div>
              <p className="text-[11px] font-medium text-gray-400">
                {t("tasks2.pending.due_time")}
              </p>

              <p className="font-medium text-gray-800">
                {task.due_time
                  ? task.due_time.slice(0, 5)
                  : t("tasks2.pending.default_due_time")}
              </p>
            </div>
          </div>
        </div>

        {/* BOTÓN DE IR A LA TAREA */}
        <div className="flex justify-end pt-1">
          <Link
            href={taskUrl}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold transition-all shadow-sm shadow-blue-500/10 group-hover:shadow-md"
          >
            {t("tasks2.pending.go_to_task")}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
