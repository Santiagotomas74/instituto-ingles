"use client";

import { useEffect, useState } from "react";

import TaskCard from "./TaskCard";

export type Task = {
  id: string;

  titulo: string;

  descripcion: string;

  instrucciones: string;

  due_date: string | null;

  due_time: string | null;

  allow_submission: boolean;

  submission_type: "individual" | "pool";

  max_score: number;

  is_published: boolean;

  submission_id: string | null;

  submitted_at: string | null;

  grade: number | null;

  teacher_feedback: string | null;

  comentario: string | null;

  archivo_url: string | null;

  archivo_nombre: string | null;
};

interface Props {
  classroomId: string;
  selectedTaskId?: string | null;
}

export default function Tasks({ classroomId, selectedTaskId }: Props) {
  const [loading, setLoading] = useState(true);

  const [tasks, setTasks] = useState<Task[]>([]);

  async function loadTasks() {
    try {
      const res = await fetch(`/api/student/classroom/${classroomId}/tasks`);

      const data = await res.json();

      if (data.success) {
        setTasks(data.tasks);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, [classroomId]);

  if (loading) {
    return (
      <div className="py-16 text-center text-slate-500">Cargando tareas...</div>
    );
  }

  if (!tasks.length) {
    return (
      <div className="rounded-3xl border bg-white p-12 text-center text-slate-500">
        No hay tareas publicadas.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          classroomId={classroomId}
          task={task}
          highlighted={task.id === selectedTaskId}
        />
      ))}
    </div>
  );
}
