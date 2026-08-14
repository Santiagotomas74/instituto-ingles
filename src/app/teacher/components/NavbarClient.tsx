"use client";

import { LogOut, UserCircle2 } from "lucide-react";

import NotificationBell from "@/components/notifications/NotificationBell";
import { useSocket } from "../../../components/chat/hooks/useSocket";

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
    <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between shadow-sm">
      <div>
        <h1 className="text-2xl font-bold text-slate-900  hidden md:block">
          Panel del Profesor
        </h1>

        <p className="text-sm text-slate-500  hidden md:block">
          Bienvenido nuevamente.
        </p>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <NotificationBell />

        <div className="text-right">
          <p className="font-semibold text-slate-900">
            {teacherName} {teacherLastname}
          </p>

          <p className="text-sm text-slate-500">Profesor</p>
        </div>

        <div className="h-12 w-12 rounded-full bg-cyan-100 flex items-center justify-center">
          <UserCircle2 className="text-cyan-700" size={28} />
        </div>
        <button
          onClick={handleLogout}
          className="w-11 h-11 rounded-2xl bg-red-50 hover:bg-red-100 transition flex items-center justify-center"
        >
          <LogOut size={20} className="text-red-600" />
        </button>
      </div>
    </header>
  );
}
