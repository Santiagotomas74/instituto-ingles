import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { query } from "@/lib/db";

type Params = {
  params: Promise<{ id: string }>;
};

// GET: Obtener boletín por ID
export async function GET(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const cookieStore = await cookies();
    const userId = cookieStore.get("user_id")?.value;
    const role = cookieStore.get("role")?.value;

    if (!userId || role !== "teacher") {
      return NextResponse.json(
        { success: false, message: "No autorizado" },
        { status: 403 },
      );
    }

    const sql = `
      SELECT * FROM boletines 
      WHERE id = $1 AND teacher_id = $2
    `;
    const result = await query(sql, [id, userId]);

    if (!result.rows || result.rows.length === 0) {
      return NextResponse.json(
        { success: false, message: "Boletín no encontrado" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, boletin: result.rows[0] });
  } catch (error) {
    console.error("Error al obtener boletín:", error);
    return NextResponse.json(
      { success: false, message: "Error interno del servidor" },
      { status: 500 },
    );
  }
}

// PATCH: Actualizar el boletín
export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const cookieStore = await cookies();
    const userId = cookieStore.get("user_id")?.value;
    const role = cookieStore.get("role")?.value;

    if (!userId || role !== "teacher") {
      return NextResponse.json(
        { success: false, message: "No autorizado" },
        { status: 403 },
      );
    }

    const body = await req.json();

    const {
      nota_1,
      nota_2,
      nota_3,
      behavior_1,
      behavior_2,
      behavior_3,
      ausentes,
      observaciones_1,
      observaciones_2,
      observaciones_3,
      firma_teacher,
    } = body;

    // Cálculo automático de promedio
    const notasValidas = [nota_1, nota_2, nota_3]
      .map((n) => (n !== null && n !== "" ? Number(n) : null))
      .filter((n): n is number => n !== null && !isNaN(n));

    const promedio =
      notasValidas.length > 0
        ? notasValidas.reduce((acc, curr) => acc + curr, 0) /
          notasValidas.length
        : null;

    const sql = `
      UPDATE boletines
      SET
        nota_1 = $1,
        nota_2 = $2,
        nota_3 = $3,
        promedio = $4,
        behavior_1 = $5,
        behavior_2 = $6,
        behavior_3 = $7,
        ausentes = $8,
        observaciones_1 = $9,
        observaciones_2 = $10,
        observaciones_3 = $11,
        firma_teacher = $12,
        updated_at = NOW()
      WHERE id = $13 AND teacher_id = $14
      RETURNING *;
    `;

    const values = [
      nota_1 !== "" && nota_1 !== null ? Number(nota_1) : null,
      nota_2 !== "" && nota_2 !== null ? Number(nota_2) : null,
      nota_3 !== "" && nota_3 !== null ? Number(nota_3) : null,
      promedio,
      behavior_1 || null,
      behavior_2 || null,
      behavior_3 || null,
      ausentes !== "" && ausentes !== null ? Number(ausentes) : null,
      observaciones_1 || null,
      observaciones_2 || null,
      observaciones_3 || null,
      firma_teacher || null,
      id,
      userId,
    ];

    const result = await query(sql, values);

    if (!result.rows || result.rows.length === 0) {
      return NextResponse.json(
        { success: false, message: "Boletín no encontrado o no autorizado" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Boletín actualizado correctamente",
      boletin: result.rows[0],
    });
  } catch (error) {
    console.error("Error al actualizar boletín:", error);
    return NextResponse.json(
      { success: false, message: "Error al actualizar el boletín" },
      { status: 500 },
    );
  }
}
