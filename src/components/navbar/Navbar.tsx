"use client";

import { useState } from "react";
import Link from "next/link";

import {
  Menu,
  X,
  ChevronDown,
  BookOpen,
  GraduationCap,
  Calendar,
  ClipboardCheck,
  MessageSquare,
  FileText,
  Upload,
  Users,
  BarChart3,
} from "lucide-react";

export default function MobileNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <header className=" w-full border-b border-gray-100 bg-white/95 backdrop-blur sticky top-0 z-50 ">
      <nav
        className="
          max-w-7xl
          mx-auto
          h-20
          px-5
          flex
          items-center
          justify-between
        "
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div
            className="
              w-11
              h-11
              rounded-xl
              bg-blue-50
              flex
              items-center
              justify-center
            "
          >
            <BookOpen className="w-6 h-6 text-blue-600" />
          </div>

          <h1
            className="
              text-xl
              font-semibold
              tracking-tight
              text-gray-900
            "
          >
            English Institute
          </h1>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="
            lg:hidden
            w-11
            h-11
            rounded-xl
            border
            border-gray-500
            flex
            items-center
            justify-center
            text-gray-500
          "
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Desktop */}
        <div className="hidden lg:flex">
          {/* TU NAVBAR DESKTOP ACTUAL */}

          <nav
            className="
          max-w-7xl
          mx-auto
          h-20
          px-6
          flex
          items-center
          justify-between
        "
          >
            {/* Navigation */}
            <ul
              className="
            hidden
            lg:flex
            items-center
            gap-10
            text-[15px]
            font-medium
            text-gray-700
          "
            >
              {/* Inicio */}
              <li>
                <Link href="/" className="hover:text-blue-600 transition">
                  Inicio
                </Link>
              </li>

              {/* Instituto */}
              <li className="relative group">
                <button
                  className="
                flex
                items-center
                gap-1
                hover:text-blue-600
                transition
              "
                >
                  Instituto
                  <ChevronDown className="w-4 h-4" />
                </button>

                <div
                  className="
                absolute
                top-10
                left-0
                w-72
                rounded-2xl
                border
                border-gray-100
                bg-white
                shadow-2xl
                p-3
                opacity-0
                invisible
                translate-y-2
                group-hover:opacity-100
                group-hover:visible
                group-hover:translate-y-0
                transition-all
                duration-300
              "
                >
                  <DropdownItem
                    href="/history"
                    title="Historia del instituto"
                    description="Conoce nuestra trayectoria"
                  />

                  <DropdownItem
                    href="/methodology"
                    title="Metodología"
                    description="Cómo enseñamos inglés"
                  />

                  <DropdownItem
                    href="/testimonials"
                    title="Testimonios"
                    description="Experiencias de estudiantes"
                  />

                  <DropdownItem
                    href="/events"
                    title="Actividades y eventos"
                    description="Eventos y talleres"
                  />

                  <DropdownItem
                    href="/schedule"
                    title="Cronograma académico"
                    description="Fechas y calendarios"
                  />
                </div>
              </li>

              {/* Cursos */}
              <li className="relative group">
                <button
                  className="
                flex
                items-center
                gap-1
                hover:text-blue-600
                transition
              "
                >
                  Cursos
                  <ChevronDown className="w-4 h-4" />
                </button>

                <div
                  className="
                absolute
                top-10
                left-0
                w-64
                rounded-2xl
                border
                border-gray-100
                bg-white
                shadow-2xl
                p-3
                opacity-0
                invisible
                translate-y-2
                group-hover:opacity-100
                group-hover:visible
                group-hover:translate-y-0
                transition-all
                duration-300
              "
                >
                  <DropdownItem
                    href="/courses/a1"
                    title="Nivel A1"
                    description="Principiante"
                  />

                  <DropdownItem
                    href="/courses/a2"
                    title="Nivel A2"
                    description="Elemental"
                  />

                  <DropdownItem
                    href="/courses/b1"
                    title="Nivel B1"
                    description="Intermedio"
                  />

                  <DropdownItem
                    href="/courses/b2"
                    title="Nivel B2"
                    description="Intermedio alto"
                  />

                  <DropdownItem
                    href="/courses/c1"
                    title="Nivel C1"
                    description="Avanzado"
                  />
                </div>
              </li>

              {/* Estudiantes */}
              <li className="relative group">
                <button
                  className="
                flex
                items-center
                gap-1
                hover:text-blue-600
                transition
              "
                >
                  Estudiantes
                  <ChevronDown className="w-4 h-4" />
                </button>

                <div
                  className="
                absolute
                top-10
                left-0
                w-80
                rounded-2xl
                border
                border-gray-100
                bg-white
                shadow-2xl
                p-3
                opacity-0
                invisible
                translate-y-2
                group-hover:opacity-100
                group-hover:visible
                group-hover:translate-y-0
                transition-all
                duration-300
              "
                >
                  <DropdownIconItem
                    href="/student/campus"
                    icon={<GraduationCap className="w-5 h-5" />}
                    title="Campus virtual"
                    description="Accede a clases y materiales"
                  />

                  <DropdownIconItem
                    href="/student/calendar"
                    icon={<Calendar className="w-5 h-5" />}
                    title="Calendario académico"
                    description="Fechas y horarios"
                  />

                  <DropdownIconItem
                    href="/student/tasks"
                    icon={<ClipboardCheck className="w-5 h-5" />}
                    title="Tareas y ejercicios"
                    description="Actividades y evaluaciones"
                  />

                  <DropdownIconItem
                    href="/student/messages"
                    icon={<MessageSquare className="w-5 h-5" />}
                    title="Mensajes"
                    description="Comunicación con profesores"
                  />

                  <DropdownIconItem
                    href="/student/certificates"
                    icon={<FileText className="w-5 h-5" />}
                    title="Certificados"
                    description="Descarga tus certificados"
                  />
                </div>
              </li>

              {/* Profesores */}
              <li className="relative group">
                <button
                  className="
                flex
                items-center
                gap-1
                hover:text-blue-600
                transition
              "
                >
                  Profesores
                  <ChevronDown className="w-4 h-4" />
                </button>

                <div
                  className="
                absolute
                top-10
                left-0
                w-80
                rounded-2xl
                border
                border-gray-100
                bg-white
                shadow-2xl
                p-3
                opacity-0
                invisible
                translate-y-2
                group-hover:opacity-100
                group-hover:visible
                group-hover:translate-y-0
                transition-all
                duration-300
              "
                >
                  <DropdownIconItem
                    href="/teacher/classes"
                    icon={<Users className="w-5 h-5" />}
                    title="Gestión de clases"
                    description="Administra tus cursos"
                  />

                  <DropdownIconItem
                    href="/teacher/materials"
                    icon={<Upload className="w-5 h-5" />}
                    title="Subir materiales"
                    description="Comparte contenido académico"
                  />

                  <DropdownIconItem
                    href="/teacher/attendance"
                    icon={<ClipboardCheck className="w-5 h-5" />}
                    title="Asistencia"
                    description="Control de alumnos"
                  />

                  <DropdownIconItem
                    href="/teacher/messages"
                    icon={<MessageSquare className="w-5 h-5" />}
                    title="Mensajes"
                    description="Comunicación institucional"
                  />

                  <DropdownIconItem
                    href="/teacher/reports"
                    icon={<BarChart3 className="w-5 h-5" />}
                    title="Reportes"
                    description="Estadísticas y rendimiento"
                  />
                </div>
              </li>

              {/* Contacto */}
              <li>
                <Link
                  href="/contact"
                  className="hover:text-blue-600 transition"
                >
                  Contacto
                </Link>
              </li>
            </ul>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="
              text-blue-600
              font-medium
              hover:text-blue-700
              transition
            "
              >
                Iniciar sesión
              </Link>

              <Link
                href="/register"
                className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-6
              py-3
              rounded-xl
              font-medium
              transition-all
              shadow-lg
              hover:shadow-xl
            "
              >
                Inscribirse
              </Link>
            </div>
          </nav>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`
          lg:hidden
          overflow-hidden
          transition-all
          duration-300
          ${menuOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div
          className="
            px-5
            pb-6
            pt-2
            bg-white
            border-t
            border-gray-100
            space-y-2
          "
        >
          {/* Inicio */}
          <MobileLink href="/" label="Inicio" />

          {/* Instituto */}
          <MobileDropdown
            title="Instituto"
            isOpen={openDropdown === "instituto"}
            onClick={() => toggleDropdown("instituto")}
          >
            <MobileSubLink href="/history" label="Historia" />

            <MobileSubLink href="/methodology" label="Metodología" />

            <MobileSubLink href="/testimonials" label="Testimonios" />

            <MobileSubLink href="/events" label="Eventos" />

            <MobileSubLink href="/schedule" label="Cronograma" />
          </MobileDropdown>

          {/* Cursos */}
          <MobileDropdown
            title="Cursos"
            isOpen={openDropdown === "courses"}
            onClick={() => toggleDropdown("courses")}
          >
            <MobileSubLink href="/courses/a1" label="Nivel A1" />

            <MobileSubLink href="/courses/a2" label="Nivel A2" />

            <MobileSubLink href="/courses/b1" label="Nivel B1" />

            <MobileSubLink href="/courses/b2" label="Nivel B2" />

            <MobileSubLink href="/courses/c1" label="Nivel C1" />
          </MobileDropdown>

          {/* Estudiantes */}
          <MobileDropdown
            title="Estudiantes"
            isOpen={openDropdown === "students"}
            onClick={() => toggleDropdown("students")}
          >
            <MobileIconLink
              href="/student/campus"
              icon={<GraduationCap className="w-4 h-4" />}
              label="Campus virtual"
            />

            <MobileIconLink
              href="/student/calendar"
              icon={<Calendar className="w-4 h-4" />}
              label="Calendario"
            />

            <MobileIconLink
              href="/student/tasks"
              icon={<ClipboardCheck className="w-4 h-4" />}
              label="Tareas"
            />

            <MobileIconLink
              href="/student/messages"
              icon={<MessageSquare className="w-4 h-4" />}
              label="Mensajes"
            />

            <MobileIconLink
              href="/student/certificates"
              icon={<FileText className="w-4 h-4" />}
              label="Certificados"
            />
          </MobileDropdown>

          {/* Profesores */}
          <MobileDropdown
            title="Profesores"
            isOpen={openDropdown === "teachers"}
            onClick={() => toggleDropdown("teachers")}
          >
            <MobileIconLink
              href="/teacher/classes"
              icon={<Users className="w-4 h-4" />}
              label="Gestión de clases"
            />

            <MobileIconLink
              href="/teacher/materials"
              icon={<Upload className="w-4 h-4" />}
              label="Materiales"
            />

            <MobileIconLink
              href="/teacher/attendance"
              icon={<ClipboardCheck className="w-4 h-4" />}
              label="Asistencia"
            />

            <MobileIconLink
              href="/teacher/messages"
              icon={<MessageSquare className="w-4 h-4" />}
              label="Mensajes"
            />

            <MobileIconLink
              href="/teacher/reports"
              icon={<BarChart3 className="w-4 h-4" />}
              label="Reportes"
            />
          </MobileDropdown>

          {/* Contacto */}
          <MobileLink href="/contact" label="Contacto" />

          {/* Buttons */}
          <div className="pt-5 space-y-3">
            <Link
              href="/login"
              className="
                w-full
                flex
                justify-center
                border
                border-blue-600
                text-blue-600
                py-3
                rounded-xl
                font-medium
              "
            >
              Iniciar sesión
            </Link>

            <Link
              href="/register"
              className="
                w-full
                flex
                justify-center
                bg-blue-600
                text-white
                py-3
                rounded-xl
                font-medium
                shadow-lg
              "
            >
              Inscribirse
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ---------------- Components ---------------- */

type MobileLinkProps = {
  href: string;
  label: string;
};

function MobileLink({ href, label }: MobileLinkProps) {
  return (
    <Link
      href={href}
      className="
        block
        py-3
        text-[16px]
        font-medium
        text-gray-800
      "
    >
      {label}
    </Link>
  );
}

type DropdownItemProps = {
  href: string;
  title: string;
  description: string;
};

function DropdownItem({ href, title, description }: DropdownItemProps) {
  return (
    <Link
      href={href}
      className="
        block
        px-4
        py-3
        rounded-xl
        hover:bg-blue-50
        transition
      "
    >
      <p className="font-medium text-gray-900">{title}</p>

      <p className="text-sm text-gray-500 mt-1">{description}</p>
    </Link>
  );
}

type DropdownIconItemProps = {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
};

function DropdownIconItem({
  href,
  icon,
  title,
  description,
}: DropdownIconItemProps) {
  return (
    <Link
      href={href}
      className="
        flex
        items-start
        gap-4
        px-4
        py-3
        rounded-xl
        hover:bg-blue-50
        transition
      "
    >
      <div
        className="
          w-10
          h-10
          rounded-lg
          bg-blue-100
          text-blue-600
          flex
          items-center
          justify-center
          shrink-0
        "
      >
        {icon}
      </div>

      <div>
        <p className="font-medium text-gray-900">{title}</p>

        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>
    </Link>
  );
}

type MobileDropdownProps = {
  title: string;
  isOpen: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

function MobileDropdown({
  title,
  isOpen,
  onClick,
  children,
}: MobileDropdownProps) {
  return (
    <div className="border-b border-gray-100 pb-2">
      <button
        onClick={onClick}
        className="
          w-full
          flex
          items-center
          justify-between
          py-3
          text-[16px]
          font-medium
          text-gray-800
        "
      >
        {title}

        <ChevronDown
          className={`
            w-5
            h-5
            transition-transform
            ${isOpen ? "rotate-180" : ""}
          `}
        />
      </button>

      <div
        className={`
          overflow-hidden
          transition-all
          duration-300
          ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="pl-2 pb-2">{children}</div>
      </div>
    </div>
  );
}

type MobileSubLinkProps = {
  href: string;
  label: string;
};

function MobileSubLink({ href, label }: MobileSubLinkProps) {
  return (
    <Link
      href={href}
      className="
        block
        py-2
        text-gray-600
        text-[15px]
      "
    >
      {label}
    </Link>
  );
}

type MobileIconLinkProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
};

function MobileIconLink({ href, icon, label }: MobileIconLinkProps) {
  return (
    <Link
      href={href}
      className="
        flex
        items-center
        gap-3
        py-3
        text-gray-700
        text-[15px]
      "
    >
      <div
        className="
          w-8
          h-8
          rounded-lg
          bg-blue-50
          text-blue-600
          flex
          items-center
          justify-center
        "
      >
        {icon}
      </div>

      {label}
    </Link>
  );
}
