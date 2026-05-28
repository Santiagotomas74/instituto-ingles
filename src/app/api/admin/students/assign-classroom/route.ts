import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { student_id, classroom_id } = body;

    if (!student_id || !classroom_id) {
      return NextResponse.json(
        {
          success: false,
          message: "Datos incompletos",
        },
        { status: 400 },
      );
    }

    // eliminar classroom previa
    await query(
      `
        DELETE FROM classroom_students
        WHERE student_id = $1
      `,
      [student_id],
    );

    // insertar nueva
    await query(
      `
        INSERT INTO classroom_students (
          classroom_id,
          student_id
        )
        VALUES ($1, $2)
      `,
      [classroom_id, student_id],
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
      { status: 500 },
    );
  }
}
