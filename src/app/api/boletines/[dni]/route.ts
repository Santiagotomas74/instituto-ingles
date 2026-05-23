import { NextResponse } from "next/server";
import { query } from "@/lib/db";

type Props = {
  params: Promise<{
    dni: string;
  }>;
};

export async function GET(request: Request, { params }: Props) {
  try {
    const { dni } = await params;

    const result = await query(
      `
        SELECT *
        FROM boletines
        WHERE dni = $1
        LIMIT 1
      `,
      [Number(dni)],
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Boletín no encontrado",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      boletin: result.rows[0],
    });
  } catch (error) {
    console.error("ERROR API:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Error interno",
      },
      { status: 500 },
    );
  }
}
