import { NextResponse } from "next/server";
import { query } from "@/lib/db";

interface Props {
  params: Promise<{
    classroomId: string;
  }>;
}

export async function GET(req: Request, { params }: Props) {
  try {
    const { classroomId } = await params;

    const result = await query(
      `
 SELECT
    cm.id,
    cm.titulo,
    cm.descripcion,
    cm.tipo,
    cm.material_category,
    cm.contenido_texto,
    cm.url,
    cm.archivo_url,
    cm.sub_category,
    cm.archivo_nombre,
    cm.archivo_size,
    cm.is_published,
    cm.orden,
    cm.created_at,

    COALESCE(
        t.nombre || ' ' || t.apellido,
        a.username
    ) AS profesor

FROM classroom_materials cm

LEFT JOIN teachers t
    ON cm.created_by = t.id

LEFT JOIN administrators a
    ON cm.created_by_admin = a.id

WHERE cm.classroom_id = $1
  AND cm.is_published = true

ORDER BY cm.orden ASC, cm.created_at DESC;
      `,
      [classroomId],
    );

    return NextResponse.json({
      success: true,
      materials: result.rows,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error al obtener los materiales.",
      },
      {
        status: 500,
      },
    );
  }
}
