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

    const studentId = cookieStore.get("user_id")?.value;

    if (!studentId) {
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
          id,
          student_id

      FROM classroom_questions

      WHERE id = $1
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

    // ==========================================
    // Crear respuesta
    // ==========================================

    const result = await query(
      `
      INSERT INTO classroom_question_answers
      (
          question_id,
          student_id,
          contenido
      )

      VALUES ($1,$2,$3)

      RETURNING *
      `,
      [questionId, studentId, contenido],
    );

    // ==========================================
    // Nombre del alumno que respondió
    // ==========================================

    const studentResult = await query(
      `
      SELECT
          nombre,
          apellido

      FROM students

      WHERE id = $1
      `,
      [studentId],
    );

    const student = studentResult.rows[0];

    // ==========================================
    // Notificar únicamente al creador
    // ==========================================

    if (question.student_id !== studentId) {
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
          "Nueva respuesta",
          `${student.nombre} ${student.apellido} respondió tu consulta.`,
          questionId,
        ],
      );

      const io = getIO();

      if (io) {
        io.to(`user_${question.student_id}`).emit("notification", {
          title: "Respuesta del profesor",
          message: `${student.nombre} ${student.apellido} respondió tu consulta.`,
          type: "question_answer",
        });
      }
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
