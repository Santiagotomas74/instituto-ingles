import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({
      success: true,
      message: "Sesión cerrada correctamente",
    });

    // =====================================================
    // ELIMINAR TOKEN JWT
    // =====================================================

    response.cookies.delete("auth_token");

    // =====================================================
    // ELIMINAR COOKIES DE AUTENTICACIÓN AUXILIARES
    // =====================================================

    response.cookies.delete("user_id");

    response.cookies.delete("role");

    // =====================================================
    // ELIMINAR DATOS DEL TEACHER
    // =====================================================

    response.cookies.delete("teacher_name");

    response.cookies.delete("teacher_lastname");

    // =====================================================
    // ELIMINAR DATOS DEL STUDENT
    // =====================================================

    response.cookies.delete("student_name");

    response.cookies.delete("student_lastname");

    return response;
  } catch (error) {
    console.error("ERROR LOGOUT:", error);

    return NextResponse.json(
      {
        success: false,
        message: "No se pudo cerrar la sesión",
      },
      {
        status: 500,
      },
    );
  }
}
