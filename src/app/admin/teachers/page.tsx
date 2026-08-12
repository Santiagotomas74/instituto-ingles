"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../dashboard/components/AdminNavbar";
import AdminSidebar from "../dashboard/components/AdminSidebar";

import {
  Search,
  Plus,
  Pencil,
  Mail,
  GraduationCap,
  User,
  Calendar,
  ArrowLeft,
  IdCard,
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
        setLoading(true);
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

  return (
    <main className="min-h-screen bg-slate-100 flex">
      <AdminSidebar />

      <div className="flex-1 min-w-0">
        <Navbar />

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
              <p className="text-cyan-300 uppercase tracking-[4px] text-sm font-semibold">
                Admin Panel
              </p>

              <h1 className="text-4xl md:text-5xl font-bold mt-3">Teachers</h1>

              <p className="text-slate-300 mt-4 max-w-2xl">
                Administrá los profesores del instituto, asignaciones,
                información de contacto y niveles académicos.
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
            shadow-sm
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
                  text-gray-900
                "
                />
              </div>

              <Link
                href="/admin/teachers/create"
                className="
                h-14
                px-7
                rounded-2xl
                bg-cyan-600
                hover:bg-cyan-500
                transition
                font-semibold
                flex
                items-center
                gap-3
                shadow-md
                text-white
              "
              >
                <Plus className="w-5 h-5" />
                Nuevo profesor
              </Link>
            </div>
          </div>

          {loading ? (
            <div
              className="
              bg-white
              rounded-[32px]
              border
              border-slate-200
              shadow-sm
              p-16
              flex
              flex-col
              items-center
              justify-center
            "
            >
              <div className="relative">
                <div
                  className="
                  absolute
                  inset-0
                  rounded-full
                  border-4
                  border-cyan-200
                  border-t-cyan-600
                  animate-spin
                "
                />
                <div
                  className="
                  w-24
                  h-24
                  rounded-full
                  bg-white
                  flex
                  items-center
                  justify-center
                  p-2
                "
                >
                  <img
                    src="/logo2.png"
                    alt="Instituto"
                    className="w-20 h-20 object-contain"
                  />
                </div>
              </div>
              <h2 className="mt-8 text-2xl font-bold text-slate-900">
                Cargando profesores...
              </h2>
              <p className="mt-3 text-slate-500">Aguarde unos segundos.</p>
            </div>
          ) : filteredTeachers.length === 0 ? (
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
              <h2 className="mt-8 text-3xl font-bold text-slate-900">
                No hay profesores registrados
              </h2>
              <p className="mt-4 text-slate-500 max-w-xl mx-auto">
                Todavía no se registró ningún profesor en el sistema.
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
              2xl:grid-cols-3
              gap-6
            "
            >
              {filteredTeachers.map((teacher) => (
                <TeacherCard key={teacher.id} teacher={teacher} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

/* COMPONENTS */

function TeacherCard({ teacher }: { teacher: Teacher }) {
  return (
    <div
      className="
        bg-white
        rounded-[32px]
        border
        border-slate-200
        shadow-sm
        hover:shadow-xl
        transition-all
        duration-300
        p-8
        flex
        flex-col
        h-full
      "
    >
      {/* HEADER CARD */}
      <div className="flex items-center gap-5 mb-8">
        <div
          className="
            w-16
            h-16
            rounded-2xl
            bg-cyan-50
            text-cyan-600
            flex
            items-center
            justify-center
            shrink-0
            border border-cyan-100
          "
        >
          <User className="w-8 h-8" />
        </div>
        <div>
          <span
            className="
              inline-block
              px-3
              py-1
              rounded-full
              bg-emerald-100
              text-emerald-700
              text-xs
              font-bold
              tracking-wide
              uppercase
              mb-2
            "
          >
            Activo
          </span>
          <h2 className="text-2xl font-bold text-slate-900 leading-none">
            {teacher.nombre} {teacher.apellido}
          </h2>
        </div>
      </div>

      {/* INFO LIST */}
      <div className="flex flex-col gap-4 flex-1 mb-8">
        <div className="flex items-center gap-4 text-slate-600">
          <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
            <IdCard className="w-5 h-5 text-slate-400" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium uppercase">DNI</p>
            <p className="font-semibold text-slate-700">{teacher.dni}</p>
          </div>
        </div>

        {teacher.email && (
          <div className="flex items-center gap-4 text-slate-600">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-slate-400" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium uppercase">
                Email
              </p>
              <p className="font-semibold text-slate-700 truncate">
                {teacher.email}
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center gap-4 text-slate-600">
          <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5 text-slate-400" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium uppercase">
              Nacimiento
            </p>
            <p className="font-semibold text-slate-700">
              {new Date(teacher.fecha_nacimiento).toLocaleDateString("es-AR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      {/* ACTION */}
      <div className="pt-2 mt-auto">
        <Link
          href={`/admin/teachers/edit/${teacher.id}`}
          className="
            w-full
            h-14
            rounded-2xl
            bg-slate-900
            hover:bg-slate-800
            transition-colors
            text-white
            font-semibold
            flex
            items-center
            justify-center
            gap-3
            shadow-md
          "
        >
          <Pencil className="w-5 h-5" />
          Editar Profesor
        </Link>
      </div>
    </div>
  );
}
