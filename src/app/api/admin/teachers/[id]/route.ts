import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import bcrypt from "bcryptjs";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

/* GET TEACHER */

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    const result = await query(
      `
        SELECT
          id,
          dni,
          nombre,
          apellido,
          fecha_nacimiento,
          email
        FROM teachers
        WHERE id = $1
      `,
      [id],
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Profesor no encontrado",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      teacher: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error interno",
      },
      { status: 500 },
    );
  }
}

/* UPDATE TEACHER */

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    const body = await req.json();

    const { dni, nombre, apellido, fecha_nacimiento, email, password } = body;

    /* Si mandan nueva password */
    if (password && password.trim() !== "") {
      const hashedPassword = await bcrypt.hash(password, 10);

      await query(
        `
          UPDATE teachers
          SET
            dni = $1,
            nombre = $2,
            apellido = $3,
            fecha_nacimiento = $4,
            email = $5,
            password = $6
          WHERE id = $7
        `,
        [dni, nombre, apellido, fecha_nacimiento, email, hashedPassword, id],
      );
    } else {
      /* Sin cambiar password */

      await query(
        `
          UPDATE teachers
          SET
            dni = $1,
            nombre = $2,
            apellido = $3,
            fecha_nacimiento = $4,
            email = $5
          WHERE id = $6
        `,
        [dni, nombre, apellido, fecha_nacimiento, email, id],
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error actualizando profesor",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    await query(
      `
        DELETE FROM teachers
        WHERE id = $1
      `,
      [id],
    );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error eliminando profesor",
      },
      { status: 500 },
    );
  }
}
