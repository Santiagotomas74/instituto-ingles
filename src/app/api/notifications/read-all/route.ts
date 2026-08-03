import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { query } from "@/lib/db";

export async function PATCH() {
  try {
    const cookieStore = await cookies();

    const userId = cookieStore.get("user_id")?.value;

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
        },
        {
          status: 401,
        },
      );
    }

    await query(
      `
      UPDATE notifications
      SET is_read=true
      WHERE user_id=$1;
      `,
      [userId],
    );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      },
    );
  }
}
