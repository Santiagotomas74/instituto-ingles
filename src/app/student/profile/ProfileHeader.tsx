"use client";

import Link from "next/link";
import { ArrowLeft, Camera, Mail, UserCircle2, BookOpen } from "lucide-react";
import { StudentProfile } from "./Profile";

type Props = {
  profile: StudentProfile;
};

export default function ProfileHeader({ profile }: Props) {
  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xs p-5 sm:p-8 relative overflow-hidden">
      {/* Fondo decorativo sutil */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-blue-50 to-indigo-50/50 -z-10" />

      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 sm:gap-8 z-10">
        {/* Contenedor Perfil */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 text-center sm:text-left">
          {/* Avatar */}
          <div className="relative shrink-0">
            {profile.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt={`${profile.nombre} ${profile.apellido}`}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-white shadow-sm"
              />
            ) : (
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-blue-100 flex items-center justify-center border-4 border-white shadow-sm">
                <UserCircle2 className="w-12 h-12 sm:w-16 sm:h-16 text-blue-600" />
              </div>
            )}

            <button className="absolute bottom-0 right-0 sm:-bottom-1 sm:-right-1 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white flex items-center justify-center shadow-lg transition-colors border-2 border-white">
              <Camera size={16} className="sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Info principal */}
          <div className="mt-2 sm:mt-0">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              {profile.nombre} {profile.apellido}
            </h1>

            <div className="mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3">
              <span className="px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-xs sm:text-sm font-semibold">
                Alumno activo
              </span>

              {profile.nivel && (
                <span className="px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs sm:text-sm font-semibold">
                  Nivel {profile.nivel}
                </span>
              )}
            </div>

            <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm sm:text-base text-slate-600">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Mail size={16} className="text-slate-400" />
                <span>{profile.email}</span>
              </div>

              {profile.teacher && (
                <>
                  <span className="hidden sm:inline text-slate-300">•</span>
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <BookOpen size={16} className="text-slate-400" />
                    <span>
                      Profesor:{" "}
                      <strong className="font-semibold text-slate-800">
                        {profile.teacher}
                      </strong>
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex w-full lg:w-auto shrink-0 mt-2 lg:mt-0">
          <Link
            href="/student/dashboard"
            className="w-full lg:w-auto h-11 sm:h-12 px-5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 active:bg-slate-100 flex items-center justify-center gap-2 transition-colors text-slate-700 font-semibold text-sm shadow-xs"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            Volver al panel
          </Link>
        </div>
      </div>
    </div>
  );
}
