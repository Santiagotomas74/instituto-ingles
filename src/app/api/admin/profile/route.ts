import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { query } from "@/lib/db";

export async function GET() {
  try {
    /*
    =====================================
    AUTENTICACIÓN
    =====================================
    */

    const cookieStore = await cookies();

    const adminId = cookieStore.get("user_id")?.value;
    console.log(adminId);
    const role = cookieStore.get("role")?.value;

    if (!adminId || role !== "admin") {
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
    OBTENER PERFIL
    =====================================
    */

    const result = await query(
      `
      SELECT
        id,
        nombre,
        apellido,
        firma_url
      FROM administrators
      WHERE id = $1
      LIMIT 1
      `,
      [adminId],
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Administrador no encontrado",
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
      admin: result.rows[0],
    });
  } catch (error) {
    console.error("Error obteniendo perfil del admin:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Error obteniendo perfil del administrador",
      },
      {
        status: 500,
      },
    );
  }
}
