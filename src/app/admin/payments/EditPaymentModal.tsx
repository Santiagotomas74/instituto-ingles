"use client";

import { useEffect, useState } from "react";
import {
  X,
  Save,
  Loader2,
  CalendarDays,
  DollarSign,
  FileText,
} from "lucide-react";

import { Payment } from "./StudentPayments";

type Props = {
  payment: Payment;
  monthName: string;
  onClose: () => void;
  onSuccess: () => void;
};

export default function EditPaymentModal({
  payment,
  monthName,
  onClose,
  onSuccess,
}: Props) {
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [paidAt, setPaidAt] = useState("");
  const [status, setStatus] = useState(payment.status);
  const [observations, setObservations] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setAmount(
      payment.amount !== null && payment.amount !== undefined
        ? String(payment.amount)
        : "",
    );

    setDueDate(payment.due_date ? formatDateForInput(payment.due_date) : "");

    setPaidAt(payment.paid_at ? formatDateForInput(payment.paid_at) : "");

    setStatus(payment.status);

    setObservations(payment.observations ?? "");
  }, [payment]);

  function formatDateForInput(value: string) {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "";
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!amount.trim()) {
      alert("Ingresá el importe.");
      return;
    }

    const numericAmount = Number(amount);

    if (!Number.isFinite(numericAmount) || numericAmount < 0) {
      alert("El importe ingresado no es válido.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`/api/admin/students/payments/${payment.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: numericAmount,
          due_date: dueDate || null,
          paid_at: paidAt || null,
          status,
          observations: observations.trim() || null,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "No se pudo actualizar el comprobante");
      }

      onSuccess();
    } catch (error) {
      console.error("Error actualizando comprobante:", error);

      alert(
        error instanceof Error
          ? error.message
          : "No se pudo actualizar el comprobante",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        p-4
        bg-slate-950/50
        backdrop-blur-sm
      "
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          if (!loading) {
            onClose();
          }
        }
      }}
    >
      <div
        className="
          w-full
          max-w-2xl
          max-h-[90vh]
          overflow-y-auto
          rounded-3xl
          bg-white
          shadow-2xl
        "
      >
        {/* HEADER */}

        <div
          className="
            sticky
            top-0
            z-10
            flex
            items-start
            justify-between
            gap-4
            border-b
            border-slate-200
            bg-white
            px-5
            py-5
            sm:px-7
          "
        >
          <div className="min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Editar comprobante
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {monthName} {payment.year}
            </p>
          </div>

          <button
            type="button"
            disabled={loading}
            onClick={onClose}
            className="
              shrink-0
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              text-slate-500
              hover:bg-slate-100
              hover:text-slate-700
              transition
              disabled:opacity-50
            "
            aria-label="Cerrar"
          >
            <X size={20} />
          </button>
        </div>

        {/* FORM */}

        <form onSubmit={handleSubmit} className="p-5 sm:p-7">
          <div className="grid gap-5 sm:grid-cols-2">
            {/* IMPORTE */}

            <div>
              <label
                htmlFor="payment-amount"
                className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                  text-slate-700
                "
              >
                Importe
              </label>

              <div className="relative">
                <DollarSign
                  size={18}
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <input
                  id="payment-amount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  disabled={loading}
                  className="
                    w-full
                    h-12
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    pl-10
                    pr-4
                    text-slate-800
                    outline-none
                    transition
                    focus:border-cyan-500
                    focus:ring-2
                    focus:ring-cyan-100
                    disabled:bg-slate-50
                  "
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* ESTADO */}

            <div>
              <label
                htmlFor="payment-status"
                className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                  text-slate-700
                "
              >
                Estado
              </label>

              <select
                id="payment-status"
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value as Payment["status"])
                }
                disabled={loading}
                className="
                  w-full
                  h-12
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-4
                  text-slate-800
                  outline-none
                  transition
                  focus:border-cyan-500
                  focus:ring-2
                  focus:ring-cyan-100
                  disabled:bg-slate-50
                "
              >
                <option value="paid">Pagado</option>

                <option value="pending">Pendiente</option>

                <option value="expired">Vencido</option>
              </select>
            </div>

            {/* VENCIMIENTO */}

            <div>
              <label
                htmlFor="payment-due-date"
                className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                  text-slate-700
                "
              >
                Fecha de vencimiento
              </label>

              <div className="relative">
                <CalendarDays
                  size={18}
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                    pointer-events-none
                  "
                />

                <input
                  id="payment-due-date"
                  type="date"
                  value={dueDate}
                  onChange={(event) => setDueDate(event.target.value)}
                  disabled={loading}
                  className="
                    w-full
                    h-12
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    pl-10
                    pr-4
                    text-slate-800
                    outline-none
                    transition
                    focus:border-cyan-500
                    focus:ring-2
                    focus:ring-cyan-100
                    disabled:bg-slate-50
                  "
                />
              </div>
            </div>

            {/* FECHA DE PAGO */}

            <div>
              <label
                htmlFor="payment-paid-at"
                className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                  text-slate-700
                "
              >
                Fecha de pago
              </label>

              <div className="relative">
                <CalendarDays
                  size={18}
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                    pointer-events-none
                  "
                />

                <input
                  id="payment-paid-at"
                  type="date"
                  value={paidAt}
                  onChange={(event) => setPaidAt(event.target.value)}
                  disabled={loading}
                  className="
                    w-full
                    h-12
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    pl-10
                    pr-4
                    text-slate-800
                    outline-none
                    transition
                    focus:border-cyan-500
                    focus:ring-2
                    focus:ring-cyan-100
                    disabled:bg-slate-50
                  "
                />
              </div>
            </div>
          </div>

          {/* OBSERVACIONES */}

          <div className="mt-5">
            <label
              htmlFor="payment-observations"
              className="
                mb-2
                flex
                items-center
                gap-2
                text-sm
                font-semibold
                text-slate-700
              "
            >
              <FileText size={17} />
              Observaciones
            </label>

            <textarea
              id="payment-observations"
              value={observations}
              onChange={(event) => setObservations(event.target.value)}
              disabled={loading}
              rows={4}
              className="
                w-full
                rounded-xl
                border
                border-slate-200
                bg-white
                px-4
                py-3
                text-slate-800
                outline-none
                resize-none
                transition
                focus:border-cyan-500
                focus:ring-2
                focus:ring-cyan-100
                disabled:bg-slate-50
              "
              placeholder="Agregar observaciones..."
            />
          </div>

          {/* COMPROBANTE ACTUAL */}

          {payment.receipt_name && (
            <div
              className="
                mt-5
                rounded-2xl
                border
                border-slate-200
                bg-slate-50
                p-4
              "
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Comprobante actual
              </p>

              <div className="mt-2 flex items-center justify-between gap-3">
                <p className="min-w-0 truncate text-sm font-medium text-slate-700">
                  {payment.receipt_name}
                </p>

                {payment.receipt_url && (
                  <a
                    href={payment.receipt_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      shrink-0
                      text-sm
                      font-semibold
                      text-cyan-600
                      hover:text-cyan-700
                    "
                  >
                    Ver
                  </a>
                )}
              </div>
            </div>
          )}

          {/* FOOTER */}

          <div
            className="
              mt-7
              flex
              flex-col-reverse
              gap-3
              sm:flex-row
              sm:justify-end
            "
          >
            <button
              type="button"
              disabled={loading}
              onClick={onClose}
              className="
                h-11
                rounded-xl
                border
                border-slate-200
                px-5
                font-semibold
                text-slate-600
                hover:bg-slate-50
                transition
                disabled:opacity-50
              "
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={loading}
              className="
                h-11
                rounded-xl
                bg-cyan-600
                px-5
                font-semibold
                text-white
                flex
                items-center
                justify-center
                gap-2
                hover:bg-cyan-700
                transition
                disabled:opacity-60
              "
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Guardar cambios
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
