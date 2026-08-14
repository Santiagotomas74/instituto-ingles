"use client";

import { useEffect, useState } from "react";
import {
  User,
  Calendar,
  Download,
  Users,
  Loader2,
  Inbox,
  FileText,
} from "lucide-react";

type Submission = {
  id: string;
  nombre: string;
  apellido: string;
  comentario: string | null;
  archivo_url: string | null;
  archivo_nombre: string | null;
  submitted_at: string;
};

type Props = {
  taskId: string;
};

export default function PoolSubmissions({ taskId }: Props) {
  const [loading, setLoading] = useState(true);
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  async function loadPool() {
    try {
      const res = await fetch(`/api/student/tasks/${taskId}/submissions`);
      const data = await res.json();

      if (!data.success) return;

      setSubmissions(data.submissions);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPool();
  }, [taskId]);

  const formatDateTime = (dateStr: string) => {
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

  if (loading) {
    return (
      <div className="p-6 sm:p-8 flex items-center justify-center text-slate-500 gap-3">
        <Loader2 size={20} className="animate-spin text-cyan-600" />
        <span className="text-xs sm:text-sm font-medium">
          Cargando entregas de la clase...
        </span>
      </div>
    );
  }

  if (!submissions.length) {
    return (
      <div className="p-6 sm:p-8 text-center text-slate-500 flex flex-col items-center justify-center gap-2">
        <Inbox size={28} className="text-slate-300 stroke-[1.5]" />
        <p className="text-xs sm:text-sm font-medium text-slate-600">
          Todavía ningún estudiante ha entregado esta actividad.
        </p>
        <p className="text-xs text-slate-400">
          Las entregas comunitarias publicadas aparecerán aquí.
        </p>
      </div>
    );
  }

  return (
    <section className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
      {/* Encabezado */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-100 text-cyan-700 flex items-center justify-center shrink-0">
            <Users size={18} />
          </div>
          <h3 className="text-sm sm:text-base md:text-lg font-bold text-slate-800">
            Entregas de la clase
          </h3>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-200/80 text-slate-700">
            {submissions.length}
          </span>
        </div>
      </div>

      {/* Tarjetas de Entregas */}
      <div className="space-y-3 sm:space-y-4">
        {submissions.map((submission) => {
          const initials = `${submission.nombre?.[0] || ""}${
            submission.apellido?.[0] || ""
          }`.toUpperCase();

          return (
            <article
              key={submission.id}
              className="rounded-xl sm:rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-sm hover:border-slate-300 transition-colors space-y-3"
            >
              {/* Encabezado del Usuario */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs sm:text-sm flex items-center justify-center shrink-0">
                    {initials || <User size={18} />}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-slate-800 text-xs sm:text-sm truncate">
                      {submission.nombre} {submission.apellido}
                    </h4>
                    <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-400 mt-0.5">
                      <Calendar size={13} className="shrink-0" />
                      <span>{formatDateTime(submission.submitted_at)} hs</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comentario del alumno */}
              {submission.comentario && (
                <div className="rounded-xl bg-slate-50 border border-slate-100 p-3 sm:p-3.5 text-xs sm:text-sm text-slate-600 whitespace-pre-wrap leading-relaxed">
                  {submission.comentario}
                </div>
              )}

              {/* Archivo Adjunto */}
              {submission.archivo_url && (
                <div className="pt-1">
                  <a
                    href={submission.archivo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5 max-w-full rounded-xl border border-cyan-200 bg-cyan-50/60 hover:bg-cyan-100/80 px-3.5 py-2 text-xs sm:text-sm text-cyan-900 transition-colors font-medium"
                  >
                    <FileText size={16} className="text-cyan-600 shrink-0" />
                    <span className="truncate">
                      {submission.archivo_nombre || "Archivo adjunto"}
                    </span>
                    <Download
                      size={15}
                      className="text-cyan-600 shrink-0 group-hover:translate-y-0.5 transition-transform"
                    />
                  </a>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
