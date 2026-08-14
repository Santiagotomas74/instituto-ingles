"use client";

import { useState, useEffect } from "react";
import { Pencil, Check, X, Loader2, School, Plus } from "lucide-react";

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
  // Buscar el objeto classroom correspondiente para obtener su ID si solo viene el nombre
  const initialClassroom = classrooms.find(
    (c) => c.nombre === currentClassroom || c.id === currentClassroom,
  );

  const [selected, setSelected] = useState<string>(initialClassroom?.id || "");
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  // Sincronizar el valor cuando cambien los props
  useEffect(() => {
    const matched = classrooms.find(
      (c) => c.nombre === currentClassroom || c.id === currentClassroom,
    );
    if (matched) {
      setSelected(matched.id);
    }
  }, [currentClassroom, classrooms]);

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
      console.error("Error al asignar classroom:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setSelected(initialClassroom?.id || "");
    setEditing(false);
  };

  // VISTA 1: TIENE CLASSROOM Y NO ESTÁ EDITANDO
  if (currentClassroom && !editing) {
    return (
      <div className="flex items-center gap-1.5 group">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200/80 text-xs font-semibold shrink-0">
          <School className="w-3.5 h-3.5 text-blue-500 shrink-0" />
          <span className="truncate max-w-[130px]" title={currentClassroom}>
            {currentClassroom}
          </span>
        </span>

        <button
          type="button"
          onClick={() => {
            if (initialClassroom) setSelected(initialClassroom.id);
            setEditing(true);
          }}
          title="Cambiar classroom"
          className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition shrink-0"
        >
          <Pencil className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  // VISTA 2: NO TIENE CLASSROOM Y NO ESTÁ EDITANDO
  if (!currentClassroom && !editing) {
    return (
      <button
        type="button"
        onClick={() => setEditing(true)}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-slate-600 border border-slate-200/80 text-xs font-medium transition text-left shrink-0"
      >
        <Plus className="w-3.5 h-3.5 text-slate-400" />
        <span>Sin classroom</span>
      </button>
    );
  }

  // VISTA 3: MODO EDICIÓN / ASIGNACIÓN
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-1.5 w-full max-w-full sm:max-w-[240px]">
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        disabled={loading}
        className="h-9 w-full rounded-lg border border-slate-300 bg-white px-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition disabled:opacity-50"
      >
        <option value="">Seleccionar classroom...</option>
        {classrooms.map((classroom) => (
          <option key={classroom.id} value={classroom.id}>
            {classroom.nombre}
          </option>
        ))}
      </select>

      <div className="flex items-center gap-1 shrink-0 justify-end">
        <button
          type="button"
          onClick={handleAssign}
          disabled={loading || !selected}
          title="Guardar"
          className="h-9 px-2.5 sm:px-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs flex items-center justify-center gap-1 transition disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
        >
          {loading ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Check className="w-3.5 h-3.5" />
          )}
          <span className="sm:hidden font-semibold">Guardar</span>
        </button>

        <button
          type="button"
          onClick={handleCancel}
          disabled={loading}
          title="Cancelar"
          className="h-9 px-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-xs transition disabled:opacity-50 shrink-0 flex items-center justify-center"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
