import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { query } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();

    const teacherId = cookieStore.get("user_id")?.value;

    if (!teacherId) {
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

    const {
      classroom_id,
      titulo,
      descripcion,
      instructions,
      due_date,
      due_time,
      allow_submission,
      submission_type,
      max_score,
      is_published,
    } = await req.json();

    if (!classroom_id || !titulo) {
      return NextResponse.json(
        {
          success: false,
          message: "Faltan datos obligatorios",
        },
        {
          status: 400,
        },
      );
    }

    /*
    ==========================================
    Crear tarea
    ==========================================
    */

    const taskResult = await query(
      `
      INSERT INTO classroom_tasks
      (
        classroom_id,
        created_by,
        titulo,
        descripcion,
        instrucciones,
        due_date,
        due_time,
        allow_submission,
        submission_type,
        max_score,
        is_published
      )
      VALUES
      (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11
      )
      RETURNING *;
      `,
      [
        classroom_id,
        teacherId,
        titulo,
        descripcion || null,
        instructions || null,
        due_date || null,
        due_time || null,
        allow_submission ?? true,
        submission_type || "individual",
        max_score ?? 100,
        is_published ?? true,
      ],
    );

    const task = taskResult.rows[0];

    /*
    ==========================================
    Obtener alumnos
    ==========================================
    */

    const students = await query(
      `
      SELECT
          student_id
      FROM classroom_students
      WHERE classroom_id=$1;
      `,
      [classroom_id],
    );

    /*
    ==========================================
    Crear notificaciones
    ==========================================
    */

    /*
==========================================
Crear notificaciones
==========================================
*/

    for (const student of students.rows) {
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
        reference_type,
        action_url
    )
    VALUES
    (
        $1,
        'student',
        'task',
        $2,
        $3,
        $4,
        'task',
        $5
    )
    RETURNING *;
    `,
        [
          student.student_id,

          "📝 Nueva tarea disponible",

          due_date
            ? `El profesor publicó la tarea "${titulo}". Fecha límite: ${due_date}${due_time ? ` ${due_time}` : ""}.`
            : `El profesor publicó una nueva tarea: "${titulo}".`,

          task.id,

          `/student/classroom/${classroom_id}?tab=tasks&task=${task.id}`,
        ],
      );

      const notification = notificationResult.rows[0];

      try {
        await fetch(`${process.env.NEXT_PUBLIC_SOCKET_URL}/emit-notification`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: student.student_id,
            notification,
          }),
        });
      } catch (error) {
        console.error(error);
      }
    }

    return NextResponse.json({
      success: true,
      task,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error creando tarea",
      },
      {
        status: 500,
      },
    );
  }
}
