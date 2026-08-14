"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Users,
  Mail,
  ArrowLeft,
  IdCard,
  GraduationCap,
  X,
  AlertTriangle,
} from "lucide-react";

import AssignClassroom from "./AssignClassroom";

type Student = {
  id: string;
  dni: number;
  nombre: string;
  apellido: string;
  email: string;
  status: string;
  nivel: string;
  classroom: string | null;
};

type Classroom = {
  id: string;
  nombre: string;
};

type Props = {
  students: Student[];
  classrooms: Classroom[];
  onDelete?: (studentId: string) => void | Promise<void>;
};

export default function StudentsTable({
  students,
  classrooms,
  onDelete,
}: Props) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const filteredStudents = students.filter((student) =>
    `${student.nombre} ${student.apellido} ${student.email} ${student.dni}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const handleDeleteConfirm = async () => {
    if (!studentToDelete) return;

    try {
      setIsDeleting(true);

      const res = await fetch(`/api/admin/students/${studentToDelete.id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "No se pudo eliminar el alumno");
      }

      // Actualizar el estado local si existe onDelete
      if (onDelete) {
        await onDelete(studentToDelete.id);
      }

      // Cerrar modal
      setStudentToDelete(null);

      // Refrescar los datos del Server Component
      router.refresh();
    } catch (error) {
      console.error("Error eliminando alumno:", error);

      alert(
        error instanceof Error
          ? error.message
          : "No se pudo eliminar el alumno",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 border border-emerald-200">
            Activo
          </span>
        );
      case "inactive":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-700 border border-rose-200">
            Inactivo
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 border border-amber-200">
            Pendiente
          </span>
        );
    }
  };

  return (
    <main className="min-h-screen bg-slate-50/50 p-4 sm:p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
              <Users className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                Gestión académica
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Estudiantes
              </h1>
            </div>
          </div>

          <Link
            href="/admin/dashboard"
            className="h-11 sm:h-12 px-5 rounded-xl bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium flex items-center justify-center gap-2 shadow-sm transition-all w-full sm:w-auto text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al panel
          </Link>
        </div>

        {/* SEARCH & ACTIONS BAR */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar por nombre, DNI o email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-11 rounded-xl border border-gray-200 pl-10 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-800 transition"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <Link
            href="/admin/students/create"
            className="w-full sm:w-auto h-11 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition text-sm shrink-0"
          >
            <Plus className="w-4 h-4" />
            Crear estudiante
          </Link>
        </div>

        {/* CONTENT */}
        {filteredStudents.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 sm:p-12 text-center max-w-lg mx-auto my-8">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <Users className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              {search
                ? "No se encontraron resultados"
                : "Sin estudiantes registrados"}
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              {search
                ? `No hay alumnos que coincidan con "${search}". Prueba con otro término de búsqueda.`
                : "Todavía no se registró ningún estudiante en el sistema."}
            </p>
            {!search && (
              <Link
                href="/admin/students/create"
                className="mt-6 inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition shadow-sm"
              >
                <Plus className="w-4 h-4" />
                Crear primer estudiante
              </Link>
            )}
          </div>
        ) : (
          <div>
            {/* DESKTOP TABLE (Visible en pantallas lg+) */}
            <div className="hidden lg:block bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      <th className="py-4 px-6">Alumno</th>
                      <th className="py-4 px-4">DNI</th>
                      <th className="py-4 px-4">Email</th>
                      <th className="py-4 px-4">Nivel</th>
                      <th className="py-4 px-4">Classroom</th>
                      <th className="py-4 px-4">Estado</th>
                      <th className="py-4 px-6 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm">
                    {filteredStudents.map((student) => (
                      <tr
                        key={student.id}
                        className="hover:bg-slate-50/60 transition-colors"
                      >
                        {/* ALUMNO */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm shrink-0">
                              {student.nombre[0]?.toUpperCase()}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">
                                {student.nombre} {student.apellido}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* DNI */}
                        <td className="py-4 px-4 text-gray-600 font-mono text-xs">
                          {student.dni}
                        </td>

                        {/* EMAIL */}
                        <td className="py-4 px-4 text-gray-600">
                          <div className="flex items-center gap-1.5 max-w-[200px] truncate">
                            <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                            <span className="truncate" title={student.email}>
                              {student.email}
                            </span>
                          </div>
                        </td>

                        {/* NIVEL */}
                        <td className="py-4 px-4">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-cyan-50 text-cyan-700 border border-cyan-200 text-xs font-medium">
                            {student.nivel}
                          </span>
                        </td>

                        {/* CLASSROOM */}
                        <td className="py-4 px-4 min-w-[180px]">
                          <AssignClassroom
                            studentId={student.id}
                            currentClassroom={student.classroom}
                            classrooms={classrooms}
                          />
                        </td>

                        {/* ESTADO */}
                        <td className="py-4 px-4">
                          {getStatusBadge(student.status)}
                        </td>

                        {/* ACCIONES */}
                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Link
                              href={`/admin/students/${student.id}/edit`}
                              title="Editar estudiante"
                              className="p-2 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition"
                            >
                              <Pencil className="w-4 h-4" />
                            </Link>

                            <button
                              type="button"
                              onClick={() => setStudentToDelete(student)}
                              title="Eliminar estudiante"
                              className="p-2 rounded-lg text-gray-500 hover:text-rose-600 hover:bg-rose-50 transition"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* MOBILE & TABLET CARD LIST (Oculto en pantallas lg+) */}
            <div className="lg:hidden space-y-4">
              {filteredStudents.map((student) => (
                <div
                  key={student.id}
                  className="bg-white rounded-2xl border border-gray-200/90 shadow-sm p-4 sm:p-5 space-y-4"
                >
                  {/* Top Bar: Avatar, Info & Acciones */}
                  <div className="flex items-start justify-between gap-3 pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-base shrink-0">
                        {student.nombre[0]?.toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-base leading-snug">
                          {student.nombre} {student.apellido}
                        </h3>
                        <div className="mt-1">
                          {getStatusBadge(student.status)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <Link
                        href={`/admin/students/${student.id}/edit`}
                        className="p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition"
                        title="Editar"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>

                      <button
                        type="button"
                        onClick={() => setStudentToDelete(student)}
                        className="p-2 rounded-lg text-gray-600 hover:text-rose-600 hover:bg-rose-50 transition"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Student Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <IdCard className="w-4 h-4 text-gray-400 shrink-0" />
                      <span className="font-medium text-gray-500">DNI:</span>
                      <span className="font-mono text-gray-800">
                        {student.dni}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                      <span className="font-medium text-gray-500">Email:</span>
                      <span
                        className="text-gray-800 truncate"
                        title={student.email}
                      >
                        {student.email}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-gray-400 shrink-0" />
                      <span className="font-medium text-gray-500">Nivel:</span>
                      <span className="px-2 py-0.5 rounded bg-cyan-50 text-cyan-700 font-medium text-xs">
                        {student.nivel}
                      </span>
                    </div>
                  </div>

                  {/* Classroom Selector */}
                  <div className="pt-2 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-gray-500">
                      Classroom asignada:
                    </span>
                    <div className="w-full sm:w-auto">
                      <AssignClassroom
                        studentId={student.id}
                        currentClassroom={student.classroom}
                        classrooms={classrooms}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DELETE CONFIRMATION MODAL */}
        {studentToDelete && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-gray-100 space-y-4 animate-in fade-in zoom-in duration-150">
              <div className="flex items-center gap-3 text-rose-600">
                <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  ¿Eliminar estudiante?
                </h3>
              </div>

              <p className="text-sm text-gray-600">
                ¿Estás seguro de que deseas eliminar a{" "}
                <span className="font-semibold text-gray-900">
                  {studentToDelete.nombre} {studentToDelete.apellido}
                </span>
                ? Esta acción no se puede deshacer.
              </p>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={() => setStudentToDelete(null)}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={handleDeleteConfirm}
                  className="px-4 py-2 rounded-xl bg-rose-600 text-white text-sm font-medium hover:bg-rose-700 transition flex items-center gap-2 disabled:opacity-50"
                >
                  {isDeleting ? "Eliminando..." : "Sí, eliminar"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
