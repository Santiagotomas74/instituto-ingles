import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const result = await query(
      `
      DELETE FROM classroom_materials
      WHERE id=$1
      RETURNING *;
      `,
      [id],
    );

    if (!result.rowCount) {
      return NextResponse.json(
        {
          success: false,
          message: "Material no encontrado",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Material eliminado",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error eliminando material",
      },
      {
        status: 500,
      },
    );
  }
}
