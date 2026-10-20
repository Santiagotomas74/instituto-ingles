"use client";

import { useState, useEffect } from "react";
import { Pencil, Check, X, Loader2, School, Plus, Trash2 } from "lucide-react";

type Classroom = {
  id: string;
  nombre: string;
};

type Props = {
  studentId: string;
  currentClassrooms: Classroom[];
  classrooms: Classroom[];
};

export default function AssignClassroom({
  studentId,
  currentClassrooms,
  classrooms,
}: Props) {
  const [assigned, setAssigned] = useState<Classroom[]>(currentClassrooms);
  const [selected, setSelected] = useState("");
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setAssigned(currentClassrooms);
  }, [currentClassrooms]);

  const availableClassrooms = classrooms.filter(
    (classroom) =>
      !assigned.some((assignedClass) => assignedClass.id === classroom.id),
  );

  const handleAssign = async () => {
    if (!selected) return;

    try {
      setLoadingId(selected);
      setError("");

      const response = await fetch("/api/admin/students/assign-classroom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_id: studentId,
          classroom_id: selected,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "No se pudo asignar la clase");
      }

      const classroom = classrooms.find((item) => item.id === selected);

      if (classroom) {
        setAssigned((previous) =>
          previous.some((item) => item.id === classroom.id)
            ? previous
            : [...previous, classroom],
        );
      }

      setSelected("");
      setAdding(false);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al asignar la clase",
      );
    } finally {
      setLoadingId(null);
    }
  };

  const handleRemove = async (classroom: Classroom) => {
    const confirmed = window.confirm(
      `¿Quitar a este alumno de la clase "${classroom.nombre}"?`,
    );

    if (!confirmed) return;

    try {
      setLoadingId(classroom.id);
      setError("");

      const response = await fetch("/api/admin/students/assign-classroom", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_id: studentId,
          classroom_id: classroom.id,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "No se pudo quitar la clase");
      }

      setAssigned((previous) =>
        previous.filter((item) => item.id !== classroom.id),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al quitar la clase");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="min-w-0 space-y-2">
      <div className="flex flex-wrap items-center gap-1.5">
        {assigned.length === 0 && !adding && (
          <span className="text-xs text-slate-400">Sin clases asignadas</span>
        )}

        {assigned.map((classroom) => (
          <span
            key={classroom.id}
            className="inline-flex max-w-full items-center gap-1.5 rounded-lg border border-blue-200/80 bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700"
          >
            <School className="h-3.5 w-3.5 shrink-0 text-blue-500" />

            <span className="max-w-[140px] truncate" title={classroom.nombre}>
              {classroom.nombre}
            </span>

            <button
              type="button"
              onClick={() => handleRemove(classroom)}
              disabled={loadingId !== null}
              title={`Quitar de ${classroom.nombre}`}
              aria-label={`Quitar al alumno de ${classroom.nombre}`}
              className="ml-0.5 rounded p-0.5 text-blue-500 transition hover:bg-rose-100 hover:text-rose-600 disabled:opacity-40"
            >
              {loadingId === classroom.id ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <X className="h-3.5 w-3.5" />
              )}
            </button>
          </span>
        ))}

        {!adding && availableClassrooms.length > 0 && (
          <button
            type="button"
            onClick={() => setAdding(true)}
            disabled={loadingId !== null}
            className="inline-flex items-center gap-1 rounded-lg border border-dashed border-slate-300 px-2.5 py-1 text-xs font-medium text-slate-600 transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 disabled:opacity-40"
          >
            <Plus className="h-3.5 w-3.5" />
            Agregar
          </button>
        )}
      </div>

      {adding && (
        <div className="flex min-w-0 flex-col gap-1.5 sm:flex-row">
          <select
            value={selected}
            onChange={(event) => setSelected(event.target.value)}
            disabled={loadingId !== null}
            className="h-9 min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-2.5 text-xs text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50"
          >
            <option value="">Seleccionar clase...</option>
            {availableClassrooms.map((classroom) => (
              <option key={classroom.id} value={classroom.id}>
                {classroom.nombre}
              </option>
            ))}
          </select>

          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={handleAssign}
              disabled={!selected || loadingId !== null}
              title="Confirmar asignación"
              className="flex h-9 items-center justify-center gap-1 rounded-lg bg-blue-600 px-2.5 text-xs font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loadingId === selected && selected ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Check className="h-3.5 w-3.5" />
              )}
              Agregar
            </button>

            <button
              type="button"
              onClick={() => {
                setSelected("");
                setAdding(false);
                setError("");
              }}
              disabled={loadingId !== null}
              title="Cancelar"
              className="flex h-9 items-center justify-center rounded-lg border border-slate-200 px-2 text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {adding && availableClassrooms.length === 0 && (
        <p className="text-xs text-slate-500">
          El alumno ya pertenece a todas las clases disponibles.
        </p>
      )}

      {error && (
        <p role="alert" className="text-xs text-rose-600">
          {error}
        </p>
      )}
    </div>
  );
}
