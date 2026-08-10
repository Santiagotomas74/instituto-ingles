"use client";

import {
  CalendarDays,
  Download,
  FileText,
  GraduationCap,
  MessageSquare,
  School,
  Star,
  UserCircle2,
  X,
} from "lucide-react";

import { Grade } from "./Grades";

type Props = {
  open: boolean;
  grade: Grade | null;
  onClose: () => void;
};

export default function GradeDetailModal({ open, grade, onClose }: Props) {
  if (!open || !grade) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        bg-black/40
        backdrop-blur-sm
        flex
        items-center
        justify-center
        p-6
      "
    >
      <div
        className="
          bg-white
          rounded-3xl
          shadow-2xl
          w-full
          max-w-5xl
          max-h-[92vh]
          overflow-y-auto
        "
      >
        {/* Header */}

        <div
          className="
            sticky
            top-0
            bg-white
            border-b
            px-8
            py-6
            flex
            items-center
            justify-between
            z-10
          "
        >
          <div className="flex items-center gap-4">
            <div
              className="
                w-14
                h-14
                rounded-full
                bg-cyan-100
                flex
                items-center
                justify-center
              "
            >
              <UserCircle2 className="text-cyan-700" size={34} />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-slate-600">
                {grade.titulo}
              </h2>

              <p className="text-slate-500">Detalle de la evaluación</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="
              w-11
              h-11
              rounded-xl
              hover:bg-slate-100
              flex
              items-center
              justify-center
              text-slate-600
            "
          >
            <X />
          </button>
        </div>

        {/* Body */}

        <div className="p-8 space-y-8 bg-slate-50">
          {/* Información */}

          <section className="bg-white rounded-3xl border p-6">
            <h3 className="font-bold text-xl mb-6 text-slate-600">
              Información
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-3">
                <School className="text-cyan-600" />

                <div>
                  <p className="text-xs text-slate-500">Aula</p>

                  <p className="font-semibold text-slate-600">
                    {grade.classroom}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <GraduationCap className="text-cyan-600" />

                <div>
                  <p className="text-xs text-slate-500">Profesor</p>

                  <p className="font-semibold text-slate-600">
                    {grade.teacher}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <CalendarDays className="text-cyan-600" />

                <div>
                  <p className="text-xs text-slate-500">Entregada</p>

                  <p className="font-semibold text-slate-600">
                    {grade.submitted_at
                      ? new Date(grade.submitted_at).toLocaleString()
                      : "-"}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <CalendarDays className="text-cyan-600" />

                <div>
                  <p className="text-xs text-slate-500">Corregida</p>

                  <p className="font-semibold text-slate-600">
                    {grade.graded_at
                      ? new Date(grade.graded_at).toLocaleString()
                      : "-"}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Nota */}

          <section className="bg-white rounded-3xl border p-6">
            <div className="flex items-center gap-3 mb-5">
              <Star className="text-amber-500" size={24} />

              <h3 className="text-xl font-bold text-slate-600">Calificación</h3>
            </div>

            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-2xl
                bg-cyan-50
                border
                border-cyan-200
                px-6
                py-4
              "
            >
              <span className="text-4xl font-bold text-cyan-700">
                {grade.grade}
              </span>

              <span className="text-xl text-slate-500">
                / {grade.max_score}
              </span>
            </div>
          </section>

          {/* Comentario del alumno */}

          <section className="bg-white rounded-3xl border p-6">
            <div className="flex items-center gap-3 mb-5">
              <MessageSquare className="text-cyan-600" size={22} />

              <h3 className="text-xl font-bold text-slate-600">Tu respuesta</h3>
            </div>

            <div
              className="
                rounded-2xl
                border
                bg-slate-50
                p-6
                whitespace-pre-wrap
                leading-7
                min-h-[180px]
                text-slate-600
                
              "
            >
              {grade.comentario || "No agregaste ningún comentario."}
            </div>
          </section>

          {/* Archivo */}

          {grade.archivo_url && (
            <section className="bg-white rounded-3xl border p-6">
              <div className="flex items-center gap-3 mb-5">
                <FileText className="text-cyan-600" size={22} />

                <h3 className="text-xl font-bold text-slate-600">
                  Archivo entregado
                </h3>
              </div>

              <div
                className="
                  rounded-2xl
                  border
                  p-5
                  flex
                  items-center
                  justify-between
                "
              >
                <div>
                  <p className="font-semiboldtext-slate-600">
                    {grade.archivo_nombre}
                  </p>

                  <p className="text-sm text-slate-500 mt-1">
                    {(grade.archivo_size ?? 0) > 0 &&
                      `${(grade.archivo_size! / 1024).toFixed(1)} KB`}
                  </p>
                </div>

                <a
                  href={grade.archivo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    h-11
                    px-5
                    rounded-xl
                    bg-cyan-600
                    hover:bg-cyan-700
                    text-white
                    flex
                    items-center
                    gap-2
                  "
                >
                  <Download size={18} />
                  Descargar
                </a>
              </div>
            </section>
          )}

          {/* Observación */}

          <section className="bg-white rounded-3xl border p-6">
            <div className="flex items-center gap-3 mb-5">
              <Star className="text-amber-500" size={22} />

              <h3 className="text-xl font-bold text-gray-700">
                Observación del profesor
              </h3>
            </div>

            <div
              className="
                rounded-2xl
                bg-amber-50
                border
                border-amber-200
                p-6
                whitespace-pre-wrap
                leading-7
                text-slate-600
              "
            >
              {grade.teacher_feedback ||
                "El profesor no dejó ninguna observación."}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
