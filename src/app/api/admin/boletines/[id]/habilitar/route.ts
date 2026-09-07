import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { query } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const cookieStore = await cookies();

    const userId = cookieStore.get("user_id")?.value;
    const role = cookieStore.get("role")?.value;

    // Verificar autenticación y rol
    if (!userId || role !== "admin") {
      return NextResponse.json(
        {
          success: false,
          message: "No autorizado",
        },
        { status: 403 },
      );
    }

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "ID del boletín requerido.",
        },
        { status: 400 },
      );
    }

    // Habilitar el boletín
    const result = await query(
      `
      UPDATE boletines
      SET
        habilitado = TRUE,
        updated_at = NOW()
      WHERE id = $1
      RETURNING
        id,
        habilitado,
        updated_at
      `,
      [id],
    );

    // No existe el boletín
    if (result.rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Boletín no encontrado.",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Boletín habilitado correctamente.",
      boletin: result.rows[0],
    });
  } catch (error) {
    console.error("Error habilitando boletín:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Error habilitando el boletín.",
      },
      { status: 500 },
    );
  }
}
