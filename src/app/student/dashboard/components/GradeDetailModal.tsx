"use client";

import {
  CalendarDays,
  Download,
  FileText,
  GraduationCap,
  MessageSquare,
  School,
  UserCircle2,
  X,
  MessageSquareText,
  Award,
} from "lucide-react";

import { Grade } from "./Grades";

type Props = {
  open: boolean;
  grade: Grade | null;
  onClose: () => void;
};

export default function GradeDetailModal({ open, grade, onClose }: Props) {
  if (!open || !grade) return null;

  // Lógica para color dinámico de la nota (igual que en GradeCard)
  const percentage =
    grade.max_score > 0 ? Math.round((grade.grade / grade.max_score) * 100) : 0;

  const getGradeColors = () => {
    if (percentage >= 90)
      return {
        bg: "bg-emerald-50",
        border: "border-emerald-200",
        text: "text-emerald-700",
      };
    if (percentage >= 70)
      return {
        bg: "bg-blue-50",
        border: "border-blue-200",
        text: "text-blue-700",
      };
    if (percentage >= 60)
      return {
        bg: "bg-amber-50",
        border: "border-amber-200",
        text: "text-amber-700",
      };
    return {
      bg: "bg-rose-50",
      border: "border-rose-200",
      text: "text-rose-700",
    };
  };

  const gradeColors = getGradeColors();

  // Formateador seguro de fechas con hora
  const formatDateTime = (dateStr: string | null) => {
    if (!dateStr) return "-";
    try {
      const date = new Date(dateStr);
      return new Intl.DateTimeFormat("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    } catch {
      return dateStr;
    }
  };

  // Formateador inteligente de tamaño de archivo (KB o MB)
  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return "";
    if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    return `${(bytes / 1024).toFixed(1)} KB`;
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        bg-slate-900/40
        backdrop-blur-sm
        flex
        items-center
        justify-center
        p-4
        sm:p-6
        animate-in
        fade-in
        duration-200
      "
      onClick={onClose} // Cierra el modal al hacer clic en el fondo oscuro
    >
      <div
        className="
          bg-white
          rounded-[2rem]
          shadow-2xl
          w-full
          max-w-4xl
          max-h-[92vh]
          flex
          flex-col
          overflow-hidden
          animate-in
          zoom-in-95
          duration-200
        "
        onClick={(e) => e.stopPropagation()} // Evita que se cierre al hacer clic DENTRO del modal
      >
        {/* === HEADER FIJO === */}
        <div className="shrink-0 bg-white border-b border-slate-100 px-6 py-5 sm:px-8 sm:py-6 flex items-center justify-between z-10">
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-14 h-14 shrink-0 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center">
              <UserCircle2 className="text-blue-600 w-8 h-8" />
            </div>

            <div className="min-w-0">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 truncate">
                {grade.titulo}
              </h2>
              <p className="text-sm font-medium text-slate-500 mt-1">
                Detalle de la evaluación
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            title="Cerrar modal"
            className="w-11 h-11 shrink-0 rounded-xl hover:bg-slate-100 active:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors ml-4"
          >
            <X size={24} />
          </button>
        </div>

        {/* === CUERPO SCROLLABLE === */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 sm:space-y-8 bg-slate-50/50">
          {/* SECCIÓN 1: Información Metadata */}
          <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm">
            <h3 className="font-bold text-lg mb-6 text-slate-800">
              Información general
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                  <School className="text-blue-600 w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">
                    Aula
                  </p>
                  <p className="font-medium text-slate-700 truncate">
                    {grade.classroom}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                  <GraduationCap className="text-blue-600 w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">
                    Profesor
                  </p>
                  <p className="font-medium text-slate-700 truncate">
                    {grade.teacher}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                  <CalendarDays className="text-blue-600 w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">
                    Entregada
                  </p>
                  <p className="font-medium text-slate-700">
                    {formatDateTime(grade.submitted_at)}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                  <CalendarDays className="text-blue-600 w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">
                    Corregida
                  </p>
                  <p className="font-medium text-slate-700">
                    {formatDateTime(grade.graded_at)}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {/* SECCIÓN 2: Calificación */}
            <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm flex flex-col items-start justify-center">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-slate-50 rounded-lg text-slate-500">
                  <Award size={20} />
                </div>
                <h3 className="text-lg font-bold text-slate-800">
                  Calificación Final
                </h3>
              </div>

              <div
                className={`
                  inline-flex items-baseline gap-2 rounded-2xl border px-6 py-4 
                  ${gradeColors.bg} ${gradeColors.border}
                `}
              >
                <span
                  className={`text-5xl font-black tracking-tight ${gradeColors.text}`}
                >
                  {grade.grade}
                </span>
                <span
                  className={`text-xl font-medium ${gradeColors.text} opacity-60`}
                >
                  / {grade.max_score}
                </span>
              </div>
            </section>

            {/* SECCIÓN 3: Comentario del Alumno */}
            <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <MessageSquare size={20} />
                </div>
                <h3 className="text-lg font-bold text-slate-800">
                  Tu respuesta
                </h3>
              </div>

              <div className="rounded-2xl bg-slate-50/80 border border-slate-100 p-5 text-slate-600 whitespace-pre-wrap leading-relaxed min-h-[120px] text-sm sm:text-base">
                {grade.comentario || (
                  <span className="text-slate-400 italic">
                    No agregaste ningún comentario en la entrega.
                  </span>
                )}
              </div>
            </section>
          </div>

          {/* SECCIÓN 4: Archivo Entregado (Si existe) */}
          {grade.archivo_url && (
            <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <FileText size={20} />
                </div>
                <h3 className="text-lg font-bold text-slate-800">
                  Archivo entregado
                </h3>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50/50 transition-colors hover:bg-slate-50">
                <div className="flex gap-4 items-center min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-blue-100/50 flex items-center justify-center shrink-0">
                    <FileText className="text-blue-600 w-6 h-6" />
                  </div>
                  <div className="min-w-0">
                    {/* Corrección del typo aplicado aquí */}
                    <p className="font-semibold text-slate-700 truncate">
                      {grade.archivo_nombre}
                    </p>
                    <p className="text-sm font-medium text-slate-400 mt-0.5">
                      {formatFileSize(grade.archivo_size)}
                    </p>
                  </div>
                </div>

                <a
                  href={grade.archivo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto shrink-0 h-11 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-medium flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <Download size={18} />
                  Descargar
                </a>
              </div>
            </section>
          )}

          {/* SECCIÓN 5: Observación del Profesor */}
          <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 bg-amber-100/50 rounded-lg text-amber-600">
                <MessageSquareText size={20} />
              </div>
              <h3 className="text-lg font-bold text-slate-800">
                Observación del profesor
              </h3>
            </div>

            <div className="rounded-2xl bg-amber-50/50 border border-amber-100/50 p-6 text-slate-700 whitespace-pre-wrap leading-relaxed text-sm sm:text-base">
              {grade.teacher_feedback ? (
                <p>&quot;{grade.teacher_feedback}&quot;</p>
              ) : (
                <span className="text-slate-400 italic">
                  El profesor no dejó ninguna observación adicional.
                </span>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
