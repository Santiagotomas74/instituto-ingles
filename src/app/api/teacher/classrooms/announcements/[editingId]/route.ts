import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

type Props = {
  params: Promise<{
    editingId: string;
  }>;
};

export async function DELETE(req: NextRequest, { params }: Props) {
  try {
    const { editingId } = await params;

    await query(
      `
      DELETE FROM classroom_announcements
      WHERE id = $1
      `,
      [editingId],
    );

    return NextResponse.json({
      success: true,
      message: "Anuncio eliminado",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error eliminando anuncio",
      },
      { status: 500 },
    );
  }
}
export async function PUT(req: NextRequest, { params }: Props) {
  try {
    const { editingId } = await params;

    console.log("Received editingId for update:", editingId);

    const body = await req.json();

    console.log("Received announcement data for update:", body);

    const { titulo, contenido, is_important } = body;

    if (!titulo || !contenido) {
      return NextResponse.json(
        {
          success: false,
          message: "Faltan datos obligatorios",
        },
        {
          status: 400,
        },
      );
    }

    const result = await query(
      `
      UPDATE classroom_announcements
      SET
        titulo = $1,
        contenido = $2,
        is_important = $3
      WHERE id = $4
      RETURNING *
      `,
      [titulo, contenido, is_important ?? false, editingId],
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No se encontró el anuncio",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      success: true,
      announcement: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error actualizando anuncio",
      },
      {
        status: 500,
      },
    );
  }
}
