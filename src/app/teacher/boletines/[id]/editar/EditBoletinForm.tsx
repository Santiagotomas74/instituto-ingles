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
  ClipboardList,
  MessageSquareText,
  CheckCircle2,
} from "lucide-react";

export type Boletin = {
  id: string;

  dni: number;

  estudiante_nombre: string;
  estudiante_apellido: string;

  es_mayor_edad?: boolean | null;

  anio: number;

  nivel: string | null;

  profesor_nombre?: string;
  profesor_apellido?: string;

  nota_1: number | null;
  nota_2: number | null;
  nota_3: number | null;

  promedio?: number | null;

  behavoir_1: string | null;
  behavoir_2: string | null;
  behavoir_3: string | null;

  ausentes: number | null;
  ausentes_2?: number | null;
  ausentes_3?: number | null;

  observaciones_1: string | null;
  observaciones_2: string | null;
  observaciones_3: string | null;

  behavoir_final?: string | null;
  observaciones_final?: string | null;

  aclaracion_padre?: string | null;
  aclaracion_estudiante?: string | null;

  created_at?: string;
  updated_at?: string;
};

export default function EditBoletinForm({ boletin }: { boletin: Boletin }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  /*
  =====================================
  FORM DATA
  =====================================
  */

  const [formData, setFormData] = useState({
    /*
    INFORMACIÓN GENERAL
    */

    anio: boletin.anio?.toString() ?? "",

    nivel: boletin.nivel ?? "",

    es_mayor_edad: boletin.es_mayor_edad ?? false,

    /*
    NOTAS
    */

    nota_1: boletin.nota_1?.toString() ?? "",

    nota_2: boletin.nota_2?.toString() ?? "",

    nota_3: boletin.nota_3?.toString() ?? "",

    /*
    COMPORTAMIENTO
    */

    behavoir_1: boletin.behavoir_1 ?? "",

    behavoir_2: boletin.behavoir_2 ?? "",

    behavoir_3: boletin.behavoir_3 ?? "",

    /*
    AUSENCIAS
    */

    ausentes: boletin.ausentes?.toString() ?? "",

    ausentes_2: boletin.ausentes_2?.toString() ?? "",

    ausentes_3: boletin.ausentes_3?.toString() ?? "",

    /*
    OBSERVACIONES
    */

    observaciones_1: boletin.observaciones_1 ?? "",

    observaciones_2: boletin.observaciones_2 ?? "",

    observaciones_3: boletin.observaciones_3 ?? "",

    /*
    EVALUACIÓN FINAL
    */

    behavoir_final: boletin.behavoir_final ?? "",

    observaciones_final: boletin.observaciones_final ?? "",

    /*
    ACLARACIONES
    */

    aclaracion_padre: boletin.aclaracion_padre ?? "",

    aclaracion_estudiante: boletin.aclaracion_estudiante ?? "",
  });

  /*
  =====================================
  HANDLE CHANGE
  =====================================
  */

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /*
  =====================================
  HANDLE CHECKBOX
  =====================================
  */

  const handleMayorEdadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      es_mayor_edad: e.target.checked,
    }));
  };

  /*
  =====================================
  PROMEDIO
  =====================================
  */

  const notas = [formData.nota_1, formData.nota_2, formData.nota_3]
    .filter((value) => value !== "")
    .map(Number)
    .filter((value) => !Number.isNaN(value));

  const promedio =
    notas.length > 0
      ? notas.reduce((total, nota) => total + nota, 0) / notas.length
      : null;

  /*
  =====================================
  PROMEDIO AUSENCIAS
  =====================================
  */

  const ausencias = [
    formData.ausentes,
    formData.ausentes_2,
    formData.ausentes_3,
  ]
    .filter((value) => value !== "")
    .map(Number)
    .filter((value) => !Number.isNaN(value));

  const promedioAusencias =
    ausencias.length > 0
      ? ausencias.reduce((total, value) => total + value, 0) / ausencias.length
      : null;

  /*
  =====================================
  SUBMIT
  =====================================
  */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await fetch(`/api/teacher/boletines?id=${boletin.id}`, {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Error al actualizar boletín");
      }

      setSuccessMsg("Boletín actualizado correctamente.");

      /*
      Esperamos un momento para que el usuario
      vea el mensaje.
      */

      setTimeout(() => {
        router.push("/teacher/boletines");
        router.refresh();
      }, 700);
    } catch (err: unknown) {
      console.error("Error actualizando boletín:", err);

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
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl mx-auto pb-10">
      {/* =====================================
          HEADER
      ===================================== */}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/teacher/boletines"
            className="
              w-10
              h-10
              rounded-xl
              bg-slate-100
              hover:bg-slate-200
              flex
              items-center
              justify-center
              transition
            "
          >
            <ArrowLeft size={20} className="text-slate-600" />
          </Link>

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Editar boletín
            </h1>

            <p className="text-sm text-slate-500">
              {boletin.estudiante_apellido}, {boletin.estudiante_nombre}
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            h-11
            px-6
            rounded-xl
            bg-cyan-600
            hover:bg-cyan-700
            text-white
            font-semibold
            transition
            disabled:opacity-50
          "
        >
          {loading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Save size={18} />
          )}

          {loading ? "Guardando..." : "Guardar cambios"}
        </button>
      </div>

      {/* =====================================
          MENSAJES
      ===================================== */}

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-sm">
          {errorMsg}
        </div>
      )}

      {successMsg && (
        <div className="p-4 rounded-2xl bg-green-50 border border-green-200 text-green-700 text-sm flex items-center gap-2">
          <CheckCircle2 size={18} />

          {successMsg}
        </div>
      )}

      {/* =====================================
          INFORMACIÓN DEL ALUMNO
      ===================================== */}

      <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-cyan-100 flex items-center justify-center shrink-0">
            <User className="text-cyan-600" size={24} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {boletin.estudiante_apellido}, {boletin.estudiante_nombre}
            </h2>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500 mt-1">
              <span>DNI: {boletin.dni}</span>

              <span className="flex items-center gap-1">
                <BookOpen size={14} />

                {boletin.nivel || "-"}
              </span>

              <span className="flex items-center gap-1">
                <CalendarDays size={14} />
                Año {boletin.anio}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================
          DATOS GENERALES
      ===================================== */}

      <section className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="border-b bg-slate-50 px-6 py-5">
          <h2 className="font-bold text-slate-900">Datos generales</h2>

          <p className="text-sm text-slate-500 mt-1">
            Información general del período académico.
          </p>
        </div>

        <div className="p-6 grid md:grid-cols-3 gap-6">
          {/* Año */}

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Año
            </label>

            <input
              type="number"
              name="anio"
              value={formData.anio}
              onChange={handleChange}
              className="
                text-slate-800
                w-full
                h-11
                px-3
                rounded-xl
                border
                border-slate-200
                bg-white
                text-sm
                focus:border-cyan-500
                focus:ring-2
                focus:ring-cyan-100
                outline-none
              "
            />
          </div>

          {/* Nivel */}

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Nivel
            </label>

            <input
              type="text"
              name="nivel"
              value={formData.nivel}
              onChange={handleChange}
              placeholder="Ej. Intermediate"
              className="
                text-slate-800
                w-full
                h-11
                px-3
                rounded-xl
                border
                border-slate-200
                bg-white
                text-sm
                focus:border-cyan-500
                focus:ring-2
                focus:ring-cyan-100
                outline-none
              "
            />
          </div>

          {/* Mayor de edad */}

          <label className="flex items-center gap-3 cursor-pointer md:pt-7">
            <input
              type="checkbox"
              name="es_mayor_edad"
              checked={formData.es_mayor_edad}
              onChange={handleMayorEdadChange}
              className="
                w-5
                h-5
                rounded
                border-slate-300
                text-cyan-600
                focus:ring-cyan-500
              "
            />

            <span className="text-sm font-medium text-slate-700">
              El alumno es mayor de edad
            </span>
          </label>
        </div>
      </section>

      {/* =====================================
          CALIFICACIONES
      ===================================== */}

      <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <FileEdit className="text-cyan-600" size={20} />
          Calificaciones
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((period) => {
            const notaField = `nota_${period}` as keyof typeof formData;

            const behaviorField = `behavoir_${period}` as keyof typeof formData;

            const observationField =
              `observaciones_${period}` as keyof typeof formData;

            return (
              <div
                key={period}
                className="
                  p-4
                  rounded-2xl
                  bg-slate-50
                  border
                  border-slate-200
                  space-y-4
                "
              >
                <h3 className="font-semibold text-slate-800 text-sm">
                  {period}° Trimestre
                </h3>

                {/* Nota */}

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Nota
                  </label>

                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    name={notaField}
                    value={formData[notaField]}
                    onChange={handleChange}
                    placeholder="0 - 10"
                    className="
                      text-slate-800
                      w-full
                      h-10
                      px-3
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      text-sm
                      focus:border-cyan-500
                      outline-none
                    "
                  />
                </div>

                {/* Conducta */}

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Conducta
                  </label>

                  <select
                    name={behaviorField}
                    value={formData[behaviorField]}
                    onChange={handleChange}
                    className="
                      text-slate-800
                      w-full
                      h-10
                      px-3
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      text-sm
                      focus:border-cyan-500
                      outline-none
                    "
                  >
                    <option value="">Seleccionar</option>

                    <option value="Excellent">Excellent</option>

                    <option value="Very Good">Very Good</option>

                    <option value="Good">Good</option>

                    <option value="Needs Improvement">Needs Improvement</option>
                  </select>
                </div>

                {/* Observaciones */}

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Observaciones
                  </label>

                  <textarea
                    name={observationField}
                    rows={3}
                    value={formData[observationField]}
                    onChange={handleChange}
                    placeholder={`Observaciones del ${period}° trimestre...`}
                    className="
                      text-slate-800
                      w-full
                      p-3
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      text-sm
                      focus:border-cyan-500
                      outline-none
                      resize-none
                    "
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* PROMEDIO */}

        <div className="rounded-2xl bg-cyan-50 border border-cyan-100 p-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-cyan-700">Promedio</p>

            <p className="text-xs text-cyan-600 mt-1">
              Calculado automáticamente
            </p>
          </div>

          <span className="text-3xl font-bold text-cyan-700">
            {promedio !== null ? promedio.toFixed(2) : "-"}
          </span>
        </div>
      </section>

      {/* =====================================
          ASISTENCIA
      ===================================== */}

      <section className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="border-b bg-slate-50 px-6 py-5 flex items-center gap-3">
          <CalendarDays className="text-cyan-600" />

          <div>
            <h2 className="font-bold text-slate-900">Asistencia</h2>

            <p className="text-sm text-slate-500">
              Modifica las ausencias correspondientes a cada trimestre.
            </p>
          </div>
        </div>

        <div className="p-6 grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((period) => {
            const field =
              period === 1
                ? "ausentes"
                : (`ausentes_${period}` as "ausentes_2" | "ausentes_3");

            return (
              <div key={period}>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Ausentes {period}
                </label>

                <input
                  type="number"
                  min="0"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder="0"
                  className="
                    text-slate-800
                    w-full
                    h-11
                    px-3
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    text-sm
                    focus:border-cyan-500
                    outline-none
                  "
                />
              </div>
            );
          })}

          {/* PROMEDIO AUSENCIAS */}

          <div className="md:col-span-3">
            <div className="rounded-2xl bg-orange-50 border border-orange-100 p-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-orange-700">
                  Promedio de ausencias
                </p>

                <p className="text-xs text-orange-600 mt-1">
                  Calculado automáticamente
                </p>
              </div>

              <span className="text-3xl font-bold text-orange-700">
                {promedioAusencias !== null
                  ? promedioAusencias.toFixed(2)
                  : "-"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================
          EVALUACIÓN FINAL
      ===================================== */}

      <section className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="border-b bg-slate-50 px-6 py-5 flex items-center gap-3">
          <ClipboardList className="text-cyan-600" />

          <div>
            <h2 className="font-bold text-slate-900">Evaluación final</h2>

            <p className="text-sm text-slate-500">
              Resultado general del alumno.
            </p>
          </div>
        </div>

        <div className="p-6 grid md:grid-cols-2 gap-6">
          {/* Conducta final */}

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Comportamiento final
            </label>

            <select
              name="behavoir_final"
              value={formData.behavoir_final}
              onChange={handleChange}
              className="
                text-slate-800
                w-full
                h-11
                px-3
                rounded-xl
                border
                border-slate-200
                bg-white
                text-sm
                focus:border-cyan-500
                outline-none
              "
            >
              <option value="">Seleccionar</option>

              <option value="Excellent">Excellent</option>

              <option value="Very Good">Very Good</option>

              <option value="Good">Good</option>

              <option value="Needs Improvement">Needs Improvement</option>
            </select>
          </div>

          {/* Observación final */}

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Observación final
            </label>

            <textarea
              name="observaciones_final"
              rows={4}
              value={formData.observaciones_final}
              onChange={handleChange}
              placeholder="Observación final..."
              className="
                text-slate-800
                w-full
                p-3
                rounded-xl
                border
                border-slate-200
                bg-white
                text-sm
                focus:border-cyan-500
                outline-none
                resize-none
              "
            />
          </div>
        </div>
      </section>

      {/* =====================================
          ACLARACIONES
      ===================================== */}

      <section className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="border-b bg-slate-50 px-6 py-5 flex items-center gap-3">
          <MessageSquareText className="text-cyan-600" />

          <div>
            <h2 className="font-bold text-slate-900">Aclaraciones</h2>

            <p className="text-sm text-slate-500">
              Datos correspondientes a la firma del boletín.
            </p>
          </div>
        </div>

        <div className="p-6 grid md:grid-cols-2 gap-6">
          {/* Padre */}

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Aclaración del padre
            </label>

            <input
              type="text"
              name="aclaracion_padre"
              value={formData.aclaracion_padre}
              onChange={handleChange}
              placeholder="Nombre y apellido"
              className="
                text-slate-800
                w-full
                h-11
                px-3
                rounded-xl
                border
                border-slate-200
                bg-white
                text-sm
                focus:border-cyan-500
                outline-none
              "
            />
          </div>

          {/* Estudiante */}

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Aclaración del estudiante
            </label>

            <input
              type="text"
              name="aclaracion_estudiante"
              value={formData.aclaracion_estudiante}
              onChange={handleChange}
              placeholder="Nombre y apellido"
              className="
                text-slate-800
                w-full
                h-11
                px-3
                rounded-xl
                border
                border-slate-200
                bg-white
                text-sm
                focus:border-cyan-500
                outline-none
              "
            />
          </div>
        </div>
      </section>

      {/* =====================================
          FIRMAS
      ===================================== */}

      <section className="bg-cyan-50 border border-cyan-100 rounded-3xl p-6">
        <h2 className="font-bold text-cyan-900">Firmas</h2>

        <p className="text-sm text-cyan-700 mt-2">
          Las firmas del profesor y del coordinador ya no se editan desde el
          boletín. Se obtienen automáticamente desde los perfiles
          correspondientes.
        </p>
      </section>

      {/* =====================================
          FOOTER
      ===================================== */}

      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
        <Link
          href="/teacher/boletines"
          className="
            h-12
            px-6
            rounded-xl
            border
            border-slate-300
            bg-white
            hover:bg-slate-50
            text-slate-700
            font-medium
            transition
            flex
            items-center
            justify-center
          "
        >
          Cancelar
        </Link>

        <button
          type="submit"
          disabled={loading}
          className="
            h-12
            px-7
            rounded-xl
            bg-cyan-600
            hover:bg-cyan-700
            active:bg-cyan-800
            disabled:opacity-50
            disabled:cursor-not-allowed
            text-white
            font-semibold
            flex
            items-center
            justify-center
            gap-2
            transition
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
  );
}
