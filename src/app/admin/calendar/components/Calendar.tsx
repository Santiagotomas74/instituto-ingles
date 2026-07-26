"use client";

import { useEffect, useState } from "react";

import { CalendarEvent, Classroom } from "../types";

import CalendarHeader from "./CalendarHeader";
import CalendarFilters from "./CalendarFilters";
import CalendarView from "./CalendarView";
import CreateEventModal from "./CreateEventModal";

export default function Calendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [global, setGlobal] = useState(false);

  const [classrooms, setClassrooms] = useState<Classroom[]>([]);

  const [selectedClassroom, setSelectedClassroom] = useState("");

  const loadClassrooms = async () => {
    const res = await fetch("/api/admin/classrooms");

    const data = await res.json();

    setClassrooms(data.classrooms ?? []);
  };

  const loadCalendar = async () => {
    const url = selectedClassroom
      ? `/api/admin/calendar?classroomId=${selectedClassroom}`
      : "/api/admin/calendar";

    const res = await fetch(url);

    const data = await res.json();

    setEvents(data.events ?? []);
  };

  useEffect(() => {
    loadClassrooms();
  }, []);

  useEffect(() => {
    loadCalendar();
  }, [selectedClassroom]);

  return (
    <div className="space-y-8">
      <CalendarHeader
        onGlobal={() => {
          setGlobal(true);
          setOpenModal(true);
        }}
        onClassroom={() => {
          setGlobal(false);
          setOpenModal(true);
        }}
      />

      <CalendarFilters
        classrooms={classrooms}
        selectedClassroom={selectedClassroom}
        setSelectedClassroom={setSelectedClassroom}
      />

      <CalendarView events={events} />
      <CreateEventModal
        open={openModal}
        setOpen={setOpenModal}
        global={global}
        classrooms={classrooms}
        reload={loadCalendar}
      />
    </div>
  );
}
