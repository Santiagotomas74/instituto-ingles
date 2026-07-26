import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ classroomId: string }> },
) {
  try {
    const { classroomId } = await params;
    console.log(classroomId + "holaaa");

    const result = await query(
      `
      SELECT
        id,
        classroom_id,
        titulo,
        descripcion,
        fecha,
        hora,
        tipo,
        created_at
      FROM classroom_events
      WHERE classroom_id = $1
      ORDER BY fecha ASC, hora ASC
      `,
      [classroomId],
    );

    return NextResponse.json({
      success: true,
      importantDates: result.rows,
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
