"use client";

import { useRouter } from "next/navigation";
import {
  CalendarDays,
  Clock,
  GraduationCap,
  School,
  ArrowRight,
} from "lucide-react";

type Props = {
  task: {
    id: string;
    classroom_id: string;
    titulo: string;
    descripcion: string;
    classroom: string;
    teacher: string;
    due_date: string | null;
    due_time: string | null;
  };
};

export default function PendingTaskCard({ task }: Props) {
  const router = useRouter();

  function goToTask() {
    router.push(
      `/student/classroom/${task.classroom_id}?tab=tasks&task=${task.id}`,
    );
  }

  return (
    <div
      className="
        bg-white
        rounded-3xl
        border
        shadow-sm
        p-6
        hover:shadow-md
        transition
      "
    >
      <div className="flex justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">{task.titulo}</h2>

          <p className="text-slate-600 mt-2">{task.descripcion}</p>
        </div>

        <button
          onClick={goToTask}
          className="
            h-11
            px-5
            rounded-xl
            bg-cyan-600
            hover:bg-cyan-700
            text-white
            flex
            items-center
            gap-2
          "
        >
          Ir a la tarea
          <ArrowRight size={18} />
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-5 mt-6">
        <div className="flex gap-3">
          <School className="text-cyan-600" />

          <div>
            <p className="text-xs text-slate-500">Aula</p>

            <p>{task.classroom}</p>
          </div>
        </div>

        <div className="flex gap-3">
          <GraduationCap className="text-cyan-600" />

          <div>
            <p className="text-xs text-slate-500">Profesor</p>

            <p>{task.teacher}</p>
          </div>
        </div>

        <div className="flex gap-3">
          <CalendarDays className="text-cyan-600" />

          <div>
            <p className="text-xs text-slate-500">Fecha límite</p>

            <p>
              {task.due_date
                ? new Date(task.due_date).toLocaleDateString()
                : "-"}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Clock className="text-cyan-600" />

          <div>
            <p className="text-xs text-slate-500">Hora</p>

            <p>{task.due_time?.slice(0, 5) ?? "-"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
