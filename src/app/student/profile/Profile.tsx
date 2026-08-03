"use client";

import { useEffect, useState } from "react";

import ProfileHeader from "./ProfileHeader";
import ProfileStats from "./ProfileStats";
import PersonalInfoCard from "./PersonalInfoCard";

export type StudentProfile = {
  id: string;

  nombre: string;
  apellido: string;

  email: string;

  telefono: string | null;

  dni: string | null;

  direccion: string | null;

  fecha_nacimiento: string | null;

  avatar_url: string | null;

  legajo: string | null;

  nivel: string | null;

  teacher: string | null;

  classrooms: number;

  pending_tasks: number;

  average: number;

  attendance: number;
};

export default function Profile() {
  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState<StudentProfile | null>(null);

  async function loadProfile() {
    try {
      setLoading(true);

      const res = await fetch("/api/student/profile");

      const data = await res.json();

      if (!data.success) return;

      setProfile(data.profile);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="py-16 text-center text-slate-500">Cargando perfil...</div>
    );
  }

  if (!profile) {
    return (
      <div className="py-16 text-center text-red-500">
        No se pudo cargar el perfil.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 bg-amber-100">
      <ProfileHeader profile={profile} />

      <ProfileStats profile={profile} />

      <PersonalInfoCard profile={profile} />
    </div>
  );
}
