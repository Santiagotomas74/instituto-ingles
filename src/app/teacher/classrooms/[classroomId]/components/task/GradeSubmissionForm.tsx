"use client";

import { useEffect, useState } from "react";

type Props = {
  submissionId: string;
  maxScore: number;
  currentGrade: number | null;
  currentFeedback: string | null;
  onSaved: () => void;
};

export default function GradeSubmissionForm({
  submissionId,
  maxScore,
  currentGrade,
  currentFeedback,
  onSaved,
}: Props) {
  const [grade, setGrade] = useState<number | "">(currentGrade ?? "");
  const [feedback, setFeedback] = useState(currentFeedback ?? "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setGrade(currentGrade ?? "");
    setFeedback(currentFeedback ?? "");
  }, [currentGrade, currentFeedback]);

  async function save() {
    if (grade === "") {
      alert("Ingrese una calificación.");
      return;
    }

    if (Number(grade) > maxScore) {
      alert(`La nota máxima es ${maxScore}.`);
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `/api/teacher/tasks/submissions/${submissionId}/grade`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            grade: Number(grade),
            teacher_feedback: feedback,
          }),
        },
      );

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      onSaved();
    } catch (error) {
      console.error(error);
      alert("No se pudo guardar la corrección.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-3xl border bg-white p-6 shadow-sm">
      <h3 className="text-xl font-bold text-slate-900">
        Corrección del profesor
      </h3>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-500">
            Calificación
          </label>

          <input
            type="number"
            min={0}
            max={maxScore}
            value={grade}
            onChange={(e) =>
              setGrade(e.target.value === "" ? "" : Number(e.target.value))
            }
            className="text-gray-700 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500"
          />

          <p className="mt-2 text-xs text-slate-500">
            Puntaje máximo: {maxScore}
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-500">
            Observación
          </label>

          <textarea
            rows={6}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Escribe una devolución para el estudiante..."
            className="w-full text-black resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={save}
          disabled={loading}
          className="h-11 rounded-xl bg-cyan-600 px-6 font-semibold text-white hover:bg-cyan-700 disabled:opacity-50"
        >
          {loading ? "Guardando..." : "Guardar corrección"}
        </button>
      </div>
    </section>
  );
}
