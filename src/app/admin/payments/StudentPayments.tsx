"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  UserCircle2,
  CreditCard,
  Mail,
  IdCard,
  GraduationCap,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  Loader2,
  FileX2,
  Sparkles,
} from "lucide-react";

import { Student } from "./Payments";
import PaymentCard from "./PaymentCard";
import CreatePaymentModal from "./CreatePaymentModal";

export type Payment = {
  id: string;
  student_id: string;
  month: number;
  year: number;
  amount: number;
  due_date: string | null;
  paid_at: string | null;
  status: "pending" | "paid" | "expired";
  receipt_url: string | null;
  receipt_name: string | null;
  observations: string | null;
  created_at: string;
};

type Props = {
  student: Student;
};

const MONTHS = [
  "",
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export default function StudentPayments({ student }: Props) {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);

  async function loadPayments() {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/students/${student.id}/payments`);
      const data = await res.json();

      if (!data.success) return;

      setPayments(data.payments || []);
    } catch (error) {
      console.error("Error al cargar pagos del alumno:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPayments();
  }, [student.id]);

  const paid = payments.filter((x) => x.status === "paid").length;
  const pending = payments.filter((x) => x.status === "pending").length;
  const expired = payments.filter((x) => x.status === "expired").length;

  const totalPaid = payments
    .filter((x) => x.status === "paid")
    .reduce((sum, x) => sum + Number(x.amount), 0);

  return (
    <>
      <div className="space-y-6 sm:space-y-8">
        {/* TARJETA INFORMACIÓN DEL ALUMNO */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-sm p-5 sm:p-7 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Perfil e información */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 min-w-0 text-center sm:text-left">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600 shrink-0 shadow-xs">
                <UserCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight truncate">
                    {student.nombre} {student.apellido}
                  </h2>

                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                      student.status === "active"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200/80"
                        : "bg-slate-100 text-slate-600 border-slate-200"
                    }`}
                  >
                    {student.status === "active" && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    )}
                    {student.status === "active" ? "Activo" : "Inactivo"}
                  </span>
                </div>

                {/* Pills de Metadatos */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-3 text-xs sm:text-sm text-slate-600">
                  <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-xl border border-slate-100">
                    <Mail size={14} className="text-slate-400 shrink-0" />
                    <span className="truncate max-w-[180px] sm:max-w-none font-medium">
                      {student.email}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-xl border border-slate-100">
                    <IdCard size={14} className="text-slate-400 shrink-0" />
                    <span className="font-medium">DNI {student.dni}</span>
                  </div>

                  {student.nivel && (
                    <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-xl border border-slate-100">
                      <GraduationCap
                        size={14}
                        className="text-slate-400 shrink-0"
                      />
                      <span className="capitalize font-medium">
                        {student.nivel}
                      </span>
                    </div>
                  )}

                  {student.created_at && (
                    <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-xl border border-slate-100 text-slate-500">
                      <Calendar size={14} className="text-slate-400 shrink-0" />
                      <span>
                        Ingreso:{" "}
                        <strong className="font-semibold text-slate-700">
                          {new Date(student.created_at).toLocaleDateString(
                            "es-AR",
                            {
                              year: "numeric",
                              month: "short",
                            },
                          )}
                        </strong>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Acciones */}
            <button
              type="button"
              onClick={() => setCreateOpen(true)}
              className="
                w-full
                lg:w-auto
                h-11
                sm:h-12
                px-5
                rounded-xl
                bg-cyan-600
                hover:bg-cyan-700
                active:bg-cyan-800
                text-white
                font-semibold
                text-xs
                sm:text-sm
                flex
                items-center
                justify-center
                gap-2
                shadow-xs
                hover:shadow-md
                transition-all
                shrink-0
              "
            >
              <Plus size={18} />
              <span>Emitir factura / cuota</span>
            </button>
          </div>

          {/* GRID DE ESTADÍSTICAS */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6 sm:mt-8">
            <div className="rounded-2xl bg-slate-50/80 border border-slate-100 p-4 transition-colors hover:bg-slate-100/60">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs sm:text-sm font-medium">
                  Total cuotas
                </span>
                <FileText size={16} className="text-slate-400" />
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                {payments.length}
              </p>
            </div>

            <div className="rounded-2xl bg-emerald-50/50 border border-emerald-100/80 p-4 transition-colors hover:bg-emerald-50">
              <div className="flex items-center justify-between text-emerald-700">
                <span className="text-xs sm:text-sm font-medium">Pagadas</span>
                <CheckCircle2 size={16} className="text-emerald-500" />
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-700 mt-2">
                {paid}
              </p>
            </div>

            <div className="rounded-2xl bg-amber-50/50 border border-amber-100/80 p-4 transition-colors hover:bg-amber-50">
              <div className="flex items-center justify-between text-amber-700">
                <span className="text-xs sm:text-sm font-medium">
                  Pendientes
                </span>
                <Clock size={16} className="text-amber-500" />
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-amber-700 mt-2">
                {pending}
              </p>
            </div>

            <div className="rounded-2xl bg-rose-50/50 border border-rose-100/80 p-4 transition-colors hover:bg-rose-50">
              <div className="flex items-center justify-between text-rose-700">
                <span className="text-xs sm:text-sm font-medium">Vencidas</span>
                <AlertCircle size={16} className="text-rose-500" />
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-rose-700 mt-2">
                {expired}
              </p>
            </div>
          </div>

          {/* BANNER TOTAL ABONADO */}
          <div className="mt-4 sm:mt-6 rounded-2xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 text-white p-4 sm:p-5 flex items-center gap-4 shadow-sm">
            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md shrink-0 border border-white/10">
              <CreditCard size={24} className="text-white" />
            </div>

            <div>
              <p className="text-xs sm:text-sm font-medium text-cyan-100">
                Total acumulado abonado
              </p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-black mt-0.5 tracking-tight">
                $
                {totalPaid.toLocaleString("es-AR", {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>
        </div>

        {/* SECCIÓN HISTORIAL */}
        <div>
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-2xl font-bold text-slate-900">
              Historial de facturación
            </h3>
            <span className="text-xs sm:text-sm font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200/60">
              {payments.length}{" "}
              {payments.length === 1 ? "registro" : "registros"}
            </span>
          </div>

          {loading ? (
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-12 text-center text-slate-400 flex flex-col items-center justify-center gap-3">
              <Loader2 size={28} className="animate-spin text-cyan-600" />
              <p className="text-xs sm:text-sm font-medium text-slate-500">
                Cargando facturas y cuotas...
              </p>
            </div>
          ) : payments.length === 0 ? (
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-dashed border-slate-300 p-8 sm:p-14 text-center flex flex-col items-center justify-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 mb-3">
                <FileX2 size={26} />
              </div>
              <h4 className="text-base sm:text-lg font-bold text-slate-800">
                Sin facturas registradas
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm">
                Todavía no se emitió ninguna cuota ni factura para este alumno.
                Hacé clic en "Emitir factura / cuota" para comenzar.
              </p>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {payments.map((payment) => (
                <PaymentCard
                  key={payment.id}
                  payment={payment}
                  monthName={MONTHS[payment.month]}
                  onReload={loadPayments}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MODAL CREAR PAGO */}
      <CreatePaymentModal
        open={createOpen}
        student={student}
        onClose={() => setCreateOpen(false)}
        onCreated={loadPayments}
      />
    </>
  );
}
