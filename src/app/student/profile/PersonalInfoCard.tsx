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
      value: profile.dni ?? "-",
    },
    {
      icon: Mail,
      label: "Correo electrónico",
      value: profile.email,
    },
    {
      icon: Phone,
      label: "Teléfono",
      value: profile.telefono ?? "-",
    },
    {
      icon: MapPin,
      label: "Dirección",
      value: profile.direccion ?? "-",
    },
    {
      icon: Calendar,
      label: "Fecha de nacimiento",
      value: profile.fecha_nacimiento
        ? new Date(profile.fecha_nacimiento).toLocaleDateString()
        : "-",
    },
    {
      icon: BookOpen,
      label: "Legajo",
      value: profile.legajo ?? "-",
    },
    {
      icon: GraduationCap,
      label: "Nivel",
      value: profile.nivel ?? "-",
    },
  ];

  return (
    <div
      className="
        bg-white
        rounded-3xl
        border
        shadow-sm
        p-8
      "
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Información personal
        </h2>

        <p className="text-slate-500 mt-2">
          Estos son los datos registrados del alumno en la plataforma.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {fields.map((field) => {
          const Icon = field.icon;

          return (
            <div
              key={field.label}
              className="
                rounded-2xl
                border
                border-slate-200
                p-5
                hover:border-cyan-200
                hover:shadow-sm
                transition-all
              "
            >
              <div className="flex items-start gap-4">
                <div
                  className="
                    w-12
                    h-12
                    rounded-xl
                    bg-cyan-100
                    text-cyan-700
                    flex
                    items-center
                    justify-center
                    shrink-0
                  "
                >
                  <Icon size={22} />
                </div>

                <div className="flex-1">
                  <p className="text-sm text-slate-500">{field.label}</p>

                  <p className="mt-1 text-lg font-semibold text-slate-900 break-words">
                    {field.value}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {profile.teacher && (
        <div
          className="
            mt-8
            rounded-2xl
            border
            border-cyan-200
            bg-cyan-50
            p-6
          "
        >
          <p className="text-sm text-slate-500">Profesor asignado</p>

          <p className="mt-2 text-xl font-bold text-cyan-700">
            {profile.teacher}
          </p>
        </div>
      )}
    </div>
  );
}
