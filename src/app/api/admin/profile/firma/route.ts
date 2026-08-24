import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { query } from "@/lib/db";

export async function PATCH(request: Request) {
  try {
    /*
    =====================================
    AUTENTICACIÓN
    =====================================
    */

    const cookieStore = await cookies();

    const adminId = cookieStore.get("user_id")?.value;
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
    BODY
    =====================================
    */

    const body = await request.json();

    const { firma_url } = body;

    /*
    =====================================
    VALIDAR FIRMA
    =====================================
    */

    if (!firma_url || typeof firma_url !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "La URL de la firma es obligatoria",
        },
        {
          status: 400,
        },
      );
    }

    /*
    =====================================
    ACTUALIZAR FIRMA
    =====================================
    */

    const result = await query(
      `
      UPDATE administrators
      SET
        firma_url = $1
      WHERE id = $2
      RETURNING
        id,
        nombre,
        apellido,
        firma_url
      `,
      [firma_url, adminId],
    );

    /*
    =====================================
    VALIDAR RESULTADO
    =====================================
    */

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
      message: "Firma actualizada correctamente",
      admin: result.rows[0],
      firma_url: result.rows[0].firma_url,
    });
  } catch (error) {
    console.error("Error actualizando firma del admin:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Error actualizando la firma",
      },
      {
        status: 500,
      },
    );
  }
}
