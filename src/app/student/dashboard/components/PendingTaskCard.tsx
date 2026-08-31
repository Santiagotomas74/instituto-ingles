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
      <div className="space-y-3">
        {/* Badges de Estado y Aula */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold">
            <School className="w-3.5 h-3.5 text-slate-500" />
            {task.classroom}
          </span>

          {status && (
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border ${status.color}`}
            >
              <AlertTriangle className="w-3 h-3" />
              {status.label}
            </span>
          )}
        </div>

        {/* Título y Descripción */}
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            {task.titulo}
          </h3>

          {task.descripcion && (
            <p className="text-xs sm:text-sm text-gray-600 mt-1.5 line-clamp-2 leading-relaxed">
              {task.descripcion}
            </p>
          )}
        </div>
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
