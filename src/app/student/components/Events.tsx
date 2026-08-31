"use client";

import { useEffect, useState } from "react";
import { CalendarPlus } from "lucide-react";
import { useTranslation } from "react-i18next";

type ImportantDate = {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  hora: string;
  tipo: "clase" | "examen" | "evento" | "reunion";
};

type Props = {
  classroomId: string;
};

export default function Events({ classroomId }: Props) {
  const { t, i18n } = useTranslation();

  const [dates, setDates] = useState<ImportantDate[]>([]);
  const [loading, setLoading] = useState(true);

  const loadDates = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `/api/student/classroom/${classroomId}/important-dates`,
      );

      if (!res.ok) {
        throw new Error();
      }

      const data = await res.json();

      setDates(data.importantDates ?? []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (classroomId) {
      loadDates();
    }
  }, [classroomId]);

  /*
  =====================================================
  FORMATEAR FECHA
  =====================================================
  */

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "-";

    const locale = i18n.language === "en" ? "en-US" : "es-AR";

    return new Date(dateStr).toLocaleDateString(locale);
  };

  /*
  =====================================================
  TIPO DE FECHA
  =====================================================
  */

  const getTypeLabel = (tipo: ImportantDate["tipo"]) => {
    return t(`events.types.${tipo}`);
  };

  /*
  =====================================================
  LOADING
  =====================================================
  */

  if (loading) {
    return (
      <div
        className="
          bg-white
          rounded-[32px]
          border
          border-slate-200
          shadow-sm
          p-16
          flex
          flex-col
          items-center
          justify-center
        "
      >
        <div className="relative">
          <div
            className="
              absolute
              inset-0
              rounded-full
              border-4
              border-cyan-200
              border-t-cyan-600
              animate-spin
            "
          />

          <div
            className="
              w-24
              h-24
              rounded-full
              bg-white
              flex
              items-center
              justify-center
              p-2
            "
          >
            <img
              src="/logo2.png"
              alt="Instituto"
              className="w-20 h-20 object-contain"
            />
          </div>
        </div>

        <h2 className="mt-8 text-2xl font-bold text-slate-900">
          {t("events.loading_title")}
        </h2>

        <p className="mt-3 text-slate-500">{t("events.loading_subtitle")}</p>
      </div>
    );
  }

  /*
  =====================================================
  SIN FECHAS
  =====================================================
  */

  if (dates.length === 0) {
    return (
      <div className="bg-white rounded-3xl shadow p-10 text-center">
        <CalendarPlus size={48} className="mx-auto text-slate-300" />

        <h3 className="mt-4 text-xl font-semibold">
          {t("events.empty_title")}
        </h3>

        <p className="text-slate-500 mt-2">{t("events.empty_description")}</p>
      </div>
    );
  }

  /*
  =====================================================
  RENDER
  =====================================================
  */

  return (
    <div className="space-y-5">
      {dates.map((date) => (
        <div key={date.id} className="bg-white rounded-3xl border shadow p-6">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-bold text-zinc-800">
                  {date.titulo}
                </h3>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    date.tipo === "clase"
                      ? "bg-blue-100 text-blue-700"
                      : date.tipo === "examen"
                        ? "bg-red-100 text-red-700"
                        : date.tipo === "evento"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {getTypeLabel(date.tipo)}
                </span>
              </div>

              <p className="mt-3 text-slate-600">{date.descripcion}</p>

              <div className="mt-5 flex gap-6 text-sm text-slate-500">
                <span>📅 {formatDate(date.fecha)}</span>

                <span>🕒 {date.hora}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
