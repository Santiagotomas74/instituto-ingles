"use client";

import { useState, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Clock,
  School,
  Calendar as CalendarIcon,
  Sparkles,
} from "lucide-react";
import { CalendarEvent } from "../types";

type Props = {
  events: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
};

// Parsea fechas "YYYY-MM-DD" o ISO sin sufrir desfases por Zona Horaria / UTC
function parseLocalDate(dateString: string): Date {
  if (!dateString) return new Date();
  if (dateString.includes("T")) return new Date(dateString.split("T")[0]);
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

// Genera una clave única de comparación local "YYYY-M-D"
function getDateKey(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

export default function CalendarView({ events, onEventClick }: Props) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = new Date();

  const monthName = currentDate.toLocaleDateString("es-AR", {
    month: "long",
    year: "numeric",
  });

  // Controles de Navegación
  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    const now = new Date();
    setCurrentDate(now);
    setSelectedDate(now);
  };

  /*
    Optimizacion O(1): Agrupa todos los eventos en un Map indexado por fecha.
    Evita hacer `.filter()` en cada celda del renderizado.
  */
  const eventsByDateMap = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();

    events.forEach((event) => {
      const d = parseLocalDate(event.fecha);
      const key = getDateKey(d);

      if (!map.has(key)) {
        map.set(key, []);
      }
      map.get(key)!.push(event);
    });

    return map;
  }, [events]);

  /*
    Generación completa de la grilla (incluyendo días del mes anterior y posterior)
  */
  const calendarDays = useMemo(() => {
    const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0 = Domingo
    const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();

    const days = [];

    // Días del mes anterior para rellenar el inicio
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push({
        dayNumber: prevMonthDays - i,
        isCurrentMonth: false,
        date: new Date(year, month - 1, prevMonthDays - i),
      });
    }

    // Días del mes actual
    for (let i = 1; i <= totalDaysInMonth; i++) {
      days.push({
        dayNumber: i,
        isCurrentMonth: true,
        date: new Date(year, month, i),
      });
    }

    // Días del mes siguiente para completar múltiplos de 7
    const remainingDays = (7 - (days.length % 7)) % 7;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        dayNumber: i,
        isCurrentMonth: false,
        date: new Date(year, month + 1, i),
      });
    }

    return days;
  }, [year, month]);

  const selectedDateKey = getDateKey(selectedDate);
  const selectedDayEvents = eventsByDateMap.get(selectedDateKey) ?? [];

  const selectedDateFormatted = selectedDate.toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <section className="w-full">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100 p-3 sm:p-6">
        {/* CABECERA Y CONTROLES */}
        <div className="flex items-center justify-between gap-2 mb-4 sm:mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <CalendarDays size={20} />
            </div>
            <h2 className="text-lg sm:text-2xl font-bold text-slate-900 capitalize leading-tight">
              {monthName}
            </h2>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={goToToday}
              className="px-2.5 sm:px-3.5 h-8 sm:h-9 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors"
            >
              Hoy
            </button>

            <button
              onClick={previousMonth}
              aria-label="Mes anterior"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 flex items-center justify-center transition-colors"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={nextMonth}
              aria-label="Mes siguiente"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 flex items-center justify-center transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* NOMBRES DE DÍAS DE LA SEMANA */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-1 sm:mb-2 text-center">
          {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
            <div
              key={day}
              className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider py-1"
            >
              {day}
            </div>
          ))}
        </div>

        {/* GRILLA DEL CALENDARIO */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {calendarDays.map((cell, index) => {
            const cellKey = getDateKey(cell.date);
            const dayEvents = eventsByDateMap.get(cellKey) ?? [];

            const isToday =
              cell.isCurrentMonth &&
              today.getDate() === cell.dayNumber &&
              today.getMonth() === cell.date.getMonth() &&
              today.getFullYear() === cell.date.getFullYear();

            const isSelected = cellKey === selectedDateKey;

            return (
              <div
                key={index}
                onClick={() => {
                  setSelectedDate(cell.date);
                  if (!cell.isCurrentMonth) {
                    setCurrentDate(
                      new Date(
                        cell.date.getFullYear(),
                        cell.date.getMonth(),
                        1,
                      ),
                    );
                  }
                }}
                className={`
                  relative flex flex-col items-center justify-between
                  min-h-[52px] sm:min-h-[120px] 
                  rounded-xl sm:rounded-2xl 
                  p-1 sm:p-2 
                  border transition-all cursor-pointer select-none
                  ${
                    isSelected
                      ? "ring-2 ring-blue-600 border-blue-600 bg-blue-50/40"
                      : cell.isCurrentMonth
                        ? "bg-white border-slate-200 hover:border-slate-300"
                        : "bg-slate-50/50 border-slate-100 text-slate-300"
                  }
                `}
              >
                {/* Cabecera del día (Número de día + Contador) */}
                <div className="w-full flex items-center justify-between sm:mb-1">
                  <span
                    className={`
                      text-xs sm:text-sm font-semibold inline-flex items-center justify-center
                      w-6 h-6 sm:w-7 sm:h-7 rounded-full transition-transform
                      ${
                        isToday
                          ? "bg-blue-600 text-white font-bold"
                          : cell.isCurrentMonth
                            ? "text-slate-700"
                            : "text-slate-300"
                      }
                    `}
                  >
                    {cell.dayNumber}
                  </span>

                  {dayEvents.length > 0 && (
                    <span className="hidden sm:inline-flex text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-md">
                      {dayEvents.length}
                    </span>
                  )}
                </div>

                {/* VISTA MOBILE: Puntos indicadores (Dots) */}
                <div className="flex sm:hidden items-center justify-center gap-0.5 min-h-[10px] mt-0.5">
                  {dayEvents.length > 0 && (
                    <>
                      {dayEvents.slice(0, 3).map((_, i) => (
                        <span
                          key={i}
                          className={`w-1.5 h-1.5 rounded-full ${
                            isSelected ? "bg-blue-700" : "bg-blue-500"
                          }`}
                        />
                      ))}
                      {dayEvents.length > 3 && (
                        <span className="text-[8px] font-bold text-blue-700 leading-none">
                          +
                        </span>
                      )}
                    </>
                  )}
                </div>

                {/* VISTA DESKTOP: Eventos detallados dentro de la celda */}
                <div className="hidden sm:block w-full space-y-1.5 flex-1 overflow-y-auto max-h-[85px] scrollbar-none mt-1">
                  {dayEvents.map((event) => (
                    <div
                      key={event.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventClick?.(event);
                      }}
                      className="
                        bg-blue-50/80 hover:bg-blue-100 
                        border border-blue-100 
                        text-blue-900 
                        rounded-lg p-1.5 
                        text-[11px] leading-tight 
                        transition-all cursor-pointer
                      "
                    >
                      <p className="font-semibold truncate">{event.titulo}</p>

                      <div className="flex items-center gap-2 text-[10px] text-blue-600/90 mt-0.5">
                        {event.hora && (
                          <span className="flex items-center gap-0.5 truncate">
                            <Clock size={10} className="shrink-0" />
                            {event.hora}
                          </span>
                        )}
                        {event.classroom_nombre && (
                          <span className="flex items-center gap-0.5 truncate">
                            <School size={10} className="shrink-0" />
                            <span className="truncate">
                              {event.classroom_nombre}
                            </span>
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* VISTA MOBILE: AGENDA DEL DÍA SELECCIONADO */}
        <div className="sm:hidden mt-5 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <CalendarIcon size={14} className="text-blue-600" />
              <span className="capitalize">{selectedDateFormatted}</span>
            </h3>

            <span className="text-[11px] font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
              {selectedDayEvents.length}{" "}
              {selectedDayEvents.length === 1 ? "evento" : "eventos"}
            </span>
          </div>

          {selectedDayEvents.length === 0 ? (
            <div className="bg-slate-50/60 rounded-2xl p-5 text-center border border-dashed border-slate-200">
              <Sparkles size={18} className="mx-auto text-slate-300 mb-1" />
              <p className="text-xs text-slate-500 font-medium">
                Sin actividades programadas para esta fecha
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {selectedDayEvents.map((event) => (
                <div
                  key={event.id}
                  onClick={() => onEventClick?.(event)}
                  className="
                    bg-white active:bg-blue-50/40 
                    border border-slate-200/90 rounded-2xl p-3.5 
                    transition-all flex items-start justify-between gap-3
                  "
                >
                  <div className="space-y-1 min-w-0 flex-1">
                    <p className="font-bold text-sm text-slate-900 leading-snug">
                      {event.titulo}
                    </p>

                    <div className="flex items-center gap-3 flex-wrap text-xs text-slate-500 pt-0.5">
                      {event.hora && (
                        <span className="flex items-center gap-1 text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded-md">
                          <Clock size={12} />
                          {event.hora}
                        </span>
                      )}

                      {event.classroom_nombre && (
                        <span className="flex items-center gap-1 text-slate-600">
                          <School size={12} className="text-slate-400" />
                          <span className="truncate">
                            {event.classroom_nombre}
                          </span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
