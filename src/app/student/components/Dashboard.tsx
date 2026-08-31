import { cookies } from "next/headers";
import DashboardContent, { Classroom } from "./DashboardContent";

export default async function Dashboard() {
  const cookieStore = await cookies();

  const studentId = cookieStore.get("user_id")?.value;
  const studentName = cookieStore.get("student_name")?.value || "Estudiante";
  const studentLastname = cookieStore.get("student_lastname")?.value || "";

  const classroomsRes = await fetch(
    `${process.env.BACKEND_URL}/api/student/classrooms/${studentId}`,
    {
      cache: "no-store",
    },
  );

  const classroomsData = await classroomsRes.json();
  const classrooms: Classroom[] = classroomsData.classrooms || [];

  return (
    <DashboardContent
      studentName={studentName}
      studentLastname={studentLastname}
      classrooms={classrooms}
    />
  );
}
