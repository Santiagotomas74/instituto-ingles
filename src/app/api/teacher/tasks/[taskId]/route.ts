import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { query } from "@/lib/db";

interface Params {
  params: Promise<{
    taskId: string;
  }>;
}

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const { taskId } = await params;

    // Autenticación
    const cookieStore = await cookies();
    const teacherId = cookieStore.get("user_id")?.value;

    if (!teacherId) {
      return NextResponse.json(
        {
          success: false,
          message: "No autenticado",
        },
        { status: 401 },
      );
    }

    // Body
    const body = await req.json();

    const {
      titulo,
      descripcion,
      instrucciones,
      due_date,
      due_time,
      allow_submission,
      submission_type,
      max_score,
      is_published,
      archivo,
    } = body;

    if (typeof titulo !== "string" || !titulo.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "El título es obligatorio",
        },
        { status: 400 },
      );
    }

    // Verificar que la tarea pertenezca al profesor
    const taskResult = await query(
      `
        SELECT id
        FROM classroom_tasks
        WHERE id = $1
          AND created_by = $2
      `,
      [taskId, teacherId],
    );

    if (taskResult.rowCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "La tarea no existe o no tienes permiso para modificarla",
        },
        { status: 403 },
      );
    }

    // Validar el archivo, si se envía una URL
    if (
      archivo !== undefined &&
      archivo !== null &&
      (typeof archivo !== "string" || !archivo.startsWith("https://"))
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "La URL del archivo adjunto no es válida",
        },
        { status: 400 },
      );
    }

    // Actualizar tarea y archivo adjunto
    const result = await query(
      `
        UPDATE classroom_tasks
        SET
          titulo = $1,
          descripcion = $2,
          instrucciones = $3,
          due_date = $4,
          due_time = $5,
          allow_submission = $6,
          submission_type = $7,
          max_score = $8,
          is_published = $9,
          archivo = $10,
          updated_at = NOW()
        WHERE id = $11
          AND created_by = $12
        RETURNING *
      `,
      [
        titulo.trim(),
        descripcion?.trim() || null,
        instrucciones?.trim() || null,
        due_date || null,
        due_time || null,
        allow_submission ?? true,
        submission_type || "individual",
        max_score ?? 100,
        is_published ?? false,
        archivo ?? null,
        taskId,
        teacherId,
      ],
    );

    if (result.rowCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No se pudo actualizar la tarea",
        },
        { status: 400 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Tarea actualizada correctamente",
      task: result.rows[0],
    });
  } catch (error) {
    console.error("Error editando tarea:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Error editando tarea",
      },
      { status: 500 },
    );
  }
}

/*
=====================================
ELIMINAR TAREA
=====================================
*/

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const { taskId } = await params;

    /*
    =====================================
    AUTENTICACIÓN
    =====================================
    */

    const cookieStore = await cookies();
    const teacherId = cookieStore.get("user_id")?.value;

    if (!teacherId) {
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

    /*
    =====================================
    VERIFICAR TAREA + PROFESOR
    =====================================
    */

    const taskResult = await query(
      `
      SELECT
        id,
        classroom_id,
        created_by
      FROM classroom_tasks
      WHERE id = $1
        AND created_by = $2
      `,
      [taskId, teacherId],
    );

    if (taskResult.rowCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "La tarea no existe o no tienes permiso para eliminarla",
        },
        {
          status: 403,
        },
      );
    }

    /*
    =====================================
    ELIMINAR ENTREGAS
    =====================================
    */

    await query(
      `
      DELETE FROM classroom_task_submissions
      WHERE task_id = $1
      `,
      [taskId],
    );

    /*
    =====================================
    ELIMINAR NOTIFICACIONES
    =====================================
    */

    await query(
      `
      DELETE FROM notifications
      WHERE reference_type = 'task'
        AND reference_id = $1
      `,
      [taskId],
    );

    /*
    =====================================
    ELIMINAR TAREA
    =====================================
    */

    const deleteResult = await query(
      `
      DELETE FROM classroom_tasks
      WHERE id = $1
        AND created_by = $2
      RETURNING id
      `,
      [taskId, teacherId],
    );

    if (deleteResult.rowCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No se pudo eliminar la tarea",
        },
        {
          status: 400,
        },
      );
    }

    /*
    =====================================
    RESPUESTA
    =====================================
    */

    return NextResponse.json({
      success: true,
      message: "Tarea eliminada correctamente",
    });
  } catch (error) {
    console.error("Error eliminando tarea:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Error eliminando tarea",
      },
      {
        status: 500,
      },
    );
  }
}
