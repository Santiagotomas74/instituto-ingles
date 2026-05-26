"use client";

import Link from "next/link";

import {
  Users,
  GraduationCap,
  BookOpen,
  FileText,
  Inbox,
  School,
  ArrowRight,
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
      title: "Inscripciones",
      description: "Ver consultas recibidas desde la landing page.",
      icon: <Inbox className="w-6 h-6" />,
      href: "/admin/inscripciones",
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
      <aside
        className="
          hidden
          lg:flex
          w-72
          bg-slate-950
          text-white
          flex-col
          border-r
          border-slate-800
        "
      >
        {/* Logo */}
        <div
          className="
            px-8
            py-8
            border-b
            border-slate-800
          "
        >
          <div className="flex items-center gap-4">
            <img
              src="/logo3.png"
              alt="INK"
              className="h-14 w-auto object-contain"
            />

            <div>
              <h2 className="font-bold text-xl">I.N.K</h2>

              <p className="text-sm text-slate-400">Admin Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          <SidebarItem href="/admin/dashboard" label="Dashboard" />

          <SidebarItem href="/admin/students" label="Students" />

          <SidebarItem href="/admin/teachers" label="Teachers" />

          <SidebarItem href="/admin/classrooms" label="Classrooms" />

          <SidebarItem href="/admin/boletines" label="Boletines" />

          <SidebarItem href="/admin/inscripciones" label="Inscripciones" />
        </nav>
      </aside>

      {/* CONTENT */}
      <div className="flex-1">
        {/* HEADER */}
        <header
          className="
            h-24
            bg-white/80
            backdrop-blur-xl
            border-b
            border-gray-200
            flex
            items-center
            justify-between
            px-6
            md:px-10
          "
        >
          <div>
            <p className="text-sm text-gray-500">Panel administrativo</p>

            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          </div>

          <div
            className="
              flex
              items-center
              gap-4
            "
          >
            <div className="text-right">
              <p className="font-semibold text-gray-900">Administrador</p>

              <p className="text-sm text-gray-500">Instituto I.N.K</p>
            </div>

            <div
              className="
                w-12
                h-12
                rounded-2xl
                bg-blue-600
                text-white
                flex
                items-center
                justify-center
                font-bold
              "
            >
              A
            </div>
          </div>
        </header>

        {/* BODY */}
        <div className="p-6 md:p-10">
          {/* STATS */}
          <section
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              xl:grid-cols-4
              gap-6
            "
          >
            {stats.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="
                  rounded-[32px]
                  overflow-hidden
                  shadow-xl
                  bg-white
                  border
                  border-gray-100
                  hover:-translate-y-1
                  transition-all
                "
              >
                <div
                  className={`
                    h-2
                    bg-gradient-to-r
                    ${item.color}
                  `}
                />

                <div className="p-7">
                  <div
                    className={`
                      w-16
                      h-16
                      rounded-3xl
                      bg-gradient-to-br
                      ${item.color}
                      text-white
                      flex
                      items-center
                      justify-center
                    `}
                  >
                    {item.icon}
                  </div>

                  <p className="mt-6 text-gray-500">{item.title}</p>

                  <h2
                    className="
                      text-4xl
                      font-bold
                      text-gray-900
                      mt-2
                    "
                  >
                    {item.value}
                  </h2>
                </div>
              </Link>
            ))}
          </section>

          {/* QUICK ACTIONS */}
          <section className="mt-14">
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
