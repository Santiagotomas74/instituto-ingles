"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Plus, Upload } from "lucide-react";

import { Classroom } from "../types";

type Props = {
  classroomId: string;
};

export default function ClassroomHeader({ classroomId }: Props) {
  const router = useRouter();

  const [classroom, setClassroom] = useState<Classroom | null>(null);

  const loadClassroom = async () => {
    try {
      const res = await fetch(`/api/teacher/classroom/${classroomId}/aula`);

      if (!res.ok) {
        throw new Error("Error cargando aula");
      }

      const data = await res.json();

      setClassroom(data.classroom);
    } catch (error) {
      console.error("Error cargando aula:", error);
    }
  };

  useEffect(() => {
    if (classroomId) {
      loadClassroom();
    }
  }, [classroomId]);

  if (!classroom) {
    return null;
  }

  return (
    <div
      className="
      mt-6
      lg:mt-8
      flex
      flex-col
      lg:flex-row
      lg:items-start
      justify-between
      gap-6
      lg:gap-4
      "
    >
      <div>
        <div
          className="
          flex
          items-center
          gap-3
          sm:gap-4
          "
        >
          <div
            className="
            w-10
            h-10
            sm:w-12
            sm:h-12
            rounded-full
            bg-blue-600
            text-white
            flex
            items-center
            justify-center
            font-semibold
            shrink-0
            "
          >
            {classroom.nivel}
          </div>

          <div>
            <h1
              className="
              text-2xl
              sm:text-3xl
              lg:text-4xl
              font-bold
              text-gray-900
              "
            >
              {classroom.nombre}
            </h1>

            <p
              className="
              text-gray-500
              mt-1
              text-sm
              sm:text-base
              "
            >
              {classroom.horario}
            </p>
          </div>
        </div>
      </div>

      <div
        className="
        flex
        flex-col
        sm:flex-row
        flex-wrap
        lg:flex-nowrap
        gap-3
        sm:gap-4
        w-full
        lg:w-auto
        "
      >
        <button
          onClick={() =>
            router.push(
              `/teacher/classrooms/${classroomId}?tab=important-dates&new=true`,
            )
          }
          className="
          w-full
          sm:w-auto
          h-11
          px-5
          rounded-xl
          bg-green-500
          hover:bg-green-600
          text-white
          flex
          items-center
          justify-center
          gap-2
          transition
          "
        >
          <Plus size={18} />
          <span>Nueva fecha importante</span>
        </button>

        <button
          onClick={() =>
            router.push(
              `/teacher/classrooms/${classroomId}?tab=announcements&new=true`,
            )
          }
          className="
          w-full
          sm:w-auto
          h-11
          px-5
          rounded-xl
          border
          border-blue-200
          text-blue-600
          hover:bg-blue-50
          flex
          items-center
          justify-center
          gap-2
          transition
          "
        >
          <Plus size={18} />
          <span>Nuevo anuncio</span>
        </button>

        <Link
          href={`/teacher/classrooms/${classroomId}/materials/new`}
          className="
          w-full
          sm:w-auto
          h-12
          px-5
          rounded-2xl
          bg-cyan-500
          hover:bg-cyan-400
          transition
          text-white
          flex
          items-center
          justify-center
          gap-2
          font-medium
          "
        >
          <Upload size={18} />
          <span>Subir material</span>
        </Link>
      </div>
    </div>
  );
}
