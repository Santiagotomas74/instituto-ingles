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
      SELECT
        s.*
      FROM classroom_students cs
      INNER JOIN students s
        ON s.id = cs.student_id
      WHERE cs.classroom_id = $1
      ORDER BY s.apellido,s.nombre
      `,
      [classroomId],
    );

    return NextResponse.json({
      success: true,
      students: result.rows,
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
