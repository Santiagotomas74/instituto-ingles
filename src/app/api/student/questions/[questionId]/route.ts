import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ questionId: string }> },
) {
  try {
    const { questionId } = await params;

    // ============================
    // Consulta
    // ============================

    const questionResult = await query(
      `
      SELECT
        q.id,
        q.titulo,
        q.contenido,
        q.created_at,

        s.nombre AS student_name,
        s.apellido AS student_lastname

      FROM classroom_questions q

      INNER JOIN students s
        ON s.id = q.student_id

      WHERE q.id = $1
      `,
      [questionId],
    );

    if (questionResult.rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Consulta no encontrada",
        },
        { status: 404 },
      );
    }

    // ============================
    // Respuestas
    // ============================

    const repliesResult = await query(
      `SELECT
    a.id,
    a.contenido,
    a.created_at,

    CASE
        WHEN a.teacher_id IS NOT NULL THEN 'teacher'
        ELSE 'student'
    END AS sender_type,

    st.nombre AS student_name,
    st.apellido AS student_lastname,

    t.nombre AS teacher_name,
    t.apellido AS teacher_lastname

FROM classroom_question_answers a

LEFT JOIN students st
    ON st.id = a.student_id

LEFT JOIN teachers t
    ON t.id = a.teacher_id

WHERE a.question_id = $1

ORDER BY a.created_at ASC;
      
      `,
      [questionId],
    );

    return NextResponse.json({
      success: true,
      question: questionResult.rows[0],
      replies: repliesResult.rows,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error interno",
      },
      {
        status: 500,
      },
    );
  }
}
