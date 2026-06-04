import Link from "next/link";
import {
  BookOpen,
  Users,
  FolderOpen,
  Megaphone,
  ChevronRight,
} from "lucide-react";
import { cookies } from "next/headers";

export default async function TeacherDashboardPage() {
  const cookieStore = await cookies();

  const teacherId = cookieStore.get("teacher_id")?.value;
  const teacherName = cookieStore.get("teacher_name")?.value;
  const teacherLastname = cookieStore.get("teacher_lastname")?.value;
  console.log("Teacher ID:", teacherId);

  const [statsRes, classroomsRes] = await Promise.all([
    fetch(`http://localhost:3000/api/teacher/stats/${teacherId}`),

    fetch(`http://localhost:3000/api/teacher/classrooms/${teacherId}`),
  ]);

  const statsData = await statsRes.json();
  const classroomsData = await classroomsRes.json();

  const stats = statsData.stats;

  const classrooms = classroomsData.classrooms || [];

  return (
    <main className="p-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900">
            Panel del Profesor
          </h1>

          <p className="mt-2 text-slate-500">
            Gestioná tus aulas, alumnos y materiales.
          </p>
        </div>

        {/* MÉTRICAS */}

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
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

          <div className="grid lg:grid-cols-2 gap-6">
            {classrooms.map((classroom: any) => (
              <Link
                key={classroom.id}
                href={`/teacher/classrooms/${classroom.id}`}
                className="
                  group
                  bg-white
                  rounded-[32px]
                  shadow-md
                  hover:shadow-2xl
                  hover:-translate-y-1
                  transition-all
                  duration-300
                  overflow-hidden
                "
              >
                <div className="p-7">
                  <div className="flex justify-between items-start">
                    <div>
                      <span
                        className="
                          inline-flex
                          px-3
                          py-1
                          rounded-full
                          bg-cyan-100
                          text-cyan-700
                          text-sm
                          font-semibold
                        "
                      >
                        {classroom.nivel}
                      </span>

                      <h3 className="mt-4 text-2xl font-bold text-slate-900">
                        {classroom.nombre}
                      </h3>
                    </div>

                    <ChevronRight
                      className="
                        text-slate-400
                        group-hover:text-cyan-500
                        transition
                      "
                    />
                  </div>

                  <div className="mt-8 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Users size={18} />

                      <span>{classroom.alumnos} alumnos</span>
                    </div>

                    <span
                      className="
                        text-cyan-600
                        font-semibold
                      "
                    >
                      Ver aula →
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
