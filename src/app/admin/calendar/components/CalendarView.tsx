"use client";

import { useState } from "react";

import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  X,
  Clock3,
  School,
} from "lucide-react";

import { CalendarEvent } from "../types";

type Props = {
  events: CalendarEvent[];
};

export default function CalendarView({ events }: Props) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const monthName = currentDate.toLocaleDateString("es-AR", {
    month: "long",
    year: "numeric",
  });

  const today = new Date();

  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDay(null);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDay(null);
  };

  const getEventsByDay = (day: number) => {
    return events.filter((event) => {
      const date = new Date(event.fecha);

      return (
        date.getDate() === day &&
        date.getMonth() === month &&
        date.getFullYear() === year
      );
    });
  };

  const selectedEvents =
    selectedDay !== null ? getEventsByDay(selectedDay) : [];

  const days: (number | null)[] = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  for (let i = 1; i <= totalDays; i++) {
    days.push(i);
  }

  return (
    <section className="relative border rounded-2xl sm:rounded-[32px] p-4 sm:p-6 bg-white shadow-sm">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4 sm:mb-8">
        <button
          onClick={previousMonth}
          className="
            w-9
            h-9
            sm:w-10
            sm:h-10
            rounded-xl
            border
            border-slate-200
            flex
            items-center
            justify-center
            hover:bg-slate-100
            transition
            text-gray-700
            shrink-0
          "
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <h2
          className="
            text-lg
            sm:text-2xl
            font-bold
            capitalize
            flex
            items-center
            gap-1.5
            sm:gap-2
            text-gray-900
            text-center
          "
        >
          <CalendarDays className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 shrink-0" />
          <span>{monthName}</span>
        </h2>

        <button
          onClick={nextMonth}
          className="
            w-9
            h-9
            sm:w-10
            sm:h-10
            rounded-xl
            border
            border-slate-200
            flex
            items-center
            justify-center
            hover:bg-slate-100
            transition
            text-gray-700
            shrink-0
          "
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* DÍAS DE LA SEMANA */}
      <div
        className="
          grid
          grid-cols-7
          gap-1
          sm:gap-2
          mb-2
          sm:mb-3
        "
      >
        {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
          <div
            key={day}
            className="
              text-center
              font-semibold
              text-gray-500
              text-xs
              sm:text-sm
              py-1
            "
          >
            {day}
          </div>
        ))}
      </div>

      {/* CALENDARIO */}
      <div
        className="
          grid
          grid-cols-7
          gap-1
          sm:gap-2
        "
      >
        {days.map((day, index) => {
          const dayEvents = day ? getEventsByDay(day) : [];
          const visibleEvents = dayEvents.slice(0, 2);
          const remainingEvents = Math.max(
            dayEvents.length - visibleEvents.length,
            0,
          );

          return (
            <div
              key={index}
              onClick={() => day && setSelectedDay(day)}
              className={`
                min-h-[60px]
                sm:h-28
                md:h-[155px]
                border
                rounded-xl
                p-1
                sm:p-2
                transition-all
                bg-white
                overflow-hidden
                flex
                flex-col
                justify-between
                sm:justify-start
                ${day ? "cursor-pointer" : "bg-slate-50/50"}

                ${
                  day && isToday(day)
                    ? "border-blue-500 ring-2 ring-blue-100 bg-blue-50/30"
                    : "border-gray-200"
                }

                ${
                  dayEvents.length > 0
                    ? "hover:border-blue-300 hover:shadow-sm"
                    : ""
                }
              `}
            >
              {day && (
                <>
                  {/* HEADER DEL DÍA */}
                  <div className="flex justify-between items-center sm:items-start w-full">
                    <div className="flex sm:flex-col items-center">
                      <div
                        className={`
                          w-6
                          h-6
                          sm:w-8
                          sm:h-8
                          text-xs
                          sm:text-base
                          rounded-full
                          flex
                          items-center
                          justify-center
                          font-semibold
                          transition-all

                          ${
                            isToday(day)
                              ? "bg-blue-600 text-white shadow-sm"
                              : "text-gray-700"
                          }
                        `}
                      >
                        {day}
                      </div>

                      {isToday(day) && (
                        <div className="hidden sm:block w-2 h-2 rounded-full bg-blue-600 mt-1" />
                      )}
                    </div>

                    {/* Contador badge (solo desktop) */}
                    {dayEvents.length > 0 && (
                      <span
                        className="
                          hidden
                          sm:inline-block
                          text-[10px]
                          font-semibold
                          text-slate-500
                          px-1.5
                          py-0.5
                          rounded-md
                          bg-slate-100
                        "
                      >
                        {dayEvents.length}
                      </span>
                    )}
                  </div>

                  {/* VISTA MOBILE: Puntos Indicadores */}
                  {dayEvents.length > 0 && (
                    <div className="flex sm:hidden items-center justify-center gap-1 mt-auto pb-1">
                      {dayEvents.slice(0, 3).map((_, i) => (
                        <span
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0"
                        />
                      ))}
                      {dayEvents.length > 3 && (
                        <span className="text-[9px] font-bold text-blue-600 leading-none">
                          +
                        </span>
                      )}
                    </div>
                  )}

                  {/* VISTA DESKTOP: Eventos desplegados */}
                  <div className="hidden sm:block mt-2 space-y-1.5 w-full">
                    {visibleEvents.map((event) => (
                      <div
                        key={event.id}
                        className="
                          w-full
                          text-left
                          bg-blue-50
                          hover:bg-blue-100
                          border
                          border-blue-100
                          text-blue-700
                          rounded-lg
                          px-2
                          py-1.5
                          transition
                          overflow-hidden
                        "
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                          <p className="font-semibold text-[11px] truncate">
                            {event.titulo}
                          </p>
                        </div>

                        <p className="text-[10px] text-blue-500 mt-0.5 truncate">
                          {event.hora}
                          {event.classroom_name
                            ? ` · ${event.classroom_name}`
                            : ""}
                        </p>
                      </div>
                    ))}

                    {/* MÁS EVENTOS (Desktop) */}
                    {remainingEvents > 0 && (
                      <div
                        className="
                          w-full
                          text-left
                          px-2
                          py-0.5
                          text-[11px]
                          font-semibold
                          text-blue-600
                          hover:text-blue-800
                          transition
                        "
                      >
                        +{remainingEvents}{" "}
                        {remainingEvents === 1 ? "evento" : "eventos"}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* MODAL DEL DÍA */}
      {selectedDay !== null && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            bg-black/40
            backdrop-blur-sm
            flex
            items-center
            justify-center
            p-3
            sm:p-4
          "
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedDay(null);
            }
          }}
        >
          <div
            className="
              w-full
              max-w-lg
              max-h-[85vh]
              bg-white
              rounded-2xl
              sm:rounded-[28px]
              shadow-2xl
              overflow-hidden
              flex
              flex-col
            "
          >
            {/* MODAL HEADER */}
            <div
              className="
                px-5
                sm:px-6
                py-4
                sm:py-5
                border-b
                border-slate-100
                flex
                items-center
                justify-between
                shrink-0
              "
            >
              <div>
                <p className="text-xs sm:text-sm text-blue-600 font-semibold">
                  Eventos del día
                </p>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5 capitalize">
                  {selectedDay} de{" "}
                  {currentDate.toLocaleDateString("es-AR", {
                    month: "long",
                  })}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedDay(null)}
                aria-label="Cerrar modal"
                className="
                  w-9
                  h-9
                  sm:w-10
                  sm:h-10
                  rounded-xl
                  hover:bg-slate-100
                  flex
                  items-center
                  justify-center
                  text-slate-500
                  transition
                  shrink-0
                "
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* EVENTOS */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-3 flex-1">
              {selectedEvents.map((event) => (
                <div
                  key={event.id}
                  className="
                    rounded-2xl
                    border
                    border-slate-200
                    p-4
                    hover:border-blue-200
                    hover:bg-blue-50/30
                    transition
                  "
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="
                        w-2
                        min-h-[48px]
                        rounded-full
                        bg-blue-500
                        shrink-0
                      "
                    />

                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                        {event.titulo}
                      </h4>

                      <div className="flex flex-wrap gap-2 sm:gap-3 mt-2 text-xs sm:text-sm text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <Clock3 className="w-3.5 h-3.5" />
                          {event.hora}
                        </span>

                        {event.classroom_name && (
                          <span className="flex items-center gap-1.5">
                            <School className="w-3.5 h-3.5" />
                            {event.classroom_name}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {selectedEvents.length === 0 && (
                <p className="text-center text-slate-500 py-8 text-sm">
                  No hay eventos para este día.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
