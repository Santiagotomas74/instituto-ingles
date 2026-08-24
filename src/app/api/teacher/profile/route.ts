import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { query } from "@/lib/db";

export async function GET() {
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
    OBTENER PERFIL DEL TEACHER
    =====================================
    */

    const result = await query(
      `
      SELECT
        id,
        nombre,
        apellido,
        dni,
        email,
        fecha_nacimiento,
        firma_url,
        created_at
     
      FROM teachers
      WHERE id = $1
      LIMIT 1
      `,
      [teacherId],
    );

    /*
    =====================================
    VALIDAR EXISTENCIA
    =====================================
    */

    if (result.rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Profesor no encontrado",
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
      teacher: result.rows[0],
    });
  } catch (error) {
    console.error("Error obteniendo perfil del profesor:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Error obteniendo perfil del profesor",
      },
      {
        status: 500,
      },
    );
  }
}
