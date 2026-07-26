import { NextRequest, NextResponse } from "next/server";

import { query } from "@/lib/db";

type Params = {
  params: Promise<{
    conversationId: string;
  }>;
};

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const { conversationId } = await params;

    const result = await query(
      `
      SELECT
          id,
          conversation_id,
          user_id,
          role,
          name,
          lastname,
          joined_at

      FROM conversation_participants

      WHERE conversation_id = $1

      ORDER BY joined_at ASC;
      `,
      [conversationId],
    );

    return NextResponse.json({
      success: true,
      participants: result.rows,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error obteniendo participantes",
      },
      {
        status: 500,
      },
    );
  }
}
