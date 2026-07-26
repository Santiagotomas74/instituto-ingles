"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  GraduationCap,
  CalendarDays,
  MessageCircle,
  Bell,
  UserCircle,
  LogOut,
} from "lucide-react";

export default function ChatTopbar() {
  return (
    <header
      className="
        h-16
        bg-white
        border-b
        px-6
        flex
        items-center
        justify-between
        shadow-sm
        z-20
      "
    >
      <div className="flex items-center gap-8">
        <h1 className="text-xl font-bold text-slate-800">INK</h1>

        <nav className="hidden lg:flex items-center gap-6">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-2 text-slate-600 hover:text-cyan-600 transition"
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          <Link
            href="/admin/classrooms"
            className="flex items-center gap-2 text-slate-600 hover:text-cyan-600 transition"
          >
            <GraduationCap size={18} />
            Aulas
          </Link>

          <Link
            href="/admin/calendar"
            className="flex items-center gap-2 text-slate-600 hover:text-cyan-600 transition"
          >
            <CalendarDays size={18} />
            Calendario
          </Link>

          <Link
            href="/admin/chat"
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

      <div className="flex items-center gap-5">
        <button className="relative">
          <Bell size={22} className="text-slate-600 hover:text-cyan-600" />

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

        <div className="flex items-center gap-3">
          <UserCircle size={38} className="text-cyan-500" />

          <div className="hidden md:block">
            <p className="font-semibold text-slate-800">Administrador</p>

            <p className="text-sm text-slate-500">Instituto I.N.K</p>
          </div>
        </div>

        <button
          className="
            flex
            items-center
            gap-2
            text-red-500
            hover:text-red-600
          "
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
}
