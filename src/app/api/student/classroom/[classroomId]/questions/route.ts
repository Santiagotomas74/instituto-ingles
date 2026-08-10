import { NextResponse } from "next/server";
import { query } from "@/lib/db";

type Props = {
  params: Promise<{
    classroomId: string;
  }>;
};

export async function GET(req: Request, { params }: Props) {
  try {
    const { classroomId } = await params;

    const result = await query(
      `
      SELECT

        q.id,
        q.titulo,
        q.contenido,
        q.student_id,

        s.nombre AS student_name,
        s.apellido AS student_lastname,

        q.created_at,

        COUNT(a.id)::int AS replies

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

      ORDER BY q.created_at DESC
      `,
      [classroomId],
    );

    return NextResponse.json({
      success: true,
      questions: result.rows,
    });
  } catch (err) {
    console.error(err);

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
