"use client";

import { X } from "lucide-react";
import SubmitTaskForm from "./SubmitTaskForm";

type Props = {
  open: boolean;
  onClose: () => void;
  classroomId: string;
  taskId: string;
};

export default function SubmitTaskModal({
  open,
  onClose,
  classroomId,
  taskId,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col my-auto border border-slate-100">
        {/* Encabezado Fijo */}
        <div className="px-5 sm:px-8 py-4 sm:py-5 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div className="min-w-0 pr-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800">
              Entregar tarea
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 truncate mt-0.5">
              Adjunta tu respuesta o archivo correspondiente
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

        {/* Cuerpo del Modal con scroll interno */}
        <div className="p-5 sm:p-8 overflow-y-auto">
          <SubmitTaskForm
            classroomId={classroomId}
            taskId={taskId}
            onSuccess={onClose}
          />
        </div>
      </div>
    </div>
  );
}
