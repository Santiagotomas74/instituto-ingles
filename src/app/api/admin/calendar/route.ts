import { NextRequest, NextResponse } from "next/server";

import { query } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const classroomId = searchParams.get("classroomId");

    let sql = `
      SELECT
        d.id,
        d.titulo,
        d.descripcion,
        d.fecha,
        d.hora,
        d.tipo,
        c.id AS classroom_id,
        c.nombre AS classroom_name,
        c.nivel
      FROM classroom_events d
      INNER JOIN classrooms c
        ON c.id = d.classroom_id
    `;

    const values: string[] = [];

    if (classroomId) {
      sql += `
        WHERE d.classroom_id = $1
      `;

      values.push(classroomId);
    }

    sql += `
      ORDER BY d.fecha ASC, d.hora ASC
    `;

    const result = await query(sql, values);

    return NextResponse.json({
      success: true,
      events: result.rows,
    });
  } catch (error) {
    console.error("Error obteniendo calendario:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Error interno del servidor",
      },
      {
        status: 500,
      },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { global, classroomId, title, description, tipo, fecha, hora } =
      await request.json();

    if (!title || !fecha || !hora || !tipo) {
      return NextResponse.json(
        {
          success: false,
          message: "Faltan datos obligatorios",
        },
        {
          status: 400,
        },
      );
    }

    // ===========================================
    // FECHA PARA TODAS LAS AULAS
    // ===========================================

    if (global) {
      const classrooms = await query(
        `
        SELECT id
        FROM classrooms
        ORDER BY nombre
        `,
      );

      for (const classroom of classrooms.rows) {
        await query(
          `
          INSERT INTO classroom_events
          (
            classroom_id,
            titulo,
            descripcion,
            tipo,
            fecha,
            hora
          )
          VALUES
          (
            $1,
            $2,
            $3,
            $4,
            $5,
            $6
          )
          `,
          [classroom.id, title, description, tipo, fecha, hora],
        );
      }

      return NextResponse.json({
        success: true,
        message: "Fecha creada para todas las aulas",
      });
    }

    // ===========================================
    // FECHA PARA UN AULA
    // ===========================================

    if (!classroomId) {
      return NextResponse.json(
        {
          success: false,
          message: "Debe seleccionar un aula",
        },
        {
          status: 400,
        },
      );
    }

    await query(
      `
      INSERT INTO classroom_events
      (
        classroom_id,
        titulo,
        descripcion,
        tipo,
        fecha,
        hora
      )
      VALUES
      (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6
      )
      `,
      [classroomId, title, description, tipo, fecha, hora],
    );

    return NextResponse.json({
      success: true,
      message: "Fecha creada correctamente",
    });
  } catch (error) {
    console.error("Error creando fecha:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Error interno del servidor",
      },
      {
        status: 500,
      },
    );
  }
}
