"use client";

import { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  TrendingUp,
  CheckCircle2,
  Hash,
  AlertCircle,
  FileX2,
} from "lucide-react";

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
  const { t } = useTranslation();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [summary, setSummary] = useState<Summary>({
    total: 0,
    approved: 0,
    average: 0,
  });
  const [selected, setSelected] = useState<Grade | null>(null);

  const loadGrades = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/student/grades");

      if (!res.ok) {
        throw new Error(t("grades.errors.server"));
      }

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || t("grades.errors.load"));
      }

      setGrades(data.grades || []);
      setSummary(
        data.summary || {
          total: 0,
          approved: 0,
          average: 0,
        },
      );
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : t("grades.errors.unexpected"),
      );
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    loadGrades();
  }, [loadGrades]);

  if (loading) {
    return <GradesSkeleton />;
  }

  if (error) {
    return (
      <div className="bg-rose-50 border border-rose-200 p-8 rounded-3xl text-center max-w-lg mx-auto mt-12 space-y-4">
        <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />

        <div>
          <h3 className="font-bold text-rose-900 text-lg">
            {t("grades.errors.title")}
          </h3>

          <p className="text-rose-600 mt-1">{error}</p>
        </div>

        <button
          type="button"
          onClick={loadGrades}
          className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-medium transition"
        >
          {t("grades.retry")}
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-800">
            {t("grades.title")}
          </h1>
        </div>

        {/* RESUMEN ESTADÍSTICO */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
          {/* Promedio */}
          <div className="rounded-3xl bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200 p-6 shadow-sm flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-xl bg-blue-200/50 text-blue-700">
                <TrendingUp className="w-5 h-5" />
              </div>

              <p className="text-sm font-semibold text-blue-800">
                {t("grades.summary.average")}
              </p>
            </div>

            <h2 className="text-4xl font-bold text-blue-700">
              {summary.average}
            </h2>
          </div>

          {/* Aprobadas */}
          <div className="rounded-3xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 border border-emerald-200 p-6 shadow-sm flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-xl bg-emerald-200/50 text-emerald-700">
                <CheckCircle2 className="w-5 h-5" />
              </div>

              <p className="text-sm font-semibold text-emerald-800">
                {t("grades.summary.approved")}
              </p>
            </div>

            <h2 className="text-4xl font-bold text-emerald-700">
              {summary.approved}
            </h2>
          </div>

          {/* Total */}
          <div className="rounded-3xl bg-gradient-to-br from-slate-50 to-slate-100/50 border border-slate-200 p-6 shadow-sm flex flex-col justify-between sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-xl bg-slate-200/50 text-slate-700">
                <Hash className="w-5 h-5" />
              </div>

              <p className="text-sm font-semibold text-slate-700">
                {t("grades.summary.total")}
              </p>
            </div>

            <h2 className="text-4xl font-bold text-slate-800">
              {summary.total}
            </h2>
          </div>
        </div>

        {/* LISTADO */}
        {grades.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center flex flex-col items-center justify-center min-h-[300px]">
            <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-4">
              <FileX2 className="w-8 h-8" />
            </div>

            <h3 className="text-lg font-bold text-slate-800">
              {t("grades.empty.title")}
            </h3>

            <p className="text-slate-500 mt-2 max-w-sm">
              {t("grades.empty.description")}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
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

function GradesSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="h-8 bg-slate-200 rounded w-48" />

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-3xl bg-slate-100 h-36 border border-slate-200 p-6 flex flex-col justify-between"
          >
            <div className="h-6 bg-slate-200 rounded w-32" />
            <div className="h-10 bg-slate-200 rounded w-16" />
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="rounded-3xl bg-white border border-slate-100 h-48 shadow-sm p-6"
          />
        ))}
      </div>
    </div>
  );
}
