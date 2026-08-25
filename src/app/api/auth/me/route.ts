import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();

  const userId = cookieStore.get("user_id")?.value;
  const role = cookieStore.get("role")?.value;

  console.log(role);
  console.log(userId);

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

  return NextResponse.json({
    success: true,
    user: {
      id: userId,
      role,
    },
  });
}
