"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
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
  const [mounted, setMounted] = useState(false);

  // Aseguramos que el portal solo se renderice en el cliente
  useEffect(() => {
    setMounted(true);

    // Opcional: Bloquear el scroll del fondo cuando el modal está abierto
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  if (!open || !mounted) return null;

  const modalContent = (
    <div
      className="
        fixed
        inset-0
        z-[9999] /* Z-index muy alto para asegurar superposición */
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

  // Renderizamos el contenido directamente en el body usando createPortal
  return createPortal(modalContent, document.body);
}
