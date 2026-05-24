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
        <Link href="#">
          <img
            src="/logo-ink.png"
            alt="I.N.K Logo"
            className="
      h-20
      md:h-28
      lg:h-28
      w-auto
      object-contain
      cursor-pointer
    "
          />
        </Link>
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
      z-50
    "
                >
                  <DropdownItem
                    href="/#about"
                    title="Sobre I.N.K"
                    description="Nuestra historia, misión y visión"
                  />

                  <DropdownItem
                    href="/#features"
                    title="¿Por qué elegirnos?"
                    description="Beneficios y ventajas del instituto"
                  />

                  <DropdownItem
                    href="/#methodology"
                    title="Metodología"
                    description="Cómo enseñamos inglés"
                  />

                  <DropdownItem
                    href="/#cambridge"
                    title="Certificación Cambridge"
                    description="Preparación y exámenes oficiales"
                  />

                  <DropdownItem
                    href="/#modalities"
                    title="Modalidades"
                    description="Presencial, online y personalizada"
                  />

                  <DropdownItem
                    href="/#teachers"
                    title="Profesores"
                    description="Conoce nuestro equipo docente"
                  />

                  <DropdownItem
                    href="/#stats"
                    title="Logros y estadísticas"
                    description="Años de experiencia y estudiantes"
                  />

                  <DropdownItem
                    href="/#testimonials"
                    title="Testimonios"
                    description="Experiencias de nuestros alumnos"
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
      z-50
    "
                >
                  <DropdownItem
                    href="/#levels"
                    title="Kids"
                    description="Inglés para niños desde los 4 años"
                  />

                  <DropdownItem
                    href="/#levels"
                    title="Teens"
                    description="Cursos para adolescentes"
                  />

                  <DropdownItem
                    href="/#levels"
                    title="Adults"
                    description="Programas para adultos"
                  />

                  <DropdownItem
                    href="/#levels"
                    title="Conversation"
                    description="Práctica intensiva de conversación"
                  />

                  <DropdownItem
                    href="/#levels"
                    title="Cambridge Preparation"
                    description="Preparación para certificaciones oficiales"
                  />

                  <DropdownItem
                    href="/#levels"
                    title="Intensive Courses"
                    description="Cursos acelerados e intensivos"
                  />

                  <DropdownItem
                    href="/#levels"
                    title="School Support"
                    description="Apoyo escolar durante todo el año"
                  />

                  <DropdownItem
                    href="/#levels"
                    title="Professional English"
                    description="Inglés para ingeniería, medicina y más"
                  />

                  <DropdownItem
                    href="/#levels"
                    title="Online Classes"
                    description="Clases virtuales desde cualquier lugar"
                  />

                  <DropdownItem
                    href="/#levels"
                    title="Private Lessons"
                    description="Clases individuales y personalizadas"
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
                    href="/boletin"
                    icon={<GraduationCap className="w-5 h-5" />}
                    title="Boletín de notas"
                    description="Accede a tus calificaciones y progreso académico"
                  />
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
                  href="/#contact"
                  className="hover:text-blue-600 transition"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 hidden lg:flex">
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
            href="/inscriptions"
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
            <MobileSubLink
              href="/#about"
              label="Sobre I.N.K"
              onClick={() => setMenuOpen(false)}
            />

            <MobileSubLink
              href="/#features"
              label="¿Por qué elegirnos?"
              onClick={() => setMenuOpen(false)}
            />
            <MobileSubLink
              href="/#methodology"
              label="Metodología"
              onClick={() => setMenuOpen(false)}
            />

            <MobileSubLink
              href="/#cambridge"
              label="Certificación Cambridge"
              onClick={() => setMenuOpen(false)}
            />
            <MobileSubLink
              href="/#modalities"
              label="Modalidades"
              onClick={() => setMenuOpen(false)}
            />
            <MobileSubLink
              href="/#teachers"
              label="Profesores"
              onClick={() => setMenuOpen(false)}
            />
            <MobileSubLink
              href="/#stats"
              label="Logros y estadísticas"
              onClick={() => setMenuOpen(false)}
            />
            <MobileSubLink
              href="/#testimonials"
              label="Testimonios"
              onClick={() => setMenuOpen(false)}
            />

            <MobileSubLink
              href="/events"
              label="Eventos"
              onClick={() => setMenuOpen(false)}
            />

            <MobileSubLink
              href="/schedule"
              label="Cronograma"
              onClick={() => setMenuOpen(false)}
            />
          </MobileDropdown>

          {/* Cursos */}
          <MobileDropdown
            title="Cursos"
            isOpen={openDropdown === "courses"}
            onClick={() => toggleDropdown("courses")}
          >
            <MobileSubLink
              href="/#levels"
              label="Kids"
              onClick={() => setMenuOpen(false)}
            />

            <MobileSubLink
              href="/#levels"
              label="Teens"
              onClick={() => setMenuOpen(false)}
            />

            <MobileSubLink
              href="/#levels"
              label="Adults"
              onClick={() => setMenuOpen(false)}
            />

            <MobileSubLink
              href="/#levels"
              label="Conversation"
              onClick={() => setMenuOpen(false)}
            />

            <MobileSubLink
              href="/#levels"
              label="Cambridge Preparation"
              onClick={() => setMenuOpen(false)}
            />
          </MobileDropdown>

          {/* Estudiantes */}
          <MobileDropdown
            title="Estudiantes"
            isOpen={openDropdown === "students"}
            onClick={() => toggleDropdown("students")}
          >
            <MobileIconLink
              href="/boletin"
              icon={<FileText className="w-4 h-4" />}
              label="Boletín de notas"
            />
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
          <MobileLink href="/#contact" label="Contacto" />

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
  onClick: () => void;
};

function MobileSubLink({ href, label, onClick }: MobileSubLinkProps) {
  return (
    <Link
      href={href}
      className="
        block
        py-2
        text-gray-600
        text-[15px]
      "
      onClick={onClick}
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
