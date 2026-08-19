import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { query } from "@/lib/db";

export async function GET() {
  try {
    /*
    =====================================
    AUTENTICACIÓN
    =====================================
    */

    const cookieStore = await cookies();

    const teacherId = cookieStore.get("user_id")?.value;
    const role = cookieStore.get("role")?.value;

    if (!teacherId || role !== "teacher") {
      return NextResponse.json(
        {
          success: false,
          message: "No autorizado",
        },
        {
          status: 403,
        },
      );
    }

    /*
    =====================================
    OBTENER ALUMNOS DEL PROFESOR
    =====================================

    classrooms
        ↓
    classroom_students
        ↓
    students
    */

    const result = await query(
      `
      SELECT DISTINCT
        s.id,
        s.nombre,
        s.apellido,
        s.email,
        s.dni,
        s.nivel
      FROM classrooms c

      INNER JOIN classroom_students cs
        ON cs.classroom_id = c.id

      INNER JOIN students s
        ON s.id = cs.student_id

      WHERE c.profesor_id = $1

      ORDER BY
        s.apellido ASC,
        s.nombre ASC
      `,
      [teacherId],
    );

    return NextResponse.json({
      success: true,
      students: result.rows,
    });
  } catch (error) {
    console.error(
      "Error obteniendo alumnos del profesor para boletines:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message: "Error obteniendo alumnos",
      },
      {
        status: 500,
      },
    );
  }
}
