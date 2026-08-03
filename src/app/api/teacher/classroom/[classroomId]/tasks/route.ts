import { NextResponse } from "next/server";

import { query } from "@/lib/db";

type Params = {
  params: Promise<{
    classroomId: string;
  }>;
};

/*
==================================================
GET
==================================================
*/

export async function GET(req: Request, { params }: Params) {
  try {
    const { classroomId } = await params;

    const result = await query(
      `
      SELECT
          t.*,

          COUNT(s.id) AS submissions

      FROM classroom_tasks t

      LEFT JOIN classroom_task_submissions s
          ON s.task_id=t.id

      WHERE t.classroom_id=$1

      GROUP BY t.id

      ORDER BY t.created_at DESC;
      `,
      [classroomId],
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
        message: "Error obteniendo tareas",
      },
      {
        status: 500,
      },
    );
  }
}
