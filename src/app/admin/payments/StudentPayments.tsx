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
  Receipt,
  Loader2,
  FileX2,
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
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xs p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
            <div className="flex items-start sm:items-center gap-3 sm:gap-5 min-w-0">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                <UserCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight truncate">
                    {student.nombre} {student.apellido}
                  </h2>
                  <span
                    className={`text-[10px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-md capitalize shrink-0 ${
                      student.status === "active"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                        : "bg-slate-100 text-slate-600 border border-slate-200"
                    }`}
                  >
                    {student.status === "active" ? "Activo" : "Inactivo"}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2 text-xs sm:text-sm text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate max-w-[200px] sm:max-w-none">
                      {student.email}
                    </span>
                  </span>

                  <span className="flex items-center gap-1.5">
                    <IdCard className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>DNI {student.dni}</span>
                  </span>

                  {student.nivel && (
                    <span className="flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="capitalize">{student.nivel}</span>
                    </span>
                  )}

                  {student.created_at && (
                    <span className="flex items-center gap-1.5 text-slate-400">
                      <Calendar className="w-3.5 h-3.5 shrink-0" />
                      <span>
                        Ingreso:{" "}
                        {new Date(student.created_at).toLocaleDateString(
                          "es-AR",
                          {
                            year: "numeric",
                            month: "short",
                          },
                        )}
                      </span>
                    </span>
                  )}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setCreateOpen(true)}
              className="
                w-full
                sm:w-auto
                h-11
                px-5
                rounded-xl
                bg-blue-600
                hover:bg-blue-700
                active:bg-blue-800
                text-white
                font-semibold
                text-xs
                sm:text-sm
                flex
                items-center
                justify-center
                gap-2
                shadow-xs
                transition-all
                shrink-0
              "
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Nuevo comprobante</span>
            </button>
          </div>

          {/* GRID DE ESTADÍSTICAS */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6 sm:mt-8">
            <div className="rounded-xl sm:rounded-2xl bg-slate-50/80 border border-slate-200/80 p-3.5 sm:p-5">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs sm:text-sm font-medium">
                  Total cuotas
                </span>
                <Receipt className="w-4 h-4 text-slate-400" />
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-800 mt-2">
                {payments.length}
              </p>
            </div>

            <div className="rounded-xl sm:rounded-2xl bg-emerald-50/60 border border-emerald-200/60 p-3.5 sm:p-5">
              <div className="flex items-center justify-between text-emerald-700">
                <span className="text-xs sm:text-sm font-medium">Pagadas</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-700 mt-2">
                {paid}
              </p>
            </div>

            <div className="rounded-xl sm:rounded-2xl bg-amber-50/60 border border-amber-200/60 p-3.5 sm:p-5">
              <div className="flex items-center justify-between text-amber-700">
                <span className="text-xs sm:text-sm font-medium">
                  Pendientes
                </span>
                <Clock className="w-4 h-4 text-amber-500" />
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-amber-700 mt-2">
                {pending}
              </p>
            </div>

            <div className="rounded-xl sm:rounded-2xl bg-rose-50/60 border border-rose-200/60 p-3.5 sm:p-5">
              <div className="flex items-center justify-between text-rose-700">
                <span className="text-xs sm:text-sm font-medium">Vencidas</span>
                <AlertCircle className="w-4 h-4 text-rose-500" />
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-rose-700 mt-2">
                {expired}
              </p>
            </div>
          </div>

          {/* BANNER TOTAL ABONADO */}
          <div className="mt-4 sm:mt-6 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 sm:p-5 flex items-center gap-4 shadow-xs">
            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md shrink-0">
              <CreditCard className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>

            <div>
              <p className="text-xs sm:text-sm font-medium text-blue-100">
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
              Historial de pagos
            </h3>
            <span className="text-xs sm:text-sm font-medium text-slate-500">
              {payments.length}{" "}
              {payments.length === 1 ? "registro" : "registros"}
            </span>
          </div>

          {loading ? (
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-12 text-center text-slate-400 flex flex-col items-center gap-3">
              <Loader2 className="w-7 h-7 animate-spin text-blue-600" />
              <p className="text-xs sm:text-sm font-medium">
                Cargando comprobantes...
              </p>
            </div>
          ) : payments.length === 0 ? (
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-dashed border-slate-300 p-8 sm:p-14 text-center flex flex-col items-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
                <FileX2 className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <h4 className="text-base sm:text-lg font-bold text-slate-700">
                No existen comprobantes
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm">
                Todavía no se registró ninguna cuota para este alumno. Hacé clic
                en "Nuevo comprobante" para agregar uno.
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
