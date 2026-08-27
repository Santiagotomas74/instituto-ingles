import Link from "next/link";
import {
  BookOpen,
  Users,
  FolderOpen,
  Megaphone,
  ChevronRight,
  ArrowRight,
  Clock,
} from "lucide-react";
import { cookies } from "next/headers";

export default async function Aulas() {
  const cookieStore = await cookies();

  const teacherId = cookieStore.get("user_id")?.value;
  const teacherName = cookieStore.get("teacher_name")?.value;
  const teacherLastname = cookieStore.get("teacher_lastname")?.value;
  console.log("Teacher ID:", teacherId);

  const [statsRes, classroomsRes] = await Promise.all([
    fetch(`${process.env.BACKEND_URL}/api/teacher/stats/${teacherId}`),

    fetch(`${process.env.BACKEND_URL}/api/teacher/classrooms/${teacherId}`),
  ]);

  const statsData = await statsRes.json();

  const classroomsData = await classroomsRes.json();

  console.log("Classrooms Data:", classroomsData);

  const stats = statsData.stats;

  const classrooms = classroomsData.classrooms || [];

  return (
    <main className="p-8 bg-slate-50 min-h-screen ">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900">Estadisticas</h1>
          <p className="mt-2 text-slate-500">
            Gestioná tus aulas, alumnos y materiales.
          </p>
        </div>

        {/* MÉTRICAS */}

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10 text-slate-900">
          <div className="bg-white rounded-3xl p-6 shadow-md">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-blue-100 flex items-center justify-center">
                <BookOpen className="text-blue-600" />
              </div>

              <div>
                <p className="text-3xl font-bold">{stats.aulas}</p>

                <p className="text-slate-500">Mis aulas</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-md">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-green-100 flex items-center justify-center">
                <Users className="text-green-600" />
              </div>

              <div>
                <p className="text-3xl font-bold">{stats.alumnos}</p>

                <p className="text-slate-500">Alumnos</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-md">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-orange-100 flex items-center justify-center">
                <FolderOpen className="text-orange-600" />
              </div>

              <div>
                <p className="text-3xl font-bold">{stats.materiales}</p>

                <p className="text-slate-500">Materiales</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-md">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-red-100 flex items-center justify-center">
                <Megaphone className="text-red-600" />
              </div>

              <div>
                <p className="text-3xl font-bold">{stats.anuncios}</p>

                <p className="text-slate-500">Anuncios</p>
              </div>
            </div>
          </div>
        </div>

        {/* AULAS */}

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-slate-900">
              Mis aulas asignadas
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {classrooms.map((classroom: any) => (
              <Link
                key={classroom.id}
                href={`/teacher/classrooms/${classroom.id}`}
                className="
            group
            relative
            flex
            flex-col
            justify-between
            bg-white
            rounded-2xl
            sm:rounded-3xl
            border
            border-slate-200/80
            shadow-sm
            hover:shadow-xl
            hover:border-cyan-200
            hover:-translate-y-1
            transition-all
            duration-300
            overflow-hidden
          "
              >
                {/* Accent top border */}
                <div className="h-1.5 w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500" />

                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  {/* Header */}
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <span
                        className="
                    inline-flex
                    items-center
                    px-3
                    py-1
                    rounded-full
                    bg-cyan-50
                    text-cyan-700
                    text-xs
                    font-semibold
                    border
                    border-cyan-100
                  "
                      >
                        {classroom.nivel}
                      </span>

                      <div
                        className="
                    w-9
                    h-9
                    rounded-xl
                    bg-slate-50
                    border
                    border-slate-100
                    flex
                    items-center
                    justify-center
                    text-slate-400
                    group-hover:bg-cyan-50
                    group-hover:border-cyan-100
                    group-hover:text-cyan-600
                    transition-colors
                  "
                      >
                        <ChevronRight
                          size={18}
                          className="group-hover:translate-x-0.5 transition-transform"
                        />
                      </div>
                    </div>

                    <h3
                      className="
                  mt-3.5
                  text-lg
                  sm:text-xl
                  font-bold
                  text-slate-900
                  group-hover:text-cyan-600
                  transition-colors
                  line-clamp-1
                "
                    >
                      {classroom.nombre}
                    </h3>

                    <div className="mt-2 flex items-center gap-1.5 text-xs sm:text-sm text-slate-500">
                      <Clock size={15} className="text-slate-400 shrink-0" />
                      <span>{classroom.horario}</span>
                    </div>
                  </div>

                  {/* Estadísticas */}
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div
                      className="
                  rounded-xl
                  bg-slate-50/80
                  border
                  border-slate-100
                  p-3
                  flex
                  items-center
                  gap-3
                  group-hover:bg-blue-50/50
                  group-hover:border-blue-100/60
                  transition-colors
                "
                    >
                      <div
                        className="
                    w-9
                    h-9
                    rounded-lg
                    bg-blue-100/80
                    flex
                    items-center
                    justify-center
                    text-blue-600
                    shrink-0
                  "
                      >
                        <Users size={18} />
                      </div>

                      <div className="min-w-0">
                        <p className="font-bold text-slate-900 text-sm sm:text-base leading-none">
                          {classroom.alumnos}
                        </p>
                        <span className="text-xs text-slate-500 font-medium">
                          alumnos
                        </span>
                      </div>
                    </div>

                    <div
                      className="
                  rounded-xl
                  bg-slate-50/80
                  border
                  border-slate-100
                  p-3
                  flex
                  items-center
                  gap-3
                  group-hover:bg-amber-50/50
                  group-hover:border-amber-100/60
                  transition-colors
                "
                    >
                      <div
                        className="
                    w-9
                    h-9
                    rounded-lg
                    bg-amber-100/80
                    flex
                    items-center
                    justify-center
                    text-amber-600
                    shrink-0
                  "
                      >
                        <FolderOpen size={18} />
                      </div>

                      <div className="min-w-0">
                        <p className="font-bold text-slate-900 text-sm sm:text-base leading-none">
                          {classroom.materiales}
                        </p>
                        <span className="text-xs text-slate-500 font-medium">
                          materiales
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-slate-400 font-medium">
                      Aula asignada
                    </span>

                    <span className="inline-flex items-center gap-1 text-cyan-600 font-semibold group-hover:text-cyan-700">
                      Ver aula
                      <ArrowRight
                        size={15}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
