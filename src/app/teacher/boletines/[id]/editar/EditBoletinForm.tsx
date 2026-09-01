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
  CheckCircle2,
} from "lucide-react";

/*
=====================================================
TIPO BOLETÍN
=====================================================
*/

export type Boletin = {
  id: string;

  teacher_id: string;

  dni: number;

  estudiante_nombre: string;
  estudiante_apellido: string;

  profesor_nombre: string | null;
  profesor_apellido: string | null;

  /*
  INFORMACIÓN GENERAL
  */

  anio: number | null;

  nivel: string | null;

  es_mayor_edad: boolean | null;

  /*
  CALIFICACIONES
  */

  nota_1: number | null;
  nota_2: number | null;
  nota_3: number | null;

  /*
  PROMEDIO GUARDADO EN BD
  */

  promedio: number | null;

  /*
  COMPORTAMIENTO
  */

  behaviour_1: string | null;
  behaviour_2: string | null;
  behaviour_3: string | null;

  /*
  AUSENCIAS
  */

  ausentes: number | null;
  ausentes_2: number | null;
  ausentes_3: number | null;

  /*
  PROMEDIO DE AUSENCIAS GUARDADO EN BD
  */

  ausentes_promedio: number | null;

  /*
  OBSERVACIONES
  */

  observaciones_1: string | null;
  observaciones_2: string | null;
  observaciones_3: string | null;

  /*
  EVALUACIÓN FINAL
  */

  behaviour_final: string | null;
  observaciones_final: string | null;

  /*
  FECHAS
  */

  created_at: string | null;
  updated_at: string | null;
};

/*
=====================================================
TIPO FORM DATA
=====================================================
*/

type FormData = {
  anio: string;
  nivel: string;
  es_mayor_edad: boolean;

  nota_1: string;
  nota_2: string;
  nota_3: string;
  promedio: string;

  behaviour_1: string;
  behaviour_2: string;
  behaviour_3: string;

  ausentes: string;
  ausentes_2: string;
  ausentes_3: string;

  observaciones_1: string;
  observaciones_2: string;
  observaciones_3: string;

  behaviour_final: string;
  observaciones_final: string;
};

/*
=====================================================
COMPONENTE
=====================================================
*/

