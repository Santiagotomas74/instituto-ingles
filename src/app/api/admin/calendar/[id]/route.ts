import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getClient } from "@/lib/db";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function DELETE(req: NextRequest, { params }: Params) {
  const { id } = await params;

  const client = await getClient();

  try {
    /*
    =====================================================
    1. AUTENTICACIÓN
    =====================================================
    */

    const cookieStore = await cookies();

    const userId = cookieStore.get("user_id")?.value;
    const role = cookieStore.get("role")?.value;

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "No autenticado",
        },
        { status: 401 },
      );
    }

    /*
    =====================================================
    2. VERIFICAR QUE SEA ADMINISTRADOR
    =====================================================
    */

    if (role !== "admin") {
      return NextResponse.json(
        {
          success: false,
          message: "No tienes permisos para eliminar fechas importantes",
        },
        { status: 403 },
      );
    }

    /*
    =====================================================
    3. VERIFICAR QUE LA FECHA EXISTA
    =====================================================
    */

    const eventResult = await client.query(
      `
      SELECT
        id,
        titulo,
        fecha,
        hora
      FROM classroom_events
      WHERE id = $1
      `,
      [id],
    );

    if (eventResult.rowCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "La fecha importante no existe",
        },
        { status: 404 },
      );
    }

    const event = eventResult.rows[0];

    /*
    =====================================================
    4. INICIAR TRANSACCIÓN
    =====================================================
    */

    await client.query("BEGIN");

    /*
    =====================================================
    5. ELIMINAR FECHA IMPORTANTE
    =====================================================
    */

    const deleteResult = await client.query(
      `
      DELETE FROM classroom_events
      WHERE id = $1
      RETURNING id
      `,
      [id],
    );

    if (deleteResult.rowCount === 0) {
      throw new Error("No se pudo eliminar la fecha importante");
    }

    /*
    =====================================================
    6. CONFIRMAR TRANSACCIÓN
    =====================================================
    */

    await client.query("COMMIT");

    /*
    =====================================================
    7. RESPUESTA
    =====================================================
    */

    return NextResponse.json({
      success: true,
      message: "Fecha importante eliminada correctamente",
      event: {
        id: event.id,
        titulo: event.titulo,
        fecha: event.fecha,
        hora: event.hora,
      },
    });
  } catch (error) {
    /*
    =====================================================
    ROLLBACK
    =====================================================
    */

    try {
      await client.query("ROLLBACK");
    } catch (rollbackError) {
      console.error("Error haciendo rollback:", rollbackError);
    }

    console.error("Error eliminando fecha importante:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Error eliminando la fecha importante",
      },
      {
        status: 500,
      },
    );
  } finally {
    /*
    =====================================================
    LIBERAR CLIENTE
    =====================================================
    */

    client.release();
  }
}
