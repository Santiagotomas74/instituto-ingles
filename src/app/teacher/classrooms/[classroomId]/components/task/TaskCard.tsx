"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

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
import EditTaskModal from "./EditTaskModal";

type Props = {
  task: ClassroomTask;
  classroomId: string;
  onReload: () => void;
};

export default function TaskCard({ task, classroomId, onReload }: Props) {
  const [openSubmissions, setOpenSubmissions] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  // Estado para evitar errores de hidratación al usar document.body en Next.js
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
          rounded-2xl
          sm:rounded-3xl
          border
          border-slate-200
          shadow-sm
          p-4
          sm:p-6
        "
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 sm:gap-4">
          <div className="min-w-0">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 break-words">
              {task.titulo}
            </h3>

            {task.descripcion && (
              <p className="mt-1.5 sm:mt-2 text-sm sm:text-base text-slate-600 line-clamp-2 sm:line-clamp-none">
                {task.descripcion}
              </p>
            )}
          </div>

          <span
            className={`
              shrink-0
              px-2.5
              sm:px-3
              py-1
              rounded-full
              text-[10px]
              sm:text-xs
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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-5 sm:mt-6">
          <div className="flex gap-2.5 sm:gap-3 items-center min-w-0">
            <CalendarDays className="text-cyan-600 shrink-0" size={20} />
            <div className="min-w-0">
              <p className="text-[11px] sm:text-xs text-slate-500 truncate">
                Entrega
              </p>
              <p className="font-medium text-sm sm:text-base text-slate-700 truncate">
                {due ?? "-"}
              </p>
            </div>
          </div>

          <div className="flex gap-2.5 sm:gap-3 items-center min-w-0">
            <Clock className="text-cyan-600 shrink-0" size={20} />
            <div className="min-w-0">
              <p className="text-[11px] sm:text-xs text-slate-500 truncate">
                Respuesta
              </p>
              <p className="font-medium text-sm sm:text-base text-slate-700 truncate">
                {task.allow_submission ? "Sí" : "No"}
              </p>
            </div>
          </div>

          <div className="flex gap-2.5 sm:gap-3 items-center min-w-0">
            {task.submission_type === "pool" ? (
              <Globe className="text-cyan-600 shrink-0" size={20} />
            ) : (
              <Users className="text-cyan-600 shrink-0" size={20} />
            )}
            <div className="min-w-0">
              <p className="text-[11px] sm:text-xs text-slate-500 truncate">
                Tipo
              </p>
              <p className="font-medium text-sm sm:text-base capitalize text-slate-700 truncate">
                {task.submission_type}
              </p>
            </div>
          </div>

          <div className="flex gap-2.5 sm:gap-3 items-center min-w-0">
            <FileText className="text-cyan-600 shrink-0" size={20} />
            <div className="min-w-0">
              <p className="text-[11px] sm:text-xs text-slate-500 truncate">
                Entregas
              </p>
              <p className="font-medium text-sm sm:text-base text-slate-700 truncate">
                {task.submissions}
              </p>
            </div>
          </div>
        </div>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 mt-6 sm:mt-8">
          <button
            onClick={() => setOpenSubmissions(true)}
            className="
              w-full
              sm:w-auto
              flex
              items-center
              justify-center
              gap-2
              px-4
              h-10
              sm:h-11
              rounded-xl
              bg-cyan-600
              hover:bg-cyan-700
              active:bg-cyan-800
              text-white
              font-medium
              text-sm
              sm:text-base
              transition
            "
          >
            <Eye size={18} />
            <span>Ver entregas</span>
          </button>

          <div className="flex gap-2.5 sm:gap-3 w-full sm:w-auto">
            <button
              onClick={() => setOpenEdit(true)}
              className="
                flex-1
                sm:flex-none
                flex
                items-center
                justify-center
                gap-2
                px-4
                h-10
                sm:h-11
                rounded-xl
                border
                border-slate-200
                hover:bg-slate-50
                active:bg-slate-100
                transition
                text-slate-600
                font-medium
                text-sm
                sm:text-base
              "
            >
              <Pencil size={18} />
              <span>Editar</span>
            </button>

            <button
              disabled={loadingDelete}
              onClick={deleteTask}
              className="
                flex-1
                sm:flex-none
                flex
                items-center
                justify-center
                gap-2
                px-4
                h-10
                sm:h-11
                rounded-xl
                bg-red-50
                hover:bg-red-100
                active:bg-red-200
                text-red-600
                disabled:opacity-50
                font-medium
                text-sm
                sm:text-base
                transition
              "
            >
              <Trash2 size={18} />
              <span>{loadingDelete ? "Eliminando..." : "Eliminar"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* RENDERIZADO FUERA DEL ÁRBOL DOM MEDIANTE PORTAL */}
      {mounted && (
        <>
          {openSubmissions &&
            createPortal(
              <TaskSubmissionsModal
                open={openSubmissions}
                onClose={() => setOpenSubmissions(false)}
                taskId={task.id}
              />,
              document.body,
            )}

          {openEdit &&
            createPortal(
              <EditTaskModal
                open={openEdit}
                task={task}
                onClose={() => setOpenEdit(false)}
                onSuccess={onReload}
              />,
              document.body,
            )}
        </>
      )}
    </>
  );
}
