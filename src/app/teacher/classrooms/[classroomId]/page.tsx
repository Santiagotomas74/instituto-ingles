"use client";

import { useState } from "react";

import { useParams } from "next/navigation";

import Link from "next/link";

import { ArrowLeft } from "lucide-react";

import ClassroomTabs from "./components/ClassroomTabs";

import MaterialsTab from "./components/MaterialsTab";

import StudentsTab from "./components/StudentsTab";

import AnnouncementsTab from "./components/AnnouncementsTab";

import ImportantDatesTab from "./components/ImportantDatesTab";

import ClassroomHeader from "./components/ClassroomHeader";

export default function ClassroomPage() {
  const params = useParams();

  const classroomId = params.classroomId as string;

  const [tab, setTab] = useState<
    "materiales" | "estudiantes" | "anuncios" | "fechas"
  >("materiales");

  return (
    <main
      className="
      min-h-screen
      bg-slate-50
      "
    >
      <div
        className="
        max-w-7xl
        mx-auto
        px-8
        py-8
        "
      >
        <Link
          href="/teacher/dashboard"
          className="
          inline-flex
          items-center
          gap-2
          text-blue-600
          hover:text-blue-700
          "
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
        </div>
      </div>
    </main>
  );
}
