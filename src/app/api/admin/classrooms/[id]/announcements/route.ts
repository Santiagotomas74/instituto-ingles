import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    console.log("Fetching announcements for classroom ID:", id);
    const result = await query(
      `
      SELECT *
      FROM classroom_announcements
      WHERE classroom_id = $1
      ORDER BY is_important DESC, created_at DESC
      `,
      [id],
    );

    return NextResponse.json({
      success: true,
      announcements: result.rows,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error obteniendo anuncios",
      },
      { status: 500 },
    );
  }
}
