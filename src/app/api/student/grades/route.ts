import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { query } from "@/lib/db";

export async function GET() {
  try {
    const cookieStore = await cookies();

    const studentId = cookieStore.get("user_id")?.value;

    if (!studentId) {
      return NextResponse.json(
        {
          success: false,
          message: "No autenticado",
        },
        {
          status: 401,
        },
      );
    }

    /*
    ==========================================
    Calificaciones
    ==========================================
    */

    const result = await query(
      `
      SELECT

          s.id,
          s.task_id,

          s.grade,
          s.teacher_feedback,

          s.submitted_at,
          s.graded_at,

          s.comentario,
          s.archivo_url,
          s.archivo_nombre,
          s.archivo_size,

          t.titulo,
          t.descripcion,
          t.max_score,

          c.id AS classroom_id,
          c.nombre AS classroom,

          CONCAT(te.nombre,' ',te.apellido) AS teacher

      FROM classroom_task_submissions s

      INNER JOIN classroom_tasks t
          ON t.id=s.task_id

      INNER JOIN classrooms c
          ON c.id=t.classroom_id

      INNER JOIN teachers te
          ON te.id=t.created_by

      WHERE

          s.student_id=$1
          AND s.grade IS NOT NULL

      ORDER BY

          s.graded_at DESC NULLS LAST,
          s.submitted_at DESC
      `,
      [studentId],
    );

    /*
    ==========================================
    Resumen
    ==========================================
    */

    const grades = result.rows;

    const total = grades.length;

    const average =
      total > 0
        ? (
            grades.reduce(
              (acc: number, item: any) => acc + Number(item.grade),
              0,
            ) / total
          ).toFixed(2)
        : 0;

    const approved = grades.filter(
      (x: any) => Number(x.grade) >= Number(x.max_score) * 0.6,
    ).length;

    return NextResponse.json({
      success: true,

      summary: {
        total,
        approved,
        average: Number(average),
      },

      grades,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error obteniendo calificaciones",
      },
      {
        status: 500,
      },
    );
  }
}
