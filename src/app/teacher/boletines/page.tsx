import { cookies } from "next/headers";
import Link from "next/link";
import {
  BookOpen,
  CalendarDays,
  ChevronRight,
  FileText,
  Plus,
  Search,
  User,
} from "lucide-react";

type Boletin = {
  id: string;

  dni: number;

  estudiante_nombre: string;
  estudiante_apellido: string;

  es_mayor_edad: boolean;

  anio: number;
  nivel: string;

  profesor_nombre: string;
  profesor_apellido: string;

  nota_1: number | null;
  nota_2: number | null;
  nota_3: number | null;
  promedio: number | null;

  behavior_1: string | null;
  behavior_2: string | null;
  behavior_3: string | null;

  ausentes: number | null;

  observaciones_1: string | null;
  observaciones_2: string | null;
  observaciones_3: string | null;

  firma_teacher: string | null;
  firma_coordinator: string | null;

  aclaracion_padre: string | null;
  aclaracion_estudiante: string | null;

  created_at: string;
  updated_at: string;
};

async function getBoletines(teacherId: string): Promise<Boletin[]> {
  try {
    const cookieStore = await cookies(); // 👈 Leemos el store de cookies de la petición entrante

    const res = await fetch(
      `${process.env.BACKEND_URL}/api/teacher/boletines/${teacherId}`,
      {
        headers: {
          cookie: cookieStore.toString(), // 👈 Reenviamos todas las cookies a tu endpoint de la API
        },
        cache: "no-store",
      },
    );

    if (!res.ok) {
      console.error("Error obteniendo boletines:", res.status);
      return [];
    }

    const data = await res.json();

    return data.boletines || [];
  } catch (error) {
    console.error("Error obteniendo boletines:", error);
    return [];
  }
}

