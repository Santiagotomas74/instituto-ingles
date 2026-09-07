import { ReactNode } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { cookies } from "next/headers";
import I18nProvider from "@/i18n/provider";
import { query } from "@/lib/db";

export default async function StudentDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cookieStore = await cookies();

  const studentId = cookieStore.get("user_id")?.value;
  const nombre = cookieStore.get("student_name")?.value;
  const apellido = cookieStore.get("student_lastname")?.value;

  // Por seguridad, si no tenemos ID no mostramos el Sidebar
  let studentStatus: "active" | "pending" | "inactive" = "inactive";

  if (studentId) {
    try {
      const result = await query(
        `
        SELECT status
        FROM students
        WHERE id = $1
        LIMIT 1
        `,
        [studentId],
      );

      if (result.rows.length > 0) {
        const status = result.rows[0].status;

        if (
          status === "active" ||
          status === "pending" ||
          status === "inactive"
        ) {
          studentStatus = status;
        }
      }
    } catch (error) {
      console.error("Error al verificar estado del estudiante:", error);

      // Ante un error no damos por válida la cuenta.
      studentStatus = "inactive";
    }
  }

  const cuentaInactiva = studentStatus === "inactive";

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <I18nProvider>
        {/* 
          El Sidebar solamente se muestra si la cuenta
          del estudiante NO está inactiva.
        */}
        {!cuentaInactiva && (
          <aside className="hidden lg:block sticky top-0 h-screen shrink-0">
            <Sidebar />
          </aside>
        )}

        {/* Contenedor principal */}
        <div className="flex-1 flex flex-col min-w-0">
          <Navbar nombre={nombre} apellido={apellido} />

          <main className="flex-1 p-8 overflow-y-auto">{children}</main>
        </div>
      </I18nProvider>
    </div>
  );
}
