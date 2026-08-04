import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

interface Params {
  params: Promise<{
    taskId: string;
  }>;
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const { taskId } = await params;

    /*
    =====================================
    Verificar existencia
    =====================================
    */

    const taskResult = await query(
      `
      SELECT id
      FROM classroom_tasks
      WHERE id=$1
      `,
      [taskId],
    );

    if (taskResult.rowCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "La tarea no existe",
        },
        {
          status: 404,
        },
      );
    }

    /*
    =====================================
    Eliminar entregas
    =====================================
    */

    await query(
      `
      DELETE
      FROM classroom_task_submissions
      WHERE task_id=$1
      `,
      [taskId],
    );

    /*
    =====================================
    Eliminar notificaciones relacionadas
    =====================================
    */

    await query(
      `
      DELETE
      FROM notifications
      WHERE reference_type='task'
      AND reference_id=$1
      `,
      [taskId],
    );

    /*
    =====================================
    Eliminar tarea
    =====================================
    */

    await query(
      `
      DELETE
      FROM classroom_tasks
      WHERE id=$1
      `,
      [taskId],
    );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

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
