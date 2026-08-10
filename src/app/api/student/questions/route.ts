import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { query } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();

    const studentId = cookieStore.get("user_id")?.value;

    if (!studentId) {
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

    const body = await req.json();

    const { classroom_id, title, content } = body;

    if (!classroom_id || !title || !content) {
      return NextResponse.json(
        {
          success: false,
          message: "Faltan datos",
        },
        {
          status: 400,
        },
      );
    }

    // ============================================
    // Crear consulta
    // ============================================

    const questionResult = await query(
      `
      INSERT INTO classroom_questions
      (
          classroom_id,
          student_id,
          titulo,
          contenido
      )
      VALUES
      (
          $1,
          $2,
          $3,
          $4
      )
      RETURNING *;
      `,
      [classroom_id, studentId, title, content],
    );

    const question = questionResult.rows[0];

    // ============================================
    // Alumno
    // ============================================

    const studentResult = await query(
      `
      SELECT
          nombre,
          apellido
      FROM students
      WHERE id = $1;
      `,
      [studentId],
    );

    const student = studentResult.rows[0];

    // ============================================
    // Profesor
    // ============================================

    const teacherResult = await query(
      `
      SELECT profesor_id
      FROM classrooms
      WHERE id = $1;
      `,
      [classroom_id],
    );

    const teacherId = teacherResult.rows[0].profesor_id;

    // ============================================
    // Alumnos del aula
    // ============================================

    const studentsResult = await query(
      `
      SELECT student_id
      FROM classroom_students
      WHERE classroom_id = $1;
      `,
      [classroom_id],
    );

    // ============================================
    // Notificación profesor
    // ============================================

    const teacherNotificationResult = await query(
      `
      INSERT INTO notifications
      (
          user_id,
          role,
          type,
          title,
          description,
          reference_id,
          reference_type,
          action_url
      )
      VALUES
      (
          $1,
          'teacher',
          'question',
          'Nueva consulta',
          $2,
          $3,
          'question',
          $4
      )
      RETURNING *;
      `,
      [
        teacherId,
        `${student.nombre} ${student.apellido} realizó una nueva consulta.`,
        question.id,
        `/teacher/classrooms/${classroom_id}?tab=questions`,
      ],
    );

    try {
      await fetch(`${process.env.NEXT_PUBLIC_SOCKET_URL}/emit-notification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: teacherId,
          notification: teacherNotificationResult.rows[0],
        }),
      });
    } catch (err) {
      console.error(err);
    }

    // ============================================
    // Notificar alumnos
    // ============================================

    for (const row of studentsResult.rows) {
      if (row.student_id === studentId) continue;

      const notificationResult = await query(
        `
        INSERT INTO notifications
        (
            user_id,
            role,
            type,
            title,
            description,
            reference_id,
            reference_type,
            action_url
        )
        VALUES
        (
            $1,
            'student',
            'question',
            'Nueva consulta',
            $2,
            $3,
            'question',
            $4
        )
        RETURNING *;
        `,
        [
          row.student_id,
          `${student.nombre} ${student.apellido} realizó una nueva consulta.`,
          question.id,
          `/student/classroom/${classroom_id}?tab=questions`,
        ],
      );

      try {
        await fetch(`${process.env.NEXT_PUBLIC_SOCKET_URL}/emit-notification`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: row.student_id,
            notification: notificationResult.rows[0],
          }),
        });
      } catch (err) {
        console.error(err);
      }
    }

    return NextResponse.json({
      success: true,
      question,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        success: false,
        message: "Error creando consulta",
      },
      {
        status: 500,
      },
    );
  }
}
