"use client";

import { useEffect, useState } from "react";
import { Loader2, UserX } from "lucide-react";

import ProfileHeader from "./ProfileHeader";
import ProfileStats from "./ProfileStats";
import PersonalInfoCard from "./PersonalInfoCard";
import PaymentReceiptsCard from "./PaymentReceiptsCard";

export type StudentPayment = {
  id: string;
  month: number;
  month_name: string;
  year: number;
  amount: number;
  due_date: string;
  paid_at: string | null;
  status: "pending" | "paid" | "expired";
  receipt_name: string | null;
  receipt_url: string | null;
  observations: string | null;
};

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
  payments: StudentPayment[];
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
    } catch (error) {
      console.error("Error cargando el perfil", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-400 gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
        <p className="font-medium text-sm sm:text-base animate-pulse">
          Cargando tu perfil...
        </p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-500 gap-4 px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 mb-2">
          <UserX size={32} />
        </div>
        <h2 className="text-xl font-bold text-slate-800">
          Perfil no encontrado
        </h2>
        <p className="text-sm max-w-md">
          Hubo un problema al intentar cargar la información. Por favor, intenta
          recargar la página.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 sm:space-y-8 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <ProfileHeader profile={profile} />
      {/* Asumo que ProfileStats lo tienes en otro archivo, mantenlo aquí */}
      <ProfileStats profile={profile} />
      <PersonalInfoCard profile={profile} />
      <PaymentReceiptsCard profile={profile} />
    </div>
  );
}
