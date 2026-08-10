"use client";

import { useState } from "react";

import StudentSelector from "./StudentSelector";
import StudentPayments from "./StudentPayments";

export type Student = {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  dni: string;
  nivel: string;
  created_at: string;
  status: "active" | "inactive";
};

export default function Payments() {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  return (
    <div className="max-w-7xl mx-auto space-y-8 ">
      {/* Header */}

      <div>
        <h1 className="text-4xl font-bold text-slate-900 mt-5">
          Comprobantes de pagos
        </h1>

        <p className="text-slate-500 mt-2">
          Administra las cuotas y comprobantes de cada alumno.
        </p>
      </div>

      {/* Buscador */}

      <StudentSelector
        selectedStudent={selectedStudent}
        onSelect={setSelectedStudent}
      />

      {/* Historial */}

      {selectedStudent ? (
        <StudentPayments student={selectedStudent} />
      ) : (
        <div
          className="
            bg-white
            rounded-3xl
            border
            border-dashed
            border-slate-300
            p-20
            text-center
          "
        >
          <h2 className="text-2xl font-bold text-slate-700">
            Seleccioná un alumno
          </h2>

          <p className="text-slate-500 mt-3">
            Buscá un alumno para visualizar su historial de pagos y cargar
            nuevos comprobantes.
          </p>
        </div>
      )}
    </div>
  );
}
