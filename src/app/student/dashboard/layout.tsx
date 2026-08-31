import { ReactNode } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { cookies } from "next/headers";
import I18nProvider from "@/i18n/provider";

export default async function StudentDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cookieStore = await cookies();
  const nombre = cookieStore.get("student_name")?.value;
  const apellido = cookieStore.get("student_lastname")?.value;

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <I18nProvider>
        {/* Sidebar fijo en pantalla para desktop (oculto en mobile) */}
        <aside className="hidden lg:block sticky top-0 h-screen shrink-0">
          <Sidebar />
        </aside>

        {/* Contenedor principal */}
        <div className="flex-1 flex flex-col min-w-0">
          <Navbar nombre={nombre} apellido={apellido} />

          <main className="flex-1 p-8 overflow-y-auto">{children}</main>
        </div>
      </I18nProvider>
    </div>
  );
}
