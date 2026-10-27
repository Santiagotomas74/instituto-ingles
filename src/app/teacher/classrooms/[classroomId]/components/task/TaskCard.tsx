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
  Download,
  Paperclip,
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const due =
    task.due_date &&
    `${new Date(task.due_date).toLocaleDateString("es-AR", {
      timeZone: "UTC",
    })}${task.due_time ? ` - ${task.due_time.slice(0, 5)}` : ""}`;

  async function deleteTask() {
    if (!confirm("¿Eliminar esta tarea?")) return;

    try {
      setLoadingDelete(true);

      const res = await fetch(`/api/teacher/tasks/${task.id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "No se pudo eliminar la tarea.");
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
      <div className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/40 sm:rounded-3xl">
        {/* INDICADOR SUPERIOR */}
        <div
          className={`h-1 w-full ${
            task.is_published ? "bg-cyan-500" : "bg-slate-300"
          }`}
        />

        <div className="p-4 sm:p-6">
          {/* ENCABEZADO */}
          <div className="flex items-start justify-between gap-3 sm:gap-4">
            <div className="min-w-0 flex-1">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-700 ring-1 ring-inset ring-cyan-100">
                  <FileText size={13} />
                  Tarea
                </span>

                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold sm:text-xs ${
                    task.is_published
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                      : "border-slate-200 bg-slate-100 text-slate-600"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      task.is_published ? "bg-emerald-500" : "bg-slate-400"
                    }`}
                  />
                  {task.is_published ? "Publicada" : "Borrador"}
                </span>
              </div>

              <h3 className="break-words text-lg font-bold leading-snug tracking-tight text-slate-900 transition-colors group-hover:text-cyan-800 sm:text-xl">
                {task.titulo}
              </h3>

              {task.descripcion && (
                <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-600 sm:text-base">
                  {task.descripcion}
                </p>
              )}
            </div>
          </div>

          {/* ARCHIVO ADJUNTO */}
          {task.archivo && (
            <a
              href={task.archivo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abrir archivo adjunto de la tarea"
              className="group/attachment mt-5 mb-2 flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-3 transition-all duration-200 hover:border-cyan-300 hover:bg-cyan-50/60 hover:shadow-sm sm:gap-4 sm:p-4"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-cyan-700 shadow-sm ring-1 ring-slate-200/80 transition-colors group-hover/attachment:text-cyan-600 sm:h-12 sm:w-12">
                <FileText size={22} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 sm:text-xs">
                  <Paperclip size={12} />
                  Material adjunto
                </div>

                <p className="mt-1 break-words text-sm font-semibold text-slate-800 sm:text-base">
                  Archivo de la tarea
                </p>

                <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
                  Abrir o descargar archivo
                </p>
              </div>

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-slate-500 ring-1 ring-slate-200 transition-all group-hover/attachment:bg-cyan-600 group-hover/attachment:text-white group-hover/attachment:ring-cyan-600">
                <Download size={17} />
              </div>
            </a>
          )}

          {/* SEPARADOR */}
          <div className="my-5 border-t border-slate-100 sm:my-6" />

          {/* INFORMACIÓN */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {/* FECHA DE ENTREGA */}
            <div className="flex min-w-0 items-start gap-2.5 rounded-xl border border-slate-200/80 bg-slate-50/70 p-3 sm:gap-3 sm:p-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-cyan-700 shadow-sm ring-1 ring-slate-200/70">
                <CalendarDays size={17} />
              </div>

              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 sm:text-xs">
                  Entrega
                </p>
                <p className="mt-1 break-words text-xs font-semibold text-slate-700 sm:text-sm">
                  {due ?? "-"}
                </p>
              </div>
            </div>

            {/* PERMITE RESPUESTA */}
            <div className="flex min-w-0 items-start gap-2.5 rounded-xl border border-slate-200/80 bg-slate-50/70 p-3 sm:gap-3 sm:p-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-cyan-700 shadow-sm ring-1 ring-slate-200/70">
                <Clock size={17} />
              </div>

              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 sm:text-xs">
                  Respuesta
                </p>
                <p className="mt-1 text-xs font-semibold text-slate-700 sm:text-sm">
                  {task.allow_submission ? "Sí" : "No"}
                </p>
              </div>
            </div>

            {/* MODALIDAD */}
            <div className="flex min-w-0 items-start gap-2.5 rounded-xl border border-slate-200/80 bg-slate-50/70 p-3 sm:gap-3 sm:p-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-cyan-700 shadow-sm ring-1 ring-slate-200/70">
                {task.submission_type === "pool" ? (
                  <Globe size={17} />
                ) : (
                  <Users size={17} />
                )}
              </div>

              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 sm:text-xs">
                  Tipo
                </p>
                <p className="mt-1 break-words text-xs font-semibold capitalize text-slate-700 sm:text-sm">
                  {task.submission_type === "pool"
                    ? "Grupal"
                    : task.submission_type === "individual"
                      ? "Individual"
                      : task.submission_type}
                </p>
              </div>
            </div>

            {/* ENTREGAS RECIBIDAS */}
            <div className="flex min-w-0 items-start gap-2.5 rounded-xl border border-slate-200/80 bg-slate-50/70 p-3 sm:gap-3 sm:p-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-cyan-700 shadow-sm ring-1 ring-slate-200/70">
                <FileText size={17} />
              </div>

              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 sm:text-xs">
                  Entregas
                </p>
                <p className="mt-1 text-xs font-semibold text-slate-700 sm:text-sm">
                  {task.submissions ?? 0}
                </p>
              </div>
            </div>
          </div>

          {/* BOTONES */}
          <div className="mt-6 flex flex-col gap-2.5 sm:mt-7 sm:flex-row sm:gap-3">
            <button
              type="button"
              onClick={() => setOpenSubmissions(true)}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 px-5 text-sm font-semibold text-white shadow-sm shadow-cyan-600/20 transition-all hover:bg-cyan-700 hover:shadow-md active:scale-[0.98] sm:w-auto"
            >
              <Eye size={18} />
              <span>Ver entregas</span>
            </button>

            <div className="flex w-full gap-2.5 sm:w-auto sm:gap-3">
              <button
                type="button"
                onClick={() => setOpenEdit(true)}
                className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition-colors hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-700 sm:flex-none"
              >
                <Pencil size={17} />
                <span>Editar</span>
              </button>

              <button
                type="button"
                disabled={loadingDelete}
                onClick={deleteTask}
                className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 text-sm font-semibold text-red-600 transition-colors hover:border-red-200 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
              >
                <Trash2 size={17} />
                <span>{loadingDelete ? "Eliminando..." : "Eliminar"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODALES */}
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
