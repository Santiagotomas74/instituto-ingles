import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ classroomId: string }> },
) {
  try {
    const { classroomId } = await params;

    const result = await query(
      `
      SELECT *
      FROM classroom_announcements
      WHERE classroom_id = $1
      ORDER BY created_at DESC
      `,
      [classroomId],
    );

    return NextResponse.json({
      success: true,
      announcements: result.rows,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error interno",
      },
      { status: 500 },
    );
  }
}
