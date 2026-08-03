import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ taskId: string }> },
) {
  try {
    const { taskId } = await params;

    const cookieStore = await cookies();

    const studentId = cookieStore.get("user_id")?.value;

    const result = await query(
      `
      SELECT *
      FROM classroom_task_submissions
      WHERE
          task_id=$1
          AND student_id=$2
      LIMIT 1
      `,
      [taskId, studentId],
    );

    return NextResponse.json({
      success: true,
      submission: result.rows[0] ?? null,
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
