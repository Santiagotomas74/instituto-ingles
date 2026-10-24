"use client";

import { useState } from "react";
import Link from "next/link";

import {
  Menu,
  X,
  ChevronDown,
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
    setOpenDropdown((current) => (current === name ? null : name));
  };

  const closeMobileMenu = () => {
    setMenuOpen(false);
    setOpenDropdown(null);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur">
      {/* ==================== NAVBAR PRINCIPAL ==================== */}
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-3 px-4 sm:px-5 xl:gap-5">
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center"
          aria-label="I.N.K - Inicio"
        >
          <img
            src="/logo-ink.png"
            alt="I.N.K Logo"
            className="h-16 w-auto cursor-pointer object-contain sm:h-[4.5rem] lg:h-[4.5rem]"
          />
        </Link>

        {/* ==================== NAVEGACIÓN DESKTOP ==================== */}
        <div className="hidden min-w-0 flex-1 items-center justify-center lg:flex">
          <ul className="flex items-center gap-4 whitespace-nowrap text-[13px] font-medium text-gray-700 xl:gap-6 xl:text-[15px]">
            {/* Inicio */}
            <li>
              <Link href="/" className="transition-colors hover:text-blue-600">
                Inicio
              </Link>
            </li>

            {/* Instituto */}
            <li className="group relative">
              <button
                type="button"
                className="flex items-center gap-1 transition-colors hover:text-blue-600"
                aria-haspopup="true"
              >
                Instituto
                <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:rotate-180" />
              </button>

              <div className="invisible absolute left-0 top-full z-50 w-80 translate-y-2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <div className="rounded-2xl border border-gray-100 bg-white p-3 shadow-2xl">
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
                    description="Conocé nuestro equipo docente"
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
              </div>
            </li>

            {/* Cursos */}
            <li className="group relative">
              <button
                type="button"
                className="flex items-center gap-1 transition-colors hover:text-blue-600"
                aria-haspopup="true"
              >
                Cursos
                <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:rotate-180" />
              </button>

              <div className="invisible absolute left-0 top-full z-50 w-80 translate-y-2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <div className="rounded-2xl border border-gray-100 bg-white p-3 shadow-2xl">
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
              </div>
            </li>

            {/* Estudiantes */}
            <li className="group relative">
              <button
                type="button"
                className="flex items-center gap-1 transition-colors hover:text-blue-600"
                aria-haspopup="true"
              >
                Estudiantes
                <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:rotate-180" />
              </button>

              <div className="invisible absolute left-0 top-full z-50 w-80 translate-y-2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <div className="rounded-2xl border border-gray-100 bg-white p-3 shadow-2xl">
                  <DropdownIconItem
                    href="/boletin"
                    icon={<GraduationCap className="h-5 w-5" />}
                    title="Boletín de notas"
                    description="Accedé a tus calificaciones y progreso académico"
                  />

                  <DropdownIconItem
                    href="/student/dashboard"
                    icon={<GraduationCap className="h-5 w-5" />}
                    title="Campus virtual"
                    description="Accedé a clases y materiales"
                  />

                  <DropdownIconItem
                    href="/student/dashboard/calendar"
                    icon={<Calendar className="h-5 w-5" />}
                    title="Calendario académico"
                    description="Fechas y horarios"
                  />

                  <DropdownIconItem
                    href="/student/dashboard/homework"
                    icon={<ClipboardCheck className="h-5 w-5" />}
                    title="Tareas y ejercicios"
                    description="Actividades y evaluaciones"
                  />

                  <DropdownIconItem
                    href="/student/chat"
                    icon={<MessageSquare className="h-5 w-5" />}
                    title="Mensajes"
                    description="Comunicación con profesores"
                  />
                </div>
              </div>
            </li>

            {/* Profesores */}
            <li className="group relative">
              <button
                type="button"
                className="flex items-center gap-1 transition-colors hover:text-blue-600"
                aria-haspopup="true"
              >
                Profesores
                <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:rotate-180" />
              </button>

              <div className="invisible absolute left-0 top-full z-50 w-80 translate-y-2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <div className="rounded-2xl border border-gray-100 bg-white p-3 shadow-2xl">
                  <DropdownIconItem
                    href="/teacher/dashboard"
                    icon={<Users className="h-5 w-5" />}
                    title="Gestión de clases"
                    description="Administrá tus cursos"
                  />

                  <DropdownIconItem
                    href="/teacher/dashboard"
                    icon={<Upload className="h-5 w-5" />}
                    title="Subir materiales"
                    description="Compartí contenido académico"
                  />

                  <DropdownIconItem
                    href="/teacher/chat"
                    icon={<MessageSquare className="h-5 w-5" />}
                    title="Mensajes"
                    description="Comunicación institucional"
                  />

                  <DropdownIconItem
                    href="/teacher/calendar"
                    icon={<BarChart3 className="h-5 w-5" />}
                    title="Calendario académico"
                    description="Fechas y eventos del año"
                  />
                </div>
              </div>
            </li>

            {/* Contacto */}
            <li>
              <Link
                href="/#contact"
                className="transition-colors hover:text-blue-600"
              >
                Contacto
              </Link>
            </li>
          </ul>
        </div>

        {/* ==================== BOTONES DESKTOP ==================== */}
        <div className="hidden shrink-0 items-center gap-2 lg:flex xl:gap-3">
          {/* Iniciar sesión */}
          ```tsx
          <Link
            href="/login"
            className="
    group relative inline-flex shrink-0
    items-center justify-center
    whitespace-nowrap rounded-xl
    px-3 py-3 xl:px-4
    text-sm font-semibold text-blue-600
    transition-colors duration-300
    hover:bg-blue-50 hover:text-blue-800
  "
          >
            <span>Iniciar sesión</span>

            {/* Línea animada alineada con el texto */}
            <span
              aria-hidden="true"
              className="
      absolute bottom-2 left-3 right-3
      h-[2px] rounded-full
      origin-left scale-x-0
      bg-blue-600
      transition-transform duration-300 ease-out
      group-hover:scale-x-100
      xl:left-4 xl:right-4
    "
            />
          </Link>
          ```
          {/* Información sobre los cursos */}
          <Link
            href="/inscriptions"
            className="inline-flex w-[180px] shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-900 px-3 py-3 text-center text-xs font-semibold leading-snug text-white shadow-md shadow-blue-900/15 transition-all duration-300 hover:-translate-y-0.5 hover:from-blue-700 hover:to-blue-950 hover:shadow-lg xl:w-[220px] xl:px-4 xl:text-sm"
          >
            <span>
              Quiero recibir información
              <br />
              sobre los cursos
            </span>
          </Link>
        </div>

        {/* ==================== BOTÓN MENÚ MÓVIL ==================== */}
        <button
          type="button"
          onClick={() => setMenuOpen((current) => !current)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gray-300 text-gray-600 transition-colors hover:border-blue-600 hover:text-blue-600 lg:hidden"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* ==================== MENÚ MÓVIL ==================== */}
      <div
        className={`overflow-hidden transition-all duration-300 lg:hidden ${
          menuOpen ? "max-h-[1200px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-2 border-t border-gray-100 bg-white px-5 pb-6 pt-2">
          {/* Inicio */}
          <MobileLink href="/" label="Inicio" onClick={closeMobileMenu} />

          {/* Instituto */}
          <MobileDropdown
            title="Instituto"
            isOpen={openDropdown === "instituto"}
            onClick={() => toggleDropdown("instituto")}
          >
            <MobileSubLink
              href="/#about"
              label="Sobre I.N.K"
              onClick={closeMobileMenu}
            />

            <MobileSubLink
              href="/#features"
              label="¿Por qué elegirnos?"
              onClick={closeMobileMenu}
            />

            <MobileSubLink
              href="/#methodology"
              label="Metodología"
              onClick={closeMobileMenu}
            />

            <MobileSubLink
              href="/#cambridge"
              label="Certificación Cambridge"
              onClick={closeMobileMenu}
            />

            <MobileSubLink
              href="/#modalities"
              label="Modalidades"
              onClick={closeMobileMenu}
            />

            <MobileSubLink
              href="/#teachers"
              label="Profesores"
              onClick={closeMobileMenu}
            />

            <MobileSubLink
              href="/#stats"
              label="Logros y estadísticas"
              onClick={closeMobileMenu}
            />

            <MobileSubLink
              href="/#testimonials"
              label="Testimonios"
              onClick={closeMobileMenu}
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
              onClick={closeMobileMenu}
            />

            <MobileSubLink
              href="/#levels"
              label="Teens"
              onClick={closeMobileMenu}
            />

            <MobileSubLink
              href="/#levels"
              label="Adults"
              onClick={closeMobileMenu}
            />

            <MobileSubLink
              href="/#levels"
              label="Conversation"
              onClick={closeMobileMenu}
            />

            <MobileSubLink
              href="/#levels"
              label="Cambridge Preparation"
              onClick={closeMobileMenu}
            />

            <MobileSubLink
              href="/#levels"
              label="Intensive Courses"
              onClick={closeMobileMenu}
            />

            <MobileSubLink
              href="/#levels"
              label="School Support"
              onClick={closeMobileMenu}
            />

            <MobileSubLink
              href="/#levels"
              label="Professional English"
              onClick={closeMobileMenu}
            />

            <MobileSubLink
              href="/#levels"
              label="Online Classes"
              onClick={closeMobileMenu}
            />

            <MobileSubLink
              href="/#levels"
              label="Private Lessons"
              onClick={closeMobileMenu}
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
              icon={<FileText className="h-4 w-4" />}
              label="Boletín de notas"
              onClick={closeMobileMenu}
            />

            <MobileIconLink
              href="/student/dashboard"
              icon={<GraduationCap className="h-4 w-4" />}
              label="Campus virtual"
              onClick={closeMobileMenu}
            />

            <MobileIconLink
              href="/student/dashboard/calendar"
              icon={<Calendar className="h-4 w-4" />}
              label="Calendario"
              onClick={closeMobileMenu}
            />

            <MobileIconLink
              href="/student/dashboard/homework"
              icon={<ClipboardCheck className="h-4 w-4" />}
              label="Tareas y ejercicios"
              onClick={closeMobileMenu}
            />

            <MobileIconLink
              href="/student/chat"
              icon={<MessageSquare className="h-4 w-4" />}
              label="Mensajes"
              onClick={closeMobileMenu}
            />
          </MobileDropdown>

          {/* Profesores */}
          <MobileDropdown
            title="Profesores"
            isOpen={openDropdown === "teachers"}
            onClick={() => toggleDropdown("teachers")}
          >
            <MobileIconLink
              href="/teacher/dashboard"
              icon={<Users className="h-4 w-4" />}
              label="Gestión de clases"
              onClick={closeMobileMenu}
            />

            <MobileIconLink
              href="/teacher/dashboard"
              icon={<Upload className="h-4 w-4" />}
              label="Subir materiales"
              onClick={closeMobileMenu}
            />

            <MobileIconLink
              href="/teacher/chat"
              icon={<MessageSquare className="h-4 w-4" />}
              label="Mensajes"
              onClick={closeMobileMenu}
            />

            <MobileIconLink
              href="/teacher/calendar"
              icon={<Calendar className="h-4 w-4" />}
              label="Calendario académico"
              onClick={closeMobileMenu}
            />
          </MobileDropdown>

          {/* Contacto */}
          <MobileLink
            href="/#contact"
            label="Contacto"
            onClick={closeMobileMenu}
          />

          {/* Botones móviles */}
          <div className="space-y-3 pt-5">
            <Link
              href="/login"
              onClick={closeMobileMenu}
              className="flex w-full items-center justify-center rounded-xl border border-blue-600 px-4 py-3 font-semibold text-blue-600 transition-colors hover:bg-blue-50"
            >
              Iniciar sesión
            </Link>

            <Link
              href="/inscriptions"
              onClick={closeMobileMenu}
              className="flex w-full items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-900 px-4 py-3 text-center font-semibold text-white shadow-lg transition-all hover:from-blue-700 hover:to-blue-950"
            >
              Quiero recibir información sobre los cursos
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ==================== COMPONENTES AUXILIARES ==================== */

type MobileLinkProps = {
  href: string;
  label: string;
  onClick?: () => void;
};

function MobileLink({ href, label, onClick }: MobileLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block py-3 text-base font-medium text-gray-800 transition-colors hover:text-blue-600"
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
      className="block rounded-xl px-4 py-3 transition-colors hover:bg-blue-50"
    >
      <p className="font-medium text-gray-900">{title}</p>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
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
      className="flex items-start gap-4 rounded-xl px-4 py-3 transition-colors hover:bg-blue-50"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="font-medium text-gray-900">{title}</p>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
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
        type="button"
        onClick={onClick}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between py-3 text-base font-medium text-gray-800"
      >
        {title}

        <ChevronDown
          className={`h-5 w-5 shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`grid transition-all duration-300 ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pb-2 pl-2">{children}</div>
        </div>
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
      onClick={onClick}
      className="block py-2 text-[15px] text-gray-600 transition-colors hover:text-blue-600"
    >
      {label}
    </Link>
  );
}

type MobileIconLinkProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
};

function MobileIconLink({ href, icon, label, onClick }: MobileIconLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 py-3 text-[15px] text-gray-700 transition-colors hover:text-blue-600"
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
        {icon}
      </div>

      <span>{label}</span>
    </Link>
  );
}
