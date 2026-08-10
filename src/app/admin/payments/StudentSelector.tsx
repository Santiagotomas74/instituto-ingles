"use client";

import { useEffect, useState } from "react";
import { Search, UserCircle2 } from "lucide-react";

import { Student } from "./Payments";

type Props = {
  selectedStudent: Student | null;
  onSelect: (student: Student) => void;
};

export default function StudentSelector({ selectedStudent, onSelect }: Props) {
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadStudents() {
    try {
      const res = await fetch("/api/admin/students");

      const data = await res.json();
      console.log("data", data);

      if (!data.success) return;

      setStudents(data.students);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStudents();
  }, []);

  const filtered = students.filter((student) => {
    const text = search.toLowerCase();

    return (
      `${student.nombre} ${student.apellido}`.toLowerCase().includes(text) ||
      student.email.toLowerCase().includes(text) ||
      student.dni.includes(search)
    );
  });

  return (
    <div
      className="
        bg-white
        rounded-3xl
        border
        border-slate-200
        shadow-sm
        p-6
      "
    >
      <h2 className="text-xl font-bold text-slate-900">Buscar alumno</h2>

      <div className="relative mt-5">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          size={18}
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nombre, email o DNI..."
          className="
            w-full
            h-12
            rounded-xl
            border
            border-slate-300
            pl-11
            pr-4
            outline-none
            focus:ring-2
            focus:ring-cyan-500
            text-slate-700
          "
        />
      </div>

      <div
        className="
          mt-6
          max-h-[380px]
          overflow-y-auto
          rounded-2xl
          border
        "
      >
        {loading ? (
          <div className="p-8 text-center text-slate-500">
            Cargando alumnos...
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            No se encontraron alumnos.
          </div>
        ) : (
          filtered.map((student) => {
            const active = selectedStudent?.id === student.id;

            return (
              <button
                key={student.id}
                onClick={() => onSelect(student)}
                className={`
                  w-full
                  flex
                  items-center
                  gap-4
                  p-5
                  border-b
                  transition

                  ${active ? "bg-cyan-50 border-cyan-200" : "hover:bg-slate-50"}
                `}
              >
                <div
                  className="
                    w-12
                    h-12
                    rounded-full
                    bg-cyan-100
                    flex
                    items-center
                    justify-center
                  "
                >
                  <UserCircle2 className="text-cyan-700" size={28} />
                </div>

                <div className="flex-1 text-left">
                  <p className="font-semibold text-slate-900">
                    {student.nombre} {student.apellido}
                  </p>

                  <p className="text-sm text-slate-500">{student.email}</p>

                  <p className="text-xs text-slate-400 mt-1">
                    DNI {student.dni} • {student.nivel} • {student.status} •
                    {student.created_at &&
                      new Date(student.created_at).toLocaleDateString("es-AR", {
                        year: "numeric",
                        month: "long",
                      })}
                  </p>

                  <p className="text-xs text-slate-400 mt-1">
                    Estado:{" "}
                    <span className="font-semibold">{student.status}</span>
                  </p>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
