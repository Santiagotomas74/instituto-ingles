"use client";

import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  AlertTriangle,
  Receipt,
  Pencil,
  Trash2,
  Eye,
} from "lucide-react";

import { Payment } from "./StudentPayments";

type Props = {
  payment: Payment;
  monthName: string;
  onReload: () => void;
};

export default function PaymentCard({ payment, monthName }: Props) {
  const status = {
    paid: {
      label: "Pagado",
      color: "bg-green-100 text-green-700",
      icon: <CheckCircle2 size={18} />,
    },
    pending: {
      label: "Pendiente",
      color: "bg-yellow-100 text-yellow-700",
      icon: <Clock3 size={18} />,
    },
    expired: {
      label: "Vencido",
      color: "bg-red-100 text-red-700",
      icon: <AlertTriangle size={18} />,
    },
  }[payment.status];

  return (
    <div
      className="
        bg-white
        rounded-3xl
        border
        border-slate-200
        shadow-sm
        p-6
      "
    >
      {/* Header */}

      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            {monthName} {payment.year}
          </h2>

          <p className="text-slate-500 mt-2">Cuota mensual</p>
        </div>

        <span
          className={`
            px-4
            py-2
            rounded-full
            text-sm
            font-semibold
            flex
            items-center
            gap-2

            ${status.color}
          `}
        >
          {status.icon}

          {status.label}
        </span>
      </div>

      {/* Datos */}

      <div className="grid md:grid-cols-4 gap-6 mt-8">
        <div>
          <p className="text-xs text-slate-500">Importe</p>

          <p className="text-xl font-bold mt-2">
            ${Number(payment.amount).toLocaleString("es-AR")}
          </p>
        </div>

        <div className="flex gap-3">
          <CalendarDays className="text-cyan-600 mt-1" size={20} />

          <div>
            <p className="text-xs text-slate-500">Vencimiento</p>

            <p className="font-medium mt-2">
              {payment.due_date
                ? new Date(payment.due_date).toLocaleDateString()
                : "-"}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <CheckCircle2 className="text-cyan-600 mt-1" size={20} />

          <div>
            <p className="text-xs text-slate-500">Fecha de pago</p>

            <p className="font-medium mt-2">
              {payment.paid_at
                ? new Date(payment.paid_at).toLocaleDateString()
                : "-"}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Receipt className="text-cyan-600 mt-1" size={20} />

          <div>
            <p className="text-xs text-slate-500">Comprobante</p>

            <p className="font-medium mt-2 truncate">
              {payment.receipt_name ?? "Sin archivo"}
            </p>
          </div>
        </div>
      </div>

      {/* Observaciones */}

      {payment.observations && (
        <div
          className="
            mt-8
            rounded-2xl
            border
            bg-slate-50
            p-5
          "
        >
          <h4 className="font-semibold mb-2">Observaciones</h4>

          <p className="text-slate-600 whitespace-pre-wrap">
            {payment.observations}
          </p>
        </div>
      )}

      {/* Botones */}

      <div className="flex flex-wrap gap-3 mt-8">
        {payment.receipt_url && (
          <a
            href={payment.receipt_url}
            target="_blank"
            rel="noopener noreferrer"
            className="
              h-11
              px-5
              rounded-xl
              bg-cyan-600
              hover:bg-cyan-700
              text-white
              flex
              items-center
              gap-2
            "
          >
            <Eye size={18} />
            Ver comprobante
          </a>
        )}

        <button
          className="
            h-11
            px-5
            rounded-xl
            border
            hover:bg-slate-100
            flex
            items-center
            gap-2
          "
        >
          <Pencil size={18} />
          Editar
        </button>

        <button
          className="
            h-11
            px-5
            rounded-xl
            bg-red-50
            hover:bg-red-100
            text-red-600
            flex
            items-center
            gap-2
          "
        >
          <Trash2 size={18} />
          Eliminar
        </button>
      </div>
    </div>
  );
}
