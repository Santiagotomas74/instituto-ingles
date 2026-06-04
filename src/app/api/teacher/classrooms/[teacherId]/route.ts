import { NextResponse } from "next/server";
import { query } from "@/lib/db";

type Props = {
  params: Promise<{
    teacherId: string;
  }>;
};

export async function GET(req: Request, { params }: Props) {
  console.log(
    "Received request for teacherId:",
    await params.then((p) => p.teacherId),
  );
  try {
    const { teacherId } = await params;

    const result = await query(
      `
  SELECT
      c.id,
      c.nombre,
      c.nivel,
      COUNT(DISTINCT cs.student_id) AS alumnos
  FROM classrooms c
  LEFT JOIN classroom_students cs
      ON cs.classroom_id = c.id
  WHERE c.profesor_id = $1
  GROUP BY c.id, c.nombre, c.nivel
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
      { status: 500 },
    );
  }
}
