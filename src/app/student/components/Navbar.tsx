"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  GraduationCap,
  CalendarDays,
  MessageCircle,
  LogOut,
} from "lucide-react";

import NotificationBell from "@/components/notifications/NotificationBell";
import { useSocket } from "@/components/chat/hooks/useSocket";

export default function Navbar() {
  const [userId, setUserId] = useState("");

  /*
  =====================================
  Registrar usuario en Socket
  =====================================
  */

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();

        if (!data.success) return;

        setUserId(data.user.id);
      } catch (error) {
        console.error(error);
      }
    }

    loadUser();
  }, []);

  // Este hook hace socket.emit("register", userId)
  useSocket(userId);

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
      <div className="flex items-center gap-10">
        <h1 className="text-2xl font-bold text-cyan-600">INK</h1>
      </div>

      <div className="flex items-center gap-4">
        <NotificationBell />

        <div className="hidden md:flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-cyan-600 text-white flex items-center justify-center font-bold">
            S
          </div>

          <div>
            <p className="font-semibold text-slate-800">Estudiante</p>
            <span className="text-xs text-slate-500">Campus Virtual</span>
          </div>
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
