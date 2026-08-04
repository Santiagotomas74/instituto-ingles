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
} from "lucide-react";

import { StudentProfile } from "./Profile";

type Props = {
  profile: StudentProfile;
};

export default function PaymentReceiptsCard({ profile }: Props) {
  console.log(profile.payments);
  function formatDate(date: string | null) {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }

  function formatMoney(value: number) {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(value);
  }

  function getStatus(status: string) {
    switch (status) {
      case "paid":
        return {
          text: "Pagado",
          color: "bg-emerald-100 text-emerald-700",
          icon: <CheckCircle2 size={16} />,
        };

      case "expired":
        return {
          text: "Vencido",
          color: "bg-red-100 text-red-700",
          icon: <AlertTriangle size={16} />,
        };

      default:
        return {
          text: "Pendiente",
          color: "bg-amber-100 text-amber-700",
          icon: <Clock3 size={16} />,
        };
    }
  }

  return (
    <div className="rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden">
      {/* HEADER */}

      <div className="border-b px-8 py-6 bg-slate-50">
        <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-900">
          <Receipt className="text-cyan-600" />
          Comprobantes de pago
        </h2>

        <p className="mt-1 text-slate-500">Historial de cuotas registradas.</p>
      </div>

      {profile.payments.length === 0 ? (
        <div className="py-16 text-center text-slate-500">
          No hay comprobantes registrados.
        </div>
      ) : (
        <div className="divide-y divide-slate-200">
          {profile.payments.map((payment) => {
            const badge = getStatus(payment.status);

            return (
              <div
                key={payment.id}
                className="p-6 transition hover:bg-slate-50"
              >
                {/* Cabecera */}

                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">
                      {payment.month_name} {payment.year}
                    </h3>

                    <p className="mt-2 text-cyan-700 font-bold text-lg">
                      {formatMoney(payment.amount)}
                    </p>
                  </div>

                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${badge.color}`}
                  >
                    {badge.icon}
                    {badge.text}
                  </span>
                </div>

                {/* Información */}

                <div className="grid gap-6 md:grid-cols-3 mt-8">
                  <div className="flex items-center gap-3">
                    <Calendar className="text-slate-400" size={18} />

                    <div>
                      <p className="text-xs text-slate-500">Vencimiento</p>

                      <p className="font-medium text-slate-500">
                        {formatDate(payment.due_date)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <CreditCard className="text-slate-400" size={18} />

                    <div>
                      <p className="text-xs text-slate-500">Fecha de pago</p>

                      <p className="font-medium text-slate-500">
                        {formatDate(payment.paid_at)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Botón para ver comprobante */}

                {payment.receipt_url && (
                  <div className="mt-6">
                    <a
                      href={payment.receipt_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        bg-cyan-600
                        px-5
                        py-3
                        text-white
                        font-semibold
                        transition
                        hover:bg-cyan-700
                      "
                    >
                      <Eye size={18} />
                      Ver comprobante
                      <ExternalLink size={16} />
                    </a>
                  </div>
                )}

                {/* Observaciones */}

                {payment.observations && (
                  <div className="mt-6 rounded-2xl bg-slate-100 p-4">
                    <p className="text-sm font-medium text-slate-700">
                      Observaciones
                    </p>

                    <p className="mt-2 text-sm text-slate-600">
                      {payment.observations}
                    </p>
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
