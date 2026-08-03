import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ taskId: string }> },
) {
  try {
    const { taskId } = await params;

    const task = await query(
      `
      SELECT submission_type
      FROM classroom_tasks
      WHERE id=$1
      `,
      [taskId],
    );

    if (task.rows[0].submission_type !== "pool") {
      return NextResponse.json(
        {
          success: false,
          message: "Esta tarea no admite pool.",
        },
        {
          status: 403,
        },
      );
    }

    const result = await query(
      `
      SELECT

          s.id,
          s.comentario,
          s.archivo_url,
          s.archivo_nombre,
          s.submitted_at,

          st.nombre,
          st.apellido

      FROM classroom_task_submissions s

      INNER JOIN students st
          ON st.id=s.student_id

      WHERE s.task_id=$1

      ORDER BY s.submitted_at DESC
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
