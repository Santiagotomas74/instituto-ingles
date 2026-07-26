import { NextRequest, NextResponse } from "next/server";

import { query } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ classroomId: string }> },
) {
  try {
    const { classroomId } = await params;

    const result = await query(
      `
      SELECT
        id,
        titulo,
        descripcion,
        fecha,
        hora,
        tipo
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
    console.error("Error obteniendo fechas importantes:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Error interno",
      },
      { status: 500 },
    );
  }
}
