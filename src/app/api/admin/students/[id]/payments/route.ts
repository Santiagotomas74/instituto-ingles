import { NextRequest, NextResponse } from "next/server";

import { query } from "@/lib/db";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  },
) {
  try {
    const { id } = await params;

    const result = await query(
      `
      SELECT
          id,
          student_id,
          month,
          year,
          amount,
          due_date,
          paid_at,
          status,
          receipt_url,
          receipt_name,
          observations,
          created_at

      FROM student_payments

      WHERE student_id = $1

      ORDER BY
          year DESC,
          month DESC
      `,
      [id],
    );

    return NextResponse.json({
      success: true,
      payments: result.rows,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error obteniendo los pagos.",
      },
      {
        status: 500,
      },
    );
  }
}

export async function POST(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
) {
  try {
    const { id } = await params;

    const body = await req.json();

    const {
      month,
      year,
      amount,
      due_date,
      status,
      observations,
      receipt_url,
      receipt_name,
      paid_at,
    } = body;

    /*
    ==========================
    Validaciones
    ==========================
    */

    if (!month || !year || !amount) {
      return NextResponse.json(
        {
          success: false,
          message: "Complete los datos obligatorios.",
        },
        {
          status: 400,
        },
      );
    }

    /*
    ==========================
    Verificar duplicado
    ==========================
    */

    const exists = await query(
      `
      SELECT id
      FROM student_payments
      WHERE
          student_id=$1
          AND month=$2
          AND year=$3
      `,
      [id, month, year],
    );

    if (exists.rowCount) {
      return NextResponse.json(
        {
          success: false,
          message: "Ya existe un comprobante para ese mes.",
        },
        {
          status: 400,
        },
      );
    }

    /*
    ==========================
    Crear pago
    ==========================
    */

    const result = await query(
      `
      INSERT INTO student_payments
      (
          student_id,
          month,
          year,
          amount,
          due_date,
          paid_at,
          status,
          receipt_url,
          receipt_name,
          observations
      )
      VALUES
      (
          $1,
          $2,
          $3,
          $4,
          $5,
          $6,
          $7,
          $8,
          $9,
          $10
      )
      RETURNING *;
      `,
      [
        id,
        month,
        year,
        amount,
        due_date || null,
        paid_at || null,
        status || "pending",
        receipt_url || null,
        receipt_name || null,
        observations || null,
      ],
    );

    return NextResponse.json({
      success: true,
      payment: result.rows[0],
    });
  } catch (error) {
    console.error(error);

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
