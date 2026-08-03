import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { classroom_id, titulo, descripcion, fecha, hora, tipo } = body;

    if (!classroom_id || !titulo || !fecha || !hora || !tipo) {
      return NextResponse.json(
        {
          success: false,
          message: "Faltan datos.",
        },
        {
          status: 400,
        },
      );
    }

    /*
    =========================================
    Crear fecha importante
    =========================================
    */

    const result = await query(
      `
      INSERT INTO classroom_events
      (
        classroom_id,
        titulo,
        descripcion,
        fecha,
        hora,
        tipo
      )
      VALUES
      ($1,$2,$3,$4,$5,$6)
      RETURNING *
      `,
      [classroom_id, titulo, descripcion, fecha, hora, tipo],
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

    /*
=========================================
Determinar nombre del tipo
=========================================
*/

    let tipoNombre = "evento";

    switch (tipo) {
      case "clase":
        tipoNombre = "clase";
        break;

      case "examen":
        tipoNombre = "examen";
        break;

      case "reunion":
        tipoNombre = "reunión";
        break;

      case "evento":
        tipoNombre = "evento";
        break;
    }

    /*
=========================================
Crear notificaciones
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
        type,
        reference_id,
        reference_type,
        action_url
    )
    VALUES
    (
        $1,
        'student',
        '📅 Nueva fecha importante',
        $2,
        'calendar',
        $3,
        'classroom_event',
        $4
    )
    RETURNING *;
    `,
        [
          student.student_id,

          descripcion
            ? `Se programó un ${tipoNombre}: "${titulo}" para el ${fecha} a las ${hora}. ${descripcion}`
            : `Se programó un ${tipoNombre}: "${titulo}" para el ${fecha} a las ${hora}.`,

          result.rows[0].id,

          `/student/classroom/${classroom_id}?tab=events`,
        ],
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
    /*
    =========================================
    Respuesta
    =========================================
    */

    return NextResponse.json({
      success: true,
      importantDate: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error interno",
      },
      {
        status: 500,
      },
    );
  }
}
