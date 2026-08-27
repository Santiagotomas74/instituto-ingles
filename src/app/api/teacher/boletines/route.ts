import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { query } from "@/lib/db";
import { verifyAuthToken } from "@/lib/auth";

/*
====================================================
OBTENER AUTENTICACIÓN DEL PROFESOR
====================================================
*/

async function getTeacherAuth() {
  const cookieStore = await cookies();

  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return null;
  }

  const auth = await verifyAuthToken(token);

  if (!auth || auth.role !== "teacher") {
    return null;
  }

  return auth;
}

/*
====================================================
GET
OBTENER BOLETÍN ACTUAL

GET /api/teacher/boletines?id=ID
====================================================
*/

export async function GET(request: Request) {
  try {
    /*
    =====================================
    AUTENTICACIÓN
    =====================================
    */

    const auth = await getTeacherAuth();

    if (!auth) {
      return NextResponse.json(
        {
          success: false,
          message: "No autorizado",
        },
        {
          status: 403,
        },
      );
    }

    const teacherId = auth.userId;

    /*
    =====================================
    OBTENER ID DEL BOLETÍN
    =====================================
    */

    const { searchParams } = new URL(request.url);

    const boletinId = searchParams.get("id");

    if (!boletinId) {
      return NextResponse.json(
        {
          success: false,
          message: "El ID del boletín es obligatorio",
        },
        {
          status: 400,
        },
      );
    }

    /*
    =====================================
    BUSCAR BOLETÍN
    =====================================
    */

    const result = await query(
      `
      SELECT
        b.*
      FROM boletines b
      WHERE b.id = $1
        AND b.teacher_id = $2
      LIMIT 1
      `,
      [boletinId, teacherId],
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Boletín no encontrado o no autorizado",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      success: true,
      boletin: result.rows[0],
    });
  } catch (error) {
    console.error("Error obteniendo boletín:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Error obteniendo boletín",
      },
      {
        status: 500,
      },
    );
  }
}

