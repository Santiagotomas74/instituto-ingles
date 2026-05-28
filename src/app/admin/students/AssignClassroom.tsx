"use client";

import { useState } from "react";

import { Pencil } from "lucide-react";

type Classroom = {
  id: string;
  nombre: string;
};

type Props = {
  studentId: string;
  currentClassroom: string | null;
  classrooms: Classroom[];
};

export default function AssignClassroom({
  studentId,
  currentClassroom,
  classrooms,
}: Props) {
  const [selected, setSelected] = useState("");

  const [loading, setLoading] = useState(false);

  const [editing, setEditing] = useState(false);

  const handleAssign = async () => {
    if (!selected) return;

    try {
      setLoading(true);

      const res = await fetch(`/api/admin/students/assign-classroom`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student_id: studentId,
          classroom_id: selected,
        }),
      });

      const data = await res.json();

      if (data.success) {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // SI YA TIENE CLASSROOM Y NO ESTÁ EDITANDO
  if (currentClassroom && !editing) {
    return (
      <div className="flex items-center gap-3">
        <div
          className="
            px-4
            py-2
            rounded-full
            bg-blue-100
            text-blue-700
            text-sm
            font-semibold
          "
        >
          {currentClassroom}
        </div>

        <button
          onClick={() => setEditing(true)}
          className="
            w-10
            h-10
            rounded-xl
            bg-slate-100
            hover:bg-slate-200
            transition
            flex
            items-center
            justify-center
            text-slate-700
          "
        >
          <Pencil className="w-4 h-4" />
        </button>
      </div>
    );
  }

  // SI NO TIENE CLASSROOM O ESTÁ EDITANDO
  return (
    <div className="flex flex-col gap-3">
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="
          h-11
          rounded-xl
          border
          border-gray-200
          px-4
          text-gray-700
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          bg-white
        "
      >
        <option value="">Seleccionar classroom</option>

        {classrooms.map((classroom) => (
          <option key={classroom.id} value={classroom.id}>
            {classroom.nombre}
          </option>
        ))}
      </select>

      <div className="flex gap-2">
        <button
          onClick={handleAssign}
          disabled={loading}
          className="
            flex-1
            h-11
            rounded-xl
            bg-blue-600
            hover:bg-blue-700
            transition
            text-white
            font-medium
          "
        >
          {loading ? "Asignando..." : "Guardar"}
        </button>

        {currentClassroom && (
          <button
            onClick={() => setEditing(false)}
            className="
              h-11
              px-4
              rounded-xl
              border
              border-gray-200
              hover:bg-gray-100
              transition
              text-gray-700
            "
          >
            Cancelar
          </button>
        )}
      </div>
    </div>
  );
}
