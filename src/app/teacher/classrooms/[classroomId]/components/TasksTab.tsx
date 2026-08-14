"use client";

import { useCallback, useEffect, useState } from "react";

import { Plus } from "lucide-react";

import TaskCard from "./task/TaskCard";
import EmptyTasks from "./task/EmptyTasks";
import CreateTaskModal from "./task/CreateTaskModal";

type Props = {
  classroomId: string;
};

export type ClassroomTask = {
  id: string;

  titulo: string;

  descripcion: string | null;

  due_date: string | null;

  due_time: string | null;

  allow_submission: boolean;

  submission_type: "individual" | "pool";

  is_published: boolean;

  max_score: number | null;

  created_at: string;

  submissions?: number;
};

export default function TasksTab({ classroomId }: Props) {
  const [tasks, setTasks] = useState<ClassroomTask[]>([]);

  const [loading, setLoading] = useState(true);

  const [openCreate, setOpenCreate] = useState(false);

  /*
  ==========================================
  Obtener tareas
  ==========================================
  */

  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);

      const res = await fetch(`/api/teacher/classroom/${classroomId}/tasks`);

      const data = await res.json();

      if (!res.ok || !data.success) return;

      setTasks(data.tasks);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [classroomId]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  return (
    <>
      <div className="space-y-4 sm:space-y-6">
        {/* Header */}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Tareas
            </h2>

            <p className="text-xs sm:text-sm text-slate-500 mt-0.5 sm:mt-1">
              Administra las actividades de esta classroom.
            </p>
          </div>

          <button
            onClick={() => setOpenCreate(true)}
            className="
              w-full
              sm:w-auto
              h-11
              px-5
              rounded-xl
              bg-cyan-600
              hover:bg-cyan-700
              active:bg-cyan-800
              text-white
              flex
              items-center
              justify-center
              gap-2
              transition
              shrink-0
              font-medium
              text-sm
              sm:text-base
            "
          >
            <Plus size={18} />
            Nueva tarea
          </button>
        </div>

        {/* Loading */}

        {loading && (
          <div className="text-center py-12 sm:py-16 text-slate-500 text-sm sm:text-base">
            Cargando tareas...
          </div>
        )}

        {/* Sin tareas */}

        {!loading && tasks.length === 0 && <EmptyTasks />}

        {/* Lista */}

        {!loading && tasks.length > 0 && (
          <div className="space-y-3 sm:space-y-5">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                classroomId={classroomId}
                onReload={loadTasks}
              />
            ))}
          </div>
        )}
      </div>

      <CreateTaskModal
        open={openCreate}
        classroomId={classroomId}
        onClose={() => setOpenCreate(false)}
        onCreated={loadTasks}
      />
    </>
  );
}
