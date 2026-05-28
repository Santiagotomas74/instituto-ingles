import { NextRequest, NextResponse } from "next/server";

import { query } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { nombre, email, telefono, curso, mensaje } = body;

    if (!nombre || !email || !telefono) {
      return NextResponse.json(
        {
          success: false,
          message: "Faltan campos obligatorios",
        },
        {
          status: 400,
        },
      );
    }

    await query(
      `
        INSERT INTO inscriptions
        (
          nombre,
          email,
          telefono,
          curso,
          mensaje
        )
        VALUES ($1, $2, $3, $4, $5)
      `,
      [nombre, email, telefono, curso || null, mensaje || null],
    );

    return NextResponse.json({
      success: true,
      message: "Inscripción enviada correctamente",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error interno del servidor",
      },
      {
        status: 500,
      },
    );
  }
}
