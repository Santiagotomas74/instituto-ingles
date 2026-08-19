"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Loader2,
  FileEdit,
  User,
  CalendarDays,
  BookOpen,
} from "lucide-react";

export type Boletin = {
  id: string;
  dni: number;
  estudiante_nombre: string;
  estudiante_apellido: string;
  es_mayor_edad?: boolean;
  anio: number;
  nivel: string;
  profesor_nombre?: string;
  profesor_apellido?: string;
  nota_1: number | null;
  nota_2: number | null;
  nota_3: number | null;
  promedio?: number | null;
  behavior_1: string | null;
  behavior_2: string | null;
  behavior_3: string | null;
  ausentes: number | null;
  observaciones_1: string | null;
  observaciones_2: string | null;
  observaciones_3: string | null;
  firma_teacher: string | null;
  firma_coordinator?: string | null;
  aclaracion_padre?: string | null;
  aclaracion_estudiante?: string | null;
  created_at?: string;
  updated_at?: string;
};

export default function EditBoletinForm({ boletin }: { boletin: Boletin }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    nota_1: boletin.nota_1 ?? "",
    nota_2: boletin.nota_2 ?? "",
    nota_3: boletin.nota_3 ?? "",
    behavior_1: boletin.behavior_1 ?? "",
    behavior_2: boletin.behavior_2 ?? "",
    behavior_3: boletin.behavior_3 ?? "",
    ausentes: boletin.ausentes ?? "",
    observaciones_1: boletin.observaciones_1 ?? "",
    observaciones_2: boletin.observaciones_2 ?? "",
    observaciones_3: boletin.observaciones_3 ?? "",
    firma_teacher: boletin.firma_teacher ?? "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch(`/api/teacher/boletines/${boletin.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Error al actualizar boletín");
      }

      router.push("/teacher/boletines");
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg("Error inesperado al guardar los cambios");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
      {/* HEADER CON ACCIONES */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/teacher/boletines"
            className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition"
          >
            <ArrowLeft size={20} className="text-slate-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Editar Boletín
            </h1>
            <p className="text-sm text-slate-500">
              {boletin.estudiante_apellido}, {boletin.estudiante_nombre}
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-semibold transition disabled:opacity-50"
        >
          {loading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Save size={18} />
          )}
          Guardar Cambios
        </button>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
          {errorMsg}
        </div>
      )}

      {/* INFORMACIÓN DEL ESTUDIANTE */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-cyan-100 flex items-center justify-center shrink-0">
            <User className="text-cyan-600" size={24} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {boletin.estudiante_apellido}, {boletin.estudiante_nombre}
            </h2>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500 mt-0.5">
              <span>DNI: {boletin.dni}</span>
              <span className="flex items-center gap-1">
                <BookOpen size={14} /> {boletin.nivel}
              </span>
              <span className="flex items-center gap-1">
                <CalendarDays size={14} /> Año {boletin.anio}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* CALIFICACIONES Y CONDUCTA */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <FileEdit className="text-cyan-600" size={20} />
          Calificaciones y Conducta
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* TRIMESTRE 1 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <h3 className="font-semibold text-slate-800 text-sm">
              1° Trimestre
            </h3>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Nota
              </label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="10"
                name="nota_1"
                value={formData.nota_1}
                onChange={handleChange}
                placeholder="1 - 10"
                className=" text-slate-800 w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-sm focus:border-cyan-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Conducta
              </label>
              <input
                type="text"
                name="behavior_1"
                value={formData.behavior_1}
                onChange={handleChange}
                placeholder="Ej: Excelente"
                className=" text-slate-800 w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-sm focus:border-cyan-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Observaciones
              </label>
              <textarea
                name="observaciones_1"
                rows={3}
                value={formData.observaciones_1}
                onChange={handleChange}
                placeholder="Observaciones del 1° trimestre..."
                className=" text-slate-800 w-full p-3 rounded-xl border border-slate-200 bg-white text-sm focus:border-cyan-500 outline-none resize-none"
              />
            </div>
          </div>

          {/* TRIMESTRE 2 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <h3 className="font-semibold text-slate-800 text-sm">
              2° Trimestre
            </h3>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Nota
              </label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="10"
                name="nota_2"
                value={formData.nota_2}
                onChange={handleChange}
                placeholder="1 - 10"
                className=" text-slate-800 w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-sm focus:border-cyan-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Conducta
              </label>
              <input
                type="text"
                name="behavior_2"
                value={formData.behavior_2}
                onChange={handleChange}
                placeholder="Ej: Muy Bueno"
                className=" text-slate-800 w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-sm focus:border-cyan-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Observaciones
              </label>
              <textarea
                name="observaciones_2"
                rows={3}
                value={formData.observaciones_2}
                onChange={handleChange}
                placeholder="Observaciones del 2° trimestre..."
                className=" text-slate-800 w-full p-3 rounded-xl border border-slate-200 bg-white text-sm focus:border-cyan-500 outline-none resize-none"
              />
            </div>
          </div>

          {/* TRIMESTRE 3 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <h3 className="font-semibold text-slate-800 text-sm">
              3° Trimestre
            </h3>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Nota
              </label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="10"
                name="nota_3"
                value={formData.nota_3}
                onChange={handleChange}
                placeholder="1 - 10"
                className="text-slate-800 w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-sm focus:border-cyan-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Conducta
              </label>
              <input
                type="text"
                name="behavior_3"
                value={formData.behavior_3}
                onChange={handleChange}
                placeholder="Ej: Satisfactorio"
                className=" text-slate-800 w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-sm focus:border-cyan-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Observaciones
              </label>
              <textarea
                name="observaciones_3"
                rows={3}
                value={formData.observaciones_3}
                onChange={handleChange}
                placeholder="Observaciones del 3° trimestre..."
                className=" text-slate-800 w-full p-3 rounded-xl border border-slate-200 bg-white text-sm focus:border-cyan-500 outline-none resize-none"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
