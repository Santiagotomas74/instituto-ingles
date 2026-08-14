"use client";

import {
  X,
  Calendar,
  CheckCircle2,
  FileText,
  Download,
  MessageSquare,
  Award,
  Clock,
} from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  task: {
    titulo: string;
    comentario: string | null;
    archivo_url: string | null;
    archivo_nombre: string | null;
    submitted_at: string | null;
    grade: number | null;
    teacher_feedback: string | null;
    max_score: number;
  };
};

export default function SubmissionDetailModal({ open, onClose, task }: Props) {
  if (!open) return null;

  const formatDateTime = (dateStr: string | null) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col my-auto border border-slate-100">
        {/* Encabezado Fijo */}
        <div className="px-5 sm:px-8 py-4 sm:py-5 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div className="min-w-0 pr-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800">
              Mi entrega
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 truncate mt-0.5">
              {task.titulo}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors shrink-0"
            aria-label="Cerrar ventana"
          >
            <X size={20} />
          </button>
        </div>

        {/* Creador de Contenido / Cuerpo desplazable */}
        <div className="p-5 sm:p-8 space-y-5 sm:space-y-6 overflow-y-auto">
          {/* Banner de Estado de Entrega */}
          <div className="rounded-xl sm:rounded-2xl bg-emerald-50/80 border border-emerald-200/80 p-4 sm:p-5 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <CheckCircle2 size={22} />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-emerald-900 text-xs sm:text-sm">
                Entrega registrada con éxito
              </p>
              {task.submitted_at && (
                <div className="flex items-center gap-1.5 mt-0.5 text-[11px] sm:text-xs text-emerald-700">
                  <Calendar size={13} className="shrink-0" />
                  <span>
                    Entregado el {formatDateTime(task.submitted_at)} hs
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Grilla de Nota y Feedback Docente */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Tarjeta de Calificación */}
            <div className="rounded-xl sm:rounded-2xl border border-slate-200/80 p-4 sm:p-5 bg-slate-50/50 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2 text-slate-700">
                  <Award className="text-cyan-600 shrink-0" size={18} />
                  <h3 className="font-semibold text-xs sm:text-sm uppercase tracking-wider">
                    Calificación
                  </h3>
                </div>

                {task.grade !== null ? (
                  <div className="mt-2">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-black text-cyan-600">
                        {task.grade}
                      </span>
                      <span className="text-base sm:text-lg font-bold text-slate-400">
                        / {task.max_score}
                      </span>
                    </div>
                    <p className="text-slate-500 text-xs mt-1">
                      Nota evaluada por el profesor.
                    </p>
                  </div>
                ) : (
                  <div className="mt-2">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-100/70 text-amber-800 text-xs font-semibold">
                      <Clock size={14} />
                      <span>Pendiente de corrección</span>
                    </div>
                    <p className="text-slate-500 text-xs mt-2">
                      El docente aún no ha asignado puntaje a esta entrega.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Tarjeta de Observaciones Docentes */}
            <div className="rounded-xl sm:rounded-2xl border border-slate-200/80 p-4 sm:p-5 bg-slate-50/50">
              <div className="flex items-center gap-2 mb-2 text-slate-700">
                <MessageSquare className="text-cyan-600 shrink-0" size={18} />
                <h3 className="font-semibold text-xs sm:text-sm uppercase tracking-wider">
                  Devolución
                </h3>
              </div>

              {task.teacher_feedback ? (
                <p className="whitespace-pre-wrap leading-relaxed text-xs sm:text-sm text-slate-700 mt-2">
                  {task.teacher_feedback}
                </p>
              ) : (
                <p className="text-slate-400 text-xs sm:text-sm italic mt-2">
                  Sin comentarios del profesor por el momento.
                </p>
              )}
            </div>
          </div>

          {/* Sección de Respuesta del Alumno */}
          {task.comentario && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-700">
                <FileText className="text-cyan-600 shrink-0" size={18} />
                <h3 className="font-semibold text-xs sm:text-sm uppercase tracking-wider">
                  Tu respuesta o comentario
                </h3>
              </div>
              <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 whitespace-pre-wrap leading-relaxed text-xs sm:text-sm text-slate-700">
                {task.comentario}
              </div>
            </div>
          )}

          {/* Sección de Archivo Adjunto */}
          {task.archivo_url && (
            <div className="space-y-2">
              <h3 className="font-semibold text-xs sm:text-sm uppercase tracking-wider text-slate-700">
                Archivo adjunto
              </h3>

              <a
                href={task.archivo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-xl sm:rounded-2xl border border-cyan-200 bg-cyan-50/50 hover:bg-cyan-100/70 p-3.5 sm:p-4 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0 pr-3">
                  <div className="w-9 h-9 rounded-lg bg-cyan-100 text-cyan-700 flex items-center justify-center shrink-0">
                    <FileText size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-xs sm:text-sm text-cyan-950 truncate">
                      {task.archivo_nombre || "Documento adjunto"}
                    </p>
                    <p className="text-[11px] sm:text-xs text-cyan-700">
                      Haz clic para abrir o descargar
                    </p>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-lg bg-white/80 group-hover:bg-white text-cyan-700 flex items-center justify-center shrink-0 shadow-sm transition-colors">
                  <Download size={16} />
                </div>
              </a>
            </div>
          )}
        </div>

        {/* Pie de Modal / Footer */}
        <div className="border-t border-slate-100 px-5 sm:px-8 py-4 flex justify-end bg-slate-50/50 shrink-0">
          <button
            onClick={onClose}
            className="w-full sm:w-auto h-10 sm:h-11 px-6 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-medium text-xs sm:text-sm transition-colors shadow-sm"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
