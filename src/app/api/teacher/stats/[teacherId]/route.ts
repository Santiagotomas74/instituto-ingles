import { NextResponse } from "next/server";
import { query } from "@/lib/db";

type Props = {
  params: Promise<{
    teacherId: string;
  }>;
};

export async function GET(req: Request, { params }: Props) {
  try {
    const { teacherId } = await params;

    const classroomsResult = await query(
      `
      SELECT COUNT(*) AS total
      FROM classrooms
      WHERE profesor_id = $1
      `,
      [teacherId],
    );

    const studentsResult = await query(
      `
      SELECT COUNT(DISTINCT cs.student_id) AS total
      FROM classroom_students cs
      INNER JOIN classrooms c
        ON c.id = cs.classroom_id
      WHERE c.profesor_id = $1
      `,
      [teacherId],
    );

    const materialsResult = await query(
      `
      SELECT COUNT(*) AS total
      FROM classroom_materials cm
      INNER JOIN classrooms c
        ON c.id = cm.classroom_id
      WHERE c.profesor_id = $1
      `,
      [teacherId],
    );

    const announcementsResult = await query(
      `
      SELECT COUNT(*) AS total
      FROM classroom_announcements ca
      INNER JOIN classrooms c
        ON c.id = ca.classroom_id
      WHERE c.profesor_id = $1
      `,
      [teacherId],
    );

    return NextResponse.json({
      success: true,
      stats: {
        aulas: Number(classroomsResult.rows[0].total),
        alumnos: Number(studentsResult.rows[0].total),
        materiales: Number(materialsResult.rows[0].total),
        anuncios: Number(announcementsResult.rows[0].total),
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error obteniendo estadísticas",
      },
      { status: 500 },
    );
  }
}
