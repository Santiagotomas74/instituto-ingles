import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { cookies } from "next/headers";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const result = await query(
      `
      DELETE FROM classroom_materials
      WHERE id=$1
      RETURNING *;
      `,
      [id],
    );

    if (!result.rowCount) {
      return NextResponse.json(
        {
          success: false,
          message: "Material no encontrado",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Material eliminado",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error eliminando material",
      },
      {
        status: 500,
      },
    );
  }
}

type Props = {
  params: Promise<{
    materialId: string;
  }>;
};

export async function PATCH(req: NextRequest, { params }: Props) {
  try {
    // =====================================================
    // Parámetros
    // =====================================================

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "ID del material requerido",
        },
        {
          status: 400,
        },
      );
    }

    // =====================================================
    // Profesor autenticado
    // =====================================================

    const cookieStore = await cookies();

    const teacherId = cookieStore.get("user_id")?.value;

    if (!teacherId) {
      return NextResponse.json(
        {
          success: false,
          message: "Profesor no autenticado",
        },
        {
          status: 401,
        },
      );
    }

    // =====================================================
    // Body
    // =====================================================

    const body = await req.json();

    const {
      titulo,
      descripcion,
      tipo,
      material_category,
      sub_category,
      contenido_texto,
      url,
      archivo_url,
      archivo_nombre,
      archivo_size,
      is_published,
      orden,
    } = body;

    // =====================================================
    // Validaciones
    // =====================================================

    if (!titulo?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "El título es obligatorio",
        },
        {
          status: 400,
        },
      );
    }

    if (!tipo) {
      return NextResponse.json(
        {
          success: false,
          message: "El tipo de material es obligatorio",
        },
        {
          status: 400,
        },
      );
    }

    // =====================================================
    // Verificar que el material exista
    // y pertenezca al profesor
    // =====================================================

    const materialResult = await query(
      `
      SELECT
          id,
          classroom_id,
          created_by

      FROM classroom_materials

      WHERE id = $1
      `,
      [id],
    );

    if (materialResult.rowCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Material no encontrado",
        },
        {
          status: 404,
        },
      );
    }

    const material = materialResult.rows[0];

    // =====================================================
    // Verificar propietario
    // =====================================================

    if (material.created_by !== teacherId) {
      return NextResponse.json(
        {
          success: false,
          message: "No tenés permiso para modificar este material",
        },
        {
          status: 403,
        },
      );
    }

    // =====================================================
    // Actualizar material
    // =====================================================

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
          archivo_url = $8,
          archivo_nombre = $9,
          archivo_size = $10,
          is_published = $11,
          orden = $12
          

      WHERE id = $13

      RETURNING *
      `,
      [
        titulo.trim(),

        descripcion?.trim() || null,

        tipo,

        material_category || null,

        sub_category || null,

        tipo === "text" ? contenido_texto?.trim() || null : null,

        tipo === "link" ? url?.trim() || null : null,

        tipo === "file" ? archivo_url || null : null,

        tipo === "file" ? archivo_nombre || null : null,

        tipo === "file" ? archivo_size || null : null,

        is_published ?? true,

        Number.isNaN(Number(orden)) ? 0 : Number(orden),

        id,
      ],
    );

    // =====================================================
    // Material actualizado
    // =====================================================

    const updatedMaterial = result.rows[0];

    return NextResponse.json({
      success: true,
      message: "Material actualizado correctamente",
      material: updatedMaterial,
    });
  } catch (error) {
    console.error("Error actualizando material:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Error actualizando material",
      },
      {
        status: 500,
      },
    );
  }
}
