"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { LogOut, UserCircle2 } from "lucide-react";
import NotificationBell from "@/components/notifications/NotificationBell";
import { useSocket } from "@/components/chat/hooks/useSocket";
import Sidebar from "./Sidebar"; // O @/components/Sidebar según tu estructura

type NavbarProps = {
  nombre?: string;
  apellido?: string;
};

export default function Navbar({ nombre, apellido }: NavbarProps) {
  const [userId, setUserId] = useState("");

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();

        if (!data.success) return;

        setUserId(data.user.id);
      } catch (error) {
        console.error(error);
      }
    }

    loadUser();
  }, []);

  useSocket(userId);

  async function handleLogout() {
    await fetch("/api/logout", {
      method: "POST",
    });

    window.location.href = "/login";
  }

  return (
    <header
      className="
        sticky
        top-0
        z-50
        w-full
        h-20
        bg-white
        border-b
        border-slate-200
        px-4
        sm:px-8
        flex
        items-center
        justify-between
        shadow-sm
      "
    >
      {/* Lado Izquierdo: Sidebar (solo en mobile) + Logo */}
      <div className="flex items-center gap-3 md:gap-6">
        {/* Sidebar visible únicamente en pantallas mobile/tablet (lg:hidden) */}
        <div className="lg:hidden flex items-center">
          <Sidebar />
        </div>

        {/* Logo del colegio/instituto */}
        <div className="hidden md:block">
          <Image
            src="/logo3.png"
            alt="Logo I.N.K."
            width={260}
            height={40}
            className="h-16 w-auto object-contain"
            priority
          />
        </div>
      </div>

      {/* Lado Derecho: Notificaciones + Usuario + Logout */}
      <div className="flex items-center gap-3 sm:gap-4">
        <NotificationBell />

        <div className="flex items-center gap-2 sm:gap-3">
          <UserCircle2 className="text-blue-600 shrink-0" size={38} />

          <div>
            <p className="font-semibold text-slate-900 leading-tight">
              {nombre}
            </p>
            <p className="text-sm text-slate-500 leading-tight">{apellido}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          aria-label="Cerrar sesión"
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-red-50 hover:bg-red-100 transition flex items-center justify-center shrink-0"
        >
          <LogOut size={20} className="text-red-600" />
        </button>
      </div>
    </header>
  );
}
