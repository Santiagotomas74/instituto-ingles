import { ReactNode } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
// Ajusta la ruta del modal según dónde lo hayas guardado
import BirthdayModal from "./BirthdayModal";
import { cookies } from "next/headers";
import { query } from "@/lib/db";

interface TeacherDashboardLayoutProps {
  children: ReactNode;
}

export default async function TeacherDashboardLayout({
  children,
}: TeacherDashboardLayoutProps) {
  const cookieStore = await cookies();

  // Verifica el nombre exacto de la cookie que usas para el ID del profesor
  const teacherId = cookieStore.get("user_id")?.value;

  let isBirthday = false;

  if (teacherId) {
    try {
      const result = await query(
        `
        SELECT 
          (EXTRACT(MONTH FROM fecha_nacimiento::DATE) = EXTRACT(MONTH FROM (CURRENT_TIMESTAMP AT TIME ZONE 'America/Argentina/Buenos_Aires')) AND 
           EXTRACT(DAY FROM fecha_nacimiento::DATE) = EXTRACT(DAY FROM (CURRENT_TIMESTAMP AT TIME ZONE 'America/Argentina/Buenos_Aires'))) AS is_birthday
        FROM teachers
        WHERE id = $1
        LIMIT 1
        `,
        [teacherId],
      );

      if (result.rows.length > 0) {
        if (result.rows[0].is_birthday === true) {
          isBirthday = true;
        }
      }
    } catch (error) {
      console.error("Error al verificar cumpleaños del profesor:", error);
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      <BirthdayModal isBirthday={isBirthday} />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
