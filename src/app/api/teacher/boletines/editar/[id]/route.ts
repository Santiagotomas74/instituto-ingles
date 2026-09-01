import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { query } from "@/lib/db";

/*
=====================================================
GET — Obtener boletín para editar
=====================================================
*/

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
) {
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
    OBTENER ID
    =====================================
    */

    const { id } = await params;

    if (!id) {
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
    OBTENER BOLETÍN
    =====================================
    */

    const result = await query(
      `
      SELECT
        id,
        teacher_id,
        dni,
        estudiante_nombre,
        estudiante_apellido,
        profesor_nombre,
        profesor_apellido,

        anio,
        nivel,
        es_mayor_edad,

        nota_1,
        nota_2,
        nota_3,
        promedio,

        behaviour_1,
        behaviour_2,
        behaviour_3,

        ausentes,
        ausentes_2,
        ausentes_3,
        ausentes_promedio,

        observaciones_1,
        observaciones_2,
        observaciones_3,

        behaviour_final,
        observaciones_final,

        created_at,
        updated_at

      FROM boletines

      WHERE id = $1
        AND teacher_id = $2

      LIMIT 1
      `,
      [id, teacherId],
    );

    /*
    =====================================
    NO ENCONTRADO
    =====================================
    */

    if (result.rows.length === 0) {
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
    RESPUESTA
    =====================================
    */

    return NextResponse.json({
      success: true,
      boletin: result.rows[0],
    });
  } catch (error) {
    console.error("Error obteniendo boletín:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Error obteniendo boletín",
      },
      {
        status: 500,
      },
    );
  }
}

/*
=====================================================
PATCH — Actualizar boletín
=====================================================
*/

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(request: Request, { params }: Params) {
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

    const { id: boletinId } = await params;

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
      promedio,

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
    console.log("Body recibido:", body);
    /*
    =====================================
    VALIDAR PROPIEDAD
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
    ACTUALIZAR
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

        promedio = $7,

        behaviour_1 = $8,
        behaviour_2 = $9,
        behaviour_3 = $10,

        ausentes = $11,
        ausentes_2 = $12,
        ausentes_3 = $13,

        observaciones_1 = $14,
        observaciones_2 = $15,
        observaciones_3 = $16,

        behaviour_final = $17,
        observaciones_final = $18,

        updated_at = NOW()

      WHERE id = $19
        AND teacher_id = $20

      RETURNING *
      `,
      [
        anio,
        nivel,
        es_mayor_edad,

        nota_1,
        nota_2,
        nota_3,
        promedio,

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
