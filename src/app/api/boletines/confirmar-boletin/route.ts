import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const boletinId = searchParams.get("boletin_id");

    const result = await query(
      `
      SELECT *
      FROM confirmaciones_boletin
      WHERE boletin_id = $1
      LIMIT 1
      `,
      [boletinId],
    );

    return NextResponse.json({
      confirmed: result.rows.length > 0,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        confirmed: false,
      },
      {
        status: 500,
      },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { boletin_id, nombre, apellido, dni } = body;

    await query(
      `
        INSERT INTO confirmaciones_boletin (
          boletin_id,
          nombre,
          apellido,
          dni
        )
        VALUES ($1, $2, $3, $4)
      `,
      [boletin_id, nombre, apellido, Number(dni)],
    );

    return NextResponse.json({
      success: true,
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
