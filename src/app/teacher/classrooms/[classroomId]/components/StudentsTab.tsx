"use client";

import { useEffect, useState } from "react";

import { Student } from "../types";

type Props = {
  classroomId: string;
};

export default function StudentsTab({ classroomId }: Props) {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  const loadStudents = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `/api/teacher/classroom/${classroomId}/students`,
      );

      if (!response.ok) {
        throw new Error("Error cargando estudiantes");
      }

      const data = await response.json();

      setStudents(data.students ?? []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (classroomId) {
      loadStudents();
    }
  }, [classroomId]);

  if (loading) {
    return (
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
          Cargando estudiantes...
        </h2>
        <p className="mt-3 text-slate-500">Aguarde unos segundos.</p>
      </div>
    );
  }

  return (
    <div>
      <h2
        className="
        text-2xl
        font-semibold
        mb-6
        text-gray-900
      "
      >
        Estudiantes
      </h2>

      <div
        className="
        bg-white
        rounded-2xl
        border
        overflow-hidden
      "
      >
        {students.length === 0 ? (
          <div
            className="
            p-6
            text-gray-500
          "
          >
            No hay estudiantes asignados.
          </div>
        ) : (
          <table
            className="
            w-full
          "
          >
            <thead
              className="
              bg-slate-50
            "
            >
              <tr>
                <th
                  className="
                  text-left
                  p-4
                  text-gray-700
                "
                >
                  Alumno
                </th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr
                  key={student.id}
                  className="
                  border-t
                "
                >
                  <td
                    className="
                    p-4
                    text-gray-800
                  "
                  >
                    {student.apellido}, {student.nombre}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
