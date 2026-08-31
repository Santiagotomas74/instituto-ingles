"use client";

import { useTranslation } from "react-i18next";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  UserCircle2,
  BookOpen,
  GraduationCap,
} from "lucide-react";

import { StudentProfile } from "./Profile";

type Props = {
  profile: StudentProfile;
};

export default function ProfileHeader({ profile }: Props) {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-sm relative overflow-hidden">
      {/* Decorative cover banner */}
      <div className="h-28 sm:h-36 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 w-full relative">
        <div className="absolute inset-0 bg-black/5" />
      </div>

      <div className="p-5 sm:p-8 pt-0 relative">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          {/* Avatar and Main Information */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 sm:gap-6 -mt-12 sm:-mt-16 text-center sm:text-left">
            {/* Avatar */}
            <div className="relative shrink-0">
              {profile.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt={`${profile.nombre} ${profile.apellido}`}
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl sm:rounded-3xl object-cover border-4 border-white shadow-md bg-white"
                />
              ) : (
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl sm:rounded-3xl bg-slate-100 border-4 border-white shadow-md flex items-center justify-center text-slate-400">
                  <UserCircle2 className="w-16 h-16 sm:w-20 sm:h-20 text-slate-300" />
                </div>
              )}

              {/* Active status */}
              <span
                className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full shadow-xs"
                title={t("profile.header.active_student")}
              />
            </div>

            {/* Personal Information */}
            <div className="pb-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />

                  {t("profile.header.active_student")}
                </span>

                {profile.nivel && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200/80 text-cyan-700 text-xs font-semibold">
                    <GraduationCap size={14} />

                    {t("profile.header.level", {
                      level: profile.nivel,
                    })}
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                {profile.nombre} {profile.apellido}
              </h1>

              {/* Metadata */}
              <div className="mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-y-2 gap-x-3 text-xs sm:text-sm text-slate-600">
                <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                  <Mail size={15} className="text-slate-400 shrink-0" />

                  <span className="font-medium text-slate-700">
                    {profile.email}
                  </span>
                </div>

                {profile.teacher && (
                  <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                    <BookOpen size={15} className="text-slate-400 shrink-0" />

                    <span>
                      {t("profile.header.teacher")}:{" "}
                      <strong className="font-semibold text-slate-900">
                        {profile.teacher}
                      </strong>
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action button */}
          <div className="shrink-0 w-full lg:w-auto pt-2 lg:pt-0">
            <Link
              href="/student/dashboard"
              className="
                w-full lg:w-auto
                h-11 sm:h-12
                px-5
                rounded-xl
                border
                border-slate-200
                bg-white
                hover:bg-slate-50
                active:bg-slate-100
                flex
                items-center
                justify-center
                gap-2.5
                transition-all
                text-slate-700
                font-semibold
                text-xs
                sm:text-sm
                shadow-xs
                hover:shadow-sm
                hover:border-slate-300
                group
              "
            >
              <ArrowLeft
                size={18}
                className="text-slate-400 group-hover:-translate-x-1 group-hover:text-slate-600 transition-transform"
              />

              <span>{t("profile.header.back_to_panel")}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
