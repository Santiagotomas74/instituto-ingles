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

  // OPTIMIZACIÓN: Las 4 llamadas en paralelo para máxima velocidad
  const [classroomRes, materialsRes, studentsRes, announcementsRes] =
    await Promise.all([
      fetch(`${process.env.BACKEND_URL}/api/admin/classrooms/${id}`, {
        cache: "no-store",
      }),
      fetch(`${process.env.BACKEND_URL}/api/admin/classrooms/${id}/materials`, {
        cache: "no-store",
      }),
      fetch(`${process.env.BACKEND_URL}/api/admin/classrooms/${id}/students`, {
        cache: "no-store",
      }),
      fetch(
        `${process.env.BACKEND_URL}/api/admin/classrooms/${id}/announcements`,
        { cache: "no-store" },
      ),
    ]);

  if (!classroomRes.ok) {
    notFound();
  }

  const [classroomData, materialsData, studentsData, announcementsData] =
    await Promise.all([
      classroomRes.json(),
      materialsRes.json(),
      studentsRes.json(),
      announcementsRes.json(),
    ]);

  const classroom = classroomData.classroom;
  const materials = materialsData.materials || [];
  const students = studentsData.students || [];
  const announcements = announcementsData.announcements || [];

  return (
    <main className="min-h-screen bg-slate-100">
      <ClassroomHeader classroom={classroom} />

      <div className="max-w-7xl mx-auto p-6 md:p-10">
        <div className="grid xl:grid-cols-3 gap-8">
          {/* CONTENIDO PRINCIPAL */}
          <div className="xl:col-span-2 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <ClassroomAnnouncements
              classroomId={id}
              announcements={announcements}
            />
            <ClassroomMaterials classroomId={id} materials={materials} />
          </div>

          {/* SIDEBAR */}
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
            <ClassroomStudents students={students} />
          </div>
        </div>
      </div>
    </main>
  );
}
