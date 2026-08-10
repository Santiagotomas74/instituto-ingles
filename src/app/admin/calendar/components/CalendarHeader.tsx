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
        rounded-[32px]
        bg-gradient-to-r
        from-cyan-600
        via-sky-600
        to-blue-700
        p-10
        shadow-xl
        text-white
        z-30
      "
    >
      {/* DECORACIONES */}
      <div className="absolute inset-0 overflow-hidden rounded-[32px] pointer-events-none">
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
      </div>

      {/* CONTENIDO */}
      <div
        className="
          relative
          z-10
          flex
          flex-col
          gap-8
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        {/* INFORMACIÓN */}

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
              shrink-0
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

        {/* ACCIONES */}

        <div className="flex gap-4">
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
              whitespace-nowrap
            "
          >
            <ArrowLeft size={18} />
            Dashboard
          </Link>

          {/* DROPDOWN */}

          <div className="relative group">
            <button
              type="button"
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
                whitespace-nowrap
              "
            >
              <Plus size={18} />
              Nueva fecha
              <ChevronDown
                size={18}
                className="
                  transition-transform
                  duration-200
                  group-hover:rotate-180
                "
              />
            </button>

            {/* DROPDOWN MENU */}

            <div
              className="
                absolute
                right-0
                top-full
                mt-3
                w-80
                rounded-2xl
                bg-white
                shadow-2xl
                border
                border-slate-200

                opacity-0
                invisible
                translate-y-2

                group-hover:opacity-100
                group-hover:visible
                group-hover:translate-y-0

                transition-all
                duration-200

                overflow-hidden
                z-[9999]
              "
            >
              {/* TODAS LAS AULAS */}

              <button
                type="button"
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

              {/* AULA ESPECÍFICA */}

              <button
                type="button"
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
