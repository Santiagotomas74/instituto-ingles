"use client";

import { useEffect, useState } from "react";

import GradeCard from "./GradeCard";
import GradeDetailModal from "./GradeDetailModal";

export type Grade = {
  id: string;
  task_id: string;

  titulo: string;
  descripcion: string | null;

  classroom_id: string;
  classroom: string;

  teacher: string;

  grade: number;
  max_score: number;

  teacher_feedback: string | null;

  comentario: string | null;

  archivo_url: string | null;
  archivo_nombre: string | null;
  archivo_size: number | null;

  submitted_at: string | null;
  graded_at: string | null;
};

type Summary = {
  total: number;
  approved: number;
  average: number;
};

export default function Grades() {
  const [loading, setLoading] = useState(true);

  const [grades, setGrades] = useState<Grade[]>([]);

  const [summary, setSummary] = useState<Summary>({
    total: 0,
    approved: 0,
    average: 0,
  });

  const [selected, setSelected] = useState<Grade | null>(null);

  async function loadGrades() {
    try {
      setLoading(true);

      const res = await fetch("/api/student/grades");

      const data = await res.json();

      if (!data.success) return;

      setGrades(data.grades);

      setSummary(data.summary);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadGrades();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12 text-slate-500">
        Cargando calificaciones...
      </div>
    );
  }

  return (
    <>
      <div className="space-y-8">
        {/* Resumen */}

        <div className="grid md:grid-cols-3 gap-5">
          <div className="rounded-3xl bg-white border p-6 shadow-sm">
            <p className="text-sm text-slate-500">Promedio general</p>

            <h2 className="text-4xl font-bold text-cyan-700 mt-3">
              {summary.average}
            </h2>
          </div>

          <div className="rounded-3xl bg-white border p-6 shadow-sm">
            <p className="text-sm text-slate-500">Evaluaciones aprobadas</p>

            <h2 className="text-4xl font-bold text-emerald-600 mt-3">
              {summary.approved}
            </h2>
          </div>

          <div className="rounded-3xl bg-white border p-6 shadow-sm">
            <p className="text-sm text-slate-500">Total corregidas</p>

            <h2 className="text-4xl font-bold text-slate-800 mt-3">
              {summary.total}
            </h2>
          </div>
        </div>

        {/* Lista */}

        {grades.length === 0 ? (
          <div className="rounded-3xl border bg-white p-12 text-center text-slate-500">
            Todavía no tenés calificaciones.
          </div>
        ) : (
          <div className="space-y-5">
            {grades.map((grade) => (
              <GradeCard
                key={grade.id}
                grade={grade}
                onClick={() => setSelected(grade)}
              />
            ))}
          </div>
        )}
      </div>

      <GradeDetailModal
        open={selected !== null}
        grade={selected}
        onClose={() => setSelected(null)}
      />
    </>
  );
}
