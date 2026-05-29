"use client";

import { useState } from "react";
import Link from "next/link";

import {
  Search,
  Plus,
  Users,
  GraduationCap,
  Clock3,
  Pencil,
  Trash2,
  ArrowLeft,
} from "lucide-react";

export default function ClassroomsClient({
  classrooms,
}: {
  classrooms: any[];
}) {
  const [search, setSearch] = useState("");

  const filtered = classrooms.filter((classroom) =>
    classroom.nombre.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <main className="min-h-screen bg-slate-100">
      {/* HEADER */}

      <div
        className="
          bg-gradient-to-r
          from-slate-950
          via-blue-950
          to-cyan-900
          text-white
          px-6
          md:px-10
          py-8
        "
      >
        <div className="flex items-center justify-between gap-5 flex-wrap">
          <div>
            <p className="text-cyan-300 uppercase tracking-[4px] text-sm">
              Admin Panel
            </p>

            <h1 className="text-4xl font-bold mt-3">Classrooms</h1>

            <p className="text-slate-300 mt-4">
              Administrá cursos, niveles y profesores.
            </p>
          </div>

          <Link
            href="/admin/dashboard"
            className="
          h-14
          px-7
          rounded-2xl
          bg-white/10
          border
          border-white/10
          backdrop-blur-md
          hover:bg-white/20
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
      </div>

      {/* CONTENT */}

      <div className="p-6 md:p-10">
        {/* SEARCH */}

        <div className="relative max-w-md mb-8">
          <Search
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              w-5
              h-5
              text-slate-400
            "
          />

          <input
            type="text"
            placeholder="Buscar classroom..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              h-14
              pl-12
              text-slate-900
              pr-5
              rounded-2xl
              border
              border-slate-200
              focus:outline-none
              focus:ring-2
              focus:ring-cyan-500
            "
          />
        </div>

        {filtered.length === 0 ? (
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
        text-blue-600
        flex
        items-center
        justify-center
      "
            >
              <GraduationCap className="w-12 h-12" />
            </div>

            <h2
              className="
        mt-8
        text-3xl
        font-bold
        text-slate-900
      "
            >
              No hay classrooms creados
            </h2>

            <p
              className="
        mt-4
        text-slate-500
        max-w-xl
        mx-auto
      "
            >
              Todavía no se creó ninguna classroom. Podés comenzar creando tu
              primer curso para asignar estudiantes y profesores.
            </p>

            <Link
              href="/admin/classrooms/create"
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
              Crear classroom
            </Link>
          </div>
        ) : (
          <>
            <Link
              href="/admin/classrooms/create"
              className="
              h-14
              px-7
              rounded-2xl
              bg-cyan-500
              hover:bg-cyan-400
              transition
              font-semibold
              flex
              items-center
              gap-3
              mb-6
            "
            >
              <Plus className="w-5 h-5" />
              Nuevo classroom
            </Link>
            <div
              className="
      grid
      grid-cols-1
      xl:grid-cols-2
      gap-8
    "
            >
              {filtered.map((classroom) => (
                <ClassroomCard key={classroom.id} classroom={classroom} />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}

function ClassroomCard({ classroom }: { classroom: any }) {
  return (
    <div
      className="
        bg-white
        rounded-[32px]
        shadow-lg
        border
        border-slate-200
        overflow-hidden
      "
    >
      {/* TOP */}

      <div
        className="
          bg-gradient-to-r
          from-blue-700
          to-cyan-600
          text-white
          p-6
        "
      >
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="text-cyan-100 text-sm">Classroom</p>

            <h2 className="text-3xl font-bold mt-2">{classroom.nombre}</h2>

            <p className="text-cyan-100 mt-3">{classroom.nivel}</p>
          </div>

          <div
            className="
              w-16
              h-16
              rounded-2xl
              bg-white/15
              flex
              items-center
              justify-center
            "
          >
            <GraduationCap className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* BODY */}

      <div className="p-6 space-y-5">
        <InfoRow
          icon={<Users className="w-5 h-5" />}
          label="Profesor"
          value={
            classroom.profesor_nombre
              ? `${classroom.profesor_nombre} ${classroom.profesor_apellido}`
              : "Sin asignar"
          }
        />

        <InfoRow
          icon={<Clock3 className="w-5 h-5" />}
          label="Horario"
          value={classroom.horario}
        />

        <InfoRow
          icon={<GraduationCap className="w-5 h-5" />}
          label="Modalidad"
          value={classroom.modalidad}
        />

        {/* ACTIONS */}

        <div className="flex gap-4 pt-4">
          <Link
            href={`/admin/classrooms/edit/${classroom.id}`}
            className="
              flex-1
              h-12
              rounded-2xl
              bg-blue-600
              hover:bg-blue-700
              transition
              text-white
              font-semibold
              flex
              items-center
              justify-center
              gap-2
            "
          >
            <Pencil className="w-4 h-4" />
            Editar
          </Link>

          <button
            className="
              flex-1
              h-12
              rounded-2xl
              bg-red-500
              hover:bg-red-600
              transition
              text-white
              font-semibold
              flex
              items-center
              justify-center
              gap-2
            "
          >
            <Trash2 className="w-4 h-4" />
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        flex
        items-center
        gap-4
        bg-slate-50
        rounded-2xl
        p-4
      "
    >
      <div
        className="
          w-11
          h-11
          rounded-xl
          bg-cyan-100
          text-cyan-700
          flex
          items-center
          justify-center
        "
      >
        {icon}
      </div>

      <div>
        <p className="text-sm text-slate-500">{label}</p>

        <p className="font-semibold text-slate-900">{value}</p>
      </div>
    </div>
  );
}
