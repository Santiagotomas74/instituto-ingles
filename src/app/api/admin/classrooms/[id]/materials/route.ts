import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

type Params = Promise<{
  id: string;
}>;

export async function GET(req: NextRequest, { params }: { params: Params }) {
  try {
    const { id } = await params;

    const result = await query(
      `
      SELECT *
      FROM classroom_materials
      WHERE classroom_id = $1
      ORDER BY orden ASC, created_at DESC
      `,
      [id],
    );

    return NextResponse.json({
      success: true,
      materials: result.rows,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      { status: 500 },
    );
  }
}
