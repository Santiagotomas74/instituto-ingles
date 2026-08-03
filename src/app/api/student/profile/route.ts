import { NextResponse } from "next/server";

import { cookies } from "next/headers";

import { query } from "@/lib/db";

export async function GET() {
  try {
    const cookieStore = await cookies();

    const studentId = cookieStore.get("user_id")?.value;
    console.log("studentId aaaaa", studentId);

    if (!studentId) {
      return NextResponse.json(
        {
          success: false,
          message: "No autorizado",
        },
        {
          status: 401,
        },
      );
    }

    /*
    ===========================
    Datos personales
    ===========================
    */

    const studentResult = await query(
      `
   SELECT
    s.id,
    s.nombre,
    s.apellido,
    s.email,
    s.dni,
    s.fecha_nacimiento,
    s.nivel,
    s.status,
    s.created_at
FROM students s
WHERE s.id=$1
      `,
      [studentId],
    );

    if (!studentResult.rowCount) {
      return NextResponse.json(
        {
          success: false,
        },
        {
          status: 404,
        },
      );
    }

    const student = studentResult.rows[0];

    /*
    ===========================
    Profesor
    ===========================
    */

    const teacherResult = await query(
      `
      SELECT
          t.nombre,
          t.apellido
      FROM classroom_students cs

      INNER JOIN classrooms c
          ON c.id=cs.classroom_id

      INNER JOIN teachers t
          ON t.id=c.profesor_id

      WHERE cs.student_id=$1

      LIMIT 1
      `,
      [studentId],
    );

    /*
    ===========================
    Cantidad aulas
    ===========================
    */

    const classroomsResult = await query(
      `
      SELECT COUNT(*)::int total
      FROM classroom_students
      WHERE student_id=$1
      `,
      [studentId],
    );

    /*
    ===========================
    Pendientes
    ===========================
    */

    const pendingResult = await query(
      `
      SELECT COUNT(*)::int total

      FROM classroom_tasks t

      INNER JOIN classroom_students cs
          ON cs.classroom_id=t.classroom_id

      WHERE
          cs.student_id=$1
          AND t.is_published=true

          AND NOT EXISTS
          (
              SELECT 1

              FROM classroom_task_submissions s

              WHERE
                  s.task_id=t.id
                  AND s.student_id=$1
          )
      `,
      [studentId],
    );

    /*
    ===========================
    Promedio
    ===========================
    */

    const averageResult = await query(
      `
      SELECT
          COALESCE(ROUND(AVG(grade),2),0) average
      FROM classroom_task_submissions
      WHERE
          student_id=$1
          AND grade IS NOT NULL
      `,
      [studentId],
    );

    /*
    ===========================
    Asistencia
    (temporal)
    ===========================
    */

    const attendance = 100;

    return NextResponse.json({
      success: true,
      profile: {
        ...student,

        teacher:
          teacherResult.rowCount > 0
            ? `${teacherResult.rows[0].nombre} ${teacherResult.rows[0].apellido}`
            : null,

        classrooms: classroomsResult.rows[0].total,

        pending_tasks: pendingResult.rows[0].total,

        average: Number(averageResult.rows[0].average),

        attendance,
      },
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
