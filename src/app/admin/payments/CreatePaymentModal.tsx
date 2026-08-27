"use client";

import { X, Receipt } from "lucide-react";

import { Student } from "./Payments";
import CreatePaymentForm from "./CreatePaymentForm";

type Props = {
  open: boolean;
  onClose: () => void;
  student: Student;
  onCreated: () => void;
};

export default function CreatePaymentModal({
  open,
  onClose,
  student,
  onCreated,
}: Props) {
  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        bg-slate-900/60
        backdrop-blur-xs
        z-50
        flex
        items-center
        justify-center
        p-4
        overflow-y-auto
        animate-in
        fade-in
        duration-200
      "
      onClick={onClose}
    >
      <div
        className="
          bg-white
          rounded-3xl
          w-full
          max-w-2xl
          shadow-2xl
          border
          border-slate-100
          overflow-hidden
          relative
          my-auto
          animate-in
          zoom-in-95
          duration-200
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* ENCABEZADO */}
        <div className="px-6 sm:px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600 shrink-0">
              <Receipt size={20} />
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Emitir factura / cuota
              </h2>

              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                Alumno:{" "}
                <span className="text-slate-800 font-semibold">
                  {student.nombre} {student.apellido}
                </span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              w-9
              h-9
              sm:w-10
              sm:h-10
              rounded-xl
              hover:bg-slate-200/60
              text-slate-400
              hover:text-slate-700
              flex
              items-center
              justify-center
              transition-colors
              shrink-0
            "
            aria-label="Cerrar modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* CUERPO DEL FORMULARIO */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          <CreatePaymentForm
            student={student}
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
