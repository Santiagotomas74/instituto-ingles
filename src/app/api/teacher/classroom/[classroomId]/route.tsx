import { NextResponse } from "next/server";
import { query } from "@/lib/db";

type Params = {
  params: Promise<{
    classroomId: string;
  }>;
};

export async function GET(req: Request, { params }: Params) {
  try {
    const { classroomId } = await params;
    console.log("classroomId:", classroomId);

    // Aula
    const classroomResult = await query(
      `
      SELECT
        c.*,
        CONCAT(t.nombre, ' ', t.apellido) AS profesor
      FROM classrooms c
      LEFT JOIN teachers t
        ON t.id = c.profesor_id
      WHERE c.id = $1
      `,
      [classroomId],
    );

    if (classroomResult.rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Aula no encontrada",
        },
        { status: 404 },
      );
    }

    const studentsResult = await query(
      `
  SELECT
    s.*
  FROM classroom_students cs
  INNER JOIN students s
    ON s.id = cs.student_id
  WHERE cs.classroom_id = $1
  ORDER BY s.apellido, s.nombre
  `,
      [classroomId],
    );

    // Materiales
    const materialsResult = await query(
      `
      SELECT *
      FROM classroom_materials
      WHERE classroom_id = $1
      ORDER BY created_at DESC
      `,
      [classroomId],
    );

    // Anuncios
    const announcementsResult = await query(
      `
      SELECT *
      FROM classroom_announcements
      WHERE classroom_id = $1
      ORDER BY created_at DESC
      `,
      [classroomId],
    );

    return NextResponse.json({
      success: true,
      classroom: classroomResult.rows[0],
      students: studentsResult.rows,
      materials: materialsResult.rows,
      announcements: announcementsResult.rows,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error interno",
      },
      { status: 500 },
    );
  }
}