export default function EditBoletinForm({ boletin }: { boletin: Boletin }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");

  const [successMsg, setSuccessMsg] = useState("");

  /*
  =====================================================
  FORM DATA
  =====================================================
  */

  const [formData, setFormData] = useState<FormData>({
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

    promedio: boletin.promedio?.toString() ?? "",

    /*
    COMPORTAMIENTO
    */

    behaviour_1: boletin.behaviour_1 ?? "",

    behaviour_2: boletin.behaviour_2 ?? "",

    behaviour_3: boletin.behaviour_3 ?? "",

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

    behaviour_final: boletin.behaviour_final ?? "",

    observaciones_final: boletin.observaciones_final ?? "",
  });

  /*
  =====================================================
  HANDLE CHANGE
  =====================================================
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
  =====================================================
  HANDLE MAYOR DE EDAD
  =====================================================
  */

  const handleMayorEdadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      es_mayor_edad: e.target.checked,
    }));
  };

  /*
  =====================================================
  PROMEDIO DE NOTAS
  =====================================================
  */

  const notas = [formData.nota_1, formData.nota_2, formData.nota_3]
    .filter((value) => value !== "")
    .map(Number)
    .filter((value) => !Number.isNaN(value));

  const promedioCalculado =
    notas.length > 0
      ? notas.reduce((total, nota) => total + nota, 0) / notas.length
      : null;

  /*
  =====================================================
  PROMEDIO DE AUSENCIAS
  =====================================================
  */

  const ausencias = [
    formData.ausentes,
    formData.ausentes_2,
    formData.ausentes_3,
  ]
    .filter((value) => value !== "")
    .map(Number)
    .filter((value) => !Number.isNaN(value));

  const promedioAusenciasCalculado =
    ausencias.length > 0
      ? ausencias.reduce((total, value) => total + value, 0) / ausencias.length
      : null;

  /*
  =====================================================
  SUBMIT
  =====================================================
  */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    setErrorMsg("");

    setSuccessMsg("");

    try {
      /*
      =================================================
      PAYLOAD
      =================================================

      Este payload está alineado con el PATCH.
      */

      const payload = {
        /*
        INFORMACIÓN GENERAL
        */

        anio: formData.anio === "" ? null : Number(formData.anio),

        nivel: formData.nivel.trim() === "" ? null : formData.nivel.trim(),

        es_mayor_edad: formData.es_mayor_edad,

        /*
        NOTAS
        */

        nota_1: formData.nota_1 === "" ? null : Number(formData.nota_1),

        nota_2: formData.nota_2 === "" ? null : Number(formData.nota_2),

        nota_3: formData.nota_3 === "" ? null : Number(formData.nota_3),

        promedio: formData.promedio === "" ? null : Number(formData.promedio),

        /*
        COMPORTAMIENTO
        */

        behaviour_1: formData.behaviour_1 === "" ? null : formData.behaviour_1,

        behaviour_2: formData.behaviour_2 === "" ? null : formData.behaviour_2,

        behaviour_3: formData.behaviour_3 === "" ? null : formData.behaviour_3,

        /*
        AUSENCIAS
        */

        ausentes: formData.ausentes === "" ? null : Number(formData.ausentes),

        ausentes_2:
          formData.ausentes_2 === "" ? null : Number(formData.ausentes_2),

        ausentes_3:
          formData.ausentes_3 === "" ? null : Number(formData.ausentes_3),

        /*
        OBSERVACIONES
        */

        observaciones_1:
          formData.observaciones_1.trim() === ""
            ? null
            : formData.observaciones_1.trim(),

        observaciones_2:
          formData.observaciones_2.trim() === ""
            ? null
            : formData.observaciones_2.trim(),

        observaciones_3:
          formData.observaciones_3.trim() === ""
            ? null
            : formData.observaciones_3.trim(),

        /*
        EVALUACIÓN FINAL
        */

        behaviour_final:
          formData.behaviour_final === "" ? null : formData.behaviour_final,

        observaciones_final:
          formData.observaciones_final.trim() === ""
            ? null
            : formData.observaciones_final.trim(),
      };

      /*
      =================================================
      PATCH
      =================================================
      */

      const res = await fetch(
        `/api/teacher/boletines/editar/${encodeURIComponent(boletin.id)}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(payload),
        },
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Error al actualizar el boletín");
      }

      /*
      =================================================
      ÉXITO
      =================================================
      */

      setSuccessMsg("Boletín actualizado correctamente.");

      setTimeout(() => {
        router.push("/teacher/boletines");
        router.refresh();
      }, 700);
    } catch (error: unknown) {
      console.error("Error actualizando boletín:", error);

      if (error instanceof Error) {
        setErrorMsg(error.message);
      } else {
        setErrorMsg("Error inesperado al guardar los cambios.");
      }
    } finally {
      setLoading(false);
    }
  };

  /*
  =====================================================
  RENDER
  =====================================================
  */

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl mx-auto pb-10">
      {/* =================================================
          HEADER
      ================================================= */}

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
            disabled:cursor-not-allowed
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

      {/* =================================================
          MENSAJES
      ================================================= */}

      {errorMsg && (
        <div
          className="
            p-4
            rounded-2xl
            bg-red-50
            border
            border-red-200
            text-red-600
            text-sm
          "
        >
          {errorMsg}
        </div>
      )}

      {successMsg && (
        <div
          className="
            p-4
            rounded-2xl
            bg-green-50
            border
            border-green-200
            text-green-700
            text-sm
            flex
            items-center
            gap-2
          "
        >
          <CheckCircle2 size={18} />

          {successMsg}
        </div>
      )}

      {/* =================================================
          INFORMACIÓN DEL ALUMNO
      ================================================= */}

      <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div
            className="
              w-12
              h-12
              rounded-2xl
              bg-cyan-100
              flex
              items-center
              justify-center
              shrink-0
            "
          >
            <User className="text-cyan-600" size={24} />
          </div>

          <div className="flex-1">
            <h2 className="text-lg font-bold text-slate-900">
              {boletin.estudiante_apellido}, {boletin.estudiante_nombre}
            </h2>

            <div
              className="
                flex
                flex-wrap
                items-center
                gap-x-4
                gap-y-1
                text-sm
                text-slate-500
                mt-1
              "
            >
              <span>DNI: {boletin.dni}</span>

              <span className="flex items-center gap-1">
                <BookOpen size={14} />

                {boletin.nivel || "-"}
              </span>

              <span className="flex items-center gap-1">
                <CalendarDays size={14} />
                Año {boletin.anio ?? "-"}
              </span>
            </div>

            {/* PROFESOR */}

            {(boletin.profesor_nombre || boletin.profesor_apellido) && (
              <p className="text-sm text-slate-500 mt-2">
                Profesor:{" "}
                <span className="font-medium text-slate-700">
                  {boletin.profesor_apellido}, {boletin.profesor_nombre}
                </span>
              </p>
            )}
          </div>
        </div>
      </section>

      {/* =================================================
          DATOS GENERALES
      ================================================= */}

      <section
        className="
          bg-white
          border
          border-slate-200
          rounded-3xl
          shadow-sm
          overflow-hidden
        "
      >
        <div
          className="
            border-b
            bg-slate-50
            px-6
            py-5
          "
        >
          <h2 className="font-bold text-slate-900">Datos generales</h2>

          <p className="text-sm text-slate-500 mt-1">
            Información general del período académico.
          </p>
        </div>

        <div className="p-6 grid md:grid-cols-3 gap-6">
          {/* AÑO */}

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Año
            </label>

            <input
              type="number"
              name="anio"
              value={formData.anio}
              onChange={handleChange}
              min="2000"
              max="2100"
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

          {/* NIVEL */}

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

          {/* MAYOR DE EDAD */}

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

      {/* =================================================
          CALIFICACIONES
      ================================================= */}

      <section
        className="
          bg-white
          border
          border-slate-200
          rounded-3xl
          p-6
          shadow-sm
          space-y-6
        "
      >
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <FileEdit className="text-cyan-600" size={20} />
          Calificaciones
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((period) => {
            const notaField = `nota_${period}` as
              | "nota_1"
              | "nota_2"
              | "nota_3";

            const behaviorField = `behaviour_${period}` as
              | "behaviour_1"
              | "behaviour_2"
              | "behaviour_3";

            const observationField = `observaciones_${period}` as
              | "observaciones_1"
              | "observaciones_2"
              | "observaciones_3";

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

                {/* NOTA */}

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

                {/* COMPORTAMIENTO */}

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

                {/* OBSERVACIONES */}

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

        <div
          className="
            rounded-2xl
            bg-cyan-50
            border
            border-cyan-100
            p-5
            flex
            items-center
            justify-between
          "
        >
          <div>
            <p className="text-sm font-semibold text-cyan-700">Promedio</p>

            <p className="text-xs text-cyan-600 mt-1">
              Se recalcula automáticamente según las notas.
            </p>

            {boletin.promedio !== null && (
              <p className="text-xs text-slate-500 mt-2">
                Promedio guardado actualmente:{" "}
                <span className="font-semibold">
                  {Number(boletin.promedio).toFixed(2)}
                </span>
              </p>
            )}
          </div>

          <span className="text-3xl font-bold text-cyan-700">
            {promedioCalculado !== null ? promedioCalculado.toFixed(2) : "-"}
          </span>
        </div>
      </section>

      {/* =================================================
          ASISTENCIA
      ================================================= */}

      <section
        className="
          bg-white
          border
          border-slate-200
          rounded-3xl
          shadow-sm
          overflow-hidden
        "
      >
        <div
          className="
            border-b
            bg-slate-50
            px-6
            py-5
            flex
            items-center
            gap-3
          "
        >
          <CalendarDays className="text-cyan-600" />

          <div>
            <h2 className="font-bold text-slate-900">Asistencia</h2>

            <p className="text-sm text-slate-500">
              Modifica las ausencias correspondientes a cada trimestre.
            </p>
          </div>
        </div>

        <div className="p-6 grid md:grid-cols-3 gap-6">
          {/* AUSENTES 1 */}

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Ausentes 1
            </label>

            <input
              type="number"
              min="0"
              name="ausentes"
              value={formData.ausentes}
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

          {/* AUSENTES 2 */}

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Ausentes 2
            </label>

            <input
              type="number"
              min="0"
              name="ausentes_2"
              value={formData.ausentes_2}
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

          {/* AUSENTES 3 */}

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Ausentes 3
            </label>

            <input
              type="number"
              min="0"
              name="ausentes_3"
              value={formData.ausentes_3}
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

          {/* PROMEDIO AUSENCIAS */}

          <div className="md:col-span-3">
            <div
              className="
                rounded-2xl
                bg-orange-50
                border
                border-orange-100
                p-5
                flex
                items-center
                justify-between
              "
            >
              <div>
                <p className="text-sm font-semibold text-orange-700">
                  Promedio de ausencias
                </p>

                <p className="text-xs text-orange-600 mt-1">
                  Se recalcula automáticamente.
                </p>

                {boletin.ausentes_promedio !== null && (
                  <p className="text-xs text-slate-500 mt-2">
                    Promedio guardado actualmente:{" "}
                    <span className="font-semibold">
                      {Number(boletin.ausentes_promedio).toFixed(2)}
                    </span>
                  </p>
                )}
              </div>

              <span className="text-3xl font-bold text-orange-700">
                {promedioAusenciasCalculado !== null
                  ? promedioAusenciasCalculado.toFixed(2)
                  : "-"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          EVALUACIÓN FINAL
      ================================================= */}

      <section
        className="
          bg-white
          border
          border-slate-200
          rounded-3xl
          shadow-sm
          overflow-hidden
        "
      >
        <div
          className="
            border-b
            bg-slate-50
            px-6
            py-5
            flex
            items-center
            gap-3
          "
        >
          <ClipboardList className="text-cyan-600" />

          <div>
            <h2 className="font-bold text-slate-900">Evaluación final</h2>

            <p className="text-sm text-slate-500">
              Resultado general del alumno.
            </p>
          </div>
        </div>

        <div className="p-6 grid md:grid-cols-2 gap-6">
          {/* COMPORTAMIENTO FINAL */}

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Comportamiento final
            </label>

            <select
              name="behaviour_final"
              value={formData.behaviour_final}
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

          {/* OBSERVACIÓN FINAL */}

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

      {/* =================================================
          INFORMACIÓN DEL SISTEMA
      ================================================= */}

      <section
        className="
          bg-slate-50
          border
          border-slate-200
          rounded-3xl
          p-6
        "
      >
        <h2 className="font-bold text-slate-900">Información del boletín</h2>

        <div className="grid md:grid-cols-3 gap-4 mt-4 text-sm">
          {/* ID */}

          <div>
            <p className="text-slate-500">ID del boletín</p>

            <p className="font-medium text-slate-700 break-all mt-1">
              {boletin.id}
            </p>
          </div>

          {/* TEACHER ID */}

          <div>
            <p className="text-slate-500">ID del profesor</p>

            <p className="font-medium text-slate-700 break-all mt-1">
              {boletin.teacher_id}
            </p>
          </div>

          {/* PROFESOR */}

          <div>
            <p className="text-slate-500">Profesor</p>

            <p className="font-medium text-slate-700 mt-1">
              {boletin.profesor_apellido || boletin.profesor_nombre
                ? `${boletin.profesor_apellido ?? ""}${
                    boletin.profesor_apellido && boletin.profesor_nombre
                      ? ", "
                      : ""
                  }${boletin.profesor_nombre ?? ""}`
                : "-"}
            </p>
          </div>

          {/* CREATED */}

          <div>
            <p className="text-slate-500">Creado</p>

            <p className="font-medium text-slate-700 mt-1">
              {boletin.created_at
                ? new Date(boletin.created_at).toLocaleString("es-AR")
                : "-"}
            </p>
          </div>

          {/* UPDATED */}

          <div>
            <p className="text-slate-500">Última modificación</p>

            <p className="font-medium text-slate-700 mt-1">
              {boletin.updated_at
                ? new Date(boletin.updated_at).toLocaleString("es-AR")
                : "-"}
            </p>
          </div>
        </div>
      </section>

      {/* =================================================
          FIRMAS
      ================================================= */}

      <section
        className="
          bg-cyan-50
          border
          border-cyan-100
          rounded-3xl
          p-6
        "
      >
        <h2 className="font-bold text-cyan-900">Firmas</h2>

        <p className="text-sm text-cyan-700 mt-2">
          Las firmas del profesor y del coordinador ya no se editan desde el
          boletín. Se obtienen automáticamente desde los perfiles
          correspondientes.
        </p>
      </section>

      {/* =================================================
          FOOTER
      ================================================= */}

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
