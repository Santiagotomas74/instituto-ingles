import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { classroom_id, titulo, descripcion, fecha, hora, tipo } = body;
    console.log(body);

    if (!classroom_id || !titulo || !fecha || !hora || !tipo) {
      return NextResponse.json(
        {
          success: false,
          message: "Faltan datos.",
        },
        {
          status: 400,
        },
      );
    }

    const result = await query(
      `
      INSERT INTO classroom_events
      (
        classroom_id,
        titulo,
        descripcion,
        fecha,
        hora,
        tipo
      )
      VALUES
      ($1,$2,$3,$4,$5,$6)
      RETURNING *
      `,
      [classroom_id, titulo, descripcion, fecha, hora, tipo],
    );

    return NextResponse.json({
      success: true,
      importantDate: result.rows[0],
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
