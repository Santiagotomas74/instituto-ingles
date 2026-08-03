import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log("Received announcement data:", body);

    const { classroom_id, title, content, is_important } = body;

    if (!classroom_id || !title || !content) {
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
      [classroom_id, title, content, is_important ?? false],
    );

    /*
    =========================================
    Buscar estudiantes del aula
    =========================================
    */

    const students = await query(
      `
      SELECT student_id
      FROM classroom_students
      WHERE classroom_id=$1
      `,
      [classroom_id],
    );

    /*
    =========================================
    Crear notificación para cada alumno
    =========================================
    */
    for (const student of students.rows) {
      const notificationResult = await query(
        `
        INSERT INTO notifications
        (
          user_id,
          role,
          title,
          description,
          type
        )
        VALUES
        (
          $1,
          'student',
          'Nueva anuncio en tu aula',
          $2,
          'event'
        )
        RETURNING *
        `,
        [student.student_id, `${title} `],
      );

      try {
        await fetch(`${process.env.NEXT_PUBLIC_SOCKET_URL}/emit-notification`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: student.student_id,
            notification: notificationResult.rows[0],
          }),
        });
      } catch (error) {
        console.error(error);
      }
    }

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
