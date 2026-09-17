import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { cookies } from "next/headers";
import { getClient } from "@/lib/db";
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
  const { id: teacherId } = await params;

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
          message: "No tienes permisos para eliminar profesores",
        },
        { status: 403 },
      );
    }

    /*
    =====================================================
    3. VERIFICAR QUE EL PROFESOR EXISTA
    =====================================================
    */

    const teacherResult = await client.query(
      `
      SELECT
        id,
        nombre,
        apellido,
        email
      FROM teachers
      WHERE id = $1
      `,
      [teacherId],
    );

    if (teacherResult.rowCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "El profesor no existe",
        },
        { status: 404 },
      );
    }

    const teacher = teacherResult.rows[0];

    /*
    =====================================================
    INICIAR TRANSACCIÓN
    =====================================================
    */

    await client.query("BEGIN");

    /*
    =====================================================
    4. SACAR AL PROFESOR DE SUS CURSOS
    =====================================================

    No eliminamos los cursos.

    Simplemente dejamos profesor_id en NULL.
    */

    await client.query(
      `
      UPDATE classrooms
      SET profesor_id = NULL
      WHERE profesor_id = $1
      `,
      [teacherId],
    );

    /*
    =====================================================
    5. ELIMINAR OTRAS RELACIONES DEL PROFESOR
    =====================================================

    Estas consultas dependen de las tablas que tengas
    relacionadas con teachers.

    Por ahora NO las agregamos sin ver tu estructura,
    para no borrar información incorrectamente.
    */

    /*
    =====================================================
    6. ELIMINAR PROFESOR
    =====================================================
    */

    const deleteTeacherResult = await client.query(
      `
      DELETE FROM teachers
      WHERE id = $1
      RETURNING id
      `,
      [teacherId],
    );

    if (deleteTeacherResult.rowCount === 0) {
      throw new Error("No se pudo eliminar el profesor");
    }

    /*
    =====================================================
    7. CONFIRMAR TRANSACCIÓN
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
      message: "Profesor eliminado correctamente",
      teacher: {
        id: teacher.id,
        nombre: teacher.nombre,
        apellido: teacher.apellido,
        email: teacher.email,
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

    console.error("Error eliminando profesor:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Error eliminando el profesor",
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
