import Link from "next/link";
import {
  BookOpen,
  Users,
  FolderOpen,
  Megaphone,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import { cookies } from "next/headers";

export default async function TeacherDashboardPage() {
  const cookieStore = await cookies();

  const teacherId = cookieStore.get("teacher_id")?.value;
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
    <main className="p-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link
            href="/"
            className="
      inline-flex
      items-center
      gap-2
      px-4
      py-2
      rounded-xl
      bg-white
      border
      shadow-sm
      text-slate-700
      hover:bg-slate-50
      transition
    "
          >
            <ArrowLeft size={18} />
            Volver al inicio
          </Link>
        </div>
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900">
            Panel del Profesor
          </h1>

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

          <div className="grid lg:grid-cols-2 gap-8">
            {classrooms.map((classroom: any) => (
              <Link
                key={classroom.id}
                href={`/teacher/classrooms/${classroom.id}`}
                className="
        group
        relative
        bg-white
        rounded-[32px]
        border
        border-slate-200
        shadow-sm
        hover:shadow-2xl
        hover:-translate-y-1
        transition-all
        duration-300
        overflow-hidden
      "
              >
                {/* Barra superior */}
                <div
                  className="
          h-2
          bg-gradient-to-r
          from-cyan-500
          to-blue-600
        "
                />

                <div className="p-8">
                  {/* Header */}
                  <div className="flex justify-between items-start">
                    <div>
                      <span
                        className="
                inline-flex
                items-center
                px-4
                py-1.5
                rounded-full
                bg-cyan-50
                text-cyan-700
                text-sm
                font-semibold
                border
                border-cyan-100
              "
                      >
                        {classroom.nivel}
                      </span>

                      <h3
                        className="
                mt-5
                text-3xl
                font-bold
                text-slate-900
                group-hover:text-cyan-600
                transition
              "
                      >
                        {classroom.nombre}
                      </h3>

                      <div
                        className="
                mt-3
                flex
                items-center
                gap-2
                text-slate-500
              "
                      >
                        <span className="text-lg">🕒</span>

                        <span>{classroom.horario}</span>
                      </div>
                    </div>

                    <div
                      className="
              w-12
              h-12
              rounded-2xl
              bg-slate-100
              flex
              items-center
              justify-center
              group-hover:bg-cyan-100
              transition
            "
                    >
                      <ChevronRight
                        className="
                text-slate-400
                group-hover:text-cyan-600
                transition
              "
                      />
                    </div>
                  </div>

                  {/* Estadísticas */}
                  <div
                    className="
            mt-8
            grid
            grid-cols-2
            gap-4
          "
                  >
                    <div
                      className="
              rounded-2xl
              bg-blue-50
              p-4
              flex
              items-center
              gap-3
            "
                    >
                      <div
                        className="
                w-10
                h-10
                rounded-xl
                bg-blue-100
                flex
                items-center
                justify-center
              "
                      >
                        <Users size={20} className="text-blue-600" />
                      </div>

                      <div>
                        <p className="font-bold text-slate-900">
                          {classroom.alumnos}
                        </p>

                        <span className="text-sm text-slate-500">alumnos</span>
                      </div>
                    </div>

                    <div
                      className="
              rounded-2xl
              bg-orange-50
              p-4
              flex
              items-center
              gap-3
            "
                    >
                      <div
                        className="
                w-10
                h-10
                rounded-xl
                bg-orange-100
                flex
                items-center
                justify-center
              "
                      >
                        <FolderOpen size={20} className="text-orange-600" />
                      </div>

                      <div>
                        <p className="font-bold text-slate-900">
                          {classroom.materiales}
                        </p>

                        <span className="text-sm text-slate-500">
                          materiales
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div
                    className="
            mt-8
            pt-5
            border-t
            border-slate-100
            flex
            justify-between
            items-center
          "
                  >
                    <span
                      className="
              text-sm
              text-slate-400
            "
                    >
                      Aula asignada
                    </span>

                    <span
                      className="
              text-cyan-600
              font-semibold
              group-hover:translate-x-1
              transition
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
