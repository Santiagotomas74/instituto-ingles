import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email, password } = body;

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Faltan credenciales",
        },
        { status: 400 },
      );
    }

    if (email === adminEmail && password === adminPassword) {
      return NextResponse.json({
        success: true,
        message: "Login correcto",
      });
    }

    return NextResponse.json(
      {
        success: false,
        message: "Credenciales inválidas",
      },
      { status: 401 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error interno",
      },
      { status: 500 },
    );
  }
}
