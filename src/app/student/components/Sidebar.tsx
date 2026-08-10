"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
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
    name: "Mis Aulas",
    href: "/student/dashboard",
    icon: LayoutDashboard,
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
    name: "Calendario",
    href: "/student/dashboard/calendar",
    icon: CalendarDays,
  },
  {
    name: "Mi Perfil",
    href: "/student/profile",
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

  // UX: Bloquear el scroll del fondo cuando el menú móvil está abierto
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return (
    <>
      {/* Botón hamburguesa */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Abrir menú"
        aria-expanded={open}
        className="lg:hidden fixed top-5 left-5 z-50 w-11 h-11 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-lg hover:bg-slate-800 transition-colors"
      >
        <Menu size={22} />
      </button>

      {/* Fondo Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          aria-hidden="true"
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 z-50 min-h-screen w-72 bg-slate-900 text-white flex flex-col transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Header */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-800 shrink-0">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-2xl bg-cyan-600 flex items-center justify-center font-bold text-xl shadow-inner">
              I
            </div>
            <div className="ml-4">
              <h2 className="font-bold text-lg leading-tight">I.N.K.</h2>
              <p className="text-sm text-slate-400">Campus Virtual</p>
            </div>
          </div>

          <button
            onClick={() => setOpen(false)}
            aria-label="Cerrar menú"
            className="lg:hidden p-2 -mr-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Menú */}
        <nav className="flex-1 overflow-y-auto scrollbar-custom p-5">
          <ul className="space-y-2">
            {menu.map((item) => {
              const Icon = item.icon;

              // LÓGICA CORREGIDA: Evita que "/student/dashboard" se marque activo cuando estás en sub-rutas
              const isDashboardRoot = item.href === "/student/dashboard";
              const active = isDashboardRoot
                ? pathname === item.href
                : pathname === item.href ||
                  pathname.startsWith(item.href + "/");

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-medium ${
                      active
                        ? "bg-cyan-600 text-white shadow-md shadow-cyan-900/50"
                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    <Icon
                      size={21}
                      className={active ? "text-white" : "text-slate-400"}
                    />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-slate-800 p-6 shrink-0">
          <div className="rounded-2xl bg-slate-800/50 p-4 border border-slate-700/50">
            <p className="font-semibold text-slate-200">Campus Virtual</p>
            <p className="text-sm text-slate-400 mt-1">
              Instituto de Inglés I.N.K.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
