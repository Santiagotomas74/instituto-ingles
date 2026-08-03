import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
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

    const result = await query(
      `
SELECT

t.id,
t.classroom_id,

t.titulo,
t.descripcion,

t.due_date,
t.due_time,

t.max_score,

c.nombre AS classroom,

te.nombre || ' ' || te.apellido AS teacher

FROM classroom_tasks t

INNER JOIN classrooms c
ON c.id=t.classroom_id

INNER JOIN teachers te
ON te.id=t.created_by

INNER JOIN classroom_students cs
ON cs.classroom_id=t.classroom_id

LEFT JOIN classroom_task_submissions s
ON s.task_id=t.id
AND s.student_id=cs.student_id

WHERE

cs.student_id=$1

AND t.is_published=true

AND t.allow_submission=true

AND s.id IS NULL

ORDER BY

t.due_date ASC NULLS LAST,
t.due_time ASC NULLS LAST,
t.created_at DESC
`,
      [studentId],
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
