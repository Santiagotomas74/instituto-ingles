import { NextRequest, NextResponse } from "next/server";

import { query } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ classroomId: string }> },
) {
  try {
    const { classroomId } = await params;

    console.log("classroomId:", classroomId);

    const result = await query(
      `
      SELECT
        c.id,
        c.nombre,
        c.nivel,
        c.horario,
        CASE
          WHEN t.id IS NOT NULL
          THEN CONCAT(t.nombre, ' ', t.apellido)
          ELSE NULL
        END AS teacher
      FROM classrooms c
      LEFT JOIN teachers t
        ON t.id = c.profesor_id
      WHERE c.id = $1
      `,
      [classroomId],
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Aula no encontrada",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      classroom: result.rows[0],
    });
  } catch (error) {
    console.error("Error obteniendo aula:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Error interno del servidor",
      },
      { status: 500 },
    );
  }
}
