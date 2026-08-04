"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();

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
    <aside
      className="
        hidden
        lg:flex
        w-80
        bg-slate-950
        border-r
        border-slate-800
        flex-col
      "
    >
      {/* Logo */}
      <div className="px-6 py-7 border-b border-slate-800">
        <Link href="/">
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
  );
}

type SidebarItemProps = {
  href: string;
  label: string;
  icon: React.ElementType;
  active?: boolean;
};

function SidebarItem({
  href,
  label,
  icon: Icon,
  active = false,
}: SidebarItemProps) {
  return (
    <Link
      href={href}
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
