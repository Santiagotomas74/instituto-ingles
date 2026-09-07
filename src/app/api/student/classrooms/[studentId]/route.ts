import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ studentId: string }> },
) {
  try {
    const { studentId } = await params;

    console.log("studentId", studentId);

    /*
    =====================================================
    OBTENER ESTADO DEL ESTUDIANTE
    =====================================================
    */
    const studentResult = await query(
      `
      SELECT status
      FROM students
      WHERE id = $1
      LIMIT 1
      `,
      [studentId],
    );

    if (studentResult.rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Estudiante no encontrado.",
        },
        {
          status: 404,
        },
      );
    }

    const studentStatus = studentResult.rows[0].status;

    /*
    =====================================================
    ESTUDIANTE INACTIVO
    =====================================================

    No devolvemos sus aulas.
    =====================================================
    */
    if (studentStatus === "inactive") {
      return NextResponse.json({
        success: true,
        status: "inactive",
        classrooms: [],
      });
    }

    /*
    =====================================================
    ESTUDIANTE ACTIVO O PENDIENTE
    =====================================================

    Ambos pueden ver sus aulas.
    =====================================================
    */
    const result = await query(
      `
      SELECT
          c.id,
          c.nombre,
          c.nivel,
          c.horario,

          COUNT(DISTINCT cs2.student_id) AS alumnos,

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
      status: studentStatus,
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
