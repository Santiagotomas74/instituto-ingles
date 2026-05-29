import Link from "next/link";

import { Plus, Search, Pencil, Trash2, Users, Mail } from "lucide-react";

import AssignClassroom from "./AssignClassroom";
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
  console.log("studentsData", studentsData);

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

  return <StudentsTable students={students} classrooms={classrooms} />;
}
