import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Faltan credenciales",
        },
        { status: 400 },
      );
    }

    // ADMIN

    if (
      username === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const response = NextResponse.json({
        success: true,
        role: "admin",
      });

      response.cookies.set("role", "admin", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      return response;
    }

    // PROFESOR

    const teacherResult = await query(
      `
      SELECT *
      FROM teachers
      WHERE LOWER(CONCAT(nombre, ' ', apellido)) = LOWER($1)
      LIMIT 1
      `,
      [username],
    );

    if (teacherResult.rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Credenciales inválidas",
        },
        { status: 401 },
      );
    }

    const teacher = teacherResult.rows[0];

    const validPassword = await bcrypt.compare(password, teacher.password);

    if (!validPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Credenciales inválidas",
        },
        { status: 401 },
      );
    }

    const response = NextResponse.json({
      success: true,
      role: "teacher",
      teacher: {
        id: teacher.id,
        nombre: teacher.nombre,
        apellido: teacher.apellido,
      },
    });

    response.cookies.set("teacher_id", teacher.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    response.cookies.set("teacher_name", teacher.nombre, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    response.cookies.set("teacher_lastname", teacher.apellido, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    response.cookies.set("role", "teacher", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
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
