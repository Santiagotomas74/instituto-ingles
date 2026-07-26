"use client";

import { useEffect, useState } from "react";
import { CalendarPlus } from "lucide-react";

type ImportantDate = {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  hora: string;
  tipo: "clase" | "examen" | "evento" | "reunion";
};

type Props = {
  classroomId: string;
};

export default function Events({ classroomId }: Props) {
  const [dates, setDates] = useState<ImportantDate[]>([]);
  const [loading, setLoading] = useState(true);

  const loadDates = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `/api/student/classroom/${classroomId}/important-dates`,
      );

      if (!res.ok) {
        throw new Error();
      }

      const data = await res.json();

      setDates(data.importantDates ?? []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (classroomId) {
      loadDates();
    }
  }, [classroomId]);

  if (loading) {
    return (
      <div className="bg-white rounded-3xl shadow p-10 text-center text-2xl font-semibold text-slate-500">
        Cargando fechas importantes...
      </div>
    );
  }

  if (dates.length === 0) {
    return (
      <div className="bg-white rounded-3xl shadow p-10 text-center">
        <CalendarPlus size={48} className="mx-auto text-slate-300" />

        <h3 className="mt-4 text-xl font-semibold">
          No hay fechas importantes
        </h3>

        <p className="text-slate-500 mt-2">
          El profesor todavía no agregó fechas importantes.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {dates.map((date) => (
        <div key={date.id} className="bg-white rounded-3xl border shadow p-6">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-bold text-zinc-800">
                  {date.titulo}
                </h3>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    date.tipo === "clase"
                      ? "bg-blue-100 text-blue-700"
                      : date.tipo === "examen"
                        ? "bg-red-100 text-red-700"
                        : date.tipo === "evento"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {date.tipo}
                </span>
              </div>

              <p className="mt-3 text-slate-600">{date.descripcion}</p>

              <div className="mt-5 flex gap-6 text-sm text-slate-500">
                <span>
                  📅 {new Date(date.fecha).toLocaleDateString("es-AR")}
                </span>

                <span>🕒 {date.hora}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
