import { NextRequest, NextResponse } from "next/server";

import bcrypt from "bcryptjs";

import { query } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { dni, nombre, apellido, fecha_nacimiento, password, nivel } = body;

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
          password,
          nivel
        )
        VALUES ($1, $2, $3, $4, $5, $6)
      `,
      [dni, nombre, apellido, fecha_nacimiento, hashedPassword, nivel],
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
        s.id,
        s.dni,
        s.nombre,
        s.apellido,
        s.email,
        s.status,
        s.nivel,
        COALESCE(
          (
            SELECT json_agg(
              json_build_object(
                'id', c.id,
                'nombre', c.nombre
              )
              ORDER BY c.nombre ASC
            )
            FROM classroom_students cs
            INNER JOIN classrooms c
              ON c.id = cs.classroom_id
            WHERE cs.student_id = s.id
          ),
          '[]'::json
        ) AS classrooms
      FROM students s
      ORDER BY s.apellido ASC, s.nombre ASC
    `);

    return NextResponse.json({
      success: true,
      students: result.rows,
    });
  } catch (error) {
    console.error("ERROR FETCHING STUDENTS:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Error fetching students",
      },
      { status: 500 },
    );
  }
}
