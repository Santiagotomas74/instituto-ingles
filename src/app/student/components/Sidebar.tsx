"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  FolderOpen,
  ClipboardList,
  GraduationCap,
  MessageSquare,
  User,
  CalendarDays,
  Menu,
  X,
} from "lucide-react";

const menu = [
  {
    name: "Dashboard",
    href: "/student/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Mis Aulas",
    href: "/student/dashboard/classrooms",
    icon: BookOpen,
  },
  {
    name: "Materiales",
    href: "/student/dashboard/materials",
    icon: FolderOpen,
  },
  {
    name: "Tareas",
    href: "/student/dashboard/homework",
    icon: ClipboardList,
  },
  {
    name: "Calificaciones",
    href: "/student/dashboard/grades",
    icon: GraduationCap,
  },
  {
    name: "Mensajes",
    href: "/student/dashboard/messages",
    icon: MessageSquare,
  },
  {
    name: "Calendario",
    href: "/student/dashboard/calendar",
    icon: CalendarDays,
  },
  {
    name: "Mi Perfil",
    href: "/student/dashboard/profile",
    icon: User,
  },
  {
    name: "Chat",
    href: "/student/chat",
    icon: MessageSquare,
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

      {/* Fondo */}

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
          min-h-screen
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

        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-800">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-2xl bg-cyan-600 flex items-center justify-center font-bold text-xl">
              I
            </div>

            <div className="ml-4">
              <h2 className="font-bold text-lg">I.N.K.</h2>

              <p className="text-sm text-slate-400">Campus Virtual</p>
            </div>
          </div>

          <button onClick={() => setOpen(false)} className="lg:hidden">
            <X size={24} />
          </button>
        </div>

        {/* Menú */}

        <nav className="flex-1 overflow-y-auto p-5">
          <div className="space-y-2">
            {menu.map((item) => {
              const Icon = item.icon;

              const active =
                pathname === item.href || pathname.startsWith(item.href + "/");

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`
                    flex
                    items-center
                    gap-4
                    px-5
                    py-4
                    rounded-2xl
                    transition-all

                    ${
                      active
                        ? "bg-cyan-600 text-white shadow-lg"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }
                  `}
                >
                  <Icon size={21} />

                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer */}

        <div className="border-t border-slate-800 p-6">
          <div className="rounded-2xl bg-slate-800 p-4">
            <p className="font-semibold">Campus Virtual</p>

            <p className="text-sm text-slate-400">Instituto de Inglés I.N.K.</p>
          </div>
        </div>
      </aside>
    </>
  );
}
