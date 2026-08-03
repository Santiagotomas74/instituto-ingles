"use client";

import { BookOpen, ClipboardList, GraduationCap, Percent } from "lucide-react";

import { StudentProfile } from "./Profile";

type Props = {
  profile: StudentProfile;
};

export default function ProfileStats({ profile }: Props) {
  const stats = [
    {
      title: "Aulas",
      value: profile.classrooms,
      icon: BookOpen,
      color: "bg-cyan-100 text-cyan-700",
    },
    {
      title: "Tareas pendientes",
      value: profile.pending_tasks,
      icon: ClipboardList,
      color: "bg-amber-100 text-amber-700",
    },
    {
      title: "Promedio",
      value: profile.average.toFixed(1),
      icon: GraduationCap,
      color: "bg-emerald-100 text-emerald-700",
    },
    {
      title: "Asistencia",
      value: `${profile.attendance}%`,
      icon: Percent,
      color: "bg-violet-100 text-violet-700",
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="
              bg-white
              rounded-3xl
              border
              shadow-sm
              p-6
              hover:shadow-md
              transition-all
            "
          >
            <div className="flex items-center justify-between">
              <div
                className={`
                  w-14
                  h-14
                  rounded-2xl
                  flex
                  items-center
                  justify-center
                  ${stat.color}
                `}
              >
                <Icon size={28} />
              </div>

              <span className="text-xs uppercase tracking-wide text-slate-400">
                Estadística
              </span>
            </div>

            <div className="mt-8">
              <h3 className="text-4xl font-bold text-slate-900">
                {stat.value}
              </h3>

              <p className="mt-2 text-slate-500 text-sm">{stat.title}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
