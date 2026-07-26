"use client";

import { Bell, LogOut, Search } from "lucide-react";

export default function Navbar() {
  const handleLogout = async () => {
    await fetch("/api/logout", {
      method: "POST",
    });

    window.location.href = "/login";
  };

  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Panel del Estudiante
        </h1>

        <p className="text-slate-500 text-sm">Bienvenido al Campus Virtual</p>
      </div>

      <div className="flex items-center gap-5">
        {/* Buscador */}
        <div className="hidden lg:flex items-center bg-slate-100 rounded-2xl px-4 h-11 w-80">
          <Search size={18} className="text-slate-400" />

          <input
            type="text"
            placeholder="Buscar..."
            className="bg-transparent outline-none ml-3 flex-1 text-sm text-slate-700"
          />
        </div>

        {/* Notificaciones */}
        <button className="relative w-11 h-11 rounded-2xl bg-slate-100 hover:bg-slate-200 transition flex items-center justify-center">
          <Bell size={20} className="text-slate-600" />

          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Usuario */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-cyan-600 text-white flex items-center justify-center font-bold">
            S
          </div>

          <div className="hidden md:block">
            <p className="font-semibold text-slate-800">Estudiante</p>

            <span className="text-xs text-slate-500">Alumno</span>
          </div>
        </div>

        {/* Salir */}
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
