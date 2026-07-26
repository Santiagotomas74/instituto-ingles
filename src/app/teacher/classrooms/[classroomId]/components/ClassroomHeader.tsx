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
      mt-8
      flex
      items-start
      justify-between
      "
    >
      <div>
        <div
          className="
          flex
          items-center
          gap-4
          "
        >
          <div
            className="
            w-12
            h-12
            rounded-full
            bg-blue-600
            text-white
            flex
            items-center
            justify-center
            font-semibold
            "
          >
            {classroom.nivel}
          </div>

          <div>
            <h1
              className="
              text-4xl
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
        gap-4
        "
      >
        <button
          onClick={() =>
            router.push(
              `/teacher/classrooms/${classroomId}?tab=important-dates&new=true`,
            )
          }
          className="
          h-11
          px-5
          rounded-xl
          bg-green-500
          hover:bg-green-600
          text-white
          flex
          items-center
          gap-2
          transition
          "
        >
          <Plus size={18} />
          Nueva fecha importante
        </button>

        <button
          onClick={() =>
            router.push(
              `/teacher/classrooms/${classroomId}?tab=announcements&new=true`,
            )
          }
          className="
          h-11
          px-5
          rounded-xl
          border
          border-blue-200
          text-blue-600
          hover:bg-blue-50
          flex
          items-center
          gap-2
          transition
          "
        >
          <Plus size={18} />
          Nuevo anuncio
        </button>

        <Link
          href={`/teacher/classrooms/${classroomId}/materials/new`}
          className="
          h-12
          px-5
          rounded-2xl
          bg-cyan-500
          hover:bg-cyan-400
          transition
          text-white
          flex
          items-center
          gap-2
          font-medium
          "
        >
          <Upload size={18} />
          Subir material
        </Link>
      </div>
    </div>
  );
}
