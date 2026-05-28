import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const result = await query(
      `
      SELECT
       *
      FROM inscriptions
      ORDER BY
       
        created_at DESC
      `,
    );

    return NextResponse.json({
      success: true,
      inscriptions: result.rows,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error obteniendo inscripciones",
      },
      { status: 500 },
    );
  }
}
