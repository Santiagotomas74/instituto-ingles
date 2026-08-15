"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import {
  Clock,
  RefreshCw,
  AlertCircle,
  Search,
  CheckCircle2,
  X,
} from "lucide-react";

import PendingTaskCard from "./PendingTaskCard";
import EmptyPendingTasks from "./EmptyPendingTasks";

type PendingTask = {
  id: string;
  classroom_id: string;
  classroom: string;
  teacher: string;
  titulo: string;
  descripcion: string;
  due_date: string | null;
  due_time: string | null;
  max_score: number;
};

export default function PendingTasks() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tasks, setTasks] = useState<PendingTask[]>([]);
  const [search, setSearch] = useState("");

  const loadTasks = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const res = await fetch("/api/student/tasks/pending");

      if (!res.ok) {
        throw new Error("No se pudieron obtener las tareas pendientes.");
      }

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Error al cargar las tareas.");
      }

      setTasks(data.tasks || []);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Ocurrió un error inesperado.";
      setError(errorMessage);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  // Filtrado de tareas por término de búsqueda
  const filteredTasks = useMemo(() => {
    if (!search.trim()) return tasks;
    const term = search.toLowerCase();
    return tasks.filter(
      (task) =>
        task.titulo.toLowerCase().includes(term) ||
        task.classroom.toLowerCase().includes(term) ||
        task.teacher.toLowerCase().includes(term),
    );
  }, [tasks, search]);

  // VISTA 1: Skeleton Loader durante la carga inicial
  if (loading) {
    return <PendingTasksSkeleton />;
  }

  // VISTA 2: Estado de error con botón de reintento
  if (error) {
    return (
      <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-6 sm:p-8 text-center max-w-lg mx-auto space-y-4 my-6">
        <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900 text-base">
            Error al obtener las tareas
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">{error}</p>
        </div>
        <button
          type="button"
          onClick={() => loadTasks()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-medium transition shadow-sm"
        >
          <RefreshCw className="w-4 h-4" />
          Reintentar
        </button>
      </div>
    );
  }

  // VISTA 3: Sin tareas asignadas originalmente
  if (!tasks.length) {
    return <EmptyPendingTasks />;
  }

  return (
    <div className="space-y-6">
      {/* HEADER Y ACCIONES */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-gray-200/80 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-semibold text-sm shrink-0 border border-amber-200/60">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-gray-900 text-base sm:text-lg">
                Tareas Pendientes
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
                {tasks.length}
              </span>
            </div>
            <p className="text-xs text-gray-500">
              Entrega a tiempo para mantener tus calificaciones.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Buscador Rápido */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar tarea o materia..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-9 pl-9 pr-8 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-800 bg-slate-50/50"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Botón Refrescar */}
          <button
            type="button"
            onClick={() => loadTasks(true)}
            disabled={refreshing}
            title="Actualizar tareas"
            className="h-9 w-9 rounded-xl border border-gray-200 bg-white hover:bg-slate-50 text-gray-600 flex items-center justify-center transition shrink-0 disabled:opacity-50"
          >
            <RefreshCw
              className={`w-4 h-4 ${refreshing ? "animate-spin text-blue-600" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* RESULTADO DE BÚSQUEDA VACÍO */}
      {filteredTasks.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center space-y-3">
          <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center mx-auto">
            <Search className="w-5 h-5" />
          </div>
          <p className="text-sm font-medium text-gray-900">
            No se encontraron tareas
          </p>
          <p className="text-xs text-gray-500">
            Ninguna tarea coincide con el término &quot;{search}&quot;.
          </p>
          <button
            type="button"
            onClick={() => setSearch("")}
            className="text-xs text-blue-600 font-semibold hover:underline"
          >
            Limpiar búsqueda
          </button>
        </div>
      ) : (
        /* LISTA DE TARJETAS */
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <PendingTaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}

// COMPONENTE SKELETON LOADER
function PendingTasksSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {/* Header Skeleton */}
      <div className="h-16 bg-slate-200/70 rounded-2xl w-full" />

      {/* Task Cards Skeletons */}
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-white rounded-2xl p-5 border border-gray-200/80 space-y-4 shadow-sm"
        >
          <div className="flex justify-between items-start">
            <div className="space-y-2 w-2/3">
              <div className="h-4 bg-slate-200 rounded w-1/3" />
              <div className="h-5 bg-slate-200 rounded w-3/4" />
            </div>
            <div className="h-6 bg-slate-200 rounded-full w-20" />
          </div>
          <div className="h-12 bg-slate-100 rounded-xl w-full" />
          <div className="flex justify-between items-center pt-2">
            <div className="h-4 bg-slate-200 rounded w-1/4" />
            <div className="h-8 bg-slate-200 rounded-xl w-28" />
          </div>
        </div>
      ))}
    </div>
  );
}