/*
====================================================
POST
CREAR BOLETÍN

POST /api/teacher/boletines
====================================================
*/
export async function POST(request: Request) {
  try {
    /*
    ====================================================
    AUTENTICACIÓN
    ====================================================
    */

    const auth = await getTeacherAuth();

    if (!auth) {
      return NextResponse.json(
        {
          success: false,
          message: "No autorizado",
        },
        {
          status: 403,
        },
      );
    }

    const teacherId = auth.userId;

    /*
    ====================================================
    BODY
    ====================================================
    */

    const body = await request.json();

    const {
      student_id,
      dni,

      anio,
      nivel,
      es_mayor_edad,

      nota_1,
      nota_2,
      nota_3,

      behaviour_1,
      behaviour_2,
      behaviour_3,

      ausentes,
      ausentes_2,
      ausentes_3,

      observaciones_1,
      observaciones_2,
      observaciones_3,

      behaviour_final,
      observaciones_final,

      aclaracion_padre,
      aclaracion_estudiante,
    } = body;

    /*
    ====================================================
    VALIDACIONES
    ====================================================
    */

    if (!student_id) {
      return NextResponse.json(
        {
          success: false,
          message: "El estudiante es obligatorio",
        },
        {
          status: 400,
        },
      );
    }

    if (!dni) {
      return NextResponse.json(
        {
          success: false,
          message: "El DNI del estudiante es obligatorio",
        },
        {
          status: 400,
        },
      );
    }

    /*
    ====================================================
    BUSCAR ALUMNO
    ====================================================

    Buscamos los datos directamente en students.

    No confiamos en nombre/apellido enviados
    desde el frontend.
    */

    const studentResult = await query(
      `
      SELECT
        id,
        dni,
        nombre,
        apellido,
        nivel
      FROM students
      WHERE id = $1
        AND dni = $2
      LIMIT 1
      `,
      [student_id, Number(dni)],
    );

    if (studentResult.rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "El estudiante no existe o el DNI no coincide",
        },
        {
          status: 404,
        },
      );
    }

    const student = studentResult.rows[0];

    /*
    ====================================================
    DATOS DEL ALUMNO
    ====================================================
    */

    const estudianteNombre = student.nombre;
    const estudianteApellido = student.apellido;
    const estudianteDni = Number(student.dni);

    /*
    ====================================================
    BUSCAR PROFESOR
    ====================================================

    El profesor se obtiene desde el usuario autenticado.

    Nunca confiamos en datos del profesor enviados
    desde el frontend.
    */

    const teacherResult = await query(
      `
      SELECT
        id,
        nombre,
        apellido
      FROM teachers
      WHERE id = $1
      LIMIT 1
      `,
      [teacherId],
    );

    if (teacherResult.rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "El profesor autenticado no existe",
        },
        {
          status: 404,
        },
      );
    }

    const teacher = teacherResult.rows[0];

    /*
    ====================================================
    DATOS DEL PROFESOR
    ====================================================
    */

    const profesorNombre = teacher.nombre;
    const profesorApellido = teacher.apellido;

    /*
    ====================================================
    NIVEL
    ====================================================

    Preferimos el nivel enviado por el formulario.
    Si no existe, usamos el nivel del alumno.
    */

    const nivelFinal = nivel || student.nivel || null;

    /*
    ====================================================
    VERIFICAR SI YA EXISTE BOLETÍN
    ====================================================
    */

    const existing = await query(
      `
      SELECT
        id
      FROM boletines
      WHERE dni = $1
      LIMIT 1
      `,
      [estudianteDni],
    );

    if (existing.rows.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "El estudiante ya tiene un boletín creado",
          boletinId: existing.rows[0].id,
        },
        {
          status: 409,
        },
      );
    }

    /*
    ====================================================
    NORMALIZAR NOTAS
    ====================================================
    */

    const nota1 =
      nota_1 === "" || nota_1 === undefined || nota_1 === null
        ? null
        : Number(nota_1);

    const nota2 =
      nota_2 === "" || nota_2 === undefined || nota_2 === null
        ? null
        : Number(nota_2);

    const nota3 =
      nota_3 === "" || nota_3 === undefined || nota_3 === null
        ? null
        : Number(nota_3);

    /*
    ====================================================
    NORMALIZAR AUSENCIAS
    ====================================================
    */

    const ausentes1 =
      ausentes === "" || ausentes === undefined || ausentes === null
        ? null
        : Number(ausentes);

    const ausentes2 =
      ausentes_2 === "" || ausentes_2 === undefined || ausentes_2 === null
        ? null
        : Number(ausentes_2);

    const ausentes3 =
      ausentes_3 === "" || ausentes_3 === undefined || ausentes_3 === null
        ? null
        : Number(ausentes_3);

    /*
    ====================================================
    CALCULAR PROMEDIO DE NOTAS
    ====================================================
    */

    const notas = [nota1, nota2, nota3].filter(
      (nota): nota is number => nota !== null && !Number.isNaN(nota),
    );

    const promedio =
      notas.length > 0
        ? notas.reduce((total, nota) => total + nota, 0) / notas.length
        : null;

    /*
    ====================================================
    CALCULAR PROMEDIO DE AUSENCIAS
    ====================================================
    */

    const ausencias = [ausentes1, ausentes2, ausentes3].filter(
      (ausencia): ausencia is number =>
        ausencia !== null && !Number.isNaN(ausencia),
    );

    const ausentesPromedio =
      ausencias.length > 0
        ? Math.round(
            ausencias.reduce((total, ausencia) => total + ausencia, 0) /
              ausencias.length,
          )
        : null;

    /*
    ====================================================
    CREAR BOLETÍN
    ====================================================
    */

    const result = await query(
      `
      INSERT INTO boletines (
        dni,

        estudiante_nombre,
        estudiante_apellido,

        es_mayor_edad,
        anio,
        nivel,

        profesor_nombre,
        profesor_apellido,

        nota_1,
        nota_2,
        nota_3,
        promedio,

        behaviour_1,
        behaviour_2,
        behaviour_3,

        ausentes,
        ausentes_2,
        ausentes_3,

        ausentes_promedio,

        observaciones_1,
        observaciones_2,
        observaciones_3,

        behaviour_final,
        observaciones_final,

        aclaracion_padre,
        aclaracion_estudiante,

        student_id,
        teacher_id,

        created_at,
        updated_at
      )
      VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        $8,
        $9,
        $10,
        $11,
        $12,
        $13,
        $14,
        $15,
        $16,
        $17,
        $18,
        $19,
        $20,
        $21,
        $22,
        $23,
        $24,
        $25,
        $26,
        $27,
        $28,
        NOW(),
        NOW()
      )
      RETURNING *
      `,
      [
        /*
        ================================
        ALUMNO
        ================================
        */

        estudianteDni,
        estudianteNombre,
        estudianteApellido,

        es_mayor_edad ?? false,
        anio ? Number(anio) : null,
        nivelFinal,

        /*
        ================================
        PROFESOR
        ================================
        */

        profesorNombre,
        profesorApellido,

        /*
        ================================
        NOTAS
        ================================
        */

        nota1,
        nota2,
        nota3,
        promedio,

        /*
        ================================
        COMPORTAMIENTO
        ================================
        */

        behaviour_1 || null,
        behaviour_2 || null,
        behaviour_3 || null,

        /*
        ================================
        AUSENCIAS
        ================================
        */

        ausentes1,
        ausentes2,
        ausentes3,

        ausentesPromedio,

        /*
        ================================
        OBSERVACIONES
        ================================
        */

        observaciones_1 || null,
        observaciones_2 || null,
        observaciones_3 || null,

        /*
        ================================
        EVALUACIÓN FINAL
        ================================
        */

        behaviour_final || null,
        observaciones_final || null,

        /*
        ================================
        ACLARACIONES
        ================================
        */

        aclaracion_padre || null,
        aclaracion_estudiante || null,

        /*
        ================================
        RELACIONES
        ================================
        */

        student_id,
        teacherId,
      ],
    );

    /*
    ====================================================
    RESPUESTA
    ====================================================
    */

    return NextResponse.json(
      {
        success: true,
        message: "Boletín creado correctamente",
        boletin: result.rows[0],
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("Error creando boletín:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Error creando boletín",
      },
      {
        status: 500,
      },
    );
  }
}

/*
====================================================
PATCH
ACTUALIZAR BOLETÍN

PATCH /api/teacher/boletines?id=ID
====================================================
*/