export default async function TeacherBoletinesPage() {
  const cookieStore = await cookies();

  const teacherId = cookieStore.get("user_id")?.value;

  const boletines = teacherId ? await getBoletines(teacherId) : [];

  return (
    <div className="space-y-8">
      {/* HEADER */}

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-100 flex items-center justify-center">
              <FileText className="text-cyan-600" size={24} />
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Boletines
              </h1>

              <p className="mt-1 text-slate-500">
                Gestioná los boletines de tus alumnos.
              </p>
            </div>
          </div>
        </div>

        <Link
          href="/teacher/boletines/nuevo"
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            h-11
            px-5
            rounded-xl
            bg-cyan-600
            hover:bg-cyan-700
            text-white
            font-semibold
            transition
            shadow-sm
          "
        >
          <Plus size={19} />
          Crear boletín
        </Link>
      </div>

      {/* RESUMEN */}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-cyan-100 flex items-center justify-center">
              <FileText className="text-cyan-600" size={21} />
            </div>

            <div>
              <p className="text-2xl font-bold text-slate-900">
                {boletines.length}
              </p>

              <p className="text-sm text-slate-500">Boletines creados</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center">
              <User className="text-blue-600" size={21} />
            </div>

            <div>
              <p className="text-2xl font-bold text-slate-900">
                {
                  new Set(
                    boletines.map(
                      (boletin) =>
                        `${boletin.estudiante_nombre}-${boletin.estudiante_apellido}`,
                    ),
                  ).size
                }
              </p>

              <p className="text-sm text-slate-500">Alumnos evaluados</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center">
              <BookOpen className="text-green-600" size={21} />
            </div>

            <div>
              <p className="text-2xl font-bold text-slate-900">
                {
                  new Set(
                    boletines.map((boletin) => boletin.anio).filter(Boolean),
                  ).size
                }
              </p>

              <p className="text-sm text-slate-500">Períodos registrados</p>
            </div>
          </div>
        </div>
      </div>

      {/* BUSCADOR */}

      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
        <div className="relative">
          <Search
            size={19}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <input
            type="text"
            placeholder="Buscar alumno..."
            className="
              w-full
              h-11
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              pl-11
              pr-4
              text-sm
              text-slate-700
              outline-none
              focus:border-cyan-400
              focus:ring-2
              focus:ring-cyan-100
            "
          />
        </div>
      </div>

      {/* LISTADO */}

      {boletines.length === 0 ? (
        <div
          className="
            bg-white
            border
            border-slate-200
            rounded-3xl
            p-10
            sm:p-16
            text-center
            shadow-sm
          "
        >
          <div className="w-16 h-16 rounded-2xl bg-slate-100 mx-auto flex items-center justify-center">
            <FileText className="text-slate-400" size={28} />
          </div>

          <h2 className="mt-5 text-xl font-bold text-slate-900">
            Todavía no hay boletines
          </h2>

          <p className="mt-2 text-slate-500 max-w-md mx-auto">
            Cuando crees un boletín para uno de tus alumnos aparecerá en esta
            sección.
          </p>

          <Link
            href="/teacher/boletines/nuevo"
            className="
              inline-flex
              items-center
              gap-2
              mt-6
              px-5
              h-11
              rounded-xl
              bg-cyan-600
              hover:bg-cyan-700
              text-white
              font-semibold
            "
          >
            <Plus size={18} />
            Crear primer boletín
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {boletines.map((boletin) => {
            const promedio =
              boletin.promedio !== null && boletin.promedio !== undefined
                ? Number(boletin.promedio)
                : null;

            return (
              <div
                key={boletin.id}
                className="
                  bg-white
                  border
                  border-slate-200
                  rounded-3xl
                  shadow-sm
                  hover:shadow-md
                  transition
                  overflow-hidden
                "
              >
                {/* HEADER CARD */}

                <div className="p-5 sm:p-6">
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-start gap-4 min-w-0">
                      <div
                        className="
                          w-12
                          h-12
                          shrink-0
                          rounded-2xl
                          bg-cyan-100
                          flex
                          items-center
                          justify-center
                        "
                      >
                        <User className="text-cyan-600" size={22} />
                      </div>

                      <div className="min-w-0">
                        <h2 className="text-lg sm:text-xl font-bold text-slate-900 truncate">
                          {boletin.estudiante_apellido},{" "}
                          {boletin.estudiante_nombre}
                        </h2>

                        <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
                          <span className="flex items-center gap-1.5">
                            <BookOpen size={15} />
                            {boletin.nivel}
                          </span>

                          <span className="flex items-center gap-1.5">
                            <CalendarDays size={15} />
                            {boletin.anio}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* PROMEDIO */}

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-xs text-slate-400">Promedio</p>

                        <p className="text-2xl font-bold text-cyan-600">
                          {promedio !== null ? promedio.toFixed(2) : "-"}
                        </p>
                      </div>

                      <div
                        className={`
                          w-12
                          h-12
                          rounded-2xl
                          flex
                          items-center
                          justify-center
                          font-bold
                          ${
                            promedio === null
                              ? "bg-slate-100 text-slate-400"
                              : promedio >= 7
                                ? "bg-green-100 text-green-600"
                                : promedio >= 4
                                  ? "bg-yellow-100 text-yellow-600"
                                  : "bg-red-100 text-red-600"
                          }
                        `}
                      >
                        {promedio !== null ? Math.round(promedio) : "-"}
                      </div>
                    </div>
                  </div>

                  {/* DATOS */}

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
                    <Info label="Nota 1" value={formatNumber(boletin.nota_1)} />

                    <Info label="Nota 2" value={formatNumber(boletin.nota_2)} />

                    <Info label="Nota 3" value={formatNumber(boletin.nota_3)} />

                    <Info
                      label="Ausentes"
                      value={
                        boletin.ausentes !== null
                          ? String(boletin.ausentes)
                          : "-"
                      }
                    />
                  </div>

                  {/* ACTIONS */}

                  <div
                    className="
                      mt-6
                      pt-5
                      border-t
                      border-slate-100
                      flex
                      flex-col
                      sm:flex-row
                      sm:items-center
                      sm:justify-between
                      gap-3
                    "
                  >
                    <span className="text-xs text-slate-400">
                      Creado {formatDate(boletin.created_at)}
                    </span>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <Link
                        href={`/teacher/boletines/${boletin.id}`}
                        className="
                          h-10
                          px-4
                          rounded-xl
                          border
                          border-slate-200
                          hover:bg-slate-50
                          text-slate-600
                          font-medium
                          text-sm
                          flex
                          items-center
                          justify-center
                          gap-2
                        "
                      >
                        Ver boletín
                        <ChevronRight size={17} />
                      </Link>

                      <Link
                        href={`/teacher/boletines/${boletin.id}/editar`}
                        className="
                          h-10
                          px-4
                          rounded-xl
                          bg-cyan-600
                          hover:bg-cyan-700
                          text-white
                          font-medium
                          text-sm
                          flex
                          items-center
                          justify-center
                        "
                      >
                        Editar
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 border border-slate-100 p-3">
      <p className="text-xs text-slate-400">{label}</p>

      <p className="mt-1 font-semibold text-slate-700">{value}</p>
    </div>
  );
}

function formatNumber(value: number | null) {
  if (value === null || value === undefined) {
    return "-";
  }

  return Number(value).toFixed(2);
}

function formatDate(value: string) {
  if (!value) return "-";

  return new Date(value).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
