import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log("Received announcement data:", body);

    const { classroom_id, titulo, contenido, is_important } = body;

    if (!classroom_id || !titulo || !contenido) {
      return NextResponse.json(
        {
          success: false,
          message: "Faltan datos obligatorios",
        },
        { status: 400 },
      );
    }

    const result = await query(
      `
  INSERT INTO classroom_announcements (
    classroom_id,
    titulo,
    contenido,
    is_important
  )
  VALUES ($1,$2,$3,$4)
  RETURNING *
  `,
      [classroom_id, titulo, contenido, is_important ?? false],
    );

    return NextResponse.json({
      success: true,
      announcement: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error creando anuncio",
      },
      { status: 500 },
    );
  }
}
