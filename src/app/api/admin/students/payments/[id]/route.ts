import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { query } from "@/lib/db";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

/*
=====================================
ELIMINAR COMPROBANTE / PAGO
=====================================
*/

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    /*
    =====================================
    VERIFICAR ADMIN
    =====================================
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
        { status: 403 },
      );
    }

    /*
    =====================================
    VERIFICAR QUE EL PAGO EXISTE
    =====================================
    */

    const paymentResult = await query(
      `
      SELECT
        id,
        student_id,
        receipt_url
      FROM student_payments
      WHERE id = $1
      `,
      [id],
    );

    if (paymentResult.rowCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "El comprobante no existe",
        },
        { status: 404 },
      );
    }

    /*
    =====================================
    ELIMINAR PAGO
    =====================================
    */

    await query(
      `
      DELETE FROM student_payments
      WHERE id = $1
      `,
      [id],
    );

    return NextResponse.json({
      success: true,
      message: "Comprobante eliminado correctamente",
    });
  } catch (error) {
    console.error("Error eliminando comprobante:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Error eliminando comprobante",
      },
      { status: 500 },
    );
  }
}

/*
=====================================
EDITAR COMPROBANTE / PAGO
=====================================
*/

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    /*
    =====================================
    VERIFICAR ADMIN
    =====================================
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
        { status: 403 },
      );
    }

    /*
    =====================================
    OBTENER DATOS
    =====================================
    */

    const body = await req.json();

    const { amount, due_date, paid_at, status, observations } = body;

    /*
    =====================================
    VALIDACIONES
    =====================================
    */

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "ID de pago requerido",
        },
        { status: 400 },
      );
    }

    if (amount === undefined || amount === null || amount === "") {
      return NextResponse.json(
        {
          success: false,
          message: "El importe es obligatorio",
        },
        { status: 400 },
      );
    }

    const numericAmount = Number(amount);

    if (!Number.isFinite(numericAmount) || numericAmount < 0) {
      return NextResponse.json(
        {
          success: false,
          message: "El importe no es válido",
        },
        { status: 400 },
      );
    }

    const allowedStatuses = ["paid", "pending", "expired"];

    if (status !== undefined && !allowedStatuses.includes(status)) {
      return NextResponse.json(
        {
          success: false,
          message: "Estado de pago inválido",
        },
        { status: 400 },
      );
    }

    /*
    =====================================
    VERIFICAR QUE EL PAGO EXISTE
    =====================================
    */

    const paymentResult = await query(
      `
      SELECT
        id,
        student_id,
        amount,
        due_date,
        paid_at,
        status,
        observations,
        receipt_name,
        receipt_url
      FROM student_payments
      WHERE id = $1
      `,
      [id],
    );

    if (paymentResult.rowCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "El comprobante no existe",
        },
        { status: 404 },
      );
    }

    /*
    =====================================
    ACTUALIZAR
    =====================================
    */

    const result = await query(
      `
      UPDATE student_payments
      SET
        amount = $1,
        due_date = $2,
        paid_at = $3,
        status = $4,
        observations = $5
      WHERE id = $6
      RETURNING
        id,
        student_id,
        amount,
        due_date,
        paid_at,
        status,
        observations,
        receipt_name,
        receipt_url
      `,
      [
        numericAmount,
        due_date || null,
        paid_at || null,
        status,
        observations?.trim() || null,
        id,
      ],
    );

    /*
    =====================================
    RESPUESTA
    =====================================
    */

    return NextResponse.json({
      success: true,
      message: "Comprobante actualizado correctamente",
      payment: result.rows[0],
    });
  } catch (error) {
    console.error("Error editando comprobante:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Error editando comprobante",
      },
      { status: 500 },
    );
  }
}
