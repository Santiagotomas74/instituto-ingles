"use client";

import { Languages } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className="
        flex
        items-center
        gap-1
        rounded-xl
        border
        border-slate-200
        bg-slate-50
        p-1
      "
    >
      <Languages size={18} className="ml-2 mr-1 text-slate-500" />

      <button
        type="button"
        onClick={() => setLanguage("es")}
        className={`
          h-8
          px-3
          rounded-lg
          text-sm
          font-semibold
          transition
          ${
            language === "es"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }
        `}
      >
        ES
      </button>

      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={`
          h-8
          px-3
          rounded-lg
          text-sm
          font-semibold
          transition
          ${
            language === "en"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }
        `}
      >
        EN
      </button>
    </div>
  );
}
