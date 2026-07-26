import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { query } from "@/lib/db";

export async function GET() {
  try {
    const cookieStore = await cookies();

    const studentId = cookieStore.get("student_id")?.value;

    if (!studentId) {
      return NextResponse.json(
        {
          success: false,
          message: "No autenticado",
        },
        { status: 401 },
      );
    }

    const result = await query(
      `
      SELECT
        d.id,
        d.titulo,
        d.descripcion,
        d.fecha,
        d.hora,
        d.tipo,
        c.id AS classroom_id,
        c.nombre AS classroom_nombre
      FROM classroom_students cs
      INNER JOIN classrooms c
        ON c.id = cs.classroom_id
      INNER JOIN classroom_events d
        ON d.classroom_id = c.id
      WHERE cs.student_id = $1
      ORDER BY d.fecha ASC, d.hora ASC
      `,
      [studentId],
    );

    return NextResponse.json({
      success: true,
      events: result.rows,
    });
  } catch (error) {
    console.error("Error obteniendo calendario:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Error interno del servidor",
      },
      { status: 500 },
    );
  }
}
