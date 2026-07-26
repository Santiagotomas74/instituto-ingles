import Link from "next/link";
import { cookies } from "next/headers";
import {
  LayoutDashboard,
  GraduationCap,
  CalendarDays,
  MessageCircle,
  Bell,
  UserCircle,
  LogOut,
} from "lucide-react";

export default async function ChatTopbar() {
  const cookieStore = await cookies();

  const name = cookieStore.get("student_name")?.value ?? "";
  const lastname = cookieStore.get("student_lastname")?.value ?? "";

  return (
    <header
      className="
        h-16
        bg-white
        border-b
        px-4
        md:px-8
        flex
        items-center
        justify-between
        shadow-sm
        z-20
      "
    >
      {/* Logo + Navegación */}
      <div className="flex items-center gap-8">
        <h1 className="text-2xl font-bold text-cyan-600">INK</h1>

        <nav className="hidden lg:flex items-center gap-6">
          <Link
            href="/student/dashboard"
            className="flex items-center gap-2 text-slate-600 hover:text-cyan-600 transition"
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          <Link
            href="/student/dashboard/classrooms"
            className="flex items-center gap-2 text-slate-600 hover:text-cyan-600 transition"
          >
            <GraduationCap size={18} />
            Mis aulas
          </Link>

          <Link
            href="/student/dashboard/calendar"
            className="flex items-center gap-2 text-slate-600 hover:text-cyan-600 transition"
          >
            <CalendarDays size={18} />
            Calendario
          </Link>

          <Link
            href="/student/chat"
            className="
              flex
              items-center
              gap-2
              text-cyan-600
              font-semibold
            "
          >
            <MessageCircle size={18} />
            Chat
          </Link>
        </nav>
      </div>

      {/* Usuario */}
      <div className="flex items-center gap-5">
        {/* Notificaciones */}
        <button
          className="
            relative
            text-slate-600
            hover:text-cyan-600
            transition
          "
        >
          <Bell size={22} />

          <span
            className="
              absolute
              -top-1
              -right-1
              w-2.5
              h-2.5
              rounded-full
              bg-red-500
            "
          />
        </button>

        {/* Información del usuario */}
        <div className="flex items-center gap-3">
          <div
            className="
              w-10
              h-10
              rounded-full
              bg-cyan-500
              text-white
              flex
              items-center
              justify-center
            "
          >
            <UserCircle size={22} />
          </div>

          <div className="hidden md:block">
            <p className="font-semibold text-slate-800">
              {name} {lastname}
            </p>

            <p className="text-sm text-slate-500">Estudiante</p>
          </div>
        </div>

        {/* Logout */}
        <Link
          href="/logout"
          className="
            flex
            items-center
            justify-center
            w-10
            h-10
            rounded-lg
            text-red-500
            hover:bg-red-50
            hover:text-red-600
            transition
          "
          title="Cerrar sesión"
        >
          <LogOut size={20} />
        </Link>
      </div>
    </header>
  );
}
