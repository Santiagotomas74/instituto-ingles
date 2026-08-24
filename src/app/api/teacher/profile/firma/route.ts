import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { query } from "@/lib/db";

export async function PATCH(request: Request) {
  try {
    /*
    =====================================================
    AUTENTICACIÓN
    =====================================================
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
        {
          status: 403,
        },
      );
    }

    /*
    =====================================================
    OBTENER FIRMA
    =====================================================
    */

    const formData = await request.formData();

    const firma = formData.get("firma");

    if (!(firma instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          message: "Debes seleccionar una imagen de firma.",
        },
        {
          status: 400,
        },
      );
    }

    /*
    =====================================================
    VALIDAR TIPO
    =====================================================
    */

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

    if (!allowedTypes.includes(firma.type)) {
      return NextResponse.json(
        {
          success: false,
          message: "La firma debe ser una imagen PNG, JPG o WEBP.",
        },
        {
          status: 400,
        },
      );
    }

    /*
    =====================================================
    VALIDAR TAMAÑO
    =====================================================
    */

    const maxSize = 5 * 1024 * 1024;

    if (firma.size > maxSize) {
      return NextResponse.json(
        {
          success: false,
          message: "La imagen de la firma no puede superar los 5 MB.",
        },
        {
          status: 400,
        },
      );
    }

    /*
    =====================================================
    SUBIR A CLOUDINARY
    =====================================================

    Tu /api/upload espera:

    file

    y devuelve:

    {
      success: true,
      url: "https://..."
    }
    */

    const uploadFormData = new FormData();

    uploadFormData.append("file", firma);

    const uploadUrl = new URL("/api/upload", request.url);

    const uploadResponse = await fetch(uploadUrl.toString(), {
      method: "POST",
      body: uploadFormData,
    });

    const uploadData = await uploadResponse.json();

    if (!uploadResponse.ok || !uploadData.success || !uploadData.url) {
      console.error("Error subiendo firma a Cloudinary:", uploadData);

      return NextResponse.json(
        {
          success: false,
          message:
            uploadData.message || "No se pudo subir la firma a Cloudinary.",
        },
        {
          status: 500,
        },
      );
    }

    const firmaUrl = uploadData.url;

    /*
    =====================================================
    ACTUALIZAR TEACHER
    =====================================================
    */

    const result = await query(
      `
      UPDATE teachers
      SET
        firma_url = $1
      WHERE id = $2
      RETURNING
        id,
        dni,
        nombre,
        apellido,
        email,
        fecha_nacimiento,
        firma_url
      `,
      [firmaUrl, teacherId],
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Profesor no encontrado.",
        },
        {
          status: 404,
        },
      );
    }

    /*
    =====================================================
    RESPUESTA
    =====================================================
    */

    return NextResponse.json({
      success: true,
      message: "Firma actualizada correctamente.",
      firma_url: result.rows[0].firma_url,
      teacher: result.rows[0],
    });
  } catch (error) {
    console.error("Error actualizando firma:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Error actualizando la firma.",
      },
      {
        status: 500,
      },
    );
  }
}
