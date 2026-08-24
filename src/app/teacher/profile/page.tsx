import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import TeacherProfile from "./TeacherProfile";

async function getTeacherProfile() {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${process.env.BACKEND_URL}/api/teacher/profile`, {
      headers: {
        cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();

    return data.teacher ?? null;
  } catch (error) {
    console.error("Error obteniendo perfil del teacher:", error);

    return null;
  }
}

export default async function TeacherProfilePage() {
  const teacher = await getTeacherProfile();

  if (!teacher) {
    redirect("/teacher");
  }

  return <TeacherProfile teacher={teacher} />;
}
