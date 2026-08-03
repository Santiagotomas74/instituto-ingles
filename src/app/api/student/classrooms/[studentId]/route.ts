import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ studentId: string }> },
) {
  try {
    const { studentId } = await params;

    console.log("studentId", studentId);

    const result = await query(
      `
      SELECT
          c.id,
          c.nombre,
          c.nivel,
          c.horario,

          COUNT(DISTINCT cs.student_id) AS alumnos,

          COUNT(DISTINCT cm.id) AS materiales

      FROM classroom_students cs

      INNER JOIN classrooms c
          ON c.id = cs.classroom_id

      LEFT JOIN classroom_students cs2
          ON cs2.classroom_id = c.id

      LEFT JOIN classroom_materials cm
          ON cm.classroom_id = c.id

      WHERE cs.student_id = $1

      GROUP BY
          c.id,
          c.nombre,
          c.nivel,
          c.horario

      ORDER BY c.nombre
      `,
      [studentId],
    );

    return NextResponse.json({
      success: true,
      classrooms: result.rows,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error al obtener las aulas.",
      },
      {
        status: 500,
      },
    );
  }
}
