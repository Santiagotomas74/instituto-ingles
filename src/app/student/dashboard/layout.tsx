import { ReactNode } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import BirthdayModal from "./BirthdayModal"; // <-- Importamos el Modal
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
  let isBirthday = false; // <-- Inicializamos el estado del cumpleaños

  if (studentId) {
    try {
      // Pedimos a la BD que verifique si el día y mes actual coinciden con la fecha_nacimiento
      const result = await query(
        `
        SELECT 
          status,
          (EXTRACT(MONTH FROM fecha_nacimiento::DATE) = EXTRACT(MONTH FROM (CURRENT_TIMESTAMP AT TIME ZONE 'America/Argentina/Buenos_Aires')) AND 
           EXTRACT(DAY FROM fecha_nacimiento::DATE) = EXTRACT(DAY FROM (CURRENT_TIMESTAMP AT TIME ZONE 'America/Argentina/Buenos_Aires'))) AS is_birthday
        FROM students
        WHERE id = $1
        LIMIT 1
        `,
        [studentId],
      );
      if (result.rows.length > 0) {
        const row = result.rows[0];
        const status = row.status;

        if (
          status === "active" ||
          status === "pending" ||
          status === "inactive"
        ) {
          studentStatus = status;
        }

        // Si la base de datos confirma que es su cumpleaños, lo seteamos a true
        if (row.is_birthday === true) {
          console.log("¡Es el cumpleaños del estudiante!");
          isBirthday = true;
        }
        console.log("Estado del estudiante:", studentStatus);
        console.log("¿Es cumpleaños?", isBirthday);
      }
    } catch (error) {
      console.error("Error al verificar estado del estudiante:", error);
      studentStatus = "inactive";
    }
  }

  const cuentaInactiva = studentStatus === "inactive";

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <I18nProvider>
        {/* Renderizamos el Modal aquí. Al ser Client Component gestiona su propio estado */}
        <BirthdayModal isBirthday={isBirthday} />

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
