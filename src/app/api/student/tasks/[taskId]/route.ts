import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ taskId: string }> },
) {
  try {
    const { taskId } = await params;

    const result = await query(
      `
      SELECT *
      FROM classroom_tasks
      WHERE id=$1
      LIMIT 1
      `,
      [taskId],
    );

    return NextResponse.json({
      success: true,
      task: result.rows[0],
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
