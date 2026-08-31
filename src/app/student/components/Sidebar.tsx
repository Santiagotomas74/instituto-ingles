"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
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
    key: "my_classrooms",
    href: "/student/dashboard",
    icon: LayoutDashboard,
  },
  {
    key: "tasks",
    href: "/student/dashboard/homework",
    icon: ClipboardList,
  },
  {
    key: "grades",
    href: "/student/dashboard/grades",
    icon: GraduationCap,
  },
  {
    key: "calendar",
    href: "/student/dashboard/calendar",
    icon: CalendarDays,
  },
  {
    key: "chat",
    href: "/student/chat",
    icon: MessageSquare,
  },
  {
    key: "profile",
    href: "/student/profile",
    icon: User,
  },
];

export default function Sidebar() {
  const { t } = useTranslation();
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
      {/* Botón Hamburguesa Flotante (Solo visible en Mobile) */}
      <button
        onClick={() => setOpen(true)}
        aria-label={t("sidebar.open_menu")}
        aria-expanded={open}
        className="lg:hidden fixed top-4 left-4 z-40 w-11 h-11 rounded-xl bg-slate-950 text-white flex items-center justify-center shadow-lg hover:bg-slate-900 transition-colors"
      >
        <Menu size={24} />
      </button>

      {/* Fondo Oscuro (Backdrop) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          aria-hidden="true"
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          flex
          fixed
          lg:static
          top-0
          left-0
          z-50
          h-screen
          w-80
          bg-slate-950
          border-r
          border-slate-800
          flex-col
          transition-transform
          duration-300
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Header con tarjeta blanca de logo */}
        <div className="px-6 py-7 border-b border-slate-800 relative">
          <Link href="/student/dashboard" onClick={() => setOpen(false)}>
            <div
              className="
                h-28
                rounded-3xl
                bg-white
                flex
                items-center
                justify-center
                overflow-hidden
                transition
                hover:scale-[1.02]
                hover:shadow-xl
              "
            >
              <Image
                src="/logo2.png"
                alt="Logo I.N.K."
                width={200}
                height={60}
                className="w-full h-full object-contain p-3"
                priority
              />
            </div>
          </Link>

          {/* Botón X posicionado absolutamente */}
          <button
            onClick={() => setOpen(false)}
            aria-label={t("sidebar.close_menu")}
            className="lg:hidden absolute top-9 right-8 p-1.5 rounded-lg bg-slate-900 text-slate-400"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navegación */}
        <nav className="flex-1 px-5 py-6 space-y-2 overflow-y-auto">
          {menu.map((item) => {
            const Icon = item.icon;
            const isDashboardRoot = item.href === "/student/dashboard";
            const active = isDashboardRoot
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`
                  relative
                  flex
                  items-center
                  gap-4
                  h-14
                  px-5
                  rounded-2xl
                  transition-all
                  duration-200
                  group
                  ${
                    active
                      ? "bg-cyan-600 text-white shadow-lg shadow-cyan-900/40"
                      : "text-slate-300 hover:bg-slate-900 hover:text-white"
                  }
                `}
              >
                {active && (
                  <div className="absolute left-0 top-3 bottom-3 w-1 rounded-r-full bg-white" />
                )}

                <Icon
                  size={21}
                  className={`transition ${
                    active
                      ? "text-white"
                      : "text-slate-400 group-hover:text-cyan-400"
                  }`}
                />

                <span className="font-medium tracking-wide">
                  {t(`sidebar.menu.${item.key}`)}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-slate-800 p-5 shrink-0">
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-600 flex items-center justify-center shrink-0">
              <GraduationCap size={22} className="text-white" />
            </div>

            <div>
              <p className="text-white font-semibold">
                {t("sidebar.campus_virtual")}
              </p>
              <span className="text-slate-400 text-sm">
                {t("sidebar.institute")}
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
