import { NextResponse } from "next/server";
import { query } from "@/lib/db";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

/* GET CLASSROOM */

export async function GET(req: Request, { params }: Params) {
  try {
    const { id } = await params;

    const result = await query(
      `
        SELECT *
        FROM classrooms
        WHERE id = $1
      `,
      [id],
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Classroom no encontrada",
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

/* UPDATE CLASSROOM */

export async function PUT(req: Request, { params }: Params) {
  try {
    const { id } = await params;

    const body = await req.json();

    const { nombre, nivel, modalidad, horario, profesor_id } = body;

    await query(
      `
        UPDATE classrooms
        SET
          nombre = $1,
          nivel = $2,
          modalidad = $3,
          horario = $4,
          profesor_id = $5
        WHERE id = $6
      `,
      [nombre, nivel, modalidad, horario, profesor_id, id],
    );

    return NextResponse.json({
      success: true,
      message: "Classroom actualizada",
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
