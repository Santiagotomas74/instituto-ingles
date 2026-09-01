"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
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

export default function Classroom({ classroomId }: Props) {
  const { t } = useTranslation();
  const searchParams = useSearchParams();

  const selectedTaskId = searchParams.get("task");
  const tab = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState<Tab>((tab as Tab) || "materials");
  const [classroom, setClassroom] = useState<Classroom | null>(null);

  const TABS = [
    {
      id: "materials" as const,
      label: t("classroom.tabs.materials"),
      icon: BookOpen,
    },
    {
      id: "tasks" as const,
      label: t("classroom.tabs.tasks"),
      icon: ClipboardList,
    },
    {
      id: "announcements" as const,
      label: t("classroom.tabs.announcements"),
      icon: MessageSquare,
    },
    {
      id: "events" as const,
      label: t("classroom.tabs.events"),
      icon: CalendarDays,
    },
    {
      id: "questions" as const,
      label: t("classroom.tabs.questions"),
      icon: CircleHelp,
    },
  ];

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

  // ==========================================
  // ESTADO DE CARGA MEJORADO (Skeleton + Spinner)
  // ==========================================
  if (!classroom) {
    return (
      <div className="max-w-7xl mx-auto mt-5 px-4 sm:px-6 lg:px-8 mb-10">
        {/* Esqueleto del botón volver */}
        <div className="w-24 h-6 bg-slate-200 rounded-md animate-pulse" />

        {/* Esqueleto del Header */}
        <div className="mt-8 flex items-center gap-4 animate-pulse">
          <div className="w-12 h-12 rounded-full bg-slate-200 shrink-0" />
          <div className="space-y-3 w-full max-w-sm">
            <div className="h-8 sm:h-10 bg-slate-200 rounded-lg w-3/4" />
            <div className="h-5 bg-slate-200 rounded-md w-full sm:w-2/3" />
          </div>
        </div>

        {/* Esqueleto de Pestañas (Móvil) */}
        <div className="mt-6 md:hidden animate-pulse">
          <div className="h-12 w-full bg-slate-200 rounded-xl" />
        </div>

        {/* Esqueleto de Pestañas (Desktop) */}
        <div className="hidden md:flex mt-10 border-b border-slate-200 gap-10 pb-4 animate-pulse">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-6 w-28 bg-slate-200 rounded-md" />
          ))}
        </div>

        {/* Spinner centralizado y refinado */}
        <div className="min-h-[40vh] mt-8 flex flex-col items-center justify-center bg-slate-50/50 rounded-3xl border border-slate-100">
          <div className="relative w-24 h-24 flex items-center justify-center">
            {/* Anillo exterior */}
            <div className="absolute inset-0 rounded-full border-4 border-slate-200 border-t-cyan-600 animate-spin" />
            {/* Logo interior con pulso */}
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center p-2 shadow-sm">
              <img
                src="/logo2.png"
                alt="Instituto"
                className="w-14 h-14 object-contain animate-pulse"
              />
            </div>
          </div>
          <h2 className="mt-6 text-xl font-bold text-slate-800 animate-pulse">
            {t("classroom.loading")}
          </h2>
          <p className="mt-2 text-sm text-slate-500 font-medium animate-pulse">
            {t("classroom.loading_wait")}
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // VISTA PRINCIPAL (Datos cargados)
  // ==========================================
  return (
    <div className="max-w-7xl mx-auto mt-5 px-4 sm:px-6 lg:px-8 mb-10">
      <Link
        href="/student/dashboard"
        className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-medium transition-colors"
      >
        <ArrowLeft size={18} />
        {t("classroom.back")}
      </Link>

      <div className="mt-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shrink-0 shadow-sm">
            {classroom.nivel}
          </div>

          <div>
            <h1 className="text-2xl sm:text-4xl font-bold text-slate-900">
              {classroom.nombre}
            </h1>

            <div className="flex flex-wrap items-center gap-2 mt-2 text-slate-500 text-sm sm:text-base">
              <GraduationCap size={18} className="text-slate-400" />
              <span>
                {t("classroom.teacher_prefix")} {classroom.teacher} •{" "}
                {classroom.horario}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 1. VISTA MÓVIL: Select desplegable */}
      <div className="mt-6 md:hidden">
        <label htmlFor="tabs-select" className="sr-only">
          {t("classroom.select_section")}
        </label>
        <select
          id="tabs-select"
          name="tabs-select"
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value as Tab)}
          className="block w-full rounded-xl border border-slate-300 bg-white py-3 px-4 text-slate-800 font-medium shadow-sm focus:border-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-600/20 transition-all cursor-pointer"
        >
          {TABS.map((tabItem) => (
            <option key={tabItem.id} value={tabItem.id}>
              {tabItem.label}
            </option>
          ))}
        </select>
      </div>

      {/* 2. VISTA DESKTOP: Pestañas en fila */}
      <div className="hidden md:block mt-10 border-b border-slate-200">
        <div className="flex gap-10">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`pb-4 transition-all font-medium relative ${
                activeTab === id
                  ? "text-cyan-600"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-t-lg px-2 -ml-2"
              }`}
            >
              <div className="flex items-center gap-2">
                <Icon size={18} />
                {label}
              </div>
              {/* Línea inferior activa animada */}
              {activeTab === id && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan-600 rounded-t-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Vistas de contenido */}
      <div className="mt-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
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
