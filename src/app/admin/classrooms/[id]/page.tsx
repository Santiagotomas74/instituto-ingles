import { notFound } from "next/navigation";

import ClassroomHeader from "./components/ClassroomHeader";
import ClassroomAnnouncements from "./components/ClassroomAnnouncements";
import ClassroomMaterials from "./components/ClassroomMaterials";
import ClassroomStudents from "./components/ClassroomStudents";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ClassroomDetailPage({ params }: Props) {
  const { id } = await params;

  const [classroomRes, materialsRes, studentsRes] = await Promise.all([
    fetch(`${process.env.BACKEND_URL}/api/admin/classrooms/${id}`, {
      cache: "no-store",
    }),

    fetch(`${process.env.BACKEND_URL}/api/admin/classrooms/${id}/materials`, {
      cache: "no-store",
    }),

    fetch(`${process.env.BACKEND_URL}/api/admin/classrooms/${id}/students`, {
      cache: "no-store",
    }),
  ]);

  if (!classroomRes.ok) {
    notFound();
  }

  const [classroomData, materialsData, studentsData] = await Promise.all([
    classroomRes.json(),
    materialsRes.json(),
    studentsRes.json(),
  ]);

  const classroom = classroomData.classroom;
  console.log(classroom);

  const materials = materialsData.materials || [];

  const students = studentsData.students || [];
  const announcementsRes = await fetch(
    `${process.env.BACKEND_URL}/api/admin/classrooms/${id}/announcements`,
    {
      cache: "no-store",
    },
  );

  const announcementsData = await announcementsRes.json();

  const announcements = announcementsData.announcements || [];

  return (
    <main className="min-h-screen bg-slate-100">
      <ClassroomHeader classroom={classroom} />

      <div className="max-w-7xl mx-auto p-6 md:p-10">
        <div className="grid xl:grid-cols-3 gap-8">
          {/* CONTENIDO PRINCIPAL */}
          <div className="xl:col-span-2 space-y-8">
            <ClassroomAnnouncements
              classroomId={id}
              announcements={announcements}
            />

            <ClassroomMaterials classroomId={id} materials={materials} />
          </div>

          {/* SIDEBAR */}
          <div className="space-y-8">
            <ClassroomStudents students={students} />
          </div>
        </div>
      </div>
    </main>
  );
}
