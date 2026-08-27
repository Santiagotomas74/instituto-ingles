"use client";

import {
  Calendar,
  CreditCard,
  Mail,
  MapPin,
  Phone,
  User,
  GraduationCap,
  BookOpen,
  UserCheck,
} from "lucide-react";
import { StudentProfile } from "./Profile";

type Props = {
  profile: StudentProfile;
};

export default function PersonalInfoCard({ profile }: Props) {
  const fields = [
    {
      icon: User,
      label: "Nombre completo",
      value: `${profile.nombre} ${profile.apellido}`,
    },
    {
      icon: CreditCard,
      label: "DNI",
      value: profile.dni || "-",
    },
    {
      icon: Mail,
      label: "Correo electrónico",
      value: profile.email,
    },

    {
      icon: Calendar,
      label: "Fecha de nacimiento",
      value: profile.fecha_nacimiento
        ? new Date(profile.fecha_nacimiento).toLocaleDateString("es-AR")
        : "-",
    },

    {
      icon: GraduationCap,
      label: "Nivel",
      value: profile.nivel || "-",
    },
  ];

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xs p-5 sm:p-8">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Información personal
        </h2>
        <p className="text-sm sm:text-base text-slate-500 mt-1">
          Datos de contacto e institucionales registrados en la plataforma.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
        {fields.map((field) => {
          const Icon = field.icon;
          return (
            <div
              key={field.label}
              className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-blue-100 hover:shadow-xs transition-all"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white border border-slate-200 text-blue-600 flex items-center justify-center shrink-0 shadow-sm">
                <Icon size={20} className="sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-slate-500">
                  {field.label}
                </p>
                <p className="mt-0.5 sm:mt-1 text-sm sm:text-base font-semibold text-slate-900 truncate">
                  {field.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {profile.teacher && (
        <div className="mt-6 sm:mt-8 rounded-xl sm:rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50/50 p-4 sm:p-6 flex items-center gap-4">
          <div className="p-3 bg-white rounded-full shadow-sm text-blue-600 shrink-0">
            <UserCheck size={24} />
          </div>
          <div>
            <p className="text-xs sm:text-sm font-medium text-blue-600/80 uppercase tracking-wider">
              Profesor asignado
            </p>
            <p className="text-lg sm:text-xl font-bold text-blue-900 mt-0.5">
              {profile.teacher}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
