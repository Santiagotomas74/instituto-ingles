import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { query } from "@/lib/db";

export async function POST(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ taskId: string }>;
  },
) {
  try {
    const { taskId } = await params;

    const cookieStore = await cookies();

    const studentId = cookieStore.get("user_id")?.value;

    if (!studentId) {
      return NextResponse.json(
        {
          success: false,
        },
        {
          status: 401,
        },
      );
    }

    const body = await req.json();

    const { comentario, archivo_url, archivo_nombre, archivo_size } = body;

    /*
    ==========================
    Guardar entrega
    ==========================
    */

    const result = await query(
      `
      INSERT INTO classroom_task_submissions
      (
          task_id,
          student_id,
          comentario,
          archivo_url,
          archivo_nombre,
          archivo_size,
          submitted_at
      )
      VALUES
      (
          $1,
          $2,
          $3,
          $4,
          $5,
          $6,
          NOW()
      )

      ON CONFLICT (task_id, student_id)

      DO UPDATE SET

          comentario=EXCLUDED.comentario,
          archivo_url=EXCLUDED.archivo_url,
          archivo_nombre=EXCLUDED.archivo_nombre,
          archivo_size=EXCLUDED.archivo_size,
          submitted_at=NOW()

      RETURNING *;
      `,
      [
        taskId,
        studentId,
        comentario,
        archivo_url,
        archivo_nombre,
        archivo_size,
      ],
    );

    const submission = result.rows[0];

    /*
    ==========================
    Obtener información
    ==========================
    */

    const infoResult = await query(
      `
      SELECT

          t.titulo,

          s.nombre,
          s.apellido,

          c.profesor_id AS teacher_id

      FROM classroom_tasks t

      INNER JOIN classrooms c
          ON c.id=t.classroom_id

      INNER JOIN students s
          ON s.id=$2

      WHERE t.id=$1
      `,
      [taskId, studentId],
    );

    if (infoResult.rowCount) {
      const info = infoResult.rows[0];

      /*
      ==========================
      Crear notificación
      ==========================
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
            'teacher',
            'task_submission',
            'Nueva entrega de tarea',
            $2,
            $3,
            'task_submission'
        )

        RETURNING *;
        `,
        [
          info.teacher_id,
          `${info.nombre} ${info.apellido} entregó la tarea "${info.titulo}".`,
          submission.id,
        ],
      );

      const notification = notificationResult.rows[0];

      /*
      ==========================
      Socket
      ==========================
      */

      try {
        await fetch(`${process.env.NEXT_PUBLIC_SOCKET_URL}/emit-notification`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: info.teacher_id,
            notification,
          }),
        });
      } catch (e) {
        console.error(e);
      }
    }

    return NextResponse.json({
      success: true,
      submission,
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
