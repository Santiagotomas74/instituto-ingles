"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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

  /*
  =====================================================
  LOADING
  =====================================================
  */

  if (loading) {
    return (
      <div
        className="
          bg-white
          rounded-[32px]
          border
          border-slate-200
          shadow-sm
          p-16
          flex
          flex-col
          items-center
          justify-center
        "
      >
        <div className="relative">
          <div
            className="
              absolute
              inset-0
              rounded-full
              border-4
              border-cyan-200
              border-t-cyan-600
              animate-spin
            "
          />

          <div
            className="
              w-24
              h-24
              rounded-full
              bg-white
              flex
              items-center
              justify-center
              p-2
            "
          >
            <img
              src="/logo2.png"
              alt="Instituto"
              className="w-20 h-20 object-contain"
            />
          </div>
        </div>

        <h2 className="mt-8 text-2xl font-bold text-slate-900">
          {t("tasks.loading")}
        </h2>

        <p className="mt-3 text-slate-500">{t("tasks.loading_wait")}</p>
      </div>
    );
  }

  /*
  =====================================================
  SIN TAREAS
  =====================================================
  */

  if (!tasks.length) {
    return (
      <div className="rounded-3xl border bg-white p-12 text-center text-slate-500">
        {t("tasks.empty")}
      </div>
    );
  }

  /*
  =====================================================
  RENDER
  =====================================================
  */

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
