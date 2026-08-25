"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  GraduationCap,
  Users,
  School,
  ClipboardCheck,
  FileText,
  CalendarDays,
  MessageCircle,
  CreditCard,
  ShieldCheck,
  Menu,
  X,
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Bloquear el scroll de la página cuando el menú móvil está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const items = [
    {
      label: "Students",
      href: "/admin/students",
      icon: GraduationCap,
    },
    {
      label: "Teachers",
      href: "/admin/teachers",
      icon: Users,
    },
    {
      label: "Classrooms",
      href: "/admin/classrooms",
      icon: School,
    },
    {
      label: "Inscripciones",
      href: "/admin/inscripciones",
      icon: ClipboardCheck,
    },
    {
      label: "Boletines",
      href: "/admin/boletines",
      icon: FileText,
    },
    {
      label: "Calendario",
      href: "/admin/calendar",
      icon: CalendarDays,
    },
    {
      label: "Chats",
      href: "/admin/chat",
      icon: MessageCircle,
    },
    {
      label: "Pagos",
      href: "/admin/payments",
      icon: CreditCard,
    },
  ];

  return (
    <>
      {/* Botón Hamburguesa Flotante (Solo visible en Mobile) */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 w-11 h-11 rounded-xl bg-slate-950 text-white flex items-center justify-center shadow-lg hover:bg-slate-900 transition-colors"
      >
        <Menu size={24} />
      </button>

      {/* Fondo Oscuro (Backdrop) */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
        />
      )}

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
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="px-6 py-7 border-b border-slate-800 relative">
          <Link href="/" onClick={() => setIsOpen(false)}>
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
              <img
                src="/logo3.png"
                alt="INK"
                className="w-full h-full object-contain p-3"
              />
            </div>
          </Link>

          {/* Botón X posicionado absolutamente para no romper tu diseño desktop */}
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden absolute top-9 right-8 p-1.5 rounded-lg bg-slate-900 text-slate-400"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navegación */}
        <nav className="flex-1 px-5 py-6 space-y-2 overflow-y-auto">
          {items.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              active={pathname.startsWith(item.href)}
              onClick={() => setIsOpen(false)}
            />
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-slate-800 p-5">
          <div
            className="
            rounded-2xl
            bg-slate-900
            border
            border-slate-800
            p-4
            flex
            items-center
            gap-3
          "
          >
            <div
              className="
              w-12
              h-12
              rounded-2xl
              bg-cyan-600
              flex
              items-center
              justify-center
            "
            >
              <ShieldCheck size={22} className="text-white" />
            </div>

            <div>
              <p className="text-white font-semibold">Administrador</p>

              <span className="text-slate-400 text-sm">INK Dashboard</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

type SidebarItemProps = {
  href: string;
  label: string;
  icon: React.ElementType;
  active?: boolean;
  onClick?: () => void;
};

function SidebarItem({
  href,
  label,
  icon: Icon,
  active = false,
  onClick,
}: SidebarItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
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
        <div
          className="
            absolute
            left-0
            top-3
            bottom-3
            w-1
            rounded-r-full
            bg-white
          "
        />
      )}

      <Icon
        size={21}
        className={`
          transition
          ${active ? "text-white" : "text-slate-400 group-hover:text-cyan-400"}
        `}
      />

      <span className="font-medium tracking-wide">{label}</span>
    </Link>
  );
}
