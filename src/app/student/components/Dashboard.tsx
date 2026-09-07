import { cookies } from "next/headers";
import DashboardContent, { Classroom } from "./DashboardContent";

export type StudentStatus = "active" | "pending" | "inactive";

export default async function Dashboard() {
  const cookieStore = await cookies();

  const studentId = cookieStore.get("user_id")?.value;
  const studentName = cookieStore.get("student_name")?.value || "Estudiante";
  const studentLastname = cookieStore.get("student_lastname")?.value || "";

  if (!studentId) {
    return (
      <DashboardContent
        studentName={studentName}
        studentLastname={studentLastname}
        classrooms={[]}
        studentStatus="inactive"
      />
    );
  }

  const classroomsRes = await fetch(
    `${process.env.BACKEND_URL}/api/student/classrooms/${studentId}`,
    {
      cache: "no-store",
    },
  );

  if (!classroomsRes.ok) {
    return (
      <DashboardContent
        studentName={studentName}
        studentLastname={studentLastname}
        classrooms={[]}
        studentStatus="inactive"
      />
    );
  }

  const classroomsData = await classroomsRes.json();

  const studentStatus: StudentStatus = classroomsData.status ?? "pending";

  const classrooms: Classroom[] =
    studentStatus === "inactive" ? [] : classroomsData.classrooms || [];

  return (
    <DashboardContent
      studentName={studentName}
      studentLastname={studentLastname}
      classrooms={classrooms}
      studentStatus={studentStatus}
    />
  );
}
