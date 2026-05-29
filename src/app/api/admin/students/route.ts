import { NextRequest, NextResponse } from "next/server";

import bcrypt from "bcryptjs";

import { query } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { dni, nombre, apellido, fecha_nacimiento, email, password, nivel } =
      body;

    /* HASH PASSWORD */

    const hashedPassword = await bcrypt.hash(password, 10);

    /* INSERT */

    await query(
      `
        INSERT INTO students (
          dni,
          nombre,
          apellido,
          fecha_nacimiento,
          email,
          password,
          nivel
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `,
      [dni, nombre, apellido, fecha_nacimiento, email, hashedPassword, nivel],
    );

    return NextResponse.json({
      success: true,
      message: "Alumno creado",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error creando alumno",
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const result = await query(`
      SELECT
        students.id,
        students.dni,
        students.nombre,
        students.apellido,
        students.email,
        students.status,
        students.nivel,
        classrooms.nombre AS classroom
      FROM students
      LEFT JOIN classroom_students
        ON classroom_students.student_id = students.id
      LEFT JOIN classrooms
        ON classrooms.id = classroom_students.classroom_id
      ORDER BY students.apellido ASC
    `);

    return NextResponse.json({
      success: true,
      students: result.rows,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error fetching students",
      },
      { status: 500 },
    );
  }
}
