import Link from "next/link";
import { cookies } from "next/headers";
import {
  BookOpen,
  FolderOpen,
  ClipboardList,
  Megaphone,
  Users,
  ChevronRight,
} from "lucide-react";

type Classroom = {
  id: string;
  nombre: string;
  nivel: string;
  horario: string;
  alumnos: number;
  materiales: number;
};

export default async function Dashboard() {
  const cookieStore = await cookies();

  const studentId = cookieStore.get("user_id")?.value;

  const studentName = cookieStore.get("student_name")?.value || "Estudiante";

  const studentLastname = cookieStore.get("student_lastname")?.value || "";

  // ==============================
  // ESTADÍSTICAS (TEMPORAL)
  // ==============================

  const stats = {
    aulas: 0,
    materiales: 0,
    tareas: 0,
    anuncios: 0,
  };

  // ==============================
  // AULAS DEL ESTUDIANTE
  // ==============================

  const classroomsRes = await fetch(
    `${process.env.BACKEND_URL}/api/student/classrooms/${studentId}`,
    {
      cache: "no-store",
    },
  );

  const classroomsData = await classroomsRes.json();

  const classrooms: Classroom[] = classroomsData.classrooms || [];

  // mientras no exista el endpoint de estadísticas
  stats.aulas = classrooms.length;

  return (
    <div className="space-y-10">
      {/* Header */}

      <div>
        <h1 className="text-4xl font-bold text-slate-900">
          ¡Hola, {studentName} {studentLastname}!
        </h1>

        <p className="mt-2 text-slate-500">
          Bienvenido nuevamente al Campus Virtual.
        </p>
      </div>

      {/* Mis aulas */}
      <section>
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-sm font-semibold text-cyan-600 uppercase tracking-wide">
              Campus virtual
            </p>

            <h2 className="mt-1 text-3xl font-bold text-slate-900">
              Mis aulas
            </h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {classrooms.length === 0 ? (
            <div className="lg:col-span-2 bg-white rounded-3xl p-10 text-center border border-slate-200">
              <BookOpen className="mx-auto text-slate-300" size={42} />

              <h3 className="mt-4 text-xl font-bold text-slate-900">
                No estás inscripto en ninguna aula
              </h3>

              <p className="mt-2 text-slate-500">
                Cuando un administrador te asigne a un aula, aparecerá aquí.
              </p>
            </div>
          ) : (
            classrooms.map((classroom) => (
              <Link
                key={classroom.id}
                href={`/student/classroom/${classroom.id}`}
                className="
            group
            relative
            overflow-hidden
            rounded-3xl
            bg-white
            border
            border-slate-200
            p-7
            shadow-sm
            hover:shadow-xl
            hover:-translate-y-1
            transition-all
            duration-300
          "
              >
                {/* Accent */}
                <div
                  className="
              absolute
              top-0
              left-0
              w-full
              h-1
              bg-gradient-to-r
              from-cyan-500
              to-blue-600
            "
                />

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span
                      className="
                  inline-flex
                  px-3
                  py-1
                  rounded-full
                  bg-cyan-50
                  text-cyan-700
                  text-xs
                  font-bold
                "
                    >
                      {classroom.nivel}
                    </span>

                    <h3
                      className="
                  mt-4
                  text-2xl
                  font-bold
                  text-slate-900
                  group-hover:text-cyan-600
                  transition
                "
                    >
                      {classroom.nombre}
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                      🕒 {classroom.horario}
                    </p>
                  </div>

                  <div
                    className="
                w-11
                h-11
                rounded-2xl
                bg-cyan-50
                flex
                items-center
                justify-center
                group-hover:bg-cyan-500
                transition
              "
                  >
                    <ChevronRight
                      size={20}
                      className="
                  text-cyan-600
                  group-hover:text-black
                  transition
                "
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-7">
                  <div className="rounded-2xl bg-blue-50 p-4">
                    <div className="flex items-center gap-3">
                      <Users size={19} className="text-blue-600" />

                      <div>
                        <p className="font-bold text-slate-900">
                          {classroom.alumnos}
                        </p>

                        <p className="text-xs text-slate-500">compañeros</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-orange-50 p-4">
                    <div className="flex items-center gap-3">
                      <FolderOpen size={19} className="text-orange-600" />

                      <div>
                        <p className="font-bold text-slate-900">
                          {classroom.materiales}
                        </p>

                        <p className="text-xs text-slate-500">materiales</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-100">
                  <span
                    className="
                text-sm
                font-semibold
                text-cyan-600
                group-hover:translate-x-1
                inline-block
                transition
              "
                  >
                    Ingresar al aula →
                  </span>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

/*
<Link
            href="/student/classrooms"
            className="text-sm font-semibold text-cyan-600 hover:text-cyan-700 transition"
          >
            Ver todas →
          </Link>s
*/
