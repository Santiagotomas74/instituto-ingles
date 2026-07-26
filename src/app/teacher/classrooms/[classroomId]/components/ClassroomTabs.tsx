"use client";

import { useEffect } from "react";

import { useSearchParams } from "next/navigation";

type TabType = "materiales" | "estudiantes" | "anuncios" | "fechas";

type Props = {
  tab: TabType;

  setTab: (value: TabType) => void;
};

export default function ClassroomTabs({ tab, setTab }: Props) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const selectedTab = searchParams.get("tab");

    if (selectedTab === "announcements") {
      setTab("anuncios");
    }

    if (selectedTab === "important-dates") {
      setTab("fechas");
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
  ];

  return (
    <div
      className="
        mt-10
        border-b
      "
    >
      <div
        className="
          flex
          gap-10
        "
      >
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
                  : "text-gray-500 hover:text-gray-700"
              }
            `}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
