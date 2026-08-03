import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log("Received material data:", body);

    // Capturar cookie del profesor
    const teacherId = req.cookies.get("user_id")?.value;

    console.log("Teacher ID desde cookie:", teacherId);

    const {
      classroom_id,
      titulo,
      descripcion,
      tipo,
      material_category,
      contenido_texto,
      url,
      archivo_url,
      archivo_nombre,
      archivo_size,
      is_published,
      orden,
    } = body;

    if (!classroom_id || !titulo || !tipo) {
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
      INSERT INTO classroom_materials (
        classroom_id,
        titulo,
        descripcion,
        tipo,
        material_category,
        contenido_texto,
        url,
        archivo_url,
        archivo_nombre,
        archivo_size,
        is_published,
        orden,
        created_by
      )
      VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13
      )
      RETURNING *
      `,
      [
        classroom_id,
        titulo,
        descripcion || null,
        tipo,
        material_category || null,
        contenido_texto || null,
        url || null,
        archivo_url || null,
        archivo_nombre || null,
        archivo_size || null,
        is_published ?? true,
        orden ?? 0,

        // acá queda guardado el profesor
        teacherId || null,
      ],
    );

    const students = await query(
      `
  SELECT
      student_id
  FROM classroom_students
  WHERE classroom_id = $1
  `,
      [classroom_id],
    );

    for (const student of students.rows) {
      const notification = await query(
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
        '📚 Nuevo material disponible',
        $2,
        'material',
        $3,
        'classroom_material',
        $4
    )
    RETURNING *;
    `,
        [
          student.student_id,

          descripcion
            ? `El profesor publicó "${titulo}". ${descripcion}`
            : `El profesor publicó el material "${titulo}".`,

          result.rows[0].id,

          `/student/classroom/${classroom_id}?tab=materials`,
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
            notification: notification.rows[0],
          }),
        });
      } catch (error) {
        console.error(error);
      }
    }
    return NextResponse.json({
      success: true,
      material: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error al crear material",
      },
      { status: 500 },
    );
  }
}
