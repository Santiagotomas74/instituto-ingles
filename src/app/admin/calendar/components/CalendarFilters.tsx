"use client";

import { Filter } from "lucide-react";

import { Classroom } from "../types";

type Props = {
  classrooms: Classroom[];

  selectedClassroom: string;

  setSelectedClassroom: (value: string) => void;
};

export default function CalendarFilters({
  classrooms,
  selectedClassroom,
  setSelectedClassroom,
}: Props) {
  return (
    <section
      className="
      mt-8
      bg-white
      rounded-[28px]
      border
      border-slate-200
      shadow-lg
      p-8
    "
    >
      <div
        className="
        flex
        flex-col
        lg:flex-row
        lg:items-center
        lg:justify-between
        gap-6
      "
      >
        <div>
          <div className="flex items-center gap-3">
            <div
              className="
              h-12
              w-12
              rounded-2xl
              bg-cyan-100
              text-cyan-600
              flex
              items-center
              justify-center
            "
            >
              <Filter size={22} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Filtrar calendario
              </h2>

              <p className="text-slate-500">
                Elegí un aula o visualizá todas las fechas del instituto.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-96">
          <label
            className="
            block
            text-sm
            font-semibold
            text-slate-600
            mb-2
          "
          >
            Aula
          </label>

          <select
            value={selectedClassroom}
            onChange={(e) => setSelectedClassroom(e.target.value)}
            className="
            w-full
            h-12
            rounded-2xl
            border
            border-slate-300
            bg-slate-50
            px-4
            text-slate-700
            transition
            focus:outline-none
            focus:ring-2
            focus:ring-cyan-500
            focus:border-cyan-500
          "
          >
            <option value="">📅 Todas las aulas</option>

            {classrooms.map((classroom) => (
              <option key={classroom.id} value={classroom.id}>
                {classroom.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}
