"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";

export type TabType =
  | "materiales"
  | "estudiantes"
  | "anuncios"
  | "fechas"
  | "tareas"
  | "consultas";

type Props = {
  tab: TabType;
  setTab: (value: TabType) => void;
};

export default function ClassroomTabs({ tab, setTab }: Props) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const selectedTab = searchParams.get("tab");

    switch (selectedTab) {
      case "materials":
        setTab("materiales");
        break;

      case "students":
        setTab("estudiantes");
        break;

      case "announcements":
        setTab("anuncios");
        break;

      case "important-dates":
        setTab("fechas");
        break;

      case "tasks":
        setTab("tareas");
        break;

      case "questions":
        setTab("consultas");
        break;

      default:
        break;
    }
  }, [searchParams, setTab]);

  const tabs = [
    {
      id: "materiales",
      label: "Materiales",
    },
    {
      id: "estudiantes",
      label: "Estudiantes",
    },
    {
      id: "anuncios",
      label: "Anuncios",
    },
    {
      id: "fechas",
      label: "Fechas importantes",
    },

    {
      id: "tareas",
      label: "Tareas",
    },
    {
      id: "consultas",
      label: "Consultas",
    },
  ];

  return (
    <div className="mt-6 sm:mt-10">
      {/* VISTA MOBILE: SELECT ELEGANTE */}
      <div className="sm:hidden relative w-full">
        <select
          value={tab}
          onChange={(e) => setTab(e.target.value as TabType)}
          className="
            w-full
            appearance-none
            bg-white
            border
            border-slate-200
            text-slate-900
            font-semibold
            text-sm
            py-3
            pl-4
            pr-10
            rounded-2xl
            shadow-xs
            focus:outline-none
            focus:ring-2
            focus:ring-blue-600
            focus:border-transparent
            transition-all
            cursor-pointer
          "
        >
          {tabs.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>

        {/* Ícono de flecha hacia abajo estilizado */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400">
          <ChevronDown size={18} />
        </div>
      </div>

      {/* VISTA DESKTOP: PESTAÑAS ORIGINALES */}
      <div className="hidden sm:block border-b border-gray-200">
        <div className="flex gap-10">
          {tabs.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id as TabType)}
              className={`
                pb-4
                transition-colors
                ${
                  tab === item.id
                    ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
                    : "text-gray-500 hover:text-gray-700 font-medium"
                }
              `}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
