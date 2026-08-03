"use client";

import { useMemo, useState } from "react";

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
  const [openSubmit, setOpenSubmit] = useState(false);

  const [openSubmission, setOpenSubmission] = useState(false);

  const status = useMemo(() => {
    const submitted = !!task.submission_id;

    const graded = task.grade !== null;

    const overdue =
      !submitted &&
      task.due_date &&
      new Date(`${task.due_date} ${task.due_time ?? "23:59"}`) < new Date();

    if (graded)
      return {
        label: "Calificada",
        color: "bg-emerald-100 text-emerald-700",
      };

    if (submitted)
      return {
        label: "Entregada",
        color: "bg-blue-100 text-blue-700",
      };

    if (overdue)
      return {
        label: "Vencida",
        color: "bg-red-100 text-red-700",
      };

    return {
      label: "Pendiente",
      color: "bg-amber-100 text-amber-700",
    };
  }, [task]);

  return (
    <div
      className={`rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden ${highlighted ? "ring-2 ring-blue-500" : ""}`}
    >
      <div className="p-8">
        <div className="flex justify-between items-start gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-gray-700">
                {task.titulo}
              </h2>

              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${status.color}`}
              >
                {status.label}
              </span>
            </div>

            <p className="mt-3 text-slate-600 text-gray-700">
              {task.descripcion}
            </p>
          </div>

          <div className="flex gap-3 ">
            {!task.submission_id && task.allow_submission && (
              <button
                onClick={() => setOpenSubmit(true)}
                className="h-11 px-5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white flex items-center gap-2"
              >
                <Upload size={18} />
                Entregar
              </button>
            )}

            {task.submission_id && (
              <button
                onClick={() => setOpenSubmission(true)}
                className="h-11 px-5 rounded-xl border border-cyan-600 text-cyan-700 hover:bg-cyan-50 flex items-center gap-2"
              >
                <Eye size={18} />

                {task.grade == null ? "Ver mi entrega" : "Ver devolución"}
              </button>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-8 text-sm">
          <div className="flex items-center gap-2 text-gray-700">
            <Calendar size={17} />
            {task.due_date
              ? new Date(task.due_date).toLocaleDateString("es-AR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
              : "-"}
          </div>

          <div className="flex items-center gap-2 text-gray-700">
            <Clock size={17} />
            {task.due_time ? task.due_time.substring(0, 5) : "-"}
          </div>

          <div className="flex items-center gap-2 text-gray-700">
            <FileText size={17} />
            {task.max_score} puntos
          </div>

          <div className="flex items-center gap-2 text-gray-700">
            <Users size={17} />
            {task.submission_type}
          </div>
        </div>

        {task.instrucciones && (
          <div className="mt-8 rounded-2xl bg-slate-50 border p-5">
            <h4 className="font-semibold flex items-center gap-2 mb-3 text-gray-700">
              <ClipboardCheck size={18} />
              Instrucciones
            </h4>

            <p className="whitespace-pre-wrap text-slate-600">
              {task.instrucciones}
            </p>
          </div>
        )}

        {task.grade !== null && (
          <div className="mt-6 rounded-2xl bg-emerald-50 border border-emerald-200 p-5">
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-gray-700">
              <CheckCircle2 size={18} />
              Nota: {task.grade} / {task.max_score}
            </div>
          </div>
        )}

        {task.grade === null && task.submission_id && (
          <div className="mt-6 rounded-2xl bg-blue-50 border border-blue-200 p-5">
            <div className="flex items-center gap-2 text-blue-700 text-gray-700">
              <AlertCircle size={18} />
              Tu entrega fue enviada correctamente y está esperando ser
              corregida.
            </div>
          </div>
        )}
      </div>

      {task.submission_type === "pool" && (
        <div className="border-t">
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
