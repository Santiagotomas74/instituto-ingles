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
        c.*,
        CONCAT(t.nombre,' ',t.apellido) AS profesor
      FROM classrooms c
      LEFT JOIN teachers t
        ON t.id = c.profesor_id
      WHERE c.id = $1
      `,
      [classroomId],
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Aula no encontrada",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      classroom: result.rows[0],
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
