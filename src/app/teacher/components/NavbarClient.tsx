"use client";

import { UserCircle2 } from "lucide-react";

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

  return (
    <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between shadow-sm">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Panel del Profesor
        </h1>

        <p className="text-sm text-slate-500">Bienvenido nuevamente.</p>
      </div>

      <div className="flex items-center gap-6">
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
      </div>
    </header>
  );
}
