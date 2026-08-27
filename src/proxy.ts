import { NextRequest, NextResponse } from "next/server";
import { verifyAuthToken } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  /*
  =====================================================
  RUTAS PROTEGIDAS
  =====================================================
  */

  const isAdminRoute = pathname.startsWith("/admin");
  const isTeacherRoute = pathname.startsWith("/teacher");
  const isStudentRoute = pathname.startsWith("/student");

  const isProtectedRoute = isAdminRoute || isTeacherRoute || isStudentRoute;

  /*
  =====================================================
  TOKEN
  =====================================================
  */

  const token = request.cookies.get("auth_token")?.value;

  /*
  =====================================================
  LOGIN
  =====================================================
  */

  if (pathname === "/login") {
    // No hay sesión -> puede entrar al login
    if (!token) {
      return NextResponse.next();
    }

    // Hay token -> verificar que siga siendo válido
    const auth = await verifyAuthToken(token);

    // Token inválido -> limpiar sesión y permitir login
    if (!auth) {
      const response = NextResponse.next();

      response.cookies.delete("auth_token");
      response.cookies.delete("user_id");
      response.cookies.delete("role");

      return response;
    }

    /*
     * Ya está autenticado.
     *
     * No permitimos que vuelva a /login.
     */

    return NextResponse.redirect(
      new URL(`/${auth.role}/dashboard`, request.url),
    );
  }

  /*
  =====================================================
  RUTAS NO PROTEGIDAS
  =====================================================
  */

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  /*
  =====================================================
  RUTA PROTEGIDA SIN TOKEN
  =====================================================
  */

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  /*
  =====================================================
  VERIFICAR JWT
  =====================================================
  */

  const auth = await verifyAuthToken(token);

  if (!auth) {
    const response = NextResponse.redirect(new URL("/login", request.url));

    response.cookies.delete("auth_token");
    response.cookies.delete("user_id");
    response.cookies.delete("role");

    return response;
  }

  /*
  =====================================================
  AUTORIZACIÓN POR ROL
  =====================================================
  */

  if (isAdminRoute && auth.role !== "admin") {
    return NextResponse.redirect(
      new URL(`/${auth.role}/dashboard`, request.url),
    );
  }

  if (isTeacherRoute && auth.role !== "teacher") {
    return NextResponse.redirect(
      new URL(`/${auth.role}/dashboard`, request.url),
    );
  }

  if (isStudentRoute && auth.role !== "student") {
    return NextResponse.redirect(
      new URL(`/${auth.role}/dashboard`, request.url),
    );
  }

  /*
  =====================================================
  TODO CORRECTO
  =====================================================
  */

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/admin/:path*", "/teacher/:path*", "/student/:path*"],
};
