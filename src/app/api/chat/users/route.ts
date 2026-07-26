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

    const users: {
      id: string;
      role: "teacher" | "student" | "admin";
      name: string;
      lastname: string;
    }[] = [];

    /*
    ==========================================
    ADMIN
    ==========================================
    */

    if (role === "admin") {
      const teachers = await query(`
        SELECT
          id,
          'teacher' as role,
          nombre as name,
          apellido as lastname
        FROM teachers
        ORDER BY apellido,nombre;
      `);

      const students = await query(`
        SELECT
          id,
          'student' as role,
          nombre as name,
          apellido as lastname
        FROM students
        ORDER BY apellido,nombre;
      `);

      users.push(...teachers.rows);
      users.push(...students.rows);
    }

    /*
    ==========================================
    TEACHER
    ==========================================
    */

    if (role === "teacher") {
      const admin = await query(`
        SELECT
          id,
          'admin' as role,
          nombre as name,
          apellido as lastname
        FROM administrators;
      `);

      const students = await query(
        `
        SELECT DISTINCT
          s.id,
          'student' as role,
          s.nombre as name,
          s.apellido as lastname

        FROM classroom_students cs

        INNER JOIN students s
          ON s.id = cs.student_id

        INNER JOIN classrooms c
          ON c.id = cs.classroom_id

        WHERE c.profesor_id = $1

        ORDER BY s.apellido,s.nombre;
        `,
        [userId],
      );

      users.push(...admin.rows);
      users.push(...students.rows);
    }

    /*
    ==========================================
    STUDENT
    ==========================================
    */

    if (role === "student") {
      const admin = await query(`
        SELECT
          id,
          'admin' as role,
          nombre as name,
          apellido as lastname
        FROM administrators;
      `);

      const teachers = await query(
        `
        SELECT DISTINCT
          t.id,
          'teacher' as role,
          t.nombre as name,
          t.apellido as lastname

        FROM classroom_students cs

        INNER JOIN classrooms c
          ON c.id = cs.classroom_id

        INNER JOIN teachers t
          ON t.id = c.profesor_id

        WHERE cs.student_id = $1

        ORDER BY t.apellido,t.nombre;
        `,
        [userId],
      );

      users.push(...admin.rows);
      users.push(...teachers.rows);
    }

    return NextResponse.json({
      success: true,
      users,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error obteniendo usuarios",
      },
      {
        status: 500,
      },
    );
  }
}
