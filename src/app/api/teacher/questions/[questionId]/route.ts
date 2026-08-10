import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { query } from "@/lib/db";

type Props = {
  params: Promise<{
    questionId: string;
  }>;
};

export async function GET(req: Request, { params }: Props) {
  try {
    const { questionId } = await params;

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

    // ==========================
    // Obtener consulta
    // ==========================

    const questionResult = await query(
      `
      SELECT

          q.*,

          s.nombre   AS student_name,
          s.apellido AS student_lastname,

          c.profesor_id

      FROM classroom_questions q

      INNER JOIN students s
          ON s.id = q.student_id

      INNER JOIN classrooms c
          ON c.id = q.classroom_id

      WHERE q.id = $1
      `,
      [questionId],
    );

    if (questionResult.rowCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Consulta inexistente",
        },
        {
          status: 404,
        },
      );
    }

    const question = questionResult.rows[0];

    if (question.profesor_id !== teacherId) {
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

    // ==========================
    // Respuestas
    // ==========================

    const answersResult = await query(
      `
      SELECT

          a.*,

          s.nombre   AS student_name,
          s.apellido AS student_lastname,

          t.nombre   AS teacher_name,
          t.apellido AS teacher_lastname

      FROM classroom_question_answers a

      LEFT JOIN students s
          ON s.id = a.student_id

      LEFT JOIN teachers t
          ON t.id = a.teacher_id

      WHERE a.question_id = $1

      ORDER BY a.created_at ASC
      `,
      [questionId],
    );

    return NextResponse.json({
      success: true,
      question,
      answers: answersResult.rows,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error obteniendo conversación",
      },
      {
        status: 500,
      },
    );
  }
}
