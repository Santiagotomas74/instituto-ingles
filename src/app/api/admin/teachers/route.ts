import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import { query } from "@/lib/db";

/* ========================================
   GET ALL TEACHERS
======================================== */
export async function GET() {
  try {
    const result = await query(`
      SELECT *
      FROM teachers
      ORDER BY created_at DESC
    `);

    return NextResponse.json({
      success: true,
      teachers: result.rows,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error obteniendo profesores",
      },
      { status: 500 },
    );
  }
}
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { nombre, apellido, fecha_nacimiento, password } = body;

    if (!nombre?.trim() || !apellido?.trim() || !password?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Nombre, apellido y contraseña son obligatorios",
        },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const birthDate = fecha_nacimiento || null;

    await query(
      `
      INSERT INTO teachers (
        nombre,
        apellido,
        fecha_nacimiento,
        password
      )
      VALUES ($1, $2, $3, $4)
      `,
      [nombre.trim(), apellido.trim(), birthDate, hashedPassword],
    );

    return NextResponse.json({
      success: true,
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
