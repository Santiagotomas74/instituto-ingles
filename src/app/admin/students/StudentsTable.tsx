"use client";

import { useState } from "react";

import Link from "next/link";

import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Users,
  Mail,
  ArrowLeft,
} from "lucide-react";

import AssignClassroom from "./AssignClassroom";

type Student = {
  id: string;
  dni: number;
  nombre: string;
  apellido: string;
  email: string;
  status: string;
  nivel: string;
  classroom: string | null;
};

type Classroom = {
  id: string;
  nombre: string;
};

type Props = {
  students: Student[];
  classrooms: Classroom[];
};

export default function StudentsTable({ students, classrooms }: Props) {
  const [search, setSearch] = useState("");

  const filteredStudents = students.filter((student) =>
    `
      ${student.nombre}
      ${student.apellido}
      ${student.email}
      ${student.dni}
    `
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

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
          href="/admin/dashboard"
          className="
          h-14
          px-7
          rounded-2xl
          bg-blue-600
          border
          border-white/10
          backdrop-blur-md
          
          text-white
          transition-all
          font-semibold
          flex
          items-center
          justify-center
          gap-3
          shadow-lg
          hover:-translate-y-0.5
          w-full
          md:w-auto
        "
        >
          <ArrowLeft className="w-5 h-5" />
          Volver al panel
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
              text-gray-700
            "
          />
        </div>
        <Link
          href="/admin/students/create"
          className="
            mt-5
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
          
          
          "
        >
          <Plus className="w-5 h-5" />
          Crear estudiante
        </Link>
      </div>
      {filteredStudents.length === 0 ? (
        <div
          className="
      bg-white
      rounded-[32px]
      border
      border-slate-200
      shadow-sm
      p-12
      text-center
    "
        >
          <div
            className="
        w-24
        h-24
        mx-auto
        rounded-3xl
        bg-blue-100
        text-blue-700
        flex
        items-center
        justify-center
      "
          >
            <Users className="w-12 h-12" />
          </div>

          <h2
            className="
        mt-8
        text-3xl
        font-bold
        text-slate-900
      "
          >
            No hay estudiantes registrados
          </h2>

          <p
            className="
        mt-4
        text-slate-500
        max-w-xl
        mx-auto
      "
          >
            Todavía no se registró ningún estudiante en el sistema. Podés crear
            alumnos y luego asignarlos a classrooms.
          </p>

          <Link
            href="/admin/students/create"
            className="
        mt-8
        inline-flex
        items-center
        gap-3
        h-14
        px-7
        rounded-2xl
        bg-blue-600
        hover:bg-blue-700
        transition
        text-white
        font-semibold
        shadow-lg
        hover:-translate-y-0.5
      "
          >
            <Plus className="w-5 h-5" />
            Crear estudiante
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
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
              {filteredStudents.map((student) => (
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
                  <div>
                    <AssignClassroom
                      studentId={student.id}
                      currentClassroom={student.classroom}
                      classrooms={classrooms}
                    />
                  </div>
                  <div>
                    <span
                      className={`
      px-4
      py-2
      rounded-full
      text-sm
      font-medium
      ${
        student.status === "active"
          ? "bg-emerald-100 text-emerald-700"
          : student.status === "inactive"
            ? "bg-red-100 text-red-700"
            : "bg-amber-100 text-amber-700"
      }
    `}
                    >
                      {student.status === "active" && "Activo"}

                      {student.status === "inactive" && "Inactivo"}

                      {student.status === "pending" && "Pendiente"}
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
        </div>
      )}
    </main>
  );
}
