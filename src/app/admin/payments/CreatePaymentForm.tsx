"use client";

import { useState } from "react";

import { Student } from "./Payments";

type Props = {
  student: Student;
  onCreated: () => void;
};

export default function CreatePaymentForm({ student, onCreated }: Props) {
  const today = new Date();
  const [receiptFile, setReceiptFile] = useState<File | null>(null);

  const [uploading, setUploading] = useState(false);

  const [month, setMonth] = useState(today.getMonth() + 1);

  const [year, setYear] = useState(today.getFullYear());

  const [amount, setAmount] = useState("");

  const [dueDate, setDueDate] = useState("");

  const [paidAt, setPaidAt] = useState("");

  const [status, setStatus] = useState<"pending" | "paid" | "expired">(
    "pending",
  );

  const [observations, setObservations] = useState("");

  const [loading, setLoading] = useState(false);
  async function uploadReceipt() {
    if (!receiptFile) {
      return {
        url: null,
        name: null,
      };
    }

    setUploading(true);

    try {
      const formData = new FormData();

      formData.append("file", receiptFile);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      return {
        url: data.url,
        name: receiptFile.name,
      };
    } finally {
      setUploading(false);
    }
  }

  async function submit() {
    if (!amount) {
      alert("Ingrese un importe.");
      return;
    }

    try {
      setLoading(true);

      const receipt = await uploadReceipt();

      const res = await fetch(`/api/admin/students/${student.id}/payments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          month,
          year,
          amount: Number(amount),
          due_date: dueDate || null,
          paid_at: paidAt || null,
          status,
          observations,

          receipt_url: receipt.url,
          receipt_name: receipt.name,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message);
        return;
      }

      onCreated();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="font-medium text-gray-700">Mes</label>

          <select
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            className="w-full mt-2 rounded-xl border h-11 px-3 text-gray-700"
          >
            {[
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
            ].map((m, i) => (
              <option key={i} value={i + 1}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-medium text-gray-700">Año</label>

          <input
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="w-full mt-2 rounded-xl border h-11 px-3 text-gray-700"
          />
        </div>

        <div>
          <label className="font-medium text-gray-700">Importe</label>

          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full mt-2 rounded-xl border h-11 px-3 text-gray-700"
          />
        </div>

        <div>
          <label className="font-medium text-gray-700">Estado</label>

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as "pending" | "paid" | "expired")
            }
            className="w-full mt-2 rounded-xl border h-11 px-3 text-gray-700"
          >
            <option value="pending">Pendiente</option>

            <option value="paid">Pagado</option>

            <option value="expired">Vencido</option>
          </select>
        </div>

        <div>
          <label className="font-medium text-gray-700">Fecha vencimiento</label>

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full mt-2 rounded-xl border h-11 px-3 text-gray-700"
          />
        </div>

        <div>
          <label className="font-medium text-gray-700">Fecha de pago</label>

          <input
            type="date"
            value={paidAt}
            onChange={(e) => setPaidAt(e.target.value)}
            className="w-full mt-2 rounded-xl border h-11 px-3 text-gray-700"
          />
        </div>
      </div>
      <div>
        <label className="font-medium text-gray-700">Comprobante de pago</label>

        <input
          type="file"
          accept=".pdf,image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];

            if (file) {
              setReceiptFile(file);
            }
          }}
          className="
      mt-2
      block
      w-full
      rounded-xl
      border
      p-3
      text-gray-700
    "
        />

        {receiptFile && (
          <p className="text-sm text-cyan-600 mt-2">{receiptFile.name}</p>
        )}
      </div>

      <div>
        <label className="font-medium text-gray-700">Observaciones</label>

        <textarea
          rows={5}
          value={observations}
          onChange={(e) => setObservations(e.target.value)}
          className="w-full mt-2 rounded-xl border p-3 text-gray-700"
        />
      </div>

      <div className="flex justify-end">
        <button
          disabled={loading || uploading}
          onClick={submit}
          className="
    h-11
    px-6
    rounded-xl
    bg-cyan-600
    hover:bg-cyan-700
    text-white
    disabled:opacity-50
  "
        >
          {uploading
            ? "Subiendo comprobante..."
            : loading
              ? "Guardando..."
              : "Guardar comprobante"}
        </button>
      </div>
    </div>
  );
}
