import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function PATCH(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ submissionId: string }>;
  },
) {
  try {
    const { submissionId } = await params;

    const body = await req.json();

    const { grade, teacher_feedback } = body;

    /*
    ====================================
    Corregir entrega
    ====================================
    */

    const result = await query(
      `
      UPDATE classroom_task_submissions
      SET
          grade = $1,
          teacher_feedback = $2,
          graded_at = NOW()
      WHERE id = $3
      RETURNING *;
      `,
      [grade, teacher_feedback, submissionId],
    );

    if (!result.rowCount) {
      return NextResponse.json(
        {
          success: false,
          message: "Entrega inexistente",
        },
        {
          status: 404,
        },
      );
    }

    const submission = result.rows[0];

    /*
    ====================================
    Obtener datos de la tarea
    ====================================
    */

    const taskResult = await query(
      `
      SELECT
          titulo,
          max_score
      FROM classroom_tasks
      WHERE id = $1
      `,
      [submission.task_id],
    );

    const task = taskResult.rows[0];

    /*
    ====================================
    Crear notificación
    ====================================
    */

    const notificationResult = await query(
      `
      INSERT INTO notifications
      (
          user_id,
          role,
          type,
          title,
          description,
          reference_id,
          reference_type
      )
      VALUES
      (
          $1,
          'student',
          'task_grade',
          'Tarea corregida',
          $2,
          $3,
          'task_submission'
      )
      RETURNING *;
      `,
      [
        submission.student_id,
        `Tu tarea "${task.titulo}" fue corregida. Calificación: ${grade}/${task.max_score}`,
        submission.id,
      ],
    );

    const notification = notificationResult.rows[0];

    /*
    ====================================
    Socket
    ====================================
    */

    try {
      await fetch(`${process.env.NEXT_PUBLIC_SOCKET_URL}/emit-notification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: submission.student_id,
          notification,
        }),
      });
    } catch (error) {
      console.error(error);
    }

    return NextResponse.json({
      success: true,
      submission: result.rows[0],
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
