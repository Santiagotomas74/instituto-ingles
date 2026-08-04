import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          message: "Archivo requerido",
        },
        { status: 400 },
      );
    }

    console.log("Archivo:", file.name);

    console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);

    console.log("Upload Preset:", process.env.CLOUDINARY_UPLOAD_PRESET);

    const cloudinaryForm = new FormData();

    cloudinaryForm.append("file", file);

    cloudinaryForm.append(
      "upload_preset",
      process.env.CLOUDINARY_UPLOAD_PRESET!,
    );

    const uploadRes = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/auto/upload`,
      {
        method: "POST",
        body: cloudinaryForm,
      },
    );

    const data = await uploadRes.json();

    console.log("Cloudinary status:", uploadRes.status);
    console.log("Cloudinary response:", data);
    console.log("secure_url:", data.secure_url);

    if (!uploadRes.ok) {
      return NextResponse.json(
        {
          success: false,
          message: data.error?.message ?? "Error subiendo archivo",
          cloudinary: data,
        },
        {
          status: 500,
        },
      );
    }

    return NextResponse.json({
      success: true,
      url: data.secure_url,
      original_filename: data.original_filename,
      bytes: data.bytes,
    });
  } catch (error) {
    console.error("Error upload:", error);

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
