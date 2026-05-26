"use client";

import Link from "next/link";

import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Users,
  Mail,
  GraduationCap,
} from "lucide-react";

const students = [
  {
    id: 1,
    nombre: "Santiago",
    apellido: "Taher",
    email: "santiago@gmail.com",
    dni: "40123456",
    nivel: "B2 First",
    classroom: "Room 4",
    estado: "Activo",
  },
  {
    id: 2,
    nombre: "Lucía",
    apellido: "Fernandez",
    email: "lucia@gmail.com",
    dni: "42345678",
    nivel: "A2",
    classroom: "Room 2",
    estado: "Activo",
  },
];

export default function StudentsPage() {
  return (
    <main
      className="
        min-h-screen
        bg-gradient-to-br
        from-slate-100
        via-white
        to-blue-50
        p-6
        md:p-10
      "
    >
      {/* HEADER */}
      <div
        className="
          flex
          flex-col
          lg:flex-row
          lg:items-center
          lg:justify-between
          gap-6
          mb-10
        "
      >
        <div>
          <div className="flex items-center gap-3">
            <div
              className="
                w-14
                h-14
                rounded-2xl
                bg-blue-100
                text-blue-700
                flex
                items-center
                justify-center
              "
            >
              <Users className="w-7 h-7" />
            </div>

            <div>
              <p className="text-gray-500">Gestión académica</p>

              <h1
                className="
                  text-4xl
                  font-bold
                  text-gray-900
                "
              >
                Students
              </h1>
            </div>
          </div>
        </div>

        <Link
          href="/admin/students/create"
          className="
            h-14
            px-6
            rounded-2xl
            bg-gradient-to-r
            from-blue-600
            to-cyan-500
            text-white
            font-semibold
            flex
            items-center
            justify-center
            gap-2
            shadow-xl
            hover:scale-[1.02]
            transition-all
          "
        >
          <Plus className="w-5 h-5" />
          Crear estudiante
        </Link>
      </div>

      {/* SEARCH */}
      <div
        className="
          bg-white
          rounded-[32px]
          border
          border-gray-100
          shadow-lg
          p-5
          mb-8
        "
      >
        <div className="relative">
          <Search
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-gray-400
              w-5
              h-5
            "
          />

          <input
            type="text"
            placeholder="Buscar estudiante..."
            className="
              w-full
              h-14
              rounded-2xl
              border
              border-gray-200
              pl-12
              pr-4
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />
        </div>
      </div>

      {/* TABLE */}
      <div
        className="
          bg-white
          rounded-[32px]
          shadow-2xl
          border
          border-gray-100
          overflow-hidden
        "
      >
        {/* TABLE HEADER */}
        <div
          className="
            hidden
            lg:grid
            grid-cols-7
            gap-4
            px-8
            py-5
            bg-gray-50
            border-b
            border-gray-100
            text-sm
            font-semibold
            text-gray-500
          "
        >
          <div>Alumno</div>
          <div>DNI</div>
          <div>Email</div>
          <div>Nivel</div>
          <div>Classroom</div>
          <div>Estado</div>
          <div className="text-right">Acciones</div>
        </div>

        {/* ROWS */}
        <div className="divide-y divide-gray-100">
          {students.map((student) => (
            <div
              key={student.id}
              className="
                grid
                grid-cols-1
                lg:grid-cols-7
                gap-5
                px-8
                py-6
                items-center
                hover:bg-blue-50/40
                transition
              "
            >
              {/* STUDENT */}
              <div className="flex items-center gap-4">
                <div
                  className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-blue-100
                    text-blue-700
                    flex
                    items-center
                    justify-center
                    font-bold
                  "
                >
                  {student.nombre[0]}
                </div>

                <div>
                  <h3
                    className="
                      font-semibold
                      text-gray-900
                    "
                  >
                    {student.nombre} {student.apellido}
                  </h3>

                  <p className="text-sm text-gray-500">Estudiante</p>
                </div>
              </div>

              {/* DNI */}
              <div className="text-gray-700">{student.dni}</div>

              {/* EMAIL */}
              <div className="flex items-center gap-2 text-gray-700">
                <Mail className="w-4 h-4 text-gray-400" />

                {student.email}
              </div>

              {/* NIVEL */}
              <div>
                <span
                  className="
                    px-4
                    py-2
                    rounded-full
                    bg-cyan-100
                    text-cyan-700
                    text-sm
                    font-medium
                  "
                >
                  {student.nivel}
                </span>
              </div>

              {/* CLASSROOM */}
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-gray-400" />

                <span className="text-gray-700">{student.classroom}</span>
              </div>

              {/* STATUS */}
              <div>
                <span
                  className="
                    px-4
                    py-2
                    rounded-full
                    bg-emerald-100
                    text-emerald-700
                    text-sm
                    font-medium
                  "
                >
                  {student.estado}
                </span>
              </div>

              {/* ACTIONS */}
              <div
                className="
                  flex
                  items-center
                  justify-end
                  gap-3
                "
              >
                <Link
                  href={`/admin/students/${student.id}/edit`}
                  className="
                    w-11
                    h-11
                    rounded-2xl
                    bg-blue-100
                    text-blue-700
                    flex
                    items-center
                    justify-center
                    hover:bg-blue-200
                    transition
                  "
                >
                  <Pencil className="w-5 h-5" />
                </Link>

                <button
                  className="
                    w-11
                    h-11
                    rounded-2xl
                    bg-red-100
                    text-red-600
                    flex
                    items-center
                    justify-center
                    hover:bg-red-200
                    transition
                  "
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
