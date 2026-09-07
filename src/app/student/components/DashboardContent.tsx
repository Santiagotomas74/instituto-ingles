"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import {
  BookOpen,
  FolderOpen,
  Clock,
  ArrowRight,
  Users,
  ChevronRight,
  GraduationCap,
  AlertTriangle,
} from "lucide-react";

export type Classroom = {
  id: string;
  nombre: string;
  nivel: string;
  horario: string;
  alumnos: number;
  materiales: number;
};
export type StudentStatus = "active" | "pending" | "inactive";

type Props = {
  studentName: string;
  studentLastname: string;
  classrooms: Classroom[];
  studentStatus: StudentStatus;
};

export default function DashboardContent({
  studentName,
  studentLastname,
  classrooms,
  studentStatus,
}: Props) {
  const { t } = useTranslation();

  return (
    <div className="space-y-10">
      {/* AVISO DE ESTADO DE CUENTA */}

      {studentStatus === "pending" && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>

            <div>
              <h3 className="font-semibold text-black">
                Cuenta pendiente de activación
              </h3>

              <p className="text-sm text-amber-800 mt-1">
                Tu cuenta todavía está pendiente de activación. Puedes continuar
                utilizando el campus normalmente mientras se completa la
                activación.
              </p>
            </div>
          </div>
        </div>
      )}

      {studentStatus === "inactive" && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>

            <div>
              <h3 className="font-semibold text-black">Cuenta inactiva</h3>

              <p className="text-sm text-black mt-1">
                Tu cuenta se encuentra actualmente inactiva y no tienes aulas
                disponibles para consultar.
              </p>

              <p className="text-sm text-black mt-2 font-medium">
                Por favor, comunícate con el instituto para regularizar el
                estado de tu cuenta.
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Header Principal del Campus */}
      <div className="bg-white rounded-[28px] border border-slate-200/80 p-6 md:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600 shrink-0">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t("dashboard.greeting", {
                name: studentName,
                lastname: studentLastname,
              })}
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              {t("dashboard.welcome")}
            </p>
          </div>
        </div>

        {/* Badge del total de aulas */}
        <div
          className={`inline-flex items-center gap-2 self-start sm:self-center px-3.5 py-1.5 rounded-full text-xs font-semibold border ${
            studentStatus === "active"
              ? "bg-emerald-50 border-emerald-200 text-emerald-700"
              : studentStatus === "pending"
                ? "bg-amber-50 border-amber-200 text-amber-700"
                : "bg-rose-50 border-rose-200 text-rose-700"
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              studentStatus === "active"
                ? "bg-emerald-500"
                : studentStatus === "pending"
                  ? "bg-amber-500"
                  : "bg-rose-500"
            }`}
          />

          {studentStatus === "active" &&
            `${classrooms.length} ${
              classrooms.length === 1 ? "aula activa" : "aulas activas"
            }`}

          {studentStatus === "pending" && "Cuenta pendiente"}

          {studentStatus === "inactive" && "Cuenta inactiva"}
        </div>
      </div>

      {/* Mis aulas */}
      {studentStatus !== "inactive" && (
        <section>
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-sm font-semibold text-cyan-600 uppercase tracking-wide">
                {t("dashboard.campus_virtual")}
              </p>

              <h2 className="mt-1 text-3xl font-bold text-slate-900">
                {t("dashboard.my_classrooms")}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {classrooms.length === 0 ? (
              <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-8 sm:p-12 text-center shadow-sm">
                <div className="mx-auto w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 mb-4">
                  <BookOpen size={28} />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  {t("dashboard.empty_title")}
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
                  {t("dashboard.empty_desc")}
                </p>
              </div>
            ) : (
              classrooms.map((classroom) => (
                <Link
                  key={classroom.id}
                  href={`/student/classroom/${classroom.id}`}
                  className="
                  group
                  relative
                  flex
                  flex-col
                  justify-between
                  bg-white
                  rounded-2xl
                  border
                  border-slate-200/80
                  p-5
                  sm:p-6
                  shadow-sm
                  hover:shadow-xl
                  hover:border-cyan-200
                  hover:-translate-y-1
                  transition-all
                  duration-300
                  overflow-hidden
                "
                >
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500" />

                  <div className="flex-1 flex flex-col justify-between pt-1">
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-cyan-50 text-cyan-700 text-xs font-semibold border border-cyan-100">
                          {classroom.nivel}
                        </span>

                        <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-cyan-500 group-hover:border-cyan-500 group-hover:text-white transition-colors">
                          <ChevronRight
                            size={18}
                            className="group-hover:translate-x-0.5 transition-transform"
                          />
                        </div>
                      </div>

                      <h3 className="mt-3 text-lg sm:text-xl font-bold text-slate-900 group-hover:text-cyan-600 transition-colors line-clamp-1">
                        {classroom.nombre}
                      </h3>

                      <div className="mt-2 flex items-center gap-1.5 text-xs sm:text-sm text-slate-500">
                        <Clock size={15} className="text-slate-400 shrink-0" />
                        <span>{classroom.horario}</span>
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <div className="rounded-xl bg-slate-50/80 border border-slate-100 p-3 flex items-center gap-3 group-hover:bg-blue-50/50 group-hover:border-blue-100/60 transition-colors">
                        <div className="w-9 h-9 rounded-lg bg-blue-100/80 flex items-center justify-center text-blue-600 shrink-0">
                          <Users size={18} />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-slate-900 text-sm sm:text-base leading-none">
                            {classroom.alumnos}
                          </p>
                          <span className="text-xs text-slate-500 font-medium truncate block">
                            {t("dashboard.classmates")}
                          </span>
                        </div>
                      </div>

                      <div className="rounded-xl bg-slate-50/80 border border-slate-100 p-3 flex items-center gap-3 group-hover:bg-amber-50/50 group-hover:border-amber-100/60 transition-colors">
                        <div className="w-9 h-9 rounded-lg bg-amber-100/80 flex items-center justify-center text-amber-600 shrink-0">
                          <FolderOpen size={18} />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-slate-900 text-sm sm:text-base leading-none">
                            {classroom.materiales}
                          </p>
                          <span className="text-xs text-slate-500 font-medium truncate block">
                            {t("dashboard.materials")}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-slate-400 font-medium">
                        {t("dashboard.enrolled")}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-cyan-600 font-semibold group-hover:text-cyan-700">
                        {t("dashboard.enter_classroom")}
                        <ArrowRight
                          size={15}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </section>
      )}
    </div>
  );
}
