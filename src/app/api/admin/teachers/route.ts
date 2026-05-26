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

    const { dni, nombre, apellido, fecha_nacimiento, email, password } = body;

    // Validaciones
    if (!dni || !nombre || !apellido || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Faltan campos",
        },
        { status: 400 },
      );
    }

    // Verificar email existente
    const existingTeacher = await query(
      `
        SELECT id
        FROM teachers
        WHERE email = $1
        LIMIT 1
      `,
      [email],
    );

    if (existingTeacher.rows.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "El email ya existe",
        },
        { status: 400 },
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert
    await query(
      `
    INSERT INTO teachers (
      dni,
      nombre,
      apellido,
      fecha_nacimiento,
      email,
      password
    )
    VALUES ($1, $2, $3, $4, $5, $6)
  `,
      [dni, nombre, apellido, fecha_nacimiento, email, hashedPassword],
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
