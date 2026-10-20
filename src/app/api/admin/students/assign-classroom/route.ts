import { NextResponse } from "next/server";
import { query } from "@/lib/db";

/*
=====================================================
ASIGNAR CLASSROOM A ESTUDIANTE (agrega, no reemplaza)
Requiere: UNIQUE (student_id, classroom_id) en classroom_students
=====================================================
*/
export async function POST(request: Request) {
  try {
    const { student_id, classroom_id } = await request.json();

    if (!student_id || !classroom_id) {
      return NextResponse.json(
        { success: false, message: "Datos incompletos" },
        { status: 400 },
      );
    }

    await query(
      `
        INSERT INTO classroom_students (student_id, classroom_id)
        VALUES ($1, $2)
        ON CONFLICT (student_id, classroom_id) DO NOTHING
      `,
      [student_id, classroom_id],
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("ERROR ASIGNANDO CLASSROOM:", error);

    return NextResponse.json(
      { success: false, message: "Error interno" },
      { status: 500 },
    );
  }
}

/*
=====================================================
QUITAR CLASSROOM DE UN ESTUDIANTE
=====================================================
*/
export async function DELETE(request: Request) {
  try {
    const { student_id, classroom_id } = await request.json();

    if (!student_id || !classroom_id) {
      return NextResponse.json(
        { success: false, message: "Datos incompletos" },
        { status: 400 },
      );
    }

    await query(
      `
        DELETE FROM classroom_students
        WHERE student_id = $1 AND classroom_id = $2
      `,
      [student_id, classroom_id],
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("ERROR QUITANDO CLASSROOM:", error);

    return NextResponse.json(
      { success: false, message: "Error interno" },
      { status: 500 },
    );
  }
}
