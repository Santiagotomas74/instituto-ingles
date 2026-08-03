import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ taskId: string }>;
  },
) {
  try {
    const { taskId } = await params;

    const result = await query(
      `
      SELECT

          s.id,
          s.task_id,
          s.student_id,

          s.comentario,
          s.archivo_url,
          s.archivo_nombre,
          s.archivo_size,
          s.link,

          s.grade,
          s.teacher_feedback,

          s.submitted_at,
          s.graded_at,

          st.nombre,
          st.apellido,
          st.email,

          t.max_score

      FROM classroom_task_submissions s

      INNER JOIN students st
          ON st.id = s.student_id

      INNER JOIN classroom_tasks t
          ON t.id = s.task_id

      WHERE s.task_id = $1

      ORDER BY
          st.apellido,
          st.nombre
      `,
      [taskId],
    );

    return NextResponse.json({
      success: true,
      submissions: result.rows,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      },
    );
  }
}
