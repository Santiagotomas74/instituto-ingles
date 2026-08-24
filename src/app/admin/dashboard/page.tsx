"use client";

import Link from "next/link";
import Navbar from "./components/AdminNavbar";
import AdminSidebar from "./components/AdminSidebar";
import Stats from "./stats";
import {
  Users,
  GraduationCap,
  BookOpen,
  FileText,
  Inbox,
  School,
  ArrowRight,
  House,
  CalendarDays,
} from "lucide-react";

export default function AdminDashboardPage() {
  const stats = [
    {
      title: "Estudiantes",
      value: "248",
      icon: <Users className="w-7 h-7" />,
      color: "from-blue-600 to-cyan-500",
      href: "/admin/students",
    },
    {
      title: "Profesores",
      value: "18",
      icon: <GraduationCap className="w-7 h-7" />,
      color: "from-purple-600 to-fuchsia-500",
      href: "/admin/teachers",
    },
    {
      title: "Classrooms",
      value: "12",
      icon: <School className="w-7 h-7" />,
      color: "from-emerald-600 to-green-500",
      href: "/admin/classrooms",
    },
    {
      title: "Boletines",
      value: "320",
      icon: <FileText className="w-7 h-7" />,
      color: "from-orange-500 to-amber-500",
      href: "/admin/boletines",
    },
    {
      title: "Calendario",
      value: "320",
      icon: <FileText className="w-7 h-7" />,
      color: "from-orange-500 to-amber-500",
      href: "/admin/calendar",
    },
  ];

  const actions = [
    {
      title: "Gestionar estudiantes",
      description: "Crear, editar y eliminar cuentas de alumnos.",
      icon: <Users className="w-6 h-6" />,
      href: "/admin/students",
    },
    {
      title: "Gestionar profesores",
      description: "Administrar cuentas del staff académico.",
      icon: <GraduationCap className="w-6 h-6" />,
      href: "/admin/teachers",
    },
    {
      title: "Gestionar classrooms",
      description: "Organizar aulas y grupos académicos.",
      icon: <School className="w-6 h-6" />,
      href: "/admin/classrooms",
    },
    {
      title: "Gestionar boletines",
      description: "Administrar notas, observaciones y firmas.",
      icon: <BookOpen className="w-6 h-6" />,
      href: "/admin/boletines",
    },
    {
      title: "Gestionar calendario",
      description: "Administrar fechas importantes y eventos académicos.",
      icon: <CalendarDays className="w-6 h-6" />,
      href: "/admin/calendar",
    },
    {
      title: "Inscripciones",
      description: "Ver consultas recibidas desde la landing page.",
      icon: <Inbox className="w-6 h-6" />,
      href: "/admin/inscripciones",
    },
    {
      title: "Chats",
      description: "Administrar conversaciones con estudiantes y profesores.",
      icon: <Inbox className="w-6 h-6" />,
      href: "/admin/chat",
    },
    {
      title: "Pagos",
      description: "Administrar pagos de estudiantes.",
      icon: <FileText className="w-6 h-6" />,
      href: "/admin/payments",
    },
  ];

  return (
    <main
      className="
        min-h-screen
        bg-gradient-to-br
        from-slate-100
        via-white
        to-blue-50
        flex
      "
    >
      {/* SIDEBAR */}
      <AdminSidebar />

      {/* CONTENT */}
      <div className="flex-1">
        {/* HEADER FIJO */}
        <header className="sticky top-0 z-10">
          <Navbar />
        </header>

        {/* BODY */}
        <div className="p-6 md:p-10">
          <Link
            href="/"
            className="
    md:hidden
    fixed
    bottom-5
    right-5
    z-50

    flex
    items-center
    gap-2

    px-5
    h-14

    rounded-2xl
    bg-cyan-500
    hover:bg-cyan-400

    text-white
    font-semibold

    shadow-2xl
    transition-all
  "
          >
            <House className="w-5 h-5" />
            Inicio
          </Link>
          {/* QUICK ACTIONS   <Stats /> */}
          <section className="mt-2">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Gestión administrativa
              </h2>

              <p className="text-gray-500 mt-2">
                Accesos rápidos a los módulos principales
              </p>
            </div>

            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                xl:grid-cols-3
                gap-6
              "
            >
              {actions.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="
                    group
                    bg-white
                    border
                    border-gray-100
                    rounded-[32px]
                    p-7
                    shadow-lg
                    hover:shadow-2xl
                    transition-all
                    hover:-translate-y-1
                  "
                >
                  <div
                    className="
                      w-14
                      h-14
                      rounded-2xl
                      bg-blue-100
                      text-blue-700
                      flex
                      items-center
                      justify-center
                    "
                  >
                    {item.icon}
                  </div>

                  <h3
                    className="
                      mt-6
                      text-xl
                      font-bold
                      text-gray-900
                    "
                  >
                    {item.title}
                  </h3>

                  <p className="mt-3 text-gray-500 leading-relaxed">
                    {item.description}
                  </p>

                  <div
                    className="
                      mt-6
                      flex
                      items-center
                      gap-2
                      text-blue-600
                      font-semibold
                    "
                  >
                    Ingresar
                    <ArrowRight
                      className="
                        w-4
                        h-4
                        group-hover:translate-x-1
                        transition
                      "
                    />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

/* COMPONENTS */

function SidebarItem({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="
        h-12
        px-4
        rounded-2xl
        flex
        items-center
        text-slate-300
        hover:bg-slate-800
        hover:text-white
        transition-all
      "
    >
      {label}
    </Link>
  );
}
