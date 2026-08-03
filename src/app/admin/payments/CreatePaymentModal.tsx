"use client";

import { X } from "lucide-react";

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
      bg-black/40
      backdrop-blur-sm
      z-50
      flex
      items-center
      justify-center
    "
    >
      <div
        className="
        bg-white
        rounded-3xl
        w-full
        max-w-2xl
        shadow-2xl
      "
      >
        <div
          className="
          h-20
          border-b
          px-8
          flex
          items-center
          justify-between
        "
        >
          <div>
            <h2 className="text-2xl font-bold text-gray-700">
              Nuevo comprobante
            </h2>

            <p className="text-slate-500">
              {student.nombre} {student.apellido}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-11 h-11 rounded-xl hover:bg-slate-100"
          >
            <X />
          </button>
        </div>

        <div className="p-8">
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
