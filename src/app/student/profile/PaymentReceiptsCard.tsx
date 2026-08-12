"use client";

import {
  Calendar,
  CreditCard,
  CheckCircle2,
  Clock3,
  AlertTriangle,
  Receipt,
  ExternalLink,
  Eye,
  FileX2,
} from "lucide-react";
import { StudentProfile } from "./Profile";

type Props = {
  profile: StudentProfile;
};

export default function PaymentReceiptsCard({ profile }: Props) {
  function formatDate(date: string | null) {
    if (!date) return "Sin registrar";
    return new Date(date).toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  function formatMoney(value: number) {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(value);
  }

  function getStatus(status: string) {
    switch (status) {
      case "paid":
        return {
          text: "Abonado",
          color: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
          icon: <CheckCircle2 size={16} />,
        };
      case "expired":
        return {
          text: "Vencido",
          color: "bg-rose-50 text-rose-700 border-rose-200/60",
          icon: <AlertTriangle size={16} />,
        };
      default:
        return {
          text: "Pendiente",
          color: "bg-amber-50 text-amber-700 border-amber-200/60",
          icon: <Clock3 size={16} />,
        };
    }
  }

  return (
    <div className="rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 shadow-xs overflow-hidden">
      {/* HEADER */}
      <div className="border-b border-slate-100 px-5 sm:px-8 py-5 sm:py-6 bg-slate-50/50">
        <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          <Receipt className="text-blue-600 w-6 h-6 sm:w-7 sm:h-7" />
          Comprobantes de pago
        </h2>
        <p className="mt-1.5 text-sm sm:text-base text-slate-500">
          Historial de cuotas y recibos registrados.
        </p>
      </div>

      {profile.payments.length === 0 ? (
        <div className="py-12 sm:py-20 flex flex-col items-center justify-center text-center px-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
            <FileX2 size={32} />
          </div>
          <h3 className="text-lg font-bold text-slate-800">
            No hay comprobantes
          </h3>
          <p className="text-sm text-slate-500 mt-1 max-w-sm">
            Aún no se ha registrado ninguna cuota o recibo de pago en tu
            historial.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {profile.payments.map((payment) => {
            const badge = getStatus(payment.status);

            return (
              <div
                key={payment.id}
                className="p-5 sm:p-8 transition-colors hover:bg-slate-50/50"
              >
                {/* Cabecera del item */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between sm:justify-start gap-4">
                      <h3 className="text-lg sm:text-xl font-extrabold text-slate-800 capitalize">
                        {payment.month_name} {payment.year}
                      </h3>
                      {/* Badge móvil (arriba a la derecha) y desktop (al lado del título) */}
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] sm:text-xs font-bold border uppercase tracking-wider ${badge.color}`}
                      >
                        {badge.icon}
                        {badge.text}
                      </span>
                    </div>
                    <p className="mt-1 sm:mt-2 text-2xl sm:text-3xl font-black text-blue-600 tracking-tight">
                      {formatMoney(payment.amount)}
                    </p>
                  </div>
                </div>

                {/* Información Fechas */}
                <div className="grid grid-cols-2 sm:flex sm:items-center gap-4 sm:gap-10 mt-6 bg-slate-50 rounded-xl p-4 sm:p-0 sm:bg-transparent sm:rounded-none">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3">
                    <div className="flex items-center gap-1.5 text-slate-400 sm:text-slate-500">
                      <Calendar size={16} />
                      <span className="text-xs sm:text-sm font-medium">
                        Vencimiento:
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-slate-700">
                      {formatDate(payment.due_date)}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3">
                    <div className="flex items-center gap-1.5 text-slate-400 sm:text-slate-500">
                      <CreditCard size={16} />
                      <span className="text-xs sm:text-sm font-medium">
                        Pagado el:
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-slate-700">
                      {formatDate(payment.paid_at)}
                    </p>
                  </div>
                </div>

                {/* Observaciones */}
                {payment.observations && (
                  <div className="mt-5 sm:mt-6 rounded-xl border border-amber-100 bg-amber-50/50 p-4">
                    <p className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                      Observaciones
                    </p>
                    <p className="mt-1 text-sm text-amber-900/80">
                      {payment.observations}
                    </p>
                  </div>
                )}

                {/* Botón Acción */}
                {payment.receipt_url && (
                  <div className="mt-5 sm:mt-6">
                    <a
                      href={payment.receipt_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        w-full sm:w-auto
                        inline-flex items-center justify-center gap-2
                        rounded-xl bg-blue-600 px-6 py-3
                        text-sm font-semibold text-white shadow-xs
                        transition-all hover:bg-blue-700 active:bg-blue-800
                      "
                    >
                      <Eye size={18} />
                      Ver comprobante
                      <ExternalLink size={16} className="ml-1 opacity-70" />
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
