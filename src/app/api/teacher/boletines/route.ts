import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { query } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    /*
    =====================================
    VERIFICAR AUTENTICACIÓN
    =====================================
    */

    const cookieStore = await cookies();

    const teacherId = cookieStore.get("user_id")?.value;
    const role = cookieStore.get("role")?.value;

    if (!teacherId || role !== "teacher") {
      return NextResponse.json(
        {
          success: false,
          message: "No autorizado",
        },
        { status: 403 },
      );
    }

    /*
    =====================================
    OBTENER DATOS
    =====================================
    */

    const body = await req.json();

    const {
      student_id,

      anio,
      nivel,

      nota_1,
      nota_2,
      nota_3,

      behaviour_1,
      behaviour_2,
      behaviour_3,

      ausentes,

      observaciones_1,
      observaciones_2,
      observaciones_3,

      ausentes_2,
      ausentes_3,

      behaviour_final,
      observaciones_final,

      es_mayor_edad,
    } = body;

    /*
    =====================================
    VALIDACIONES BÁSICAS
    =====================================
    */

    if (!student_id) {
      return NextResponse.json(
        {
          success: false,
          message: "Debes seleccionar un alumno",
        },
        { status: 400 },
      );
    }

    if (!anio) {
      return NextResponse.json(
        {
          success: false,
          message: "El año es obligatorio",
        },
        { status: 400 },
      );
    }

    /*
    =====================================
    VERIFICAR ALUMNO
    =====================================
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
      `,
      [student_id],
    );

    if (studentResult.rowCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "El alumno no existe",
        },
        { status: 404 },
      );
    }

    const student = studentResult.rows[0];

    /*
    =====================================
    VERIFICAR QUE EL ALUMNO
    PERTENEZCA A UN AULA DEL PROFESOR
    =====================================
    */

    const classroomStudentResult = await query(
      `
      SELECT 1
      FROM classroom_students cs

      INNER JOIN classrooms c
        ON c.id = cs.classroom_id

      WHERE cs.student_id = $1
        AND c.profesor_id = $2

      LIMIT 1
      `,
      [student_id, teacherId],
    );

    if (classroomStudentResult.rowCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No puedes crear un boletín para este alumno",
        },
        { status: 403 },
      );
    }

    /*
    =====================================
    VERIFICAR DUPLICADOS
    =====================================
    */

    const existingBoletin = await query(
      `
      SELECT id
      FROM boletines
      WHERE student_id = $1 AND anio = $2
      LIMIT 1
      `,
      [student_id, Number(anio)],
    );

    if (existingBoletin.rowCount && existingBoletin.rowCount > 0) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Ya existe un boletín registrado para este alumno en este año",
        },
        { status: 409 },
      );
    }

    /*
    =====================================
    OBTENER DATOS DEL PROFESOR
    =====================================
    */

    const teacherResult = await query(
      `
      SELECT
        id,
        nombre,
        apellido
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
    =====================================
    CONVERTIR NOTAS
    =====================================
    */

    const nota1 =
      nota_1 !== undefined && nota_1 !== null && nota_1 !== ""
        ? Number(nota_1)
        : null;

    const nota2 =
      nota_2 !== undefined && nota_2 !== null && nota_2 !== ""
        ? Number(nota_2)
        : null;

    const nota3 =
      nota_3 !== undefined && nota_3 !== null && nota_3 !== ""
        ? Number(nota_3)
        : null;

    /*
    =====================================
    VALIDAR NOTAS
    =====================================
    */

    const notas = [nota1, nota2, nota3].filter(
      (nota): nota is number => nota !== null && !Number.isNaN(nota),
    );

    const promedio =
      notas.length > 0
        ? notas.reduce((sum, nota) => sum + nota, 0) / notas.length
        : null;

    /*
    =====================================
    AUSENCIAS
    =====================================
    */

    const ausentes1 =
      ausentes !== undefined && ausentes !== null && ausentes !== ""
        ? Number(ausentes)
        : null;

    const ausentes2 =
      ausentes_2 !== undefined && ausentes_2 !== null && ausentes_2 !== ""
        ? Number(ausentes_2)
        : null;

    const ausentes3 =
      ausentes_3 !== undefined && ausentes_3 !== null && ausentes_3 !== ""
        ? Number(ausentes_3)
        : null;

    const ausencias = [ausentes1, ausentes2, ausentes3].filter(
      (valor): valor is number => valor !== null && !Number.isNaN(valor),
    );

    const ausentesPromedio =
      ausencias.length > 0
        ? ausencias.reduce((sum, valor) => sum + valor, 0) / ausencias.length
        : null;

    /*
    =====================================
    CREAR BOLETÍN
    =====================================
    */

    const result = await query(
      `
      INSERT INTO boletines (
        teacher_id,
        student_id,
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
        observaciones_1,
        observaciones_2,
        observaciones_3,
        ausentes_2,
        ausentes_3,
        ausentes_promedio,
        behaviour_final,
        observaciones_final
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
        $26
      )

      RETURNING *
      `,
      [
        teacherId,
        student_id,

        student.dni,

        student.nombre,
        student.apellido,

        es_mayor_edad ?? false,

        Number(anio),
        nivel || student.nivel || null,

        teacher.nombre,
        teacher.apellido,

        nota1,
        nota2,
        nota3,
        promedio,

        behaviour_1 || null,
        behaviour_2 || null,
        behaviour_3 || null,

        ausentes1,

        observaciones_1 || null,
        observaciones_2 || null,
        observaciones_3 || null,

        ausentes2,
        ausentes3,
        ausentesPromedio,

        behaviour_final || null,
        observaciones_final || null,
      ],
    );

    /*
    =====================================
    RESPUESTA
    =====================================
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
        message: "Error creando el boletín",
      },
      {
        status: 500,
      },
    );
  }
}
