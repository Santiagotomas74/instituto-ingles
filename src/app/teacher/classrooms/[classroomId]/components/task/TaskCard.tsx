"use client";

import { useState } from "react";

import {
  CalendarDays,
  Clock,
  FileText,
  Users,
  Globe,
  Pencil,
  Trash2,
  Eye,
} from "lucide-react";

import { ClassroomTask } from "../TasksTab";

import TaskSubmissionsModal from "./TaskSubmissionsModal";
// import EditTaskModal from "./EditTaskModal";

type Props = {
  task: ClassroomTask;
  classroomId: string;
  onReload: () => void;
};

export default function TaskCard({ task, classroomId, onReload }: Props) {
  const [openSubmissions, setOpenSubmissions] = useState(false);

  const [openEdit, setOpenEdit] = useState(false);

  const [loadingDelete, setLoadingDelete] = useState(false);

  const due =
    task.due_date &&
    `${new Date(task.due_date).toLocaleDateString()}${
      task.due_time ? ` - ${task.due_time.slice(0, 5)}` : ""
    }`;

  async function deleteTask() {
    if (!confirm("¿Eliminar esta tarea?")) return;

    try {
      setLoadingDelete(true);

      const res = await fetch(`/api/teacher/tasks/${task.id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      onReload();
    } catch (error) {
      console.error(error);
      alert("No se pudo eliminar la tarea.");
    } finally {
      setLoadingDelete(false);
    }
  }

  return (
    <>
      <div
        className="
          bg-white
          rounded-3xl
          border
          border-slate-200
          shadow-sm
          p-6
        "
      >
        {/* Header */}

        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900">{task.titulo}</h3>

            {task.descripcion && (
              <p className="mt-2 text-slate-600">{task.descripcion}</p>
            )}
          </div>

          <span
            className={`
              px-3
              py-1
              rounded-full
              text-xs
              font-semibold

              ${
                task.is_published
                  ? "bg-green-100 text-green-700"
                  : "bg-slate-100 text-slate-600"
              }
            `}
          >
            {task.is_published ? "Publicada" : "Borrador"}
          </span>
        </div>

        {/* Información */}

        <div className="grid md:grid-cols-4 gap-5 mt-6">
          <div className="flex gap-3 items-center">
            <CalendarDays className="text-cyan-600" size={20} />

            <div>
              <p className="text-xs text-slate-500">Entrega</p>

              <p className="font-medium text-slate-500">{due ?? "-"}</p>
            </div>
          </div>

          <div className="flex gap-3 items-center">
            <Clock className="text-cyan-600" size={20} />

            <div>
              <p className="text-xs text-slate-500">Respuesta</p>

              <p className="font-medium text-slate-500">
                {task.allow_submission ? "Sí" : "No"}
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-center">
            {task.submission_type === "pool" ? (
              <Globe className="text-cyan-600" size={20} />
            ) : (
              <Users className="text-cyan-600" size={20} />
            )}

            <div>
              <p className="text-xs text-slate-500">Tipo</p>

              <p className="font-medium capitalize text-slate-500 ">
                {task.submission_type}
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-center">
            <FileText className="text-cyan-600" size={20} />

            <div>
              <p className="text-xs text-slate-500">Entregas</p>

              <p className="font-medium text-slate-500">{task.submissions}</p>
            </div>
          </div>
        </div>

        {/* Botones */}

        <div className="flex gap-3 mt-8">
          <button
            onClick={() => setOpenSubmissions(true)}
            className="
              flex
              items-center
              gap-2
              px-4
              h-11
              rounded-xl
              bg-cyan-600
              hover:bg-cyan-700
              text-white
              transition
            "
          >
            <Eye size={18} />
            Ver entregas
          </button>

          <button
            onClick={() => setOpenEdit(true)}
            className="
              flex
              items-center
              gap-2
              px-4
              h-11
              rounded-xl
              border
              hover:bg-slate-100
              transition
              text-slate-500
            "
          >
            <Pencil size={18} />
            Editar
          </button>

          <button
            disabled={loadingDelete}
            onClick={deleteTask}
            className="
              flex
              items-center
              gap-2
              px-4
              h-11
              rounded-xl
              bg-red-50
              hover:bg-red-100
              text-red-600
              disabled:opacity-50
            "
          >
            <Trash2 size={18} />

            {loadingDelete ? "Eliminando..." : "Eliminar"}
          </button>
        </div>
      </div>

      <TaskSubmissionsModal
        open={openSubmissions}
        onClose={() => setOpenSubmissions(false)}
        taskId={task.id}
      />
      {/*
      <EditTaskModal
        open={openEdit}
        task={task}
        onClose={() => setOpenEdit(false)}
        onSuccess={onReload}
      />
      */}
    </>
  );
}
