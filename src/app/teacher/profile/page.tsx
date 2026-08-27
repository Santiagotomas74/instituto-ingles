import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
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

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      {/* Sidebar Desktop: Visible en md o superior */}
      <div className="hidden md:flex flex-shrink-0 h-full z-50">
        <Sidebar />
      </div>

      {/* Sidebar Mobile: Flotante y oculto en md o superior */}
      <div className="fixed inset-y-0 left-0 z-50 md:hidden flex-shrink-0 h-full">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* z-40 en lugar de z-48 (Tailwind no tiene z-48 por defecto) */}
        <header className="sticky top-0 z-40 bg-slate-100">
          <Navbar />
        </header>

        <main className="flex-1">
          <TeacherProfile teacher={teacher} />
        </main>
      </div>
    </div>
  );
}
