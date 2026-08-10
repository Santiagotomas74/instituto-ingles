import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { query } from "@/lib/db";
import { getIO } from "@/lib/socket";

type Props = {
  params: Promise<{
    questionId: string;
  }>;
};

export async function POST(req: NextRequest, { params }: Props) {
  try {
    const { questionId } = await params;

    const cookieStore = await cookies();

    const teacherId = cookieStore.get("user_id")?.value;

    if (!teacherId) {
      return NextResponse.json(
        {
          success: false,
          message: "Profesor no autenticado",
        },
        {
          status: 401,
        },
      );
    }

    const body = await req.json();

    const { contenido } = body;

    if (!contenido?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "La respuesta está vacía",
        },
        {
          status: 400,
        },
      );
    }

    // ==========================================
    // Obtener consulta
    // ==========================================

    const questionResult = await query(
      `
      SELECT
          q.id,
          q.student_id,
          q.classroom_id,

          c.profesor_id

      FROM classroom_questions q

      INNER JOIN classrooms c
          ON c.id = q.classroom_id

      WHERE q.id = $1
      `,
      [questionId],
    );

    if (questionResult.rowCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Consulta inexistente",
        },
        {
          status: 404,
        },
      );
    }

    const question = questionResult.rows[0];

    if (question.profesor_id !== teacherId) {
      return NextResponse.json(
        {
          success: false,
          message: "No autorizado",
        },
        {
          status: 403,
        },
      );
    }

    // ==========================================
    // Insertar respuesta
    // ==========================================

    const result = await query(
      `
      INSERT INTO classroom_question_answers
      (
          question_id,
          teacher_id,
          contenido
      )

      VALUES ($1,$2,$3)

      RETURNING *
      `,
      [questionId, teacherId, contenido],
    );

    // ==========================================
    // Marcar consulta cerrada
    // ==========================================

    await query(
      `
      UPDATE classroom_questions

      SET
          is_closed = true,
          updated_at = NOW()

      WHERE id = $1
      `,
      [questionId],
    );

    // ==========================================
    // Obtener nombre del profesor
    // ==========================================

    const teacherResult = await query(
      `
      SELECT
          nombre,
          apellido

      FROM teachers

      WHERE id = $1
      `,
      [teacherId],
    );

    const teacher = teacherResult.rows[0];

    // ==========================================
    // Crear notificación
    // ==========================================

    await query(
      `
      INSERT INTO notifications
      (
          user_id,
          role,
          title,
          message,
          type,
          reference_id
      )

      VALUES
      (
          $1,
          'student',
          $2,
          $3,
          'question_answer',
          $4
      )
      `,
      [
        question.student_id,
        "Respuesta del profesor",
        `${teacher.nombre} ${teacher.apellido} respondió tu consulta.`,
        questionId,
      ],
    );

    // ==========================================
    // Socket.IO
    // ==========================================

    const io = getIO();

    if (io) {
      io.to(`user_${question.student_id}`).emit("notification", {
        title: "Respuesta del profesor",
        message: `${teacher.nombre} ${teacher.apellido} respondió tu consulta.`,
        type: "question_answer",
        questionId,
      });
    }

    return NextResponse.json({
      success: true,
      answer: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error creando respuesta",
      },
      {
        status: 500,
      },
    );
  }
}
