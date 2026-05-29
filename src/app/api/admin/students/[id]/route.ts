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
        id,
        nombre,
        apellido,
        email,
        dni,
        nivel,
        status
      FROM students
      WHERE id = $1
      `,
      [id],
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Alumno no encontrado",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      student: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      { status: 500 },
    );
  }
}
export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    const body = await req.json();

    const { nombre, apellido, email, dni, nivel, status } = body;

    await query(
      `
      UPDATE students
      SET
        nombre = $1,
        apellido = $2,
        email = $3,
        dni = $4,
        nivel = $5,
        status = $6
      WHERE id = $7
      `,
      [nombre, apellido, email, dni, nivel, status, id],
    );

    return NextResponse.json({
      success: true,
      message: "Alumno actualizado correctamente",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      { status: 500 },
    );
  }
}
