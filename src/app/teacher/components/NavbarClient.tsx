"use client";

import { LogOut, UserCircle2 } from "lucide-react";

import NotificationBell from "@/components/notifications/NotificationBell";
import { useSocket } from "../../../components/chat/hooks/useSocket";
import Sidebar from "./Sidebar"; // Ajustá la ruta según la ubicación real de tu Sidebar

type Props = {
  userId: string;
  teacherName: string;
  teacherLastname: string;
};

export default function NavbarClient({
  userId,
  teacherName,
  teacherLastname,
}: Props) {
  useSocket(userId);

  async function handleLogout() {
    await fetch("/api/logout", {
      method: "POST",
    });

    window.location.href = "/login";
  }

  return (
    <header className="sticky top-0 z-50 w-full h-20 bg-white border-b border-slate-200 px-4 sm:px-7 flex items-center justify-between shadow-sm">
      {/* Lado Izquierdo: Sidebar (solo en mobile) y Título (en desktop) */}
      <div className="flex items-center gap-3 md:gap-6">
        <div className="lg:hidden flex items-center">
          <Sidebar />
        </div>

        <div className="hidden md:block">
          <h1 className="text-2xl font-bold text-slate-900">
            Panel del Profesor
          </h1>

          <p className="text-sm text-slate-500">Bienvenido nuevamente.</p>
        </div>
      </div>

      {/* Lado Derecho: Notificaciones + Perfil del Profesor + Logout */}
      <div className="flex items-center gap-2 md:gap-4">
        <NotificationBell />

        <div className="text-right hidden sm:block">
          <p className="font-semibold text-slate-900 leading-tight">
            {teacherName} {teacherLastname}
          </p>

          <p className="text-sm text-slate-500 leading-tight">Profesor</p>
        </div>

        <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-cyan-100 flex items-center justify-center shrink-0">
          <UserCircle2 className="text-cyan-700" size={28} />
        </div>

        <button
          onClick={handleLogout}
          aria-label="Cerrar sesión"
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-red-50 hover:bg-red-100 transition flex items-center justify-center shrink-0"
        >
          <LogOut size={20} className="text-red-600" />
        </button>
      </div>
    </header>
  );
}
