import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { query } from "@/lib/db";

type Context = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(request: Request, { params }: Context) {
  try {
    /*
    =====================================================
    AUTENTICACIÓN
    =====================================================
    */

    const cookieStore = await cookies();

    const userId = cookieStore.get("user_id")?.value;
    const role = cookieStore.get("role")?.value;

    if (!userId || role !== "admin") {
      return NextResponse.json(
        {
          success: false,
          message: "No autorizado",
        },
        {
          status: 403,
        },
      );
    }

    /*
    =====================================================
    ID
    =====================================================
    */

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "ID del boletín obligatorio",
        },
        {
          status: 400,
        },
      );
    }

    /*
    =====================================================
    GET BOLETÍN
    =====================================================
    */

    const result = await query(
      `
      SELECT
        b.id,
        b.teacher_id,

        b.dni,

        b.estudiante_nombre,
        b.estudiante_apellido,

        b.profesor_nombre,
        b.profesor_apellido,

        b.anio,
        b.nivel,
        b.es_mayor_edad,

        b.nota_1,
        b.nota_2,
        b.nota_3,
        b.promedio,

        b.behaviour_1,
        b.behaviour_2,
        b.behaviour_3,

        b.ausentes,
        b.ausentes_2,
        b.ausentes_3,
        b.ausentes_promedio,

        b.observaciones_1,
        b.observaciones_2,
        b.observaciones_3,

        b.behaviour_final,
        b.observaciones_final,

        b.created_at,
        b.updated_at,

        /*
        =================================================
        PROFESOR
        =================================================
        */

        t.id AS teacher_id_real,
        t.nombre AS teacher_nombre,
        t.apellido AS teacher_apellido,
        t.email AS teacher_email,
        t.firma_url AS teacher_firma_url

      FROM boletines b

      LEFT JOIN teachers t
        ON t.id = b.teacher_id

      WHERE b.id = $1

      LIMIT 1
      `,
      [id],
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Boletín no encontrado",
        },
        {
          status: 404,
        },
      );
    }

    /*
    =====================================================
    RESPUESTA
    =====================================================
    */

    return NextResponse.json({
      success: true,
      boletin: result.rows[0],
    });
  } catch (error) {
    console.error("Error obteniendo boletín admin:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Error obteniendo el boletín",
      },
      {
        status: 500,
      },
    );
  }
}
