"use client";

import { useState } from "react";

import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";

import { CalendarEvent } from "./Calendar";

type Props = {
  events: CalendarEvent[];
};

export default function CalendarView({ events }: Props) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();

  const month = currentDate.getMonth();

  const today = new Date();

  const firstDay = new Date(year, month, 1).getDay();

  const totalDays = new Date(year, month + 1, 0).getDate();

  const monthName = currentDate.toLocaleDateString("es-AR", {
    month: "long",
    year: "numeric",
  });

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
      <div className="bg-white rounded-3xl shadow p-6">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={previousMonth}
            className="text-black w-10 h-10 rounded-xl border flex items-center justify-center hover:bg-slate-100"
          >
            <ChevronLeft size={20} />
          </button>

          <h2 className="text-2xl font-bold capitalize flex items-center gap-2 text-gray-800">
            <CalendarDays />

            {monthName}
          </h2>

          <button
            onClick={nextMonth}
            className="text-black w-10 h-10 rounded-xl border flex items-center justify-center hover:bg-slate-100"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-3">
          {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
            <div key={day} className="text-center font-semibold text-slate-500">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => {
            const isToday =
              day &&
              today.getDate() === day &&
              today.getMonth() === month &&
              today.getFullYear() === year;

            return (
              <div
                key={index}
                className="min-h-[120px] border rounded-xl p-2 bg-white"
              >
                {day && (
                  <>
                    <div className="flex items-center justify-between">
                      <p
                        className={`font-semibold ${
                          isToday ? "text-blue-600" : "text-gray-700"
                        }`}
                      >
                        {day}
                      </p>

                      {isToday && (
                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                      )}
                    </div>

                    <div className="mt-2 space-y-2">
                      {getEventsByDay(day).map((event) => (
                        <div
                          key={event.id}
                          className="bg-blue-100 text-blue-700 rounded-lg p-2 text-xs"
                        >
                          <p className="font-semibold">{event.titulo}</p>

                          <p>{event.classroom_nombre}</p>

                          <p>{event.hora}</p>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
