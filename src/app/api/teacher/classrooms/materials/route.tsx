import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log("Received material data:", body);

    // Capturar cookie del profesor
    const teacherId = req.cookies.get("teacher_id")?.value;

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
