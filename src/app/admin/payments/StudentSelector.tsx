"use client";

import { useEffect, useState } from "react";
import {
  Search,
  UserCircle2,
  X,
  Check,
  Loader2,
  Mail,
  IdCard,
  GraduationCap,
  UserX,
} from "lucide-react";

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

      if (!data.success) return;

      setStudents(data.students || []);
    } catch (error) {
      console.error("Error al cargar alumnos:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStudents();
  }, []);

  const filtered = students.filter((student) => {
    const text = search.toLowerCase();
    const fullName = `${student.nombre} ${student.apellido}`.toLowerCase();

    return (
      fullName.includes(text) ||
      student.email.toLowerCase().includes(text) ||
      student.dni.includes(search)
    );
  });

  return (
    <div className="w-full">
      {/* HEADER & CONTADOR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 sm:mb-4">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
          <span>Buscar alumno</span>
          {!loading && (
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
              {filtered.length}
            </span>
          )}
        </h2>

        {selectedStudent && (
          <span className="text-xs text-blue-600 font-medium">
            Alumno seleccionado actualmente
          </span>
        )}
      </div>

      {/* CAMPO DE BÚSQUEDA */}
      <div className="relative">
        <Search
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          size={18}
        />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nombre, email o DNI..."
          className="
            w-full
            h-11
            sm:h-12
            rounded-xl
            border
            border-slate-200
            bg-slate-50/50
            pl-10
            pr-10
            text-xs
            sm:text-sm
            text-slate-800
            placeholder:text-slate-400
            outline-none
            transition
            focus:bg-white
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-100
          "
        />

        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-lg transition"
            aria-label="Limpiar búsqueda"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* LISTA DE ALUMNOS */}
      <div className="mt-4 max-h-[360px] sm:max-h-[420px] overflow-y-auto rounded-2xl border border-slate-200/80 divide-y divide-slate-100 bg-white shadow-xs">
        {loading ? (
          <div className="py-12 text-center text-slate-400 flex flex-col items-center gap-3">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
            <p className="text-xs sm:text-sm">Cargando lista de alumnos...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-12 text-center text-slate-400 flex flex-col items-center gap-2 px-4">
            <UserX className="w-8 h-8 text-slate-300" />
            <p className="text-xs sm:text-sm font-medium text-slate-600">
              No se encontraron alumnos
            </p>
            <p className="text-[11px] text-slate-400">
              Intentá buscar por nombre, apellido, DNI o correo electrónico.
            </p>
          </div>
        ) : (
          filtered.map((student) => {
            const active = selectedStudent?.id === student.id;

            return (
              <button
                key={student.id}
                type="button"
                onClick={() => onSelect(student)}
                className={`
                  w-full
                  flex
                  items-center
                  justify-between
                  gap-3
                  p-3.5
                  sm:p-4
                  text-left
                  transition-all
                  duration-150
                  ${
                    active
                      ? "bg-blue-50/70 hover:bg-blue-50"
                      : "hover:bg-slate-50/80"
                  }
                `}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* AVATAR */}
                  <div
                    className={`
                      w-10
                      h-10
                      sm:w-11
                      sm:h-11
                      rounded-xl
                      flex
                      items-center
                      justify-center
                      shrink-0
                      transition-colors
                      ${
                        active
                          ? "bg-blue-600 text-white shadow-xs"
                          : "bg-slate-100 text-slate-600"
                      }
                    `}
                  >
                    <UserCircle2 className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>

                  {/* DATOS DEL ALUMNO */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-xs sm:text-sm text-slate-900 truncate">
                        {student.nombre} {student.apellido}
                      </p>

                      {/* BADGE ESTADO */}
                      <span
                        className={`
                          text-[10px]
                          font-semibold
                          px-2
                          py-0.5
                          rounded-md
                          capitalize
                          shrink-0
                          ${
                            student.status === "active"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                              : "bg-slate-100 text-slate-600 border border-slate-200"
                          }
                        `}
                      >
                        {student.status === "active" ? "Activo" : "Inactivo"}
                      </span>
                    </div>

                    {/* METADATOS */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-[11px] sm:text-xs text-slate-500">
                      <span className="flex items-center gap-1 min-w-0">
                        <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate max-w-[140px] sm:max-w-[200px]">
                          {student.email}
                        </span>
                      </span>

                      <span className="flex items-center gap-1 shrink-0">
                        <IdCard className="w-3 h-3 text-slate-400 shrink-0" />
                        <span>DNI {student.dni}</span>
                      </span>

                      {student.nivel && (
                        <span className="flex items-center gap-1 shrink-0">
                          <GraduationCap className="w-3 h-3 text-slate-400 shrink-0" />
                          <span className="capitalize">{student.nivel}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* CHECK DE SELECCIÓN */}
                <div className="shrink-0 pl-1 sm:pl-2">
                  <div
                    className={`
                      w-5
                      h-5
                      sm:w-6
                      sm:h-6
                      rounded-full
                      flex
                      items-center
                      justify-center
                      transition-all
                      ${
                        active
                          ? "bg-blue-600 text-white shadow-xs"
                          : "border border-slate-300 text-transparent"
                      }
                    `}
                  >
                    <Check
                      className="w-3 h-3 sm:w-3.5 sm:h-3.5"
                      strokeWidth={3}
                    />
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
