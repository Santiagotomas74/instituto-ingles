import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { query } from "@/lib/db";

type Props = {
  params: Promise<{
    classroomId: string;
  }>;
};

export async function GET(req: Request, { params }: Props) {
  try {
    const { classroomId } = await params;

    const cookieStore = await cookies();

    const teacherId = cookieStore.get("user_id")?.value;

    if (!teacherId) {
      return NextResponse.json(
        {
          success: false,
          message: "Profesor no autenticado",
        },
        {
          status: 401,
        },
      );
    }

    // ============================
    // Verificar que el aula pertenezca al profesor
    // ============================

    const classroom = await query(
      `
      SELECT id
      FROM classrooms
      WHERE id = $1
        AND profesor_id = $2
      `,
      [classroomId, teacherId],
    );

    if (classroom.rowCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Aula no encontrada",
        },
        {
          status: 404,
        },
      );
    }

    // ============================
    // Consultas
    // ============================

    const result = await query(
      `
      SELECT
          q.id,
          q.titulo,
          q.contenido,
          q.created_at,
          q.is_closed,

          s.nombre AS student_name,
          s.apellido AS student_lastname,

          COUNT(a.id)::int AS replies_count

      FROM classroom_questions q

      INNER JOIN students s
          ON s.id = q.student_id

      LEFT JOIN classroom_question_answers a
          ON a.question_id = q.id

      WHERE q.classroom_id = $1

      GROUP BY
          q.id,
          s.nombre,
          s.apellido

      ORDER BY
          q.is_closed ASC,
          q.created_at DESC
      `,
      [classroomId],
    );

    return NextResponse.json({
      success: true,
      questions: result.rows,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error obteniendo consultas",
      },
      {
        status: 500,
      },
    );
  }
}
