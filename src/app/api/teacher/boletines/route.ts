import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { query } from "@/lib/db";

/*
====================================================
GET
OBTENER BOLETÍN ACTUAL
====================================================

Se consulta mediante:

GET /api/teacher/boletines?id=ID

====================================================
*/

export async function GET(request: Request) {
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
    BUSCAR BOLETÍN
    =====================================

    MUY IMPORTANTE:

    También verificamos teacher_id para que
    un profesor no pueda consultar boletines
    de otro profesor.
    */

    const result = await query(
      `
      SELECT
        b.*
      FROM boletines b
      WHERE b.id = $1
        AND b.teacher_id = $2
      LIMIT 1
      `,
      [boletinId, teacherId],
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
====================================================
PATCH
ACTUALIZAR BOLETÍN
====================================================

Se utiliza:

PATCH /api/teacher/boletines?id=ID

====================================================
*/

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

      behavoir_1,
      behavoir_2,
      behavoir_3,

      ausentes,
      ausentes_2,
      ausentes_3,

      observaciones_1,
      observaciones_2,
      observaciones_3,

      behavoir_final,
      observaciones_final,

      aclaracion_padre,
      aclaracion_estudiante,
    } = body;

    /*
    =====================================
    VALIDAR BOLETÍN
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
    NORMALIZAR VALORES
    =====================================

    Evitamos enviar "" a columnas numéricas.
    */

    const nota1 =
      nota_1 === "" || nota_1 === undefined || nota_1 === null
        ? null
        : Number(nota_1);

    const nota2 =
      nota_2 === "" || nota_2 === undefined || nota_2 === null
        ? null
        : Number(nota_2);

    const nota3 =
      nota_3 === "" || nota_3 === undefined || nota_3 === null
        ? null
        : Number(nota_3);

    const ausentes1 =
      ausentes === "" || ausentes === undefined || ausentes === null
        ? null
        : Number(ausentes);

    const ausentes2 =
      ausentes_2 === "" || ausentes_2 === undefined || ausentes_2 === null
        ? null
        : Number(ausentes_2);

    const ausentes3 =
      ausentes_3 === "" || ausentes_3 === undefined || ausentes_3 === null
        ? null
        : Number(ausentes_3);

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

        behavoir_1 = $7,
        behavoir_2 = $8,
        behavoir_3 = $9,

        ausentes = $10,
        ausentes_2 = $11,
        ausentes_3 = $12,

        observaciones_1 = $13,
        observaciones_2 = $14,
        observaciones_3 = $15,

        behavoir_final = $16,
        observaciones_final = $17,

        aclaracion_padre = $18,
        aclaracion_estudiante = $19,

        updated_at = NOW()

      WHERE id = $20
        AND teacher_id = $21

      RETURNING *
      `,
      [
        anio,
        nivel,
        es_mayor_edad,

        nota1,
        nota2,
        nota3,

        behavoir_1 || null,
        behavoir_2 || null,
        behavoir_3 || null,

        ausentes1,
        ausentes2,
        ausentes3,

        observaciones_1 || null,
        observaciones_2 || null,
        observaciones_3 || null,

        behavoir_final || null,
        observaciones_final || null,

        aclaracion_padre || null,
        aclaracion_estudiante || null,

        boletinId,
        teacherId,
      ],
    );

    /*
    =====================================
    VERIFICAR ACTUALIZACIÓN
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

    /*
    =====================================
    RESPUESTA
    =====================================
    */

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
