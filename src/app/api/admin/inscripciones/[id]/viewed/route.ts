import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    console.log("ID recibido en la ruta PATCH:", id);

    await query(
      `
      UPDATE inscriptions
      SET estado = 'visto'
      WHERE id = $1
      `,
      [id],
    );

    return NextResponse.json({
      success: true,
      message: "Inscripción marcada como vista",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error actualizando inscripción",
      },
      { status: 500 },
    );
  }
}
