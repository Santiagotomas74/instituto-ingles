"use client";

import { useState } from "react";
import { Receipt, Search, CreditCard, UserCheck, Sparkles } from "lucide-react";

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
      {/* HEADER DE LA SECCIÓN */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center p-2 bg-blue-100 text-blue-600 rounded-xl shadow-xs">
              <Receipt className="w-5 h-5 sm:w-6 sm:h-6" />
            </span>
            <span className="text-xs sm:text-sm font-semibold tracking-wide text-blue-600 uppercase">
              Gestión Financiera
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
            Comprobantes de pagos
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-slate-500 mt-1">
            Administrá las cuotas, estados de cuenta y comprobantes de cada
            alumno.
          </p>
        </div>
      </div>

      {/* CONTENEDOR BUSCADOR */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-sm p-4 sm:p-6 transition-all hover:shadow-md">
        <StudentSelector
          selectedStudent={selectedStudent}
          onSelect={setSelectedStudent}
        />
      </div>

      {/* CONTENIDO HISTORIAL / ESTADO VACÍO */}
      {selectedStudent ? (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <StudentPayments student={selectedStudent} />
        </div>
      ) : (
        <div
          className="
            relative
            overflow-hidden
            bg-gradient-to-b from-white to-slate-50/50
            rounded-2xl
            sm:rounded-3xl
            border
            border-dashed
            border-slate-300
            p-6
            sm:p-12
            lg:p-16
            text-center
            shadow-xs
          "
        >
          {/* Luces decorativas de fondo */}
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-blue-50/60 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-indigo-50/60 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-md mx-auto flex flex-col items-center">
            {/* Ícono de búsqueda destacado */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-4 sm:mb-5 shadow-sm">
              <Search className="w-8 h-8 sm:w-10 sm:h-10 animate-pulse" />
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
              Seleccioná un alumno
            </h2>

            <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
              Buscá un alumno en el buscador superior para visualizar su
              historial completo de cuotas y cargar nuevos comprobantes.
            </p>

            {/* Tarjetas de características / accesos directos visuales */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 sm:mt-8 w-full text-left">
              <div className="p-3 sm:p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-600 shrink-0">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-800">
                    Historial de pagos
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Revisá cuotas e importes
                  </p>
                </div>
              </div>

              <div className="p-3 sm:p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 shrink-0">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-800">
                    Carga directa
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Adjuntá nuevos recibos
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
