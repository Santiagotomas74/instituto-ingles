import { NextResponse, NextRequest } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const result = await query(`
      SELECT
        classrooms.*,

        teachers.nombre AS profesor_nombre,
        teachers.apellido AS profesor_apellido

      FROM classrooms

      LEFT JOIN teachers
      ON teachers.id = classrooms.profesor_id

      ORDER BY classrooms.created_at DESC
    `);

    return NextResponse.json({
      success: true,
      classrooms: result.rows,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error obteniendo classrooms",
      },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { nombre, nivel, modalidad, horario, profesor_id } = body;

    await query(
      `
        INSERT INTO classrooms (
          nombre,
          nivel,
          modalidad,
          horario,
          profesor_id
        )
        VALUES ($1, $2, $3, $4, $5)
      `,
      [nombre, nivel, modalidad, horario, profesor_id || null],
    );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error creando classroom",
      },
      { status: 500 },
    );
  }
}
