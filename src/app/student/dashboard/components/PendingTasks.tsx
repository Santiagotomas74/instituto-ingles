"use client";

import { useEffect, useState } from "react";

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

  const [tasks, setTasks] = useState<PendingTask[]>([]);

  async function load() {
    try {
      const res = await fetch("/api/student/tasks/pending");

      const data = await res.json();

      if (!data.success) return;

      setTasks(data.tasks);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-500">Cargando tareas...</div>
    );
  }

  if (!tasks.length) {
    return <EmptyPendingTasks />;
  }

  return (
    <div className="space-y-5">
      {tasks.map((task) => (
        <PendingTaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
