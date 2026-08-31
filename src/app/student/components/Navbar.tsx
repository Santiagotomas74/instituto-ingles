"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { LogOut, UserCircle2, Languages } from "lucide-react";
import NotificationBell from "@/components/notifications/NotificationBell";
import { useSocket } from "@/components/chat/hooks/useSocket";
import Sidebar from "./Sidebar";
import { useTranslation } from "react-i18next";

type NavbarProps = {
  nombre?: string;
  apellido?: string;
};

export default function Navbar({ nombre, apellido }: NavbarProps) {
  const { t, i18n } = useTranslation();

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
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
      });

      if (!response.ok) {
        console.error("Error cerrando sesión");
      }
    } catch (error) {
      console.error("Error en logout:", error);
    } finally {
      window.location.href = "/login";
    }
  }

  function changeLanguage(language: string) {
    i18n.changeLanguage(language);
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
      {/* Lado izquierdo */}
      <div className="flex items-center gap-3 md:gap-6">
        {/* Sidebar mobile/tablet */}
        <div className="lg:hidden flex items-center">
          <Sidebar />
        </div>

        {/* Logo */}
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

      {/* Lado derecho */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Idioma */}
        <div className="flex items-center gap-1">
          <Languages size={20} className="text-slate-500 hidden sm:block" />

          <button
            type="button"
            onClick={() => changeLanguage("es")}
            className={`
              px-2.5
              py-1.5
              rounded-lg
              text-sm
              font-semibold
              transition
              ${
                i18n.language?.startsWith("es")
                  ? "bg-blue-100 text-blue-700"
                  : "text-slate-500 hover:bg-slate-100"
              }
            `}
          >
            ES
          </button>

          <button
            type="button"
            onClick={() => changeLanguage("en")}
            className={`
              px-2.5
              py-1.5
              rounded-lg
              text-sm
              font-semibold
              transition
              ${
                i18n.language?.startsWith("en")
                  ? "bg-blue-100 text-blue-700"
                  : "text-slate-500 hover:bg-slate-100"
              }
            `}
          >
            EN
          </button>
        </div>

        {/* Notificaciones */}
        <NotificationBell />

        {/* Usuario */}
        <div className="flex items-center gap-2 sm:gap-3">
          <UserCircle2 className="text-blue-600 shrink-0" size={38} />

          <div>
            <p className="font-semibold text-slate-900 leading-tight">
              {nombre}
            </p>

            <p className="text-sm text-slate-500 leading-tight">{apellido}</p>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          aria-label={t("navbar.logout")}
          title={t("navbar.logout")}
          className="
            w-10
            h-10
            sm:w-11
            sm:h-11
            rounded-2xl
            bg-red-50
            hover:bg-red-100
            transition
            flex
            items-center
            justify-center
            shrink-0
          "
        >
          <LogOut size={20} className="text-red-600" />
        </button>
      </div>
    </header>
  );
}
