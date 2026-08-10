import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    await query(
      `
      DELETE FROM classroom_materials
      WHERE id = $1
      `,
      [id],
    );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error eliminando material",
      },
      { status: 500 },
    );
  }
}

export async function PATCH(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
) {
  try {
    const { id } = await params;

    const adminId = req.cookies.get("user_id")?.value;

    if (!adminId) {
      return NextResponse.json(
        {
          success: false,
          message: "Administrador no autenticado",
        },
        { status: 401 },
      );
    }

    const body = await req.json();

    const {
      titulo,
      descripcion,
      tipo,
      material_category,
      sub_category,
      contenido_texto,
      url,
      is_published,
      orden,
    } = body;

    if (!titulo || !tipo) {
      return NextResponse.json(
        {
          success: false,
          message: "Título y tipo son obligatorios",
        },
        { status: 400 },
      );
    }

    const result = await query(
      `
        UPDATE classroom_materials
        SET
          titulo = $1,
          descripcion = $2,
          tipo = $3,
          material_category = $4,
          sub_category = $5,
          contenido_texto = $6,
          url = $7,
          is_published = $8,
          orden = $9
        WHERE id = $10
        RETURNING *
      `,
      [
        titulo,
        descripcion || null,
        tipo,
        material_category || null,
        sub_category || null,
        contenido_texto || null,
        url || null,
        is_published ?? true,
        orden ?? 0,
        id,
      ],
    );

    if (result.rowCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Material no encontrado",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      material: result.rows[0],
    });
  } catch (error) {
    console.error("Error actualizando material:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Error actualizando material",
      },
      { status: 500 },
    );
  }
}
