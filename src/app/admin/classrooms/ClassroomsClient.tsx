"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import {
  Search,
  Plus,
  Users,
  GraduationCap,
  Clock3,
  Pencil,
  ArrowLeft,
  Settings,
  MonitorPlay,
} from "lucide-react";

export default function ClassroomsClient({
  classrooms,
}: {
  classrooms: any[];
}) {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Simulamos el tiempo de carga.
  // Si hacés el fetch acá adentro como en profesores, reemplazalo por tu lógica de fetch.
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

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
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <p className="text-cyan-300 uppercase tracking-[4px] text-sm font-semibold">
              Admin Panel
            </p>

            <h1 className="text-4xl md:text-5xl font-bold mt-3">Classrooms</h1>

            <p className="text-slate-300 mt-4 max-w-2xl">
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
        {/* TOP BAR (Search & Create) */}
        <div
          className="
            bg-white
            rounded-[32px]
            shadow-sm
            border
            border-slate-200
            p-6
            mb-8
          "
        >
          <div className="flex flex-col lg:flex-row gap-5 lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
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

            <Link
              href="/admin/classrooms/create"
              className="
                h-14
                px-7
                rounded-2xl
                bg-cyan-600
                hover:bg-cyan-500
                transition
                font-semibold
                flex
                items-center
                justify-center
                gap-3
                shadow-md
                text-white
              "
            >
              <Plus className="w-5 h-5" />
              Nuevo classroom
            </Link>
          </div>
        </div>

        {/* LOADING, LIST OR EMPTY STATE */}
        {loading ? (
          <div
            className="
              bg-white
              rounded-[32px]
              border
              border-slate-200
              shadow-sm
              p-16
              flex
              flex-col
              items-center
              justify-center
            "
          >
            <div className="relative">
              <div
                className="
                  absolute
                  inset-0
                  rounded-full
                  border-4
                  border-cyan-200
                  border-t-cyan-600
                  animate-spin
                "
              />
              <div
                className="
                  w-24
                  h-24
                  rounded-full
                  bg-white
                  flex
                  items-center
                  justify-center
                  p-2
                "
              >
                <img
                  src="/logo2.png"
                  alt="Instituto"
                  className="w-20 h-20 object-contain"
                />
              </div>
            </div>
            <h2 className="mt-8 text-2xl font-bold text-slate-900">
              Cargando classrooms...
            </h2>
            <p className="mt-3 text-slate-500">Aguarde unos segundos.</p>
          </div>
        ) : filtered.length === 0 ? (
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
                bg-cyan-100
                text-cyan-600
                flex
                items-center
                justify-center
              "
            >
              <GraduationCap className="w-12 h-12" />
            </div>

            <h2 className="mt-8 text-3xl font-bold text-slate-900">
              No hay classrooms creados
            </h2>

            <p className="mt-4 text-slate-500 max-w-xl mx-auto">
              Todavía no se creó ninguna classroom. Podés comenzar creando tu
              primer curso y asignarle un profesor.
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
                bg-cyan-600
                hover:bg-cyan-700
                transition
                text-white
                font-semibold
                shadow-md
                hover:-translate-y-0.5
              "
            >
              <Plus className="w-5 h-5" />
              Crear classroom
            </Link>
          </div>
        ) : (
          <div
            className="
              grid
              grid-cols-1
              xl:grid-cols-2
              2xl:grid-cols-3
              gap-6
            "
          >
            {filtered.map((classroom) => (
              <ClassroomCard key={classroom.id} classroom={classroom} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

/* 
=============================================
NUEVA CARD SUTIL Y ELEGANTE
=============================================
*/

function ClassroomCard({ classroom }: { classroom: any }) {
  return (
    <div
      className="
        bg-white
        rounded-[32px]
        border
        border-slate-200
        shadow-sm
        hover:shadow-xl
        transition-all
        duration-300
        
        flex
        flex-col
        h-full
      "
    >
      {/* HEADER CARD */}
      <div
        className="flex items-start gap-5 mb-8 bg-gradient-to-r
from-slate-800
via-blue-900
to-cyan-900   rounded-[15px] p-8"
      >
        <div
          className="
            w-16
            h-16
            rounded-2xl
            bg-cyan-50
            text-cyan-600
            flex
            items-center
            justify-center
            shrink-0
            border border-cyan-100
          "
        >
          <GraduationCap className="w-8 h-8" />
        </div>

        <div>
          <span
            className="
              inline-block
              px-3
              py-1
              rounded-full
              bg-slate-100
              text-slate-600
              text-xs
              font-bold
              tracking-wide
              uppercase
              mb-2
            "
          >
            {classroom.nivel}
          </span>
          <h2 className="text-2xl font-bold text-white leading-tight">
            {classroom.nombre}
          </h2>
        </div>
      </div>

      {/* INFO LIST */}
      <div className="flex flex-col gap-4 flex-1 mb-2 p-4">
        <div className="flex items-center gap-4 text-slate-600">
          <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5 text-slate-400" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium uppercase">
              Profesor
            </p>
            <p className="font-semibold text-slate-700">
              {classroom.profesor_nombre
                ? `${classroom.profesor_nombre} ${classroom.profesor_apellido}`
                : "Sin asignar"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-slate-600">
          <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
            <Clock3 className="w-5 h-5 text-slate-400" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium uppercase">
              Horario
            </p>
            <p className="font-semibold text-slate-700">{classroom.horario}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-slate-600">
          <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
            <MonitorPlay className="w-5 h-5 text-slate-400" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium uppercase">
              Modalidad
            </p>
            <p className="font-semibold text-slate-700">
              {classroom.modalidad}
            </p>
          </div>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-3 pt-2 mt-auto p-4">
        <Link
          href={`/admin/classrooms/${classroom.id}`}
          className="
            flex-1
            h-14
            rounded-2xl
            bg-cyan-600
            hover:bg-cyan-500
            transition-colors
            text-white
            font-semibold
            flex
            items-center
            justify-center
            gap-2
            shadow-md
          "
        >
          <Settings className="w-5 h-5" />
          Gestionar curso
        </Link>

        <Link
          href={`/admin/classrooms/edit/${classroom.id}`}
          title="Editar classroom"
          className="
            w-14
            h-14
            rounded-2xl
            bg-slate-100
            hover:bg-slate-200
            transition-colors
            text-slate-600
            flex
            items-center
            justify-center
            shrink-0
          "
        >
          <Pencil className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
