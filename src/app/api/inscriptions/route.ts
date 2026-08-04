import { NextRequest, NextResponse } from "next/server";

import { query } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { nombre, email, telefono, curso, mensaje } = body;

    if (!nombre || !email || !telefono) {
      return NextResponse.json(
        {
          success: false,
          message: "Faltan campos obligatorios",
        },
        {
          status: 400,
        },
      );
    }

    /*
    ==========================
    Crear inscripción
    ==========================
    */

    const inscriptionResult = await query(
      `
      INSERT INTO inscriptions
      (
        nombre,
        email,
        telefono,
        curso,
        mensaje
      )
      VALUES
      (
        $1,$2,$3,$4,$5
      )
      RETURNING *;
      `,
      [nombre, email, telefono, curso || null, mensaje || null],
    );

    const inscription = inscriptionResult.rows[0];

    /*
    ==========================
    Obtener admins
    ==========================
    */

    const adminsResult = await query(`
      SELECT id
      FROM administrators
    `);

    /*
    ==========================
    Crear notificación
    ==========================
    */
    for (const admin of adminsResult.rows) {
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
      'admin',
      'inscription',
      $2,
      $3,
      $4,
      'inscription',
      $5
    )
    RETURNING *;
    `,
        [
          admin.id,
          "Nueva inscripción",
          `${nombre} envió una nueva solicitud de inscripción.`,
          inscription.id,
          "/admin/inscripciones",
        ],
      );

      const notification = notificationResult.rows[0];

      try {
        await fetch(`${process.env.NEXT_PUBLIC_SOCKET_URL}/emit-notification`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: admin.id,
            notification,
          }),
        });
      } catch (error) {
        console.error(error);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Inscripción enviada correctamente",
    });
  } catch (error) {
    console.error(error);

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
