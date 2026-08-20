import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { query } from "@/lib/db";

export async function PATCH(request: Request) {
  try {
    /*
    =====================================
    AUTENTICACIÓN
    =====================================
    */

    const cookieStore = await cookies();

    const teacherId = cookieStore.get("user_id")?.value;
    const role = cookieStore.get("role")?.value;

    if (!teacherId || role !== "teacher") {
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
    =====================================
    OBTENER ID DEL BOLETÍN
    =====================================
    */

    const { searchParams } = new URL(request.url);

    const boletinId = searchParams.get("id");

    if (!boletinId) {
      return NextResponse.json(
        {
          success: false,
          message: "El ID del boletín es obligatorio",
        },
        {
          status: 400,
        },
      );
    }

    /*
    =====================================
    BODY
    =====================================
    */

    const body = await request.json();

    const {
      anio,
      nivel,
      es_mayor_edad,

      nota_1,
      nota_2,
      nota_3,

      behaviour_1,
      behaviour_2,
      behaviour_3,

      ausentes,
      ausentes_2,
      ausentes_3,

      observaciones_1,
      observaciones_2,
      observaciones_3,

      behaviour_final,
      observaciones_final,
    } = body;

    /*
    =====================================
    VALIDAR QUE EL BOLETÍN PERTENEZCA
    AL PROFESOR AUTENTICADO
    =====================================
    */

    const boletinResult = await query(
      `
      SELECT
        id
      FROM boletines
      WHERE id = $1
        AND teacher_id = $2
      LIMIT 1
      `,
      [boletinId, teacherId],
    );

    if (boletinResult.rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Boletín no encontrado o no autorizado",
        },
        {
          status: 404,
        },
      );
    }

    /*
    =====================================
    ACTUALIZAR BOLETÍN
    =====================================
    */

    const result = await query(
      `
      UPDATE boletines
      SET
        anio = $1,
        nivel = $2,
        es_mayor_edad = $3,

        nota_1 = $4,
        nota_2 = $5,
        nota_3 = $6,

        behaviour_1 = $7,
        behaviour_2 = $8,
        behaviour_3 = $9,

        ausentes = $10,
        ausentes_2 = $11,
        ausentes_3 = $12,

        observaciones_1 = $13,
        observaciones_2 = $14,
        observaciones_3 = $15,

    

        behaviour_final = $16,
        observaciones_final = $17,

        updated_at = NOW()

      WHERE id = $18
        AND teacher_id = $19

      RETURNING *
      `,
      [
        anio,
        nivel,
        es_mayor_edad,

        nota_1,
        nota_2,
        nota_3,

        behaviour_1,
        behaviour_2,
        behaviour_3,

        ausentes,
        ausentes_2,
        ausentes_3,

        observaciones_1,
        observaciones_2,
        observaciones_3,

        behaviour_final,
        observaciones_final,

        boletinId,
        teacherId,
      ],
    );

    /*
    =====================================
    RESPUESTA
    =====================================
    */

    if (result.rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No se pudo actualizar el boletín",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Boletín actualizado correctamente",
      boletin: result.rows[0],
    });
  } catch (error) {
    console.error("Error actualizando boletín:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Error actualizando boletín",
      },
      {
        status: 500,
      },
    );
  }
}
