import AdminSidebar from "../dashboard/components/AdminSidebar";
import Navbar from "../dashboard/components/AdminNavbar";

import StudentsTable from "./StudentsTable";

type Student = {
  id: string;
  dni: number;
  nombre: string;
  apellido: string;
  email: string;
  status: string;
  nivel: string;
  classroom: string | null;
};

type Classroom = {
  id: string;
  nombre: string;
};

export default async function StudentsPage() {
  // STUDENTS
  const studentsRes = await fetch(
    `${process.env.BACKEND_URL}/api/admin/students`,
    {
      cache: "no-store",
    },
  );

  const studentsData = await studentsRes.json();

  const students: Student[] = studentsData.students || [];

  // CLASSROOMS
  const classroomsRes = await fetch(
    `${process.env.BACKEND_URL}/api/admin/classrooms`,
    {
      cache: "no-store",
    },
  );

  const classroomsData = await classroomsRes.json();

  const classrooms: Classroom[] = classroomsData.classrooms || [];

  return (
    <main className="min-h-screen flex bg-slate-100">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <div className="flex-1  overflow-auto">
          <StudentsTable students={students} classrooms={classrooms} />
        </div>
      </div>
    </main>
  );
}
