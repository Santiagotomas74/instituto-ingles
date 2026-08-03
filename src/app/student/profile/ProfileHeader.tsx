"use client";

import { Camera, Mail, Pencil, UserCircle2 } from "lucide-react";

import { StudentProfile } from "./Profile";

type Props = {
  profile: StudentProfile;
};

export default function ProfileHeader({ profile }: Props) {
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
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        {/* Perfil */}

        <div className="flex items-center gap-6">
          <div className="relative">
            {profile.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt={`${profile.nombre} ${profile.apellido}`}
                className="
                  w-28
                  h-28
                  rounded-full
                  object-cover
                  border-4
                  border-cyan-100
                "
              />
            ) : (
              <div
                className="
                  w-28
                  h-28
                  rounded-full
                  bg-cyan-100
                  flex
                  items-center
                  justify-center
                "
              >
                <UserCircle2 size={72} className="text-cyan-700" />
              </div>
            )}

            <button
              className="
                absolute
                -bottom-1
                -right-1
                w-10
                h-10
                rounded-full
                bg-cyan-600
                hover:bg-cyan-700
                text-white
                flex
                items-center
                justify-center
                shadow-lg
              "
            >
              <Camera size={18} />
            </button>
          </div>

          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              {profile.nombre} {profile.apellido}
            </h1>

            <div className="mt-3 flex flex-wrap gap-3">
              <span
                className="
                  px-4
                  py-1.5
                  rounded-full
                  bg-emerald-100
                  text-emerald-700
                  text-sm
                  font-semibold
                "
              >
                Alumno activo
              </span>

              {profile.nivel && (
                <span
                  className="
                    px-4
                    py-1.5
                    rounded-full
                    bg-cyan-100
                    text-cyan-700
                    text-sm
                    font-semibold
                  "
                >
                  Nivel {profile.nivel}
                </span>
              )}
            </div>

            <div className="mt-5 flex items-center gap-3 text-slate-500">
              <Mail size={18} />

              <span>{profile.email}</span>
            </div>

            {profile.teacher && (
              <p className="mt-2 text-slate-600">
                Profesor asignado{" "}
                <span className="font-semibold">{profile.teacher}</span>
              </p>
            )}
          </div>
        </div>

        {/* Acciones */}

        <div className="flex flex-wrap gap-3">
          <button
            className="
              h-11
              px-5
              rounded-xl
              border
              border-slate-300
              hover:bg-slate-100
              flex
              items-center
              gap-2
              font-medium
            "
          >
            <Camera size={18} />
            Cambiar foto
          </button>

          <button
            className="
              h-11
              px-5
              rounded-xl
              bg-cyan-600
              hover:bg-cyan-700
              text-white
              flex
              items-center
              gap-2
              font-medium
            "
          >
            <Pencil size={18} />
            Editar perfil
          </button>
        </div>
      </div>
    </div>
  );
}
