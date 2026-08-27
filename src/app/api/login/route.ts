import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import bcrypt from "bcryptjs";

import { createAuthToken } from "@/lib/auth";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: COOKIE_MAX_AGE,
};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { username, password } = body;

    // =====================================================
    // VALIDAR CREDENCIALES
    // =====================================================

    if (!username || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Faltan credenciales",
        },
        {
          status: 400,
        },
      );
    }

    // =====================================================
    // ADMIN
    // =====================================================

    if (
      username === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const userId = "11f0517a-9766-411e-a990-3b4e6c917a35";
      const role = "admin" as const;

      // ===================================================
      // CREAR JWT
      // ===================================================

      const token = await createAuthToken({
        userId,
        role,
      });

      // ===================================================
      // RESPUESTA
      // ===================================================

      const response = NextResponse.json({
        success: true,
        role,
        user: {
          id: userId,
          role,
        },
      });

      // ===================================================
      // JWT
      // ===================================================

      response.cookies.set("auth_token", token, cookieOptions);

      // ===================================================
      // COOKIES AUXILIARES
      // ===================================================

      response.cookies.set("role", role, cookieOptions);

      response.cookies.set("user_id", userId, cookieOptions);

      return response;
    }

    // =====================================================
    // TEACHER
    // =====================================================

    const teacherResult = await query(
      `
        SELECT *
        FROM teachers
        WHERE LOWER(CONCAT(nombre, ' ', apellido)) = LOWER($1)
        LIMIT 1
      `,
      [username],
    );

    if (teacherResult.rows.length > 0) {
      const teacher = teacherResult.rows[0];

      // ===================================================
      // VALIDAR PASSWORD
      // ===================================================

      const validPassword = await bcrypt.compare(password, teacher.password);

      if (!validPassword) {
        return NextResponse.json(
          {
            success: false,
            message: "Credenciales inválidas",
          },
          {
            status: 401,
          },
        );
      }

      const userId = teacher.id;
      const role = "teacher" as const;

      // ===================================================
      // CREAR JWT
      // ===================================================

      const token = await createAuthToken({
        userId,
        role,
      });

      // ===================================================
      // RESPUESTA
      // ===================================================

      const response = NextResponse.json({
        success: true,
        role,

        user: {
          id: teacher.id,
          role,
        },

        teacher: {
          id: teacher.id,
          nombre: teacher.nombre,
          apellido: teacher.apellido,
        },
      });

      // ===================================================
      // JWT
      // ===================================================

      response.cookies.set("auth_token", token, cookieOptions);

      // ===================================================
      // COOKIES AUXILIARES
      // ===================================================

      response.cookies.set("user_id", teacher.id, cookieOptions);

      response.cookies.set("role", role, cookieOptions);

      response.cookies.set("teacher_name", teacher.nombre, cookieOptions);

      response.cookies.set("teacher_lastname", teacher.apellido, cookieOptions);

      return response;
    }

    // =====================================================
    // STUDENT
    // =====================================================

    const studentResult = await query(
      `
        SELECT *
        FROM students
        WHERE LOWER(CONCAT(nombre, ' ', apellido)) = LOWER($1)
        LIMIT 1
      `,
      [username],
    );

    if (studentResult.rows.length > 0) {
      const student = studentResult.rows[0];

      // ===================================================
      // VALIDAR PASSWORD
      // ===================================================

      const validPassword = await bcrypt.compare(password, student.password);

      if (!validPassword) {
        return NextResponse.json(
          {
            success: false,
            message: "Credenciales inválidas",
          },
          {
            status: 401,
          },
        );
      }

      const userId = student.id;
      const role = "student" as const;

      // ===================================================
      // CREAR JWT
      // ===================================================

      const token = await createAuthToken({
        userId,
        role,
      });

      // ===================================================
      // RESPUESTA
      // ===================================================

      const response = NextResponse.json({
        success: true,
        role,

        user: {
          id: student.id,
          role,
        },

        student: {
          id: student.id,
          nombre: student.nombre,
          apellido: student.apellido,
        },
      });

      // ===================================================
      // JWT
      // ===================================================

      response.cookies.set("auth_token", token, cookieOptions);

      // ===================================================
      // COOKIES AUXILIARES
      // ===================================================

      response.cookies.set("user_id", student.id, cookieOptions);

      response.cookies.set("role", role, cookieOptions);

      response.cookies.set("student_name", student.nombre, cookieOptions);

      response.cookies.set("student_lastname", student.apellido, cookieOptions);

      return response;
    }

    // =====================================================
    // CREDENCIALES INVÁLIDAS
    // =====================================================

    return NextResponse.json(
      {
        success: false,
        message: "Credenciales inválidas",
      },
      {
        status: 401,
      },
    );
  } catch (error) {
    console.error("ERROR LOGIN:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Error interno",
      },
      {
        status: 500,
      },
    );
  }
}
