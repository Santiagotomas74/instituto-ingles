import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { query } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ classroomId: string }> },
) {
  try {
    const { classroomId } = await params;

    const cookieStore = await cookies();

    const studentId = cookieStore.get("user_id")?.value;

    const result = await query(
      `
      SELECT

          t.id,
          t.titulo,
          t.descripcion,
          t.instrucciones,
          t.due_date,
          t.due_time,
          t.allow_submission,
          t.submission_type,
          t.max_score,
          t.is_published,
          t.created_at,

          s.id               AS submission_id,
          s.submitted_at,
          s.grade,
          s.teacher_feedback,
          s.archivo_url,
          s.archivo_nombre,
          s.comentario

      FROM classroom_tasks t

      LEFT JOIN classroom_task_submissions s
          ON s.task_id=t.id
         AND s.student_id=$2

      WHERE
          t.classroom_id=$1
          AND t.is_published=true

      ORDER BY
          t.due_date ASC,
          t.due_time ASC;
      `,
      [classroomId, studentId],
    );

    return NextResponse.json({
      success: true,
      tasks: result.rows,
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
