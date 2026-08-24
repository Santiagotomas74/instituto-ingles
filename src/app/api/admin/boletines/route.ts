import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { query } from "@/lib/db";

export async function GET() {
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
    OBTENER BOLETINES
    =====================================================
    */

    const result = await query(`
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
        DATOS DEL PROFESOR
        =================================================
        */

        t.nombre AS teacher_nombre,
        t.apellido AS teacher_apellido,
        t.email AS teacher_email,
        t.firma_url AS teacher_firma_url

      FROM boletines b

      LEFT JOIN teachers t
        ON t.id = b.teacher_id

      ORDER BY b.created_at DESC
    `);

    /*
    =====================================================
    RESPUESTA
    =====================================================
    */

    return NextResponse.json({
      success: true,
      boletines: result.rows,
    });
  } catch (error) {
    console.error("Error obteniendo boletines de admin:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Error obteniendo los boletines",
      },
      {
        status: 500,
      },
    );
  }
}
