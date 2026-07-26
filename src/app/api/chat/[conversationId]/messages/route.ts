import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { query } from "@/lib/db";

type Params = {
  params: Promise<{
    conversationId: string;
  }>;
};

/*
=========================================================
GET
=========================================================
*/

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const { conversationId } = await params;

    const result = await query(
      `
      SELECT
          m.id,
          m.conversation_id,
          m.sender_id,
          m.sender_role,
          m.content,
          m.created_at,

          CASE
              WHEN m.sender_role='teacher' THEN t.nombre
              WHEN m.sender_role='student' THEN s.nombre
              WHEN m.sender_role='admin' THEN a.nombre
          END AS name,

          CASE
              WHEN m.sender_role='teacher' THEN t.apellido
              WHEN m.sender_role='student' THEN s.apellido
              WHEN m.sender_role='admin' THEN a.apellido
          END AS lastname

      FROM messages m

      LEFT JOIN teachers t
          ON t.id=m.sender_id
         AND m.sender_role='teacher'

      LEFT JOIN students s
          ON s.id=m.sender_id
         AND m.sender_role='student'

      LEFT JOIN administrators a
          ON a.id=m.sender_id
         AND m.sender_role='admin'

      WHERE m.conversation_id=$1

      ORDER BY m.created_at ASC;
      `,
      [conversationId],
    );

    return NextResponse.json({
      success: true,
      messages: result.rows,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error obteniendo mensajes",
      },
      {
        status: 500,
      },
    );
  }
}

/*
=========================================================
POST
=========================================================
*/

export async function POST(req: NextRequest, { params }: Params) {
  try {
    const { conversationId } = await params;

    const cookieStore = await cookies();

    const senderId = cookieStore.get("user_id")?.value;
    const senderRole = cookieStore.get("role")?.value;

    if (!senderId || !senderRole) {
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

    const { content } = await req.json();

    if (!content?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Mensaje vacío",
        },
        {
          status: 400,
        },
      );
    }

    /*
    =========================================================
    Verificar participante
    =========================================================
    */

    const participant = await query(
      `
      SELECT id
      FROM conversation_participants
      WHERE
          conversation_id=$1
          AND user_id=$2
          AND role=$3
      LIMIT 1;
      `,
      [conversationId, senderId, senderRole],
    );

    if (!participant.rowCount) {
      return NextResponse.json(
        {
          success: false,
          message: "No pertenece a esta conversación",
        },
        {
          status: 403,
        },
      );
    }

    /*
    =========================================================
    Insertar mensaje
    =========================================================
    */

    const inserted = await query(
      `
      INSERT INTO messages
      (
          conversation_id,
          sender_id,
          sender_role,
          content
      )
      VALUES
      (
          $1,
          $2,
          $3,
          $4
      )
      RETURNING id;
      `,
      [conversationId, senderId, senderRole, content.trim()],
    );

    const messageId = inserted.rows[0].id;

    /*
    =========================================================
    Obtener mensaje completo
    =========================================================
    */

    const result = await query(
      `
      SELECT
          m.id,
          m.conversation_id,
          m.sender_id,
          m.sender_role,
          m.content,
          m.created_at,

          CASE
              WHEN m.sender_role='teacher' THEN t.nombre
              WHEN m.sender_role='student' THEN s.nombre
              WHEN m.sender_role='admin' THEN a.nombre
          END AS name,

          CASE
              WHEN m.sender_role='teacher' THEN t.apellido
              WHEN m.sender_role='student' THEN s.apellido
              WHEN m.sender_role='admin' THEN a.apellido
          END AS lastname

      FROM messages m

      LEFT JOIN teachers t
          ON t.id=m.sender_id
         AND m.sender_role='teacher'

      LEFT JOIN students s
          ON s.id=m.sender_id
         AND m.sender_role='student'

      LEFT JOIN administrators a
          ON a.id=m.sender_id
         AND m.sender_role='admin'

      WHERE m.id=$1;
      `,
      [messageId],
    );

    const message = result.rows[0];

    /*
    =========================================================
    Avisar al servidor Socket
    =========================================================
    */

    try {
      console.log("Notificando al servidor Socket...");
      await fetch(`${process.env.NEXT_PUBLIC_SOCKET_URL}/emit-message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conversationId,
          message,
        }),
      });
    } catch (error) {
      console.error("Error notificando al servidor Socket", error);
    }

    /*
    =========================================================
    Respuesta
    =========================================================
    */

    return NextResponse.json({
      success: true,
      message,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error enviando mensaje",
      },
      {
        status: 500,
      },
    );
  }
}
