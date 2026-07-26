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

  const classrooms = classroomsData.classrooms || [];

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

      {/* Métricas */}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white rounded-3xl p-6 shadow">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
              <BookOpen className="text-blue-600" />
            </div>

            <div>
              <p className="text-3xl font-bold">{stats.aulas}</p>
              <span className="text-slate-500">Mis aulas</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center">
              <FolderOpen className="text-orange-600" />
            </div>

            <div>
              <p className="text-3xl font-bold">{stats.materiales}</p>
              <span className="text-slate-500">Materiales</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">
              <ClipboardList className="text-green-600" />
            </div>

            <div>
              <p className="text-3xl font-bold">{stats.tareas}</p>
              <span className="text-slate-500">Tareas pendientes</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center">
              <Megaphone className="text-red-600" />
            </div>

            <div>
              <p className="text-3xl font-bold">{stats.anuncios}</p>
              <span className="text-slate-500">Anuncios nuevos</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mis aulas */}

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-slate-900">Mis aulas</h2>

          <button className="text-cyan-600 font-semibold hover:text-cyan-700">
            Ver todas
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {classrooms.length === 0 && (
            <div className="col-span-2 bg-white rounded-3xl p-10 text-center border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900">
                No estás inscripto en ninguna aula
              </h3>

              <p className="mt-3 text-slate-500">
                Cuando un administrador te asigne a un aula, aparecerá aquí.
              </p>
            </div>
          )}
          {classrooms.map((classroom) => (
            <Link
              key={classroom.id}
              href={`/student/classroom/${classroom.id}`}
              className="group bg-white rounded-[32px] border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition overflow-hidden"
            >
              <div className="h-2 bg-gradient-to-r from-cyan-500 to-blue-600" />

              <div className="p-8">
                <div className="flex justify-between">
                  <div>
                    <span className="inline-flex px-4 py-1 rounded-full bg-cyan-50 text-cyan-700 text-sm font-semibold">
                      {classroom.nivel}
                    </span>

                    <h3 className="mt-5 text-3xl font-bold group-hover:text-cyan-600 transition">
                      {classroom.nombre}
                    </h3>

                    <div className="mt-3 flex items-center gap-2 text-slate-500">
                      🕒 {classroom.horario}
                    </div>
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center group-hover:bg-cyan-100">
                    <ChevronRight className="group-hover:text-cyan-600" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="bg-blue-50 rounded-2xl p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                      <Users className="text-blue-600" size={20} />
                    </div>

                    <div>
                      <p className="font-bold">{classroom.alumnos}</p>
                      <span className="text-sm text-slate-500">compañeros</span>
                    </div>
                  </div>

                  <div className="bg-orange-50 rounded-2xl p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                      <FolderOpen className="text-orange-600" size={20} />
                    </div>

                    <div>
                      <p className="font-bold">{classroom.materiales}</p>
                      <span className="text-sm text-slate-500">materiales</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-5 border-t flex justify-between">
                  <span className="text-slate-400 text-sm">Aula inscripta</span>

                  <span className="text-cyan-600 font-semibold group-hover:translate-x-1 transition">
                    Ingresar →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
