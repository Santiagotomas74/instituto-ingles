import { NextResponse } from "next/server";

import { cookies } from "next/headers";

import { query } from "@/lib/db";

export async function GET() {
  try {
    const cookieStore = await cookies();

    const teacherId = cookieStore.get("user_id")?.value;

    console.log("teacher_id cookie:", teacherId);

    if (!teacherId) {
      return NextResponse.json(
        {
          success: false,
          message: "Profesor no identificado",
        },
        {
          status: 401,
        },
      );
    }

    // ============================
    // AULAS DEL PROFESOR
    // ============================

    const classroomsResult = await query(
      `
      SELECT
        id,
        nombre,
        nivel,
        horario

      FROM classrooms

      WHERE profesor_id = $1

      ORDER BY nombre
      `,
      [teacherId],
    );

    // ============================
    // FECHAS IMPORTANTES
    // ============================

    const eventsResult = await query(
      `
      SELECT
        ce.id,
        ce.classroom_id,
        ce.titulo,
        ce.descripcion,
        ce.fecha,
        ce.hora,
        ce.tipo,

        c.nombre AS classroom_nombre

      FROM classroom_events ce


      INNER JOIN classrooms c
        ON c.id = ce.classroom_id


      WHERE c.profesor_id = $1


      ORDER BY ce.fecha ASC
      `,
      [teacherId],
    );

    return NextResponse.json({
      success: true,

      classrooms: classroomsResult.rows,

      events: eventsResult.rows,
    });
  } catch (error) {
    console.error("Error calendario:", error);

    return NextResponse.json(
      {
        success: false,

        message: "Error interno del servidor",
      },
      {
        status: 500,
      },
    );
  }
}
