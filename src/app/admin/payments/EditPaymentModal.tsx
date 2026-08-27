"use client";

import { useEffect, useState } from "react";
import {
  X,
  Save,
  Loader2,
  CalendarDays,
  DollarSign,
  FileText,
  Pencil,
  FileCheck,
  ExternalLink,
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
        z-50
        flex
        items-center
        justify-center
        p-4
        bg-slate-900/60
        backdrop-blur-xs
        overflow-y-auto
        animate-in
        fade-in
        duration-200
      "
      onClick={() => {
        if (!loading) onClose();
      }}
    >
      <div
        className="
          w-full
          max-w-2xl
          bg-white
          rounded-3xl
          shadow-2xl
          border
          border-slate-100
          overflow-hidden
          relative
          my-auto
          animate-in
          zoom-in-95
          duration-200
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* ENCABEZADO */}
        <div className="px-6 sm:px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600 shrink-0">
              <Pencil size={18} />
            </div>

            <div className="min-w-0">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight truncate">
                Editar factura / cuota
              </h2>

              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                Período:{" "}
                <span className="text-slate-800 font-semibold">
                  {monthName} {payment.year}
                </span>
              </p>
            </div>
          </div>

          <button
            type="button"
            disabled={loading}
            onClick={onClose}
            className="
              w-9
              h-9
              sm:w-10
              sm:h-10
              rounded-xl
              hover:bg-slate-200/60
              text-slate-400
              hover:text-slate-700
              flex
              items-center
              justify-center
              transition-colors
              shrink-0
              disabled:opacity-50
            "
            aria-label="Cerrar modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* FORMULARIO */}
        <form
          onSubmit={handleSubmit}
          className="p-6 sm:p-8 space-y-5 max-h-[80vh] overflow-y-auto"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            {/* IMPORTE */}
            <div>
              <label
                htmlFor="payment-amount"
                className="mb-1.5 block text-xs sm:text-sm font-semibold text-slate-700"
              >
                Importe
              </label>

              <div className="relative">
                <DollarSign
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
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
                    h-11
                    sm:h-12
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    pl-10
                    pr-4
                    text-sm
                    font-medium
                    text-slate-900
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
                className="mb-1.5 block text-xs sm:text-sm font-semibold text-slate-700"
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
                  h-11
                  sm:h-12
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-4
                  text-sm
                  font-medium
                  text-slate-900
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

            {/* FECHA DE VENCIMIENTO */}
            <div>
              <label
                htmlFor="payment-due-date"
                className="mb-1.5 block text-xs sm:text-sm font-semibold text-slate-700"
              >
                Fecha de vencimiento
              </label>

              <div className="relative">
                <CalendarDays
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />

                <input
                  id="payment-due-date"
                  type="date"
                  value={dueDate}
                  onChange={(event) => setDueDate(event.target.value)}
                  disabled={loading}
                  className="
                    w-full
                    h-11
                    sm:h-12
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    pl-10
                    pr-4
                    text-sm
                    font-medium
                    text-slate-900
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
                className="mb-1.5 block text-xs sm:text-sm font-semibold text-slate-700"
              >
                Fecha de pago
              </label>

              <div className="relative">
                <CalendarDays
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />

                <input
                  id="payment-paid-at"
                  type="date"
                  value={paidAt}
                  onChange={(event) => setPaidAt(event.target.value)}
                  disabled={loading}
                  className="
                    w-full
                    h-11
                    sm:h-12
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    pl-10
                    pr-4
                    text-sm
                    font-medium
                    text-slate-900
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
          <div>
            <label
              htmlFor="payment-observations"
              className="mb-1.5 flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-700"
            >
              <FileText size={16} className="text-slate-400" />
              Observaciones
            </label>

            <textarea
              id="payment-observations"
              value={observations}
              onChange={(event) => setObservations(event.target.value)}
              disabled={loading}
              rows={3}
              className="
                w-full
                rounded-xl
                border
                border-slate-200
                bg-white
                p-3.5
                text-sm
                font-medium
                text-slate-900
                outline-none
                resize-none
                transition
                focus:border-cyan-500
                focus:ring-2
                focus:ring-cyan-100
                disabled:bg-slate-50
              "
              placeholder="Agregar observaciones opcionales..."
            />
          </div>

          {/* COMPROBANTE ACTUAL */}
          {payment.receipt_name && (
            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Comprobante adjunto
              </p>

              <div className="mt-2 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <FileCheck size={18} className="text-emerald-600 shrink-0" />
                  <span className="truncate text-xs sm:text-sm font-medium text-slate-700">
                    {payment.receipt_name}
                  </span>
                </div>

                {payment.receipt_url && (
                  <a
                    href={payment.receipt_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      shrink-0
                      inline-flex
                      items-center
                      gap-1
                      text-xs
                      sm:text-sm
                      font-semibold
                      text-cyan-600
                      hover:text-cyan-700
                      hover:underline
                      transition-colors
                    "
                  >
                    <span>Ver</span>
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
          )}

          {/* BOTONES DE ACCIÓN */}
          <div className="pt-2 flex flex-col-reverse sm:flex-row items-center justify-end gap-3">
            <button
              type="button"
              disabled={loading}
              onClick={onClose}
              className="
                w-full
                sm:w-auto
                h-11
                px-5
                rounded-xl
                border
                border-slate-200
                font-semibold
                text-xs
                sm:text-sm
                text-slate-600
                hover:bg-slate-50
                active:bg-slate-100
                transition-colors
                disabled:opacity-50
              "
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                sm:w-auto
                h-11
                px-5
                rounded-xl
                bg-cyan-600
                hover:bg-cyan-700
                active:bg-cyan-800
                font-semibold
                text-xs
                sm:text-sm
                text-white
                flex
                items-center
                justify-center
                gap-2
                shadow-xs
                transition-all
                disabled:opacity-60
              "
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Guardando...</span>
                </>
              ) : (
                <>
                  <Save size={16} />
                  <span>Guardar cambios</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
