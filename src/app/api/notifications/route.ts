import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { query } from "@/lib/db";

export async function GET() {
  try {
    const cookieStore = await cookies();

    const userId = cookieStore.get("user_id")?.value;
    const role = cookieStore.get("role")?.value;

    if (!userId || !role) {
      return NextResponse.json(
        {
          success: false,
          message: "No autenticado",
        },
        {
          status: 401,
        },
      );
    }

    const result = await query(
      `
      SELECT
        id,
        type,
        title,
        description,
        reference_id,
        reference_type,
        is_read,
        created_at
      FROM notifications
      WHERE
        user_id=$1
        AND role=$2
      ORDER BY created_at DESC
      LIMIT 50;
      `,
      [userId, role],
    );

    return NextResponse.json({
      success: true,
      notifications: result.rows,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error obteniendo notificaciones",
      },
      {
        status: 500,
      },
    );
  }
}
