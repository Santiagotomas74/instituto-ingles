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
      <div className="bg-white rounded-2xl border p-8 text-center text-gray-500">
        Cargando estudiantes...
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
