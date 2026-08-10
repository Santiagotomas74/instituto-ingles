"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  CalendarDays,
  GraduationCap,
  Inbox,
  LogOut,
  MessageCircle,
  School,
  UserCircle2,
  Users,
} from "lucide-react";

import NotificationBell from "@/components/notifications/NotificationBell";
import { useSocket } from "../../../../components/chat/hooks/useSocket";

type User = {
  id: string;
  nombre: string;
  apellido: string;
};

export default function AdminNavbar() {
  const [user, setUser] = useState<User | null>(null);

  /*
  ==========================================
  Conectar Socket
  ==========================================
  */

  useSocket(user?.id ?? "");

  /*
  ==========================================
  Usuario actual
  ==========================================
  */

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch("/api/auth/me");

        const data = await res.json();

        if (!res.ok || !data.success) return;

        setUser({
          id: data.user.id,
          nombre: data.user.nombre,
          apellido: data.user.apellido,
        });
      } catch (error) {
        console.error(error);
      }
    }

    loadUser();
  }, []);

  /*
  ==========================================
  Logout
  ==========================================
  */

  async function handleLogout() {
    await fetch("/api/logout", {
      method: "POST",
    });

    window.location.href = "/login";
  }

  return (
    <header
      className="
        h-20
        bg-white
        border-b
        border-slate-200
        px-8
        flex
        items-center
        justify-between
        shadow-sm
      "
    >
      {/* Navegación */}

      <div className="flex items-center gap-8">
        <h1 className="text-2xl font-bold text-blue-600">INK</h1>
      </div>

      {/* Derecha */}

      <div className="flex items-center gap-5">
        <NotificationBell />

        <div className="flex items-center gap-3">
          <UserCircle2 className="text-blue-600" size={42} />

          <div>
            <p className="font-semibold text-slate-900">Administrador</p>

            <p className="text-sm text-slate-500">Instituto I.N.K</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="
            w-11
            h-11
            rounded-xl
            bg-red-50
            hover:bg-red-100
            transition
            flex
            items-center
            justify-center
          "
        >
          <LogOut size={20} className="text-red-600" />
        </button>
      </div>
    </header>
  );
}
