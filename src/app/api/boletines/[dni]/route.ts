import { NextResponse } from "next/server";
import { query } from "@/lib/db";

type Props = {
  params: Promise<{
    dni: string;
  }>;
};

export async function GET(request: Request, { params }: Props) {
  try {
    const { dni } = await params;

    /*
    =====================================================
    OBTENER BOLETÍN + FIRMA PROFESOR + FIRMA ADMIN
    =====================================================
    */

    const result = await query(
      `
        SELECT
          b.*,

          /*
          =================================================
          DATOS DEL PROFESOR
          =================================================
          */

          t.nombre AS teacher_nombre,
          t.apellido AS teacher_apellido,
          t.email AS teacher_email,
          t.firma_url AS teacher_firma_url,

          /*
          =================================================
          FIRMA DEL ADMINISTRADOR
          =================================================
          */

          a.firma_url AS admin_firma_url

        FROM boletines b

        /*
        ===================================================
        PROFESOR DEL BOLETÍN
        ===================================================
        */

        LEFT JOIN teachers t
          ON t.id = b.teacher_id

        /*
        ===================================================
        ADMINISTRADOR
        ===================================================
        */

        LEFT JOIN administrators a
          ON a.id = (
            SELECT id
            FROM administrators
            ORDER BY id
            LIMIT 1
          )

        WHERE b.dni = $1

        LIMIT 1
      `,
      [Number(dni)],
    );

    /*
    =====================================================
    BOLETÍN NO ENCONTRADO
    =====================================================
    */

    if (result.rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Boletín no encontrado",
        },
        {
          status: 404,
        },
      );
    }

    const boletin = result.rows[0];

    /*
    =====================================================
    RESPUESTA
    =====================================================
    */

    return NextResponse.json({
      success: true,

      boletin,
    });
  } catch (error) {
    console.error("ERROR API:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Error interno",
      },
      {
        status: 500,
      },
    );
  }
}
