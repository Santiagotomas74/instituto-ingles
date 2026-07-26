"use client";

import { useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  BookOpen,
  MessageSquare,
  LogOut,
  GraduationCap,
  CalendarDays,
  Menu,
  X,
} from "lucide-react";

const menu = [
  {
    title: "Mis aulas",
    href: "/teacher/dashboard",
    icon: BookOpen,
  },
  {
    title: "Mensajes",
    href: "/teacher/chat",
    icon: MessageSquare,
  },
  {
    title: "Calendario",
    href: "/teacher/calendar",
    icon: CalendarDays,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Botón hamburguesa */}

      <button
        onClick={() => setOpen(true)}
        className="
          lg:hidden
          fixed
          top-5
          left-5
          z-50
          w-11
          h-11
          rounded-xl
          bg-slate-900
          text-white
          flex
          items-center
          justify-center
          shadow-lg
        "
      >
        <Menu size={22} />
      </button>

      {/* Overlay */}

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="
            fixed
            inset-0
            bg-black/40
            z-40
            lg:hidden
          "
        />
      )}

      {/* Sidebar */}

      <aside
        className={`
          fixed
          lg:static
          top-0
          left-0
          z-50
          h-screen
          w-72
          bg-slate-900
          text-white
          flex
          flex-col
          transition-transform
          duration-300

          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Header */}

        <div
          className="
          h-20
          border-b
          border-slate-800
          flex
          items-center
          justify-between
          px-6
        "
        >
          <div className="flex items-center gap-3">
            <div
              className="
              h-12
              w-12
              rounded-xl
              bg-cyan-600
              flex
              items-center
              justify-center
            "
            >
              <GraduationCap size={28} />
            </div>

            <div>
              <h2 className="font-bold text-lg">Instituto I.N.K.</h2>

              <p className="text-sm text-slate-400">Portal Docente</p>
            </div>
          </div>

          <button onClick={() => setOpen(false)} className="lg:hidden">
            <X size={24} />
          </button>
        </div>

        {/* Menú */}

        <nav className="flex-1 overflow-y-auto py-6">
          {menu.map((item) => {
            const Icon = item.icon;

            const active =
              pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.title}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`
                  mx-4
                  mb-2
                  flex
                  items-center
                  gap-4
                  rounded-xl
                  px-5
                  py-4
                  transition

                  ${
                    active
                      ? "bg-cyan-600 text-white shadow-lg"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }
                `}
              >
                <Icon size={22} />

                <span className="font-medium">{item.title}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}

        <div className="border-t border-slate-800 p-4">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="
              flex
              items-center
              gap-4
              rounded-xl
              px-5
              py-4
              text-slate-300
              hover:bg-red-600
              hover:text-white
              transition
            "
          >
            <LogOut size={22} />

            <span>Cerrar sesión</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
