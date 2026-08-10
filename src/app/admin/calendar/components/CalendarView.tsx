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
    <section className="relative">
      {/* HEADER */}

      <div className="flex justify-between items-center mb-8">
        <button
          onClick={previousMonth}
          className="
            w-10
            h-10
            rounded-xl
            border
            border-slate-200
            flex
            items-center
            justify-center
            hover:bg-slate-100
            transition
            text-gray-700
          "
        >
          <ChevronLeft size={20} />
        </button>

        <h2
          className="
            text-2xl
            font-bold
            capitalize
            flex
            items-center
            gap-2
            text-gray-900
          "
        >
          <CalendarDays />
          {monthName}
        </h2>

        <button
          onClick={nextMonth}
          className="
            w-10
            h-10
            rounded-xl
            border
            border-slate-200
            flex
            items-center
            justify-center
            hover:bg-slate-100
            transition
            text-gray-700
          "
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* DÍAS DE LA SEMANA */}

      <div
        className="
          grid
          grid-cols-7
          gap-2
          mb-3
        "
      >
        {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
          <div
            key={day}
            className="
              text-center
              font-semibold
              text-gray-500
              text-sm
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
          gap-2
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
              className={`
                h-[155px]
                border
                rounded-xl
                p-2
                transition-all
                bg-white
                overflow-hidden

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

                  <div className="flex justify-between items-start">
                    <div className="flex flex-col items-center">
                      <div
                        className={`
                          w-8
                          h-8
                          rounded-full
                          flex
                          items-center
                          justify-center
                          font-semibold
                          transition-all

                          ${
                            isToday(day)
                              ? "bg-blue-600 text-white shadow-md"
                              : "text-gray-700"
                          }
                        `}
                      >
                        {day}
                      </div>

                      {isToday(day) && (
                        <div className="w-2 h-2 rounded-full bg-blue-600 mt-1" />
                      )}
                    </div>

                    {dayEvents.length > 0 && (
                      <span
                        className="
                          text-[10px]
                          font-semibold
                          text-slate-400
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

                  {/* EVENTOS */}

                  <div className="mt-2 space-y-1.5">
                    {visibleEvents.map((event) => (
                      <button
                        key={event.id}
                        type="button"
                        onClick={() => setSelectedDay(day)}
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

                          <p
                            className="
                              font-semibold
                              text-[11px]
                              truncate
                            "
                          >
                            {event.titulo}
                          </p>
                        </div>

                        <p
                          className="
                            text-[10px]
                            text-blue-500
                            mt-0.5
                            truncate
                          "
                        >
                          {event.hora}
                          {event.classroom_name
                            ? ` · ${event.classroom_name}`
                            : ""}
                        </p>
                      </button>
                    ))}

                    {/* MÁS EVENTOS */}

                    {remainingEvents > 0 && (
                      <button
                        type="button"
                        onClick={() => setSelectedDay(day)}
                        className="
                          w-full
                          text-left
                          px-2
                          py-1
                          text-[11px]
                          font-semibold
                          text-blue-600
                          hover:text-blue-800
                          hover:bg-blue-50
                          rounded-lg
                          transition
                        "
                      >
                        +{remainingEvents}{" "}
                        {remainingEvents === 1 ? "evento" : "eventos"}
                      </button>
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
            p-4
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
              max-h-[80vh]
              bg-white
              rounded-[28px]
              shadow-2xl
              overflow-hidden
            "
          >
            {/* MODAL HEADER */}

            <div
              className="
                px-6
                py-5
                border-b
                border-slate-100
                flex
                items-center
                justify-between
              "
            >
              <div>
                <p className="text-sm text-blue-600 font-semibold">
                  Eventos del día
                </p>

                <h3 className="text-2xl font-bold text-slate-900 mt-1">
                  {selectedDay} de{" "}
                  {currentDate.toLocaleDateString("es-AR", {
                    month: "long",
                  })}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedDay(null)}
                className="
                  w-10
                  h-10
                  rounded-xl
                  hover:bg-slate-100
                  flex
                  items-center
                  justify-center
                  text-slate-500
                "
              >
                <X size={20} />
              </button>
            </div>

            {/* EVENTOS */}

            <div className="p-6 overflow-y-auto max-h-[60vh] space-y-3">
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
                        min-h-[55px]
                        rounded-full
                        bg-blue-500
                        shrink-0
                      "
                    />

                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-slate-900">
                        {event.titulo}
                      </h4>

                      <div className="flex flex-wrap gap-3 mt-2 text-sm text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <Clock3 size={14} />
                          {event.hora}
                        </span>

                        {event.classroom_name && (
                          <span className="flex items-center gap-1.5">
                            <School size={14} />
                            {event.classroom_name}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {selectedEvents.length === 0 && (
                <p className="text-center text-slate-500 py-8">
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
