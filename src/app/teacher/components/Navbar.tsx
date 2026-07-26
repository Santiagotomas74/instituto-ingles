import { cookies } from "next/headers";
import { UserCircle2 } from "lucide-react";

export default async function Navbar() {
  const cookieStore = await cookies();

  const teacherName = cookieStore.get("teacher_name")?.value ?? "";
  const teacherLastname = cookieStore.get("teacher_lastname")?.value ?? "";

  return (
    <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between shadow-sm">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Panel del Profesor
        </h1>

        <p className="text-sm text-slate-500">Bienvenido nuevamente.</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-semibold text-slate-900">
            {teacherName} {teacherLastname}
          </p>

          <p className="text-sm text-slate-500">Profesor</p>
        </div>

        <div className="h-12 w-12 rounded-full bg-cyan-100 flex items-center justify-center">
          <UserCircle2 className="text-cyan-700" size={28} />
        </div>
      </div>
    </header>
  );
}
