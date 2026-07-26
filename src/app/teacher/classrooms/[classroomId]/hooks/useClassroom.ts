"use client";

import { useEffect, useState } from "react";

import {
  Classroom,
  Student,
  Material,
  Announcement,
  ImportantDate,
} from "../types";

export function useClassroom(classroomId: string) {
  const [classroom, setClassroom] = useState<Classroom | null>(null);

  const [students, setStudents] = useState<Student[]>([]);

  const [materials, setMaterials] = useState<Material[]>([]);

  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  const [importantDates, setImportantDates] = useState<ImportantDate[]>([]);

  const [loading, setLoading] = useState(true);

  const loadClassroom = async () => {
    try {
      setLoading(true);

      const [classroomResponse, datesResponse] = await Promise.all([
        fetch(`/api/teacher/classroom/${classroomId}`),

        fetch(`/api/teacher/classroom/${classroomId}/important-dates`),
      ]);

      if (!classroomResponse.ok) {
        throw new Error("Error cargando aula");
      }

      if (!datesResponse.ok) {
        throw new Error("Error cargando fechas");
      }

      const classroomData = await classroomResponse.json();

      const datesData = await datesResponse.json();

      setClassroom(classroomData.classroom);

      setStudents(classroomData.students ?? []);

      setMaterials(classroomData.materials ?? []);

      setAnnouncements(classroomData.announcements ?? []);

      setImportantDates(datesData.importantDates ?? []);
    } catch (error) {
      console.error("Error cargando classroom:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (classroomId) {
      loadClassroom();
    }
  }, [classroomId]);

  return {
    classroom,

    students,

    materials,
    setMaterials,

    announcements,
    setAnnouncements,

    importantDates,
    setImportantDates,

    loading,

    loadClassroom,
  };
}
