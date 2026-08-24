"use client";

import Link from "next/link";
import {
  ArrowLeft,
  User,
  GraduationCap,
  CalendarDays,
  BookOpen,
  ClipboardList,
  FileText,
  UserCheck,
  CheckCircle2,
} from "lucide-react";

export type AdminBoletin = {
  id: string;

  teacher_id: string;

  dni: number | string | null;

  estudiante_nombre: string | null;
  estudiante_apellido: string | null;

  profesor_nombre: string | null;
  profesor_apellido: string | null;

  anio: number | null;
  nivel: string | null;
  es_mayor_edad: boolean | null;

  /*
  CALIFICACIONES
  */

  nota_1: number | null;
  nota_2: number | null;
  nota_3: number | null;
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
  FIRMA DEL PROFESOR
  */

  firma_url: string | null;

  created_at?: string | null;
  updated_at?: string | null;
};

type AdminBoletinDetailProps = {
  boletin: AdminBoletin;
};

function formatNumber(value: number | null | undefined) {
  if (value === null || value === undefined) return "-";

  return Number(value).toFixed(2);
}

function formatDate(value: string | null | undefined) {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function formatBehaviour(value: string | null | undefined) {
  if (!value) return "-";

  return value;
}

export default function AdminBoletinDetail({
  boletin,
}: AdminBoletinDetailProps) {
  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-10">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/boletines"
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
              Detalle del boletín
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              Información completa del boletín académico.
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================
          IDENTIFICACIÓN DEL ALUMNO
      ===================================================== */}

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
            border-slate-200
            bg-slate-50
            px-6
            py-5
            flex
            items-center
            gap-3
          "
        >
          <div
            className="
              w-11
              h-11
              rounded-2xl
              bg-cyan-100
              flex
              items-center
              justify-center
            "
          >
            <User size={22} className="text-cyan-600" />
          </div>

          <div>
            <h2 className="font-bold text-slate-900">Información del alumno</h2>

            <p className="text-sm text-slate-500">
              Datos personales y académicos.
            </p>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-5">
            <div
              className="
                w-16
                h-16
                rounded-2xl
                bg-cyan-100
                flex
                items-center
                justify-center
                shrink-0
              "
            >
              <User size={30} className="text-cyan-600" />
            </div>

            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-900">
                {boletin.estudiante_apellido || "-"},{" "}
                {boletin.estudiante_nombre || "-"}
              </h3>

              <div
                className="
                  flex
                  flex-wrap
                  items-center
                  gap-x-5
                  gap-y-2
                  mt-2
                  text-sm
                  text-slate-500
                "
              >
                <span className="flex items-center gap-1.5">
                  <span className="font-medium text-slate-600">DNI:</span>
                  {boletin.dni || "-"}
                </span>

                <span className="flex items-center gap-1.5 ">
                  <BookOpen size={15} />
                  {boletin.nivel || "-"}
                </span>

                <span className="flex items-center gap-1.5">
                  <CalendarDays size={15} />
                  Año {boletin.anio || "-"}
                </span>

                <span>
                  {boletin.es_mayor_edad ? "Mayor de edad" : "Menor de edad"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PROFESOR
      ===================================================== */}

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
            border-slate-200
            bg-slate-50
            px-6
            py-5
            flex
            items-center
            gap-3
          "
        >
          <div
            className="
              w-11
              h-11
              rounded-2xl
              bg-violet-100
              flex
              items-center
              justify-center
            "
          >
            <GraduationCap size={22} className="text-violet-600" />
          </div>

          <div>
            <h2 className="font-bold text-slate-900">Profesor responsable</h2>

            <p className="text-sm text-slate-500">
              Profesor que creó este boletín.
            </p>
          </div>
        </div>

        <div className="p-6 grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Nombre
            </label>

            <div
              className="
                h-11
                px-4
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                flex
                items-center
                text-sm
                text-slate-800
              "
            >
              {boletin.profesor_nombre || "-"}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Apellido
            </label>

            <div
              className="
                h-11
                px-4
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                flex
                items-center
                text-sm
                text-slate-800
              "
            >
              {boletin.profesor_apellido || "-"}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
              ID del profesor
            </label>

            <div
              className="
                h-11
                px-4
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                flex
                items-center
                text-sm
                text-slate-800
                break-all
              "
            >
              {boletin.teacher_id}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CALIFICACIONES
      ===================================================== */}

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
        <div className="flex items-center gap-3">
          <div
            className="
              w-10
              h-10
              rounded-xl
              bg-cyan-100
              flex
              items-center
              justify-center
            "
          >
            <ClipboardList size={20} className="text-cyan-600" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900">Calificaciones</h2>

            <p className="text-sm text-slate-500">
              Resultados correspondientes a cada trimestre.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              period: 1,
              nota: boletin.nota_1,
              behaviour: boletin.behaviour_1,
              observacion: boletin.observaciones_1,
            },
            {
              period: 2,
              nota: boletin.nota_2,
              behaviour: boletin.behaviour_2,
              observacion: boletin.observaciones_2,
            },
            {
              period: 3,
              nota: boletin.nota_3,
              behaviour: boletin.behaviour_3,
              observacion: boletin.observaciones_3,
            },
          ].map((item) => (
            <div
              key={item.period}
              className="
                rounded-2xl
                border
                border-slate-200
                bg-slate-50
                p-5
                space-y-5
              "
            >
              <h3 className="font-bold text-slate-800">
                {item.period}° Trimestre
              </h3>

              {/* NOTA */}

              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                  Nota
                </p>

                <div
                  className="
                    h-12
                    rounded-xl
                    bg-white
                    border
                    border-slate-200
                    flex
                    items-center
                    justify-center
                  "
                >
                  <span className="text-2xl font-bold text-cyan-700">
                    {item.nota ?? "-"}
                  </span>
                </div>
              </div>

              {/* CONDUCTA */}

              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                  Conducta
                </p>

                <div
                  className="
                    min-h-11
                    px-4
                    py-2
                    rounded-xl
                    bg-white
                    border
                    border-slate-200
                    flex
                    items-center
                    text-sm
                    text-slate-700
                  "
                >
                  {formatBehaviour(item.behaviour)}
                </div>
              </div>

              {/* OBSERVACIÓN */}

              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                  Observaciones
                </p>

                <div
                  className="
                    min-h-24
                    p-3
                    rounded-xl
                    bg-white
                    border
                    border-slate-200
                    text-sm
                    text-slate-700
                    whitespace-pre-wrap
                  "
                >
                  {item.observacion || "-"}
                </div>
              </div>
            </div>
          ))}
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
            <p className="text-sm font-semibold text-cyan-700">
              Promedio general
            </p>

            <p className="text-xs text-cyan-600 mt-1">
              Promedio registrado en el boletín.
            </p>
          </div>

          <span className="text-3xl font-bold text-cyan-700">
            {formatNumber(boletin.promedio)}
          </span>
        </div>
      </section>

      {/* =====================================================
          ASISTENCIA
      ===================================================== */}

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
            border-slate-200
            bg-slate-50
            px-6
            py-5
            flex
            items-center
            gap-3
          "
        >
          <CalendarDays className="text-orange-600" size={22} />

          <div>
            <h2 className="font-bold text-slate-900">Asistencia</h2>

            <p className="text-sm text-slate-500">
              Ausencias registradas durante el año.
            </p>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                label: "1° Trimestre",
                value: boletin.ausentes,
              },
              {
                label: "2° Trimestre",
                value: boletin.ausentes_2,
              },
              {
                label: "3° Trimestre",
                value: boletin.ausentes_3,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="
                  rounded-2xl
                  border
                  border-slate-200
                  bg-slate-50
                  p-5
                  text-center
                "
              >
                <p className="text-sm font-semibold text-slate-600">
                  {item.label}
                </p>

                <p className="text-3xl font-bold text-orange-600 mt-3">
                  {item.value ?? "-"}
                </p>

                <p className="text-xs text-slate-500 mt-1">ausencias</p>
              </div>
            ))}
          </div>

          <div
            className="
              mt-5
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
                Promedio registrado.
              </p>
            </div>

            <span className="text-3xl font-bold text-orange-700">
              {formatNumber(boletin.ausentes_promedio)}
            </span>
          </div>
        </div>
      </section>

      {/* =====================================================
          EVALUACIÓN FINAL
      ===================================================== */}

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
            border-slate-200
            bg-slate-50
            px-6
            py-5
            flex
            items-center
            gap-3
          "
        >
          <FileText className="text-cyan-600" size={22} />

          <div>
            <h2 className="font-bold text-slate-900">Evaluación final</h2>

            <p className="text-sm text-slate-500">
              Resultado general del alumno.
            </p>
          </div>
        </div>

        <div className="p-6 grid md:grid-cols-2 gap-6">
          {/* CONDUCTA FINAL */}

          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Comportamiento final
            </p>

            <div
              className="
                min-h-12
                px-4
                py-3
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                flex
                items-center
                text-sm
                text-slate-700
              "
            >
              {boletin.behaviour_final || "-"}
            </div>
          </div>

          {/* OBSERVACIÓN FINAL */}

          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Observación final
            </p>

            <div
              className="
                min-h-28
                p-4
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                text-sm
                text-slate-700
                whitespace-pre-wrap
              "
            >
              {boletin.observaciones_final || "-"}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FIRMA DEL PROFESOR
      ===================================================== */}

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
            border-slate-200
            bg-slate-50
            px-6
            py-5
            flex
            items-center
            gap-3
          "
        >
          <div
            className="
              w-11
              h-11
              rounded-2xl
              bg-emerald-100
              flex
              items-center
              justify-center
            "
          >
            <UserCheck size={22} className="text-emerald-600" />
          </div>

          <div>
            <h2 className="font-bold text-slate-900">Firma del profesor</h2>

            <p className="text-sm text-slate-500">
              Firma asociada al profesor que creó este boletín.
            </p>
          </div>
        </div>

        <div className="p-6">
          <div
            className="
              min-h-48
              rounded-2xl
              border
              border-dashed
              border-slate-300
              bg-slate-50
              flex
              items-center
              justify-center
              p-6
            "
          >
            {boletin.firma_url ? (
              <div className="text-center space-y-4">
                <div
                  className="
                    bg-white
                    border
                    border-slate-200
                    rounded-2xl
                    p-6
                    shadow-sm
                    min-w-72
                    min-h-36
                    flex
                    items-center
                    justify-center
                  "
                >
                  <img
                    src={boletin.firma_url}
                    alt={`Firma de ${boletin.profesor_nombre ?? "profesor"}`}
                    className="max-w-full max-h-36 object-contain"
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-700">
                    {boletin.profesor_nombre || "-"}{" "}
                    {boletin.profesor_apellido || ""}
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    Firma registrada en el perfil del profesor.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div
                  className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-slate-100
                    flex
                    items-center
                    justify-center
                    mx-auto
                    mb-3
                  "
                >
                  <FileText size={24} className="text-slate-400" />
                </div>

                <p className="font-medium text-slate-700">
                  Sin firma registrada
                </p>

                <p className="text-sm text-slate-500 mt-1">
                  El profesor todavía no tiene una firma cargada.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
          INFORMACIÓN DEL BOLETÍN
      ===================================================== */}

      <section
        className="
          bg-slate-50
          border
          border-slate-200
          rounded-3xl
          p-6
        "
      >
        <div className="flex items-center gap-3 mb-5">
          <CheckCircle2 className="text-slate-500" size={20} />

          <h2 className="font-bold text-slate-800">Información del boletín</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-sm">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
              ID
            </p>

            <p className="text-slate-700 break-all">{boletin.id}</p>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
              Creado
            </p>

            <p className="text-slate-700">{formatDate(boletin.created_at)}</p>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
              Última actualización
            </p>

            <p className="text-slate-700">{formatDate(boletin.updated_at)}</p>
          </div>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <div className="flex justify-end">
        <Link
          href="/admin/boletines"
          className="
            h-11
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
            gap-2
          "
        >
          <ArrowLeft size={18} />
          Volver a boletines
        </Link>
      </div>
    </div>
  );
}
