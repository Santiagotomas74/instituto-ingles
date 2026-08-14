"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  MessageSquare,
  CalendarDays,
  GraduationCap,
  ClipboardList,
  CircleHelp,
} from "lucide-react";

import Tasks from "./Tasks";
import Materials from "./Materials";
import Announcements from "./Announcements";
import Events from "./Events";
import Questions from "./Questions";

interface Props {
  classroomId: string;
}

type Tab = "materials" | "tasks" | "announcements" | "questions" | "events";

type Classroom = {
  id: string;
  nombre: string;
  nivel: string;
  horario: string;
  teacher: string;
};

// Arreglo centralizado de las pestañas para reutilizarlo en Mobile y Desktop
const TABS = [
  { id: "materials", label: "Materiales", icon: BookOpen },
  { id: "tasks", label: "Tareas", icon: ClipboardList },
  { id: "announcements", label: "Anuncios", icon: MessageSquare },
  { id: "events", label: "Fechas importantes", icon: CalendarDays },
  { id: "questions", label: "Preguntas", icon: CircleHelp },
] as const;

export default function Classroom({ classroomId }: Props) {
  const searchParams = useSearchParams();
  const params = useParams();

  const selectedTaskId = searchParams.get("task");
  const tab = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState<Tab>((tab as Tab) || "materials");
  const [classroom, setClassroom] = useState<Classroom | null>(null);

  const loadClassroom = async () => {
    try {
      const res = await fetch(`/api/student/classroom/${classroomId}/aula`);

      if (!res.ok) {
        throw new Error("Error cargando aula");
      }

      const data = await res.json();
      setClassroom(data.classroom);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (tab) {
      setActiveTab(tab as Tab);
    }
  }, [tab]);

  useEffect(() => {
    if (classroomId) {
      loadClassroom();
    }
  }, [classroomId]);

  if (!classroom) {
    return (
      <div className="py-20 text-center text-slate-500">Cargando aula...</div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto mt-5 px-4 sm:px-6 lg:px-8 mb-10">
      <Link
        href="/student/dashboard"
        className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-medium transition-colors"
      >
        <ArrowLeft size={18} />
        Volver a mis aulas
      </Link>

      <div className="mt-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">
            {classroom.nivel}
          </div>

          <div>
            <h1 className="text-2xl sm:text-4xl font-bold text-slate-900">
              {classroom.nombre}
            </h1>

            <div className="flex flex-wrap items-center gap-2 mt-2 text-slate-500 text-sm sm:text-base">
              <GraduationCap size={18} />
              <span>
                Prof. {classroom.teacher} • {classroom.horario}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          1. VISTA MÓVIL: Select desplegable (se oculta en `md:hidden`)
         ======================================================== */}
      <div className="mt-6 md:hidden">
        <label htmlFor="tabs-select" className="sr-only">
          Seleccionar sección
        </label>
        <select
          id="tabs-select"
          name="tabs-select"
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value as Tab)}
          className="block w-full rounded-xl border border-slate-300 bg-white py-3 px-4 text-slate-800 font-medium shadow-sm focus:border-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-600/20"
        >
          {TABS.map((tabItem) => (
            <option key={tabItem.id} value={tabItem.id}>
              {tabItem.label}
            </option>
          ))}
        </select>
      </div>

      {/* ========================================================
          2. VISTA DESKTOP: Pestañas en fila (se oculta en móvil con `hidden md:block`)
         ======================================================== */}
      <div className="hidden md:block mt-10 border-b border-slate-200">
        <div className="flex gap-10">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`pb-4 transition font-medium ${
                activeTab === id
                  ? "border-b-2 border-cyan-600 text-cyan-600"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <div className="flex items-center gap-2">
                <Icon size={18} />
                {label}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Vistas de contenido */}
      <div className="mt-8">
        {activeTab === "materials" && <Materials classroomId={classroomId} />}

        {activeTab === "tasks" && (
          <Tasks classroomId={classroomId} selectedTaskId={selectedTaskId} />
        )}

        {activeTab === "announcements" && (
          <Announcements classroomId={classroomId} />
        )}

        {activeTab === "events" && <Events classroomId={classroomId} />}

        {activeTab === "questions" && <Questions classroomId={classroomId} />}
      </div>
    </div>
  );
}
