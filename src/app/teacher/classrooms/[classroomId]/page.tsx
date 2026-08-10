"use client";

import { useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import ClassroomHeader from "./components/ClassroomHeader";
import ClassroomTabs, { TabType } from "./components/ClassroomTabs";

import MaterialsTab from "./components/MaterialsTab";
import StudentsTab from "./components/StudentsTab";
import AnnouncementsTab from "./components/AnnouncementsTab";
import ImportantDatesTab from "./components/ImportantDatesTab";
import TasksTab from "./components/TasksTab";
import QuestionsTab from "./components/questions/QuestionsTab";

export default function ClassroomPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  const classroomId = params.classroomId as string;

  const urlTab = searchParams.get("tab");
  const initialTab: TabType =
    urlTab === "materials"
      ? "materiales"
      : urlTab === "students"
        ? "estudiantes"
        : urlTab === "announcements"
          ? "anuncios"
          : urlTab === "important-dates"
            ? "fechas"
            : urlTab === "tasks"
              ? "tareas"
              : urlTab === "questions"
                ? "consultas"
                : "materiales";

  const [tab, setTab] = useState<TabType>(initialTab);

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-8 py-8">
        <Link
          href="/teacher/dashboard"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8"
        >
          <ArrowLeft size={18} />
          Volver a mis aulas
        </Link>

        <ClassroomHeader classroomId={classroomId} />

        <ClassroomTabs tab={tab} setTab={setTab} />

        <div className="mt-8">
          {tab === "materiales" && <MaterialsTab classroomId={classroomId} />}

          {tab === "estudiantes" && <StudentsTab classroomId={classroomId} />}

          {tab === "anuncios" && <AnnouncementsTab classroomId={classroomId} />}

          {tab === "fechas" && <ImportantDatesTab classroomId={classroomId} />}

          {tab === "tareas" && <TasksTab classroomId={classroomId} />}

          {tab === "consultas" && <QuestionsTab classroomId={classroomId} />}
        </div>
      </div>
    </main>
  );
}
