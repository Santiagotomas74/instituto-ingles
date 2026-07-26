import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { query } from "@/lib/db";

/*
=========================================================
GET -> Obtener conversaciones
=========================================================
*/

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
        { status: 401 },
      );
    }

    const result = await query(
      `
SELECT
    c.id,
    c.type,

    CASE
        WHEN c.type = 'private' THEN (

            SELECT
                CASE

                    WHEN cp2.role = 'student' THEN
                        (
                            SELECT
                                CONCAT(s.apellido,' ',s.nombre)
                            FROM students s
                            WHERE s.id = cp2.user_id
                        )

                    WHEN cp2.role = 'teacher' THEN
                        (
                            SELECT
                                CONCAT(t.apellido,' ',t.nombre)
                            FROM teachers t
                            WHERE t.id = cp2.user_id
                        )

                    WHEN cp2.role = 'admin' THEN
                        (
                            SELECT a.username
                            FROM administrators a
                            WHERE a.id = cp2.user_id
                        )

                END

            FROM conversation_participants cp2

            WHERE
                cp2.conversation_id = c.id
                AND NOT (
                    cp2.user_id = $1
                    AND cp2.role = $2
                )

            LIMIT 1

        )

        ELSE c.name
    END AS name,

    c.classroom_id,
    c.created_at,

    (
        SELECT content
        FROM messages
        WHERE conversation_id = c.id
        ORDER BY created_at DESC
        LIMIT 1
    ) AS last_message,

    (
        SELECT created_at
        FROM messages
        WHERE conversation_id = c.id
        ORDER BY created_at DESC
        LIMIT 1
    ) AS last_message_date

FROM conversations c

INNER JOIN conversation_participants cp
    ON cp.conversation_id = c.id

WHERE
    cp.user_id = $1
    AND cp.role = $2

ORDER BY
    last_message_date DESC NULLS LAST,
    c.created_at DESC;
      `,
      [userId, role],
    );

    return NextResponse.json({
      success: true,
      conversations: result.rows,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error obteniendo conversaciones",
      },
      {
        status: 500,
      },
    );
  }
}

/*
=========================================================
POST -> Crear conversación
=========================================================
*/

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();

    const creatorId = cookieStore.get("user_id")?.value;
    const creatorRole = cookieStore.get("role")?.value;

    if (!creatorId || !creatorRole) {
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

    const { type, name, classroom_id, participants } = body;

    if (!type) {
      return NextResponse.json(
        {
          success: false,
          message: "Falta el tipo",
        },
        {
          status: 400,
        },
      );
    }

    /*
    =========================================================
    CHAT PRIVADO
    =========================================================
    */

    if (type === "private") {
      const otherUser = participants[0];

      const exists = await query(
        `
        SELECT c.id

        FROM conversations c

        INNER JOIN conversation_participants me
            ON me.conversation_id = c.id

        INNER JOIN conversation_participants other
            ON other.conversation_id = c.id

        WHERE
            c.type='private'

            AND me.user_id=$1
            AND me.role=$2

            AND other.user_id=$3
            AND other.role=$4

        LIMIT 1;
        `,
        [creatorId, creatorRole, otherUser.user_id, otherUser.role],
      );

      if (exists.rowCount) {
        const conversation = await query(
          `
SELECT
    c.id,
    c.type,

    CASE
        WHEN c.type='private' THEN (

            SELECT
                CASE

                    WHEN cp2.role='student'
                        THEN (
                            SELECT CONCAT(apellido,' ',nombre)
                            FROM students
                            WHERE id=cp2.user_id
                        )

                    WHEN cp2.role='teacher'
                        THEN (
                            SELECT CONCAT(apellido,' ',nombre)
                            FROM teachers
                            WHERE id=cp2.user_id
                        )

                    WHEN cp2.role='admin'
                        THEN (
                            SELECT username
                            FROM administrators
                            WHERE id=cp2.user_id
                        )

                END

            FROM conversation_participants cp2

            WHERE
                cp2.conversation_id=c.id
                AND NOT(
                    cp2.user_id=$2
                    AND cp2.role=$3
                )

            LIMIT 1

        )

        ELSE c.name

    END AS name,

    c.classroom_id,
    c.created_at,

    (
        SELECT content
        FROM messages
        WHERE conversation_id=c.id
        ORDER BY created_at DESC
        LIMIT 1
    ) last_message,

    (
        SELECT created_at
        FROM messages
        WHERE conversation_id=c.id
        ORDER BY created_at DESC
        LIMIT 1
    ) last_message_date

FROM conversations c

WHERE c.id=$1;
          `,
          [exists.rows[0].id, creatorId, creatorRole],
        );

        return NextResponse.json({
          success: true,
          conversation: conversation.rows[0],
        });
      }
    }

    /*
    =========================================================
    Crear conversación
    =========================================================
    */

    const conversation = await query(
      `
      INSERT INTO conversations
      (
        type,
        name,
        classroom_id
      )
      VALUES
      (
        $1,
        $2,
        $3
      )
      RETURNING *;
      `,
      [type, name ?? null, classroom_id ?? null],
    );

    const conversationId = conversation.rows[0].id;

    await query(
      `
      INSERT INTO conversation_participants
      (
        conversation_id,
        user_id,
        role
      )
      VALUES
      (
        $1,
        $2,
        $3
      );
      `,
      [conversationId, creatorId, creatorRole],
    );

    if (participants?.length) {
      for (const participant of participants) {
        if (
          participant.user_id === creatorId &&
          participant.role === creatorRole
        ) {
          continue;
        }

        await query(
          `
          INSERT INTO conversation_participants
          (
            conversation_id,
            user_id,
            role
          )
          VALUES
          (
            $1,
            $2,
            $3
          );
          `,
          [conversationId, participant.user_id, participant.role],
        );
      }
    }

    /*
    =========================================================
    Devolver conversación completa
    =========================================================
    */

    const fullConversation = await query(
      `
SELECT
    c.id,
    c.type,

    CASE
        WHEN c.type='private' THEN (

            SELECT
                CASE

                    WHEN cp.role='student'
                        THEN (
                            SELECT CONCAT(apellido,' ',nombre)
                            FROM students
                            WHERE id=cp.user_id
                        )

                    WHEN cp.role='teacher'
                        THEN (
                            SELECT CONCAT(apellido,' ',nombre)
                            FROM teachers
                            WHERE id=cp.user_id
                        )

                    WHEN cp.role='admin'
                        THEN (
                            SELECT username
                            FROM administrators
                            WHERE id=cp.user_id
                        )

                END

            FROM conversation_participants cp

            WHERE
                cp.conversation_id=c.id
                AND NOT(
                    cp.user_id=$2
                    AND cp.role=$3
                )

            LIMIT 1

        )

        ELSE c.name

    END AS name,

    c.classroom_id,
    c.created_at,

    NULL::text AS last_message,
    NULL::timestamp AS last_message_date

FROM conversations c

WHERE c.id=$1;
      `,
      [conversationId, creatorId, creatorRole],
    );

    return NextResponse.json({
      success: true,
      conversation: fullConversation.rows[0],
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error creando conversación",
      },
      {
        status: 500,
      },
    );
  }
}
