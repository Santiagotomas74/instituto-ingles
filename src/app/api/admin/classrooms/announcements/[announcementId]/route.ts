import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

type Props = {
  params: Promise<{
    announcementId: string;
  }>;
};

export async function DELETE(req: NextRequest, { params }: Props) {
  try {
    const { announcementId } = await params;

    await query(
      `
      DELETE FROM classroom_announcements
      WHERE id = $1
      `,
      [announcementId],
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
    const { announcementId } = await params;

    const body = await req.json();

    const { title, content, is_important } = body;

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
      [title, content, is_important, announcementId],
    );

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
      { status: 500 },
    );
  }
}
