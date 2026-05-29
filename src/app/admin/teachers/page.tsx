"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Mail,
  Phone,
  GraduationCap,
  BookOpen,
  User,
  Calendar,
  ArrowLeft,
} from "lucide-react";

type Teacher = {
  id: string;
  dni: number;
  nombre: string;
  apellido: string;
  email: string;
  fecha_nacimiento: string;
};

export default function AdminTeachersPage() {
  const [search, setSearch] = useState("");

  const [teachers, setTeachers] = useState<Teacher[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await fetch("/api/admin/teachers");

        const data = await res.json();

        setTeachers(data.teachers || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  const filteredTeachers = teachers.filter((teacher) =>
    `${teacher.nombre} ${teacher.apellido}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de eliminar este profesor?",
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/admin/teachers/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100">
      {/* HEADER */}
      <div
        className="
          bg-gradient-to-r
          from-slate-950
          via-blue-950
          to-cyan-900
          text-white
          px-6
          md:px-10
          py-8
        "
      >
        <div
          className="
            flex
            flex-col
            lg:flex-row
            items-start
            lg:items-center
            justify-between
            gap-6
          "
        >
          <div>
            <p className="text-cyan-300 uppercase tracking-[4px] text-sm">
              Admin Panel
            </p>

            <h1 className="text-4xl md:text-5xl font-bold mt-3">Teachers</h1>

            <p className="text-slate-300 mt-4 max-w-2xl">
              Administrá los profesores del instituto, asignaciones, información
              de contacto y niveles académicos.
            </p>
          </div>

          <Link
            href="/admin/dashboard"
            className="
          h-14
          px-7
          rounded-2xl
          bg-white/10
          border
          border-white/10
          backdrop-blur-md
          hover:bg-white/20
          text-white
          transition-all
          font-semibold
          flex
          items-center
          justify-center
          gap-3
          shadow-lg
          hover:-translate-y-0.5
          w-full
          md:w-auto
        "
          >
            <ArrowLeft className="w-5 h-5" />
            Volver al panel
          </Link>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-6 md:p-10">
        {/* TOP BAR */}
        <div
          className="
            bg-white
            rounded-[32px]
            shadow-lg
            border
            border-slate-200
            p-6
            mb-8
          "
        >
          <div
            className="
              flex
              flex-col
              lg:flex-row
              gap-5
              lg:items-center
              lg:justify-between
            "
          >
            {/* SEARCH */}
            <div className="relative w-full lg:max-w-md">
              <Search
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  w-5
                  h-5
                  text-slate-400
                "
              />

              <input
                type="text"
                placeholder="Buscar profesor..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
                text-gray-900
                  w-full
                  h-14
                  pl-12
                  pr-5
                  rounded-2xl
                  border
                  border-slate-200
                  focus:outline-none
                  focus:ring-2
                  focus:ring-cyan-500
                "
              />
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/admin/teachers/create"
                className="
              h-14
              px-7
              rounded-2xl
              bg-cyan-500
              hover:bg-cyan-400
              transition
              font-semibold
              flex
              items-center
              gap-3
              shadow-xl
            "
              >
                <Plus className="w-5 h-5" />
                Nuevo profesor
              </Link>
            </div>
          </div>
        </div>

        {/* GRID */}
        {filteredTeachers.length === 0 ? (
          <div
            className="
      bg-white
      rounded-[32px]
      border
      border-slate-200
      shadow-sm
      p-12
      text-center
    "
          >
            <div
              className="
        w-24
        h-24
        mx-auto
        rounded-3xl
        bg-cyan-100
        text-cyan-700
        flex
        items-center
        justify-center
      "
            >
              <GraduationCap className="w-12 h-12" />
            </div>

            <h2
              className="
        mt-8
        text-3xl
        font-bold
        text-slate-900
      "
            >
              No hay profesores registrados
            </h2>

            <p
              className="
        mt-4
        text-slate-500
        max-w-xl
        mx-auto
      "
            >
              Todavía no se registró ningún profesor en el sistema. Podés
              agregar docentes para luego asignarlos a classrooms.
            </p>

            <Link
              href="/admin/teachers/create"
              className="
        mt-8
        inline-flex
        items-center
        gap-3
        h-14
        px-7
        rounded-2xl
        bg-cyan-600
        hover:bg-cyan-700
        transition
        text-white
        font-semibold
        shadow-lg
        hover:-translate-y-0.5
      "
            >
              <Plus className="w-5 h-5" />
              Crear profesor
            </Link>
          </div>
        ) : (
          <div
            className="
      grid
      grid-cols-1
      xl:grid-cols-2
      gap-8
    "
          >
            {filteredTeachers.map((teacher) => (
              <TeacherCard
                key={teacher.id}
                teacher={teacher}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

/* COMPONENTS */

function TeacherCard({
  teacher,
  onDelete,
}: {
  teacher: Teacher;
  onDelete: (id: string) => void;
}) {
  return (
    <div
      className="
bg-gradient-to-br
      from-blue-700
      via-cyan-600
      to-cyan-500
    rounded-[36px]
    border
    border-slate-200
    shadow-xl
    overflow-hidden
    hover:shadow-2xl
    transition-all
    duration-300
  "
    >
      {/* HEADER */}
      <div
        className="
      relative
      
      px-7
      pt-7
      pb-20
      text-white
    "
      >
        {/* Glow */}
        <div
          className="
        absolute
        top-0
        right-0
        w-40
        h-40
        bg-white/10
        rounded-full
        blur-3xl
      "
        />

        <div className="relative z-10 flex items-start justify-between gap-5">
          <div className="flex items-center gap-5">
            {/* Avatar */}
            <div
              className="
            w-20
            h-20
            rounded-3xl
            bg-white/15
            backdrop-blur-md
            border
            border-white/20
            flex
            items-center
            justify-center
            shrink-0
          "
            >
              <User className="w-10 h-10" />
            </div>

            <div>
              <p className="text-cyan-100 text-sm tracking-wide uppercase">
                Profesor
              </p>

              <h2 className="text-3xl font-bold mt-1 leading-tight">
                {teacher.nombre} {teacher.apellido}
              </h2>

              <div className="flex flex-wrap gap-2 mt-4">
                <span
                  className="
                px-3
                py-1
                rounded-full
                bg-white/15
                backdrop-blur-md
                text-sm
                font-medium
              "
                >
                  DNI {teacher.dni}
                </span>

                <span
                  className="
                px-3
                py-1
                rounded-full
                bg-emerald-400/20
                text-emerald-100
                text-sm
                font-medium
              "
                >
                  Activo
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="px-7 pb-7 -mt-10 relative z-20">
        <div
          className="
        bg-white
        rounded-[28px]
        border
        border-slate-100
        shadow-lg
        p-6
        space-y-5
      "
        >
          {/* INFO */}
          <div className="space-y-4">
            <InfoItem
              icon={<Mail className="w-5 h-5" />}
              label="Email"
              value={teacher.email}
            />

            <InfoItem
              icon={<Calendar className="w-5 h-5" />}
              label="Fecha de nacimiento"
              value={new Date(teacher.fecha_nacimiento).toLocaleDateString(
                "es-AR",
                {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                },
              )}
            />
          </div>

          {/* ACTIONS */}
          <div className="flex gap-3 pt-3">
            <Link
              href={`/admin/teachers/edit/${teacher.id}`}
              className="
            flex-1
            h-12
            rounded-2xl
            bg-blue-600
            hover:bg-blue-700
            transition-all
            text-white
            font-semibold
            flex
            items-center
            justify-center
            gap-2
            shadow-lg
          "
            >
              <Pencil className="w-4 h-4" />
              Editar
            </Link>

            <button
              onClick={() => onDelete(teacher.id)}
              className="
            flex-1
            h-12
            rounded-2xl
            bg-red-500
            hover:bg-red-600
            transition-all
            text-white
            font-semibold
            flex
            items-center
            justify-center
            gap-2
            shadow-lg
          "
            >
              <Trash2 className="w-4 h-4" />
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        flex
        items-center
        gap-4
        bg-slate-50
        rounded-2xl
        p-4
      "
    >
      <div
        className="
          w-11
          h-11
          rounded-xl
          bg-cyan-100
          text-cyan-700
          flex
          items-center
          justify-center
          shrink-0
        "
      >
        {icon}
      </div>

      <div>
        <p className="text-sm text-slate-500">{label}</p>

        <p className="font-semibold text-slate-900">{value}</p>
      </div>
    </div>
  );
}

function StatsCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div
      className="
        bg-slate-100
        rounded-2xl
        px-5
        py-4
        flex
        items-center
        gap-4
        min-w-[160px]
      "
    >
      <div
        className="
          w-12
          h-12
          rounded-2xl
          bg-cyan-100
          text-cyan-700
          flex
          items-center
          justify-center
        "
      >
        {icon}
      </div>

      <div>
        <p className="text-sm text-slate-500">{title}</p>

        <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
      </div>
    </div>
  );
}
{
  /*/ STATS 
            <div className="flex flex-wrap gap-4">
              <StatsCard
                title="Profesores"
                value={String(teachers.length)}
                icon={<User className="w-5 h-5" />}
              />

              <StatsCard
                title="Niveles"
                value="8"
                icon={<GraduationCap className="w-5 h-5" />}
              />

              <StatsCard
                title="Clases"
                value="31"
                icon={<BookOpen className="w-5 h-5" />}
              />
            </div>

            {/* STATS */
}
