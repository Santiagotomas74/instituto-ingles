"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import ClassroomTabs, { TabType } from "./components/ClassroomTabs";

import MaterialsTab from "./components/MaterialsTab";
import StudentsTab from "./components/StudentsTab";
import AnnouncementsTab from "./components/AnnouncementsTab";
import ImportantDatesTab from "./components/ImportantDatesTab";
import TasksTab from "./components/TasksTab";
import QuestionsTab from "./components/questions/QuestionsTab";

interface TabsProps {
  classroomId: string;
}

export default function Tabs({ classroomId }: TabsProps) {
  const searchParams = useSearchParams();

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
    <>
      <ClassroomTabs tab={tab} setTab={setTab} />

      <div className="mt-8">
        {tab === "materiales" && <MaterialsTab classroomId={classroomId} />}
        {tab === "estudiantes" && <StudentsTab classroomId={classroomId} />}
        {tab === "anuncios" && <AnnouncementsTab classroomId={classroomId} />}
        {tab === "fechas" && <ImportantDatesTab classroomId={classroomId} />}
        {tab === "tareas" && <TasksTab classroomId={classroomId} />}
        {tab === "consultas" && <QuestionsTab classroomId={classroomId} />}
      </div>
    </>
  );
}
