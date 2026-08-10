"use client";

import { useEffect, useState } from "react";
import { Plus, UserCircle2, CreditCard } from "lucide-react";

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

      setPayments(data.payments);
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
      <div className="space-y-8">
        {/* Alumno */}

        <div className="bg-white rounded-3xl border shadow-sm p-7">
          <div className="flex justify-between items-start">
            <div className="flex gap-5">
              <div
                className="
                  w-16
                  h-16
                  rounded-full
                  bg-cyan-100
                  flex
                  items-center
                  justify-center
                "
              >
                <UserCircle2 className="text-cyan-700" size={38} />
              </div>

              <div>
                <h2 className="text-3xl font-bold text-slate-900">
                  {student.nombre} {student.apellido}
                </h2>

                <p className="text-slate-500 mt-1">{student.email}</p>
                <p className="text-sm text-slate-400 mt-1">
                  DNI {student.dni} • {student.nivel} • {student.status} •
                  Ingresado en{" "}
                  {student.created_at &&
                    new Date(student.created_at).toLocaleDateString("es-AR", {
                      year: "numeric",
                      month: "long",
                    })}
                </p>
              </div>
            </div>

            <button
              onClick={() => setCreateOpen(true)}
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
              <Plus size={18} />
              Nuevo comprobante
            </button>
          </div>

          {/* Stats */}

          <div className="grid md:grid-cols-4 gap-5 mt-8">
            <div className="rounded-2xl bg-slate-50 border p-5">
              <p className="text-sm text-slate-500 ">Total cuotas</p>

              <h3 className="text-3xl font-bold mt-2 text-slate-700">
                {payments.length}
              </h3>
            </div>

            <div className="rounded-2xl bg-green-50 border border-green-100 p-5">
              <p className="text-sm text-green-700">Pagadas</p>

              <h3 className="text-3xl font-bold text-green-700 mt-2">{paid}</h3>
            </div>

            <div className="rounded-2xl bg-yellow-50 border border-yellow-100 p-5">
              <p className="text-sm text-yellow-700">Pendientes</p>

              <h3 className="text-3xl font-bold text-yellow-700 mt-2">
                {pending}
              </h3>
            </div>

            <div className="rounded-2xl bg-red-50 border border-red-100 p-5">
              <p className="text-sm text-red-700">Vencidas</p>

              <h3 className="text-3xl font-bold text-red-700 mt-2">
                {expired}
              </h3>
            </div>
          </div>

          <div
            className="
              mt-6
              rounded-2xl
              bg-cyan-50
              border
              border-cyan-100
              p-5
              flex
              items-center
              gap-3
            "
          >
            <CreditCard className="text-cyan-700" />

            <div>
              <p className="text-sm text-cyan-700">Total abonado</p>

              <p className="text-2xl font-bold text-cyan-800">
                ${totalPaid.toLocaleString("es-AR")}
              </p>
            </div>
          </div>
        </div>

        {/* Historial */}

        <div>
          <h3 className="text-2xl font-bold mb-6 text-slate-700">
            Historial de pagos
          </h3>

          {loading ? (
            <div className="bg-white rounded-3xl border p-12 text-center text-slate-500">
              Cargando pagos...
            </div>
          ) : payments.length === 0 ? (
            <div className="bg-white rounded-3xl border p-16 text-center">
              <h3 className="text-2xl font-bold text-slate-700">
                No existen comprobantes.
              </h3>

              <p className="text-slate-500 mt-3">
                Todavía no se registró ninguna cuota para este alumno.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
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

      <CreatePaymentModal
        open={createOpen}
        student={student}
        onClose={() => setCreateOpen(false)}
        onCreated={loadPayments}
      />
    </>
  );
}
