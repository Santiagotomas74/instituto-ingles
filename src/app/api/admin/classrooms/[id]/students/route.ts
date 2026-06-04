import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    const result = await query(
      `
      SELECT
        s.id,
        s.nombre,
        s.apellido,
        s.email,
        s.nivel,
        s.status
      FROM classroom_students cs
      INNER JOIN students s
        ON s.id = cs.student_id
      WHERE cs.classroom_id = $1
      ORDER BY s.apellido, s.nombre
      `,
      [id],
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
        message: "Error obteniendo alumnos",
      },
      { status: 500 },
    );
  }
}
