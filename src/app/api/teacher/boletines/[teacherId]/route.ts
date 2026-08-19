import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { query } from "@/lib/db";

interface Params {
  params: Promise<{
    teacherId: string;
  }>;
}

/*
=====================================
GET BOLETINES DEL PROFESOR
=====================================
*/

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const { teacherId } = await params;

    /*
    =====================================
    VERIFICAR AUTENTICACIÓN
    =====================================
    */

    const cookieStore = await cookies();

    const userId = cookieStore.get("user_id")?.value;
    const role = cookieStore.get("role")?.value;
    // 🔍 LOG DE DEPURACIÓN (Revisa tu consola de Next.js al hacer la petición)
    console.log("--- DEBUG 403 ---");
    console.log("URL teacherId:", teacherId);
    console.log("Cookie user_id:", userId);
    console.log("Cookie role:", role);
    console.log("-----------------");
    if (!userId || role !== "teacher") {
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
    EVITAR ACCEDER A BOLETINES
    DE OTRO PROFESOR
    =====================================
    */

    if (userId !== teacherId) {
      return NextResponse.json(
        {
          success: false,
          message: "No tienes permiso para ver estos boletines",
        },
        {
          status: 403,
        },
      );
    }

    /*
    =====================================
    OBTENER BOLETINES
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

        es_mayor_edad,

        anio,
        nivel,

        profesor_nombre,
        profesor_apellido,

        nota_1,
        nota_2,
        nota_3,

        promedio,

        behaviour_1,
        behaviour_2,
        behaviour_3,

        ausentes,

        observaciones_1,
        observaciones_2,
        observaciones_3,

    

        created_at,
        updated_at,

        ausentes_2,
        ausentes_3,
        ausentes_promedio,

        behaviour_final,
        observaciones_final

      FROM boletines

      WHERE teacher_id = $1

      ORDER BY
        anio DESC,
        estudiante_apellido ASC,
        estudiante_nombre ASC,
        created_at DESC
      `,
      [teacherId],
    );

    /*
    =====================================
    RESPUESTA
    =====================================
    */

    return NextResponse.json({
      success: true,
      boletines: result.rows,
      total: result.rowCount ?? 0,
    });
  } catch (error) {
    console.error("Error obteniendo boletines del profesor:", error);

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
