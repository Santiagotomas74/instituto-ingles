"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  MessageSquare,
  CalendarDays,
  GraduationCap,
} from "lucide-react";

import Materials from "./Materials";
import Announcements from "./Announcements";
import Events from "./Events";

interface Props {
  classroomId: string;
}

type Tab = "materials" | "announcements" | "events";

type Classroom = {
  id: string;
  nombre: string;
  nivel: string;
  horario: string;
  teacher: string;
};

export default function Classroom({ classroomId }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("materials");

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
    <div className="max-w-7xl mx-auto">
      <Link
        href="/student/dashboard"
        className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-medium"
      >
        <ArrowLeft size={18} />
        Volver a mis aulas
      </Link>

      <div className="mt-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
            {classroom.nivel}
          </div>

          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              {classroom.nombre}
            </h1>

            <div className="flex items-center gap-2 mt-2 text-slate-500">
              <GraduationCap size={18} />

              <span>
                Prof. {classroom.teacher} • {classroom.horario}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 border-b border-slate-200">
        <div className="flex gap-10">
          <button
            onClick={() => setActiveTab("materials")}
            className={`pb-4 transition font-medium ${
              activeTab === "materials"
                ? "border-b-2 border-cyan-600 text-cyan-600"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <div className="flex items-center gap-2">
              <BookOpen size={18} />
              Materiales
            </div>
          </button>

          <button
            onClick={() => setActiveTab("announcements")}
            className={`pb-4 transition font-medium ${
              activeTab === "announcements"
                ? "border-b-2 border-cyan-600 text-cyan-600"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <div className="flex items-center gap-2">
              <MessageSquare size={18} />
              Anuncios
            </div>
          </button>

          <button
            onClick={() => setActiveTab("events")}
            className={`pb-4 transition font-medium ${
              activeTab === "events"
                ? "border-b-2 border-cyan-600 text-cyan-600"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <div className="flex items-center gap-2">
              <CalendarDays size={18} />
              Fechas importantes
            </div>
          </button>
        </div>
      </div>

      <div className="mt-8">
        {activeTab === "materials" && <Materials classroomId={classroomId} />}

        {activeTab === "announcements" && (
          <Announcements classroomId={classroomId} />
        )}

        {activeTab === "events" && <Events classroomId={classroomId} />}
      </div>
    </div>
  );
}
