"use client";

import Link from "next/link";

import { ArrowLeft, CalendarDays, Plus, ChevronDown } from "lucide-react";

type Props = {
  onGlobal: () => void;
  onClassroom: () => void;
};

export default function CalendarHeader({ onGlobal, onClassroom }: Props) {
  return (
    <section
      className="
      relative
      overflow-hidden
      rounded-[32px]
      bg-gradient-to-r
      from-cyan-600
      via-sky-600
      to-blue-700
      p-10
      shadow-xl
      text-white
      h-100
      "
    >
      <div
        className="
        absolute
        -right-16
        -top-16
        h-64
        w-64
        rounded-full
        bg-white/10
      "
      />

      <div
        className="
        absolute
        -left-10
        -bottom-10
        h-40
        w-40
        rounded-full
        bg-white/5
      "
      />

      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Información */}

        <div className="flex items-center gap-6">
          <div
            className="
            h-20
            w-20
            rounded-3xl
            bg-white/15
            backdrop-blur-md
            flex
            items-center
            justify-center
            shadow-lg
          "
          >
            <CalendarDays size={42} />
          </div>

          <div>
            <h1 className="text-4xl font-bold">Calendario Académico</h1>

            <p className="mt-2 text-cyan-100 text-lg max-w-2xl">
              Visualizá todas las fechas importantes del instituto, filtrá por
              aula y administrá el calendario académico.
            </p>
          </div>
        </div>

        {/* Acciones */}

        <div className="flex flex-wrap gap-4">
          <Link
            href="/admin/dashboard"
            className="
            h-12
            px-5
            rounded-2xl
            bg-white/15
            hover:bg-white/25
            backdrop-blur
            transition
            flex
            items-center
            gap-2
            font-medium
            "
          >
            <ArrowLeft size={18} />
            Dashboard
          </Link>

          <div className="relative group">
            <button
              className="
              h-12
              px-5
              rounded-2xl
              bg-white
              text-cyan-700
              hover:bg-cyan-50
              transition
              flex
              items-center
              gap-2
              font-semibold
              shadow-lg
            "
            >
              <Plus size={18} />
              Nueva fecha
              <ChevronDown size={18} />
            </button>

            <div
              className="
              absolute
              right-0
              mt-3
              w-72
              rounded-2xl
              bg-white
              shadow-2xl
              border
              border-slate-200
              opacity-0
              invisible
              group-hover:opacity-100
              group-hover:visible
              transition-all
              overflow-hidden
              z-50
            "
            >
              <button
                onClick={onGlobal}
                className="
                w-full
                text-left
                px-5
                py-4
                hover:bg-slate-50
                transition
                text-slate-700
                flex
                items-center
                gap-3
              "
              >
                <span className="text-xl">🌎</span>

                <div>
                  <p className="font-semibold">Todas las aulas</p>

                  <p className="text-sm text-slate-500">
                    La fecha se creará en todas las clases.
                  </p>
                </div>
              </button>

              <button
                onClick={onClassroom}
                className="
                w-full
                text-left
                px-5
                py-4
                hover:bg-slate-50
                transition
                border-t
                border-slate-100
                text-slate-700
                flex
                items-center
                gap-3
              "
              >
                <span className="text-xl">🏫</span>

                <div>
                  <p className="font-semibold">Aula específica</p>

                  <p className="text-sm text-slate-500">
                    Seleccioná una clase en particular.
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
