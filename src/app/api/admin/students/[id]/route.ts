import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

import { cookies } from "next/headers";
import { getClient } from "@/lib/db";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    const result = await query(
      `
      SELECT
        id,
        nombre,
        apellido,
        email,
        dni,
        nivel,
        status
      FROM students
      WHERE id = $1
      `,
      [id],
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Alumno no encontrado",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      student: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      { status: 500 },
    );
  }
}
export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    const body = await req.json();

    const { nombre, apellido, email, dni, nivel, status } = body;

    await query(
      `
      UPDATE students
      SET
        nombre = $1,
        apellido = $2,
        email = $3,
        dni = $4,
        nivel = $5,
        status = $6
      WHERE id = $7
      `,
      [nombre, apellido, email, dni, nivel, status, id],
    );

    return NextResponse.json({
      success: true,
      message: "Alumno actualizado correctamente",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const { id: studentId } = await params;

  const client = await getClient();

  try {
    /*
    =====================================================
    1. AUTENTICACIÓN
    =====================================================
    */

    const cookieStore = await cookies();

    const userId = cookieStore.get("user_id")?.value;
    const role = cookieStore.get("role")?.value;

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "No autenticado",
        },
        { status: 401 },
      );
    }

    /*
    =====================================================
    2. VERIFICAR QUE SEA ADMINISTRADOR
    =====================================================
    */

    if (role !== "admin") {
      return NextResponse.json(
        {
          success: false,
          message: "No tienes permisos para eliminar alumnos",
        },
        { status: 403 },
      );
    }

    /*
    =====================================================
    3. VERIFICAR QUE EL ALUMNO EXISTA
    =====================================================
    */

    const studentResult = await client.query(
      `
      SELECT
        id,
        nombre,
        apellido,
        email
      FROM students
      WHERE id = $1
      `,
      [studentId],
    );

    if (studentResult.rowCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "El alumno no existe",
        },
        { status: 404 },
      );
    }

    const student = studentResult.rows[0];

    /*
    =====================================================
    INICIAR TRANSACCIÓN
    =====================================================
    */

    await client.query("BEGIN");

    /*
    =====================================================
    4. OBTENER CONVERSACIONES DEL ALUMNO
    =====================================================

    Guardamos las conversaciones antes de eliminar
    conversation_participants.
    */

    const conversationsResult = await client.query(
      `
      SELECT DISTINCT conversation_id
      FROM conversation_participants
      WHERE user_id = $1
        AND role = 'student'
      `,
      [studentId],
    );

    const conversationIds = conversationsResult.rows.map(
      (row) => row.conversation_id,
    );

    /*
    =====================================================
    5. ELIMINAR LECTURAS DE MENSAJES DEL ALUMNO
    =====================================================
    */

    await client.query(
      `
      DELETE FROM message_reads
      WHERE user_id = $1
        AND role = 'student'
      `,
      [studentId],
    );

    /*
    =====================================================
    6. ELIMINAR MENSAJES ENVIADOS POR EL ALUMNO
    =====================================================

    Esto elimina solamente mensajes cuyo autor sea
    el alumno.
    */

    await client.query(
      `
      DELETE FROM messages
      WHERE sender_id = $1
        AND sender_role = 'student'
      `,
      [studentId],
    );

    /*
    =====================================================
    7. ELIMINAR MENSAJES DE CONVERSACIONES PRIVADAS
    =====================================================

    IMPORTANTE:

    No eliminamos mensajes de conversaciones grupales.

    Una conversación se considera privada cuando tiene
    exactamente 2 participantes.

    Así evitamos borrar mensajes de otros alumnos/profesores
    de conversaciones grupales del aula.
    */

    if (conversationIds.length > 0) {
      await client.query(
        `
        DELETE FROM messages
        WHERE conversation_id = ANY($1::uuid[])
          AND conversation_id IN (
            SELECT conversation_id
            FROM conversation_participants
            GROUP BY conversation_id
            HAVING COUNT(*) = 2
          )
        `,
        [conversationIds],
      );
    }

    /*
    =====================================================
    8. ELIMINAR NOTIFICACIONES DEL ALUMNO
    =====================================================
    */

    await client.query(
      `
      DELETE FROM notifications
      WHERE user_id = $1
        AND role = 'student'
      `,
      [studentId],
    );

    /*
    =====================================================
    9. ELIMINAR RESPUESTAS DE TAREAS
    =====================================================
    */

    await client.query(
      `
      DELETE FROM classroom_task_submissions
      WHERE student_id = $1
      `,
      [studentId],
    );

    /*
    =====================================================
    10. ELIMINAR RESPUESTAS A PREGUNTAS
    =====================================================
    */

    await client.query(
      `
      DELETE FROM classroom_question_answers
      WHERE student_id = $1
      `,
      [studentId],
    );

    /*
    =====================================================
    11. ELIMINAR PREGUNTAS GENERALES DEL ALUMNO
    =====================================================

    ASUMIMOS que classroom_questions tiene student_id.
    */

    await client.query(
      `
      DELETE FROM classroom_questions
      WHERE student_id = $1
      `,
      [studentId],
    );

    /*
    =====================================================
    12. ELIMINAR PAGOS / COMPROBANTES
    =====================================================
    */

    await client.query(
      `
      DELETE FROM student_payments
      WHERE student_id = $1
      `,
      [studentId],
    );

    /*
    =====================================================
    13. ELIMINAR PARTICIPACIÓN EN AULAS
    =====================================================
    */

    await client.query(
      `
      DELETE FROM classroom_students
      WHERE student_id = $1
      `,
      [studentId],
    );

    /*
    =====================================================
    14. ELIMINAR PARTICIPACIÓN EN CONVERSACIONES
    =====================================================
    */

    await client.query(
      `
      DELETE FROM conversation_participants
      WHERE user_id = $1
        AND role = 'student'
      `,
      [studentId],
    );

    /*
    =====================================================
    15. ELIMINAR CONVERSACIONES HUÉRFANAS
    =====================================================

    Solamente eliminamos conversaciones que quedaron
    sin participantes.

    */

    if (conversationIds.length > 0) {
      await client.query(
        `
        DELETE FROM conversations
        WHERE id = ANY($1::uuid[])
          AND NOT EXISTS (
            SELECT 1
            FROM conversation_participants cp
            WHERE cp.conversation_id = conversations.id
          )
        `,
        [conversationIds],
      );
    }

    /*
    =====================================================
    16. ELIMINAR ALUMNO
    =====================================================
    */

    const deleteStudentResult = await client.query(
      `
      DELETE FROM students
      WHERE id = $1
      RETURNING id
      `,
      [studentId],
    );

    if (deleteStudentResult.rowCount === 0) {
      throw new Error("No se pudo eliminar el alumno");
    }

    /*
    =====================================================
    17. CONFIRMAR TRANSACCIÓN
    =====================================================
    */

    await client.query("COMMIT");

    /*
    =====================================================
    RESPUESTA
    =====================================================
    */

    return NextResponse.json({
      success: true,
      message: "Alumno eliminado correctamente",
      student: {
        id: student.id,
        nombre: student.nombre,
        apellido: student.apellido,
        email: student.email,
      },
    });
  } catch (error) {
    /*
    =====================================================
    ROLLBACK
    =====================================================
    */

    try {
      await client.query("ROLLBACK");
    } catch (rollbackError) {
      console.error("Error haciendo rollback:", rollbackError);
    }

    console.error("Error eliminando alumno:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Error eliminando el alumno",
      },
      {
        status: 500,
      },
    );
  } finally {
    /*
    =====================================================
    LIBERAR CLIENTE
    =====================================================
    */

    client.release();
  }
}
