"use client";

import { useState } from "react";
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
import EditPaymentModal from "./EditPaymentModal";
type Props = {
  payment: Payment;
  monthName: string;
  onReload: () => void;
};

export default function PaymentCard({ payment, monthName, onReload }: Props) {
  const [openEdit, setOpenEdit] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

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

  async function handleDelete() {
    const confirmed = confirm(
      `¿Eliminar el comprobante de ${monthName} ${payment.year}?\n\nEsta acción no se puede deshacer.`,
    );

    if (!confirmed) return;

    try {
      setLoadingDelete(true);

      const res = await fetch(`/api/admin/students/payments/${payment.id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "No se pudo eliminar el comprobante");
      }

      onReload();
    } catch (error) {
      console.error("Error eliminando comprobante:", error);

      alert(
        error instanceof Error
          ? error.message
          : "No se pudo eliminar el comprobante",
      );
    } finally {
      setLoadingDelete(false);
    }
  }

  return (
    <>
      <div
        className="
          bg-white
          rounded-3xl
          border
          border-slate-200
          shadow-sm
          p-6
          mb-9
        "
      >
        {/* Header */}

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              {monthName} {payment.year}
            </h2>

            <p className="text-slate-500 mt-2">Cuota mensual</p>
          </div>

          <span
            className={`
              self-start
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

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">
          <div>
            <p className="text-xs text-slate-500">Importe</p>

            <p className="text-xl font-bold mt-2 text-slate-700">
              ${Number(payment.amount).toLocaleString("es-AR")}
            </p>
          </div>

          <div className="flex gap-3">
            <CalendarDays className="text-cyan-600 mt-1" size={20} />

            <div>
              <p className="text-xs text-slate-500">Vencimiento</p>

              <p className="font-medium mt-2 text-slate-700">
                {payment.due_date
                  ? new Date(payment.due_date).toLocaleDateString("es-AR")
                  : "-"}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <CheckCircle2 className="text-cyan-600 mt-1" size={20} />

            <div>
              <p className="text-xs text-slate-500">Fecha de pago</p>

              <p className="font-medium mt-2 text-slate-700">
                {payment.paid_at
                  ? new Date(payment.paid_at).toLocaleDateString("es-AR")
                  : "-"}
              </p>
            </div>
          </div>

          <div className="flex gap-3 min-w-0">
            <Receipt className="text-cyan-600 mt-1 shrink-0" size={20} />

            <div className="min-w-0">
              <p className="text-xs text-slate-500">Comprobante</p>

              <p className="font-medium mt-2 truncate text-slate-700">
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
            <h4 className="font-semibold mb-2 text-slate-700">Observaciones</h4>

            <p className="text-slate-600 whitespace-pre-wrap">
              {payment.observations}
            </p>
          </div>
        )}

        {/* Botones */}

        <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-8">
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
                justify-center
                gap-2
              "
            >
              <Eye size={18} />
              Ver comprobante
            </a>
          )}

          <button
            type="button"
            onClick={() => setOpenEdit(true)}
            className="
              h-11
              px-5
              rounded-xl
              border
              hover:bg-slate-100
              flex
              items-center
              justify-center
              gap-2
              text-slate-600
            "
          >
            <Pencil size={18} />
            Editar
          </button>

          <button
            type="button"
            disabled={loadingDelete}
            onClick={handleDelete}
            className="
              h-11
              px-5
              rounded-xl
              bg-red-50
              hover:bg-red-100
              text-red-600
              flex
              items-center
              justify-center
              gap-2
              disabled:opacity-50
            "
          >
            <Trash2 size={18} />

            {loadingDelete ? "Eliminando..." : "Eliminar"}
          </button>
        </div>
      </div>

      {openEdit && (
        <EditPaymentModal
          payment={payment}
          monthName={monthName}
          onClose={() => setOpenEdit(false)}
          onSuccess={() => {
            setOpenEdit(false);
            onReload();
          }}
        />
      )}
    </>
  );
}
