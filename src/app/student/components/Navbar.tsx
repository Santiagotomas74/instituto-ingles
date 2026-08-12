"use client";

import { useEffect, useState } from "react";
import { LogOut, UserCircle2 } from "lucide-react";
import NotificationBell from "@/components/notifications/NotificationBell";
import { useSocket } from "@/components/chat/hooks/useSocket";

// 1. Definimos las props que recibirá el componente
type NavbarProps = {
  nombre?: string;
  apellido?: string;
};

// 2. Quitamos el "async" e inyectamos las props
export default function Navbar({ nombre, apellido }: NavbarProps) {
  const [userId, setUserId] = useState("");

  /*
  =====================================
  Registrar usuario en Socket
  =====================================
  */
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

  // Este hook hace socket.emit("register", userId)
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
        h-20
        bg-white
        border-b
        border-slate-200
        px-8
        flex
        items-center
        justify-between
        shadow-sm
      "
    >
      <div className="flex items-center gap-10">
        <h1 className="text-2xl font-bold text-cyan-600 hidden md:block">
          I.N.K.
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <NotificationBell />

        <div className="flex items-center gap-3">
          <UserCircle2 className="text-blue-600" size={42} />

          <div>
            {/* 3. Usamos las props directamente */}
            <p className="font-semibold text-slate-900"> {nombre} </p>
            <p className="text-sm text-slate-500">{apellido}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-11 h-11 rounded-2xl bg-red-50 hover:bg-red-100 transition flex items-center justify-center"
        >
          <LogOut size={20} className="text-red-600" />
        </button>
      </div>
    </header>
  );
}
