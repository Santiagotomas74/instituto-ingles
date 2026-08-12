"use client";

import {
  X,
  Calendar,
  CheckCircle2,
  FileText,
  Download,
  MessageSquare,
  Award,
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

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        bg-black/50
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
          w-full
          max-w-3xl
          rounded-3xl
          shadow-2xl
          overflow-hidden
        "
      >
        {/* Header */}

        <div
          className="
            px-8
            py-6
            border-b
            flex
            items-center
            justify-between
          "
        >
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Mi entrega</h2>

            <p className="text-slate-500 mt-1">{task.titulo}</p>
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
              text-black
            "
          >
            <X size={22} />
          </button>
        </div>

        <div className="p-8 space-y-8">
          {/* Estado */}

          <div
            className="
              rounded-2xl
              bg-emerald-50
              border
              border-emerald-200
              p-5
              flex
              items-center
              gap-4
            "
          >
            <CheckCircle2 className="text-emerald-600 shrink-0" size={34} />

            <div>
              <p className="font-semibold text-emerald-800">
                Tarea entregada correctamente
              </p>

              {task.submitted_at && (
                <div className="flex items-center gap-2 mt-1 text-sm text-emerald-700">
                  <Calendar size={15} />
                  {new Date(task.submitted_at).toLocaleString("es-AR")}
                </div>
              )}
            </div>
          </div>

          {/* Nota */}

          <div className="grid md:grid-cols-2 gap-6">
            <div
              className="
                rounded-2xl
                border
                p-6
                bg-slate-50
              "
            >
              <div className="flex items-center gap-2 mb-3">
                <Award className="text-cyan-600" size={22} />

                <h3 className="font-bold text-lg text-gray-800">
                  Calificación
                </h3>
              </div>

              {task.grade !== null ? (
                <>
                  <p className="text-5xl font-black text-cyan-600">
                    {task.grade}
                    <span className="text-2xl text-slate-500">
                      /{task.max_score}
                    </span>
                  </p>

                  <p className="text-slate-500 mt-3">
                    Nota asignada por el profesor.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-xl font-semibold text-amber-600">
                    Pendiente
                  </p>

                  <p className="text-slate-500 mt-2">
                    El profesor todavía no corrigió esta tarea.
                  </p>
                </>
              )}
            </div>

            <div
              className="
                rounded-2xl
                border
                p-6
                bg-slate-50
              "
            >
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare className="text-blue-600" size={22} />

                <h3 className="font-bold text-lg text-gray-800">
                  Observaciones
                </h3>
              </div>

              {task.teacher_feedback ? (
                <p className="whitespace-pre-wrap leading-7 text-slate-700">
                  {task.teacher_feedback}
                </p>
              ) : (
                <p className="text-slate-500">
                  El profesor aún no dejó comentarios.
                </p>
              )}
            </div>
          </div>

          {/* Respuesta */}

          {task.comentario && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <FileText className="text-cyan-600" size={20} />

                <h3 className="font-bold text-lg text-gray-600">
                  Tu respuesta
                </h3>
              </div>

              <div
                className="
                  rounded-2xl
                  border
                  bg-slate-50
                  p-6
                  whitespace-pre-wrap
                  leading-7
                  text-slate-700
                "
              >
                {task.comentario}
              </div>
            </div>
          )}

          {/* Archivo */}

          {task.archivo_url && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Download className="text-cyan-600" size={20} />

                <h3 className="font-bold text-lg">Archivo entregado</h3>
              </div>

              <a
                href={task.archivo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex
                  items-center
                  justify-between
                  rounded-2xl
                  border
                  bg-white
                  p-5
                  hover:bg-slate-50
                  transition
                "
              >
                <div>
                  <p className="font-semibold">{task.archivo_nombre}</p>

                  <p className="text-sm text-slate-500">Abrir archivo</p>
                </div>

                <Download size={22} />
              </a>
            </div>
          )}
        </div>

        <div className="border-t px-8 py-5 flex justify-end">
          <button
            onClick={onClose}
            className="
              h-11
              px-8
              rounded-xl
              bg-cyan-600
              hover:bg-cyan-700
              text-white
              font-semibold
            "
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
