import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { query } from "@/lib/db";

type Params = {
  params: Promise<{
    conversationId: string;
  }>;
};

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const { conversationId } = await params;

    const cookieStore = await cookies();

    const userId = cookieStore.get("user_id")?.value;
    const role = cookieStore.get("role")?.value;

    if (!userId || !role) {
      return NextResponse.json(
        {
          success: false,
          message: "Usuario no autenticado",
        },
        {
          status: 401,
        },
      );
    }

    await query(
      `
      UPDATE messages
      SET read_at = NOW()
      WHERE
        conversation_id = $1
        AND sender_id <> $2
        AND read_at IS NULL;
      `,
      [conversationId, userId],
    );

    return NextResponse.json({
      success: true,
      message: "Mensajes marcados como leídos",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error marcando mensajes",
      },
      {
        status: 500,
      },
    );
  }
}
