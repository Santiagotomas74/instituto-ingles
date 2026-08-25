"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LogOut, UserCircle2 } from "lucide-react";

import NotificationBell from "@/components/notifications/NotificationBell";
import { useSocket } from "../../../../components/chat/hooks/useSocket";
import AdminSidebar from "./AdminSidebar"; // Ajusta la ruta de importación según tu estructura

type User = {
  id: string;
  nombre: string;
  apellido: string;
};

export default function AdminNavbar() {
  const [user, setUser] = useState<User | null>(null);

  /*
  ==========================================
  Conectar Socket
  ==========================================
  */

  useSocket(user?.id ?? "");

  /*
  ==========================================
  Usuario actual
  ==========================================
  */

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();

        if (!res.ok || !data.success) return;

        setUser({
          id: data.user.id,
          nombre: data.user.nombre,
          apellido: data.user.apellido,
        });
      } catch (error) {
        console.error(error);
      }
    }

    loadUser();
  }, []);

  /*
  ==========================================
  Logout
  ==========================================
  */

  async function handleLogout() {
    await fetch("/api/logout", {
      method: "POST",
    });

    window.location.href = "/login";
  }

  return (
    <header
      className="
        h-20
        bg-white
        border-b
        border-slate-200
        px-4
        md:px-8
        flex
        items-center
        justify-between
        shadow-sm
      "
    >
      {/* Izquierda: Sidebar (solo mobile) + Logo */}
      <div className="flex items-center gap-3 md:gap-8">
        <div className="lg:hidden">
          <AdminSidebar />
        </div>

        <Link href="/">
          <h1 className="text-2xl font-bold text-blue-600 hidden sm:block">
            INK
          </h1>
        </Link>
      </div>

      {/* Derecha */}
      <div className="flex items-center gap-3 md:gap-5">
        <NotificationBell />

        <div className="flex items-center gap-3">
          <UserCircle2 className="text-blue-600" size={38} />

          <div className="hidden sm:block">
            <p className="font-semibold text-slate-900 leading-tight">
              Administrador
            </p>
            <p className="text-xs text-slate-500">Instituto I.N.K</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="
            w-10
            h-10
            rounded-xl
            bg-red-50
            hover:bg-red-100
            transition
            flex
            items-center
            justify-center
          "
          title="Cerrar sesión"
        >
          <LogOut size={18} className="text-red-600" />
        </button>
      </div>
    </header>
  );
}
