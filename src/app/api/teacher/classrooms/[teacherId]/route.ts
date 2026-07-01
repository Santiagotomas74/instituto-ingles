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

    console.log("Received request for teacherId:", teacherId);

    const result = await query(
      `
      SELECT
          c.id,
          c.nombre,
          c.nivel,
          c.horario,

          COUNT(DISTINCT cs.student_id) AS alumnos,
          COUNT(DISTINCT cm.id) AS materiales

      FROM classrooms c

      LEFT JOIN classroom_students cs
          ON cs.classroom_id = c.id

      LEFT JOIN classroom_materials cm
          ON cm.classroom_id = c.id

      WHERE c.profesor_id = $1

      GROUP BY
          c.id,
          c.nombre,
          c.nivel,
          c.horario

      ORDER BY c.nombre
      `,
      [teacherId],
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
        message: "Error obteniendo aulas",
      },
      {
        status: 500,
      },
    );
  }
}
