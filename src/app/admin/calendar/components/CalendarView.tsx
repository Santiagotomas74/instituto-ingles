"use client";

import { useState } from "react";

import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";

import { CalendarEvent } from "../types";

type Props = {
  events: CalendarEvent[];
};

export default function CalendarView({ events }: Props) {
  const [currentDate, setCurrentDate] = useState(new Date());
  console.log("events", events);

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
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
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

  const days: (number | null)[] = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  for (let i = 1; i <= totalDays; i++) {
    days.push(i);
  }

  return (
    <section>
      <div
        className="
        bg-white
        rounded-3xl
        shadow
        p-6
        "
      >
        {/* HEADER */}

        <div
          className="
          flex
          justify-between
          items-center
          mb-8
          "
        >
          <button
            onClick={previousMonth}
            className="
            w-10
            h-10
            rounded-xl
            border
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

        {/* DÍAS */}

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
          {days.map((day, index) => (
            <div
              key={index}
              className={`
                min-h-[120px]
                border
                rounded-xl
                p-2
                transition-all
                ${
                  day && isToday(day)
                    ? "border-blue-500 ring-2 ring-blue-100 bg-blue-50/30"
                    : "border-gray-200"
                }
              `}
            >
              {day && (
                <>
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
                  </div>

                  <div
                    className="
                    mt-2
                    space-y-2
                    "
                  >
                    {getEventsByDay(day).map((event) => (
                      <div
                        key={event.id}
                        className="
                        bg-blue-100
                        text-blue-700
                        rounded-lg
                        p-2
                        text-xs
                        "
                      >
                        <p
                          className="
                          font-semibold
                          "
                        >
                          {event.titulo}
                        </p>

                        <p>{event.classroom_name}</p>

                        <p>{event.hora}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
