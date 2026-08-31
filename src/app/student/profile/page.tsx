import Profile from "./Profile";
import Navbar from "../components/Navbar";
import { cookies } from "next/headers";
import Sidebar from "@/app/student/components/Sidebar";
import I18nProvider from "@/i18n/provider";

export default async function StudentProfile() {
  const cookieStore = await cookies();
  const nombre = cookieStore.get("student_name")?.value;
  const apellido = cookieStore.get("student_lastname")?.value;

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Sidebar fijo en pantalla para desktop (hidden en mobile) */}
      <I18nProvider>
        <aside className="hidden lg:block sticky top-0 h-screen shrink-0">
          <Sidebar />
        </aside>

        {/* Contenedor principal para el Navbar y el contenido */}
        <div className="flex-1 flex flex-col min-w-0">
          <Navbar nombre={nombre} apellido={apellido} />

          <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12">
            <Profile />
          </main>
        </div>
      </I18nProvider>
    </div>
  );
}
