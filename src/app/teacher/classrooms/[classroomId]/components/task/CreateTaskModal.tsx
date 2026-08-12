"use client";

import CreateTaskForm from "./CreateTaskForm";

type Props = {
  open: boolean;
  classroomId: string;
  onClose: () => void;
  onCreated: () => void;
};

export default function CreateTaskModal({
  open,
  classroomId,
  onClose,
  onCreated,
}: Props) {
  if (!open) return null;

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
          max-w-3xl
          max-h-[90vh]
          overflow-y-auto
        "
      >
        {/* Header */}

        <div className="flex items-center justify-between p-7 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-700">Nueva tarea</h2>

            <p className="text-slate-500 mt-1">
              Crear una actividad para esta classroom.
            </p>
          </div>

          <button
            onClick={onClose}
            className="
              w-10
              h-10
              rounded-xl
              text-gray-600
              hover:bg-slate-100
            "
          >
            ✕
          </button>
        </div>

        {/* Formulario */}

        <div className="p-7">
          <CreateTaskForm
            classroomId={classroomId}
            onCreated={() => {
              onCreated();
              onClose();
            }}
          />
        </div>
      </div>
    </div>
  );
}
