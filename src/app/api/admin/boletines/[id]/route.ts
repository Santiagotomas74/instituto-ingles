import { cookies } from "next/headers";
import { query } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: Promise<{
    id: string;
  }>;
};

/*
=====================================================
GET
OBTENER BOLETÍN
=====================================================
*/

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

        /*
        =================================================
        CALIFICACIONES
        =================================================
        */

        b.nota_1,
        b.nota_2,
        b.nota_3,
        b.promedio,

        /*
        =================================================
        COMPORTAMIENTO
        =================================================
        */

        b.behaviour_1,
        b.behaviour_2,
        b.behaviour_3,

        /*
        =================================================
        AUSENCIAS
        =================================================
        */

        b.ausentes,
        b.ausentes_2,
        b.ausentes_3,
        b.ausentes_promedio,

        /*
        =================================================
        OBSERVACIONES
        =================================================
        */

        b.observaciones_1,
        b.observaciones_2,
        b.observaciones_3,

        /*
        =================================================
        EVALUACIÓN FINAL
        =================================================
        */

        b.behaviour_final,
        b.observaciones_final,

        /*
        =================================================
        EXAMEN FINAL
        =================================================
        */

        b.fecha_exam_final,
        b.written_exam_final,
        b.oral_exam_final,
        b.average_exam_final,
        b.observacion_final,

        /*
        =================================================
        FECHAS
        =================================================
        */

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

/*
=====================================================
PATCH
ACTUALIZAR EXAMEN FINAL
=====================================================
*/

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    /*
    =====================================================
    AUTENTICACIÓN
    =====================================================
    */

    const cookieStore = await cookies();

    const userId = cookieStore.get("user_id")?.value;
    const role = cookieStore.get("role")?.value;

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "No autenticado.",
        },
        {
          status: 401,
        },
      );
    }

    if (role !== "admin") {
      return NextResponse.json(
        {
          success: false,
          message: "No tienes permisos para modificar este boletín.",
        },
        {
          status: 403,
        },
      );
    }

    /*
    =====================================================
    BODY
    =====================================================
    */

    const body = await req.json();

    const {
      fecha_exam_final,
      written_exam_final,
      oral_exam_final,
      average_exam_final,
      observacion_final,
    } = body;
    console.log("Body recibido en PATCH:", body);
    /*
    =====================================================
    VALIDACIÓN DEL BOLETÍN
    =====================================================
    */

    const boletinResult = await query(
      `
      SELECT id
      FROM boletines
      WHERE id = $1
      `,
      [id],
    );

    if (boletinResult.rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Boletín no encontrado.",
        },
        {
          status: 404,
        },
      );
    }

    /*
=====================================================
NORMALIZACIÓN
=====================================================
*/

    const fechaExamFinal =
      fecha_exam_final === "" ||
      fecha_exam_final === null ||
      fecha_exam_final === undefined
        ? null
        : fecha_exam_final;

    const writtenExamFinal =
      written_exam_final === null || written_exam_final === undefined
        ? null
        : String(written_exam_final);

    const oralExamFinal =
      oral_exam_final === null || oral_exam_final === undefined
        ? null
        : String(oral_exam_final);

    const averageExamFinal =
      average_exam_final === null || average_exam_final === undefined
        ? null
        : String(average_exam_final);

    const observacionFinal =
      observacion_final === null || observacion_final === undefined
        ? null
        : String(observacion_final);

    /*
    =====================================================
    VALIDACIÓN DE FECHA
    =====================================================
    */

    if (fechaExamFinal !== null) {
      const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;

      if (!fechaRegex.test(fechaExamFinal)) {
        return NextResponse.json(
          {
            success: false,
            message:
              "La fecha del examen final debe tener el formato YYYY-MM-DD.",
          },
          {
            status: 400,
          },
        );
      }

      const fecha = new Date(`${fechaExamFinal}T00:00:00`);

      if (Number.isNaN(fecha.getTime())) {
        return NextResponse.json(
          {
            success: false,
            message: "La fecha del examen final no es válida.",
          },
          {
            status: 400,
          },
        );
      }
    }

    /*
    =====================================================
    UPDATE
    =====================================================
    */

    const result = await query(
      `
      UPDATE boletines
      SET
        fecha_exam_final = $1,
        written_exam_final = $2,
        oral_exam_final = $3,
        average_exam_final = $4,
        observacion_final = $5,
        updated_at = NOW()
      WHERE id = $6

      RETURNING
        id,
        fecha_exam_final,
        written_exam_final,
        oral_exam_final,
        average_exam_final,
        observacion_final,
        updated_at
      `,
      [
        fechaExamFinal,
        writtenExamFinal,
        oralExamFinal,
        averageExamFinal,
        observacionFinal,
        id,
      ],
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No se pudo actualizar el boletín.",
        },
        {
          status: 500,
        },
      );
    }

    /*
    =====================================================
    RESPONSE
    =====================================================
    */

    return NextResponse.json({
      success: true,
      message: "Examen final actualizado correctamente.",
      boletin: result.rows[0],
    });
  } catch (error) {
    console.error("Error actualizando examen final del boletín:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Error interno del servidor.",
      },
      {
        status: 500,
      },
    );
  }
}
