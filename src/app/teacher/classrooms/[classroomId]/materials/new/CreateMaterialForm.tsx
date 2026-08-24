"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Upload,
  Eye,
  EyeOff,
  Globe,
  LockKeyhole,
} from "lucide-react";
import Link from "next/link";

type Props = {
  classroomId: string;
};

export default function CreateMaterialForm({ classroomId }: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [file, setFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    tipo: "file",

    // Categoría pedagógica
    material_category: "grammar",

    // Subcategoría del recurso
    sub_category: "documento",

    contenido_texto: "",
    url: "",

    /*
    =====================================================
    PUBLICACIÓN
    =====================================================

    true  = visible para alumnos
    false = oculto para alumnos, visible para profesores
    */

    is_published: true,

    orden: 0,
  });

  /*
  =====================================================
  HANDLE CHANGE
  =====================================================
  */

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,

      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  /*
  =====================================================
  HANDLE SUBMIT
  =====================================================
  */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      /*
      ===================================================
      VALIDACIONES
      ===================================================
      */

      if (!formData.titulo.trim()) {
        alert("Ingresá un título para el material.");
        return;
      }

      if (formData.tipo === "file" && !file) {
        alert("Seleccioná un archivo.");
        return;
      }

      if (formData.tipo === "link" && !formData.url.trim()) {
        alert("Ingresá una URL.");
        return;
      }

      if (formData.tipo === "text" && !formData.contenido_texto.trim()) {
        alert("Ingresá el contenido del material.");
        return;
      }

      /*
      ===================================================
      VARIABLES DEL ARCHIVO
      ===================================================
      */

      let archivo_url = "";
      let archivo_nombre = "";
      let archivo_size = 0;

      /*
      ===================================================
      SUBIR ARCHIVO A CLOUDINARY
      ===================================================
      */

      if (formData.tipo === "file" && file) {
        const uploadData = new FormData();

        uploadData.append("file", file);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: uploadData,
        });

        const uploadResult = await uploadRes.json();

        if (!uploadRes.ok || !uploadResult.success) {
          alert(uploadResult.message || "Error subiendo archivo.");

          return;
        }

        archivo_url = uploadResult.url;

        archivo_nombre = file.name;

        archivo_size = file.size;
      }

      /*
      ===================================================
      GUARDAR MATERIAL EN DB
      ===================================================
      */

      console.log("classroomId:", classroomId);

      console.log("Material publicado:", formData.is_published);

      const res = await fetch("/api/teacher/classrooms/materials", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          classroom_id: classroomId,

          titulo: formData.titulo.trim(),

          descripcion: formData.descripcion.trim(),

          /*
            =================================================
            TIPO TÉCNICO
            =================================================
            */

          tipo: formData.tipo,

          /*
            =================================================
            CATEGORÍA PEDAGÓGICA
            =================================================
            */

          material_category: formData.material_category,

          /*
            =================================================
            SUBCATEGORÍA
            =================================================
            */

          sub_category: formData.sub_category,

          /*
            =================================================
            CONTENIDO
            =================================================
            */

          contenido_texto: formData.contenido_texto,

          url: formData.url.trim(),

          /*
            =================================================
            ARCHIVO
            =================================================
            */

          archivo_url,

          archivo_nombre,

          archivo_size,

          /*
            =================================================
            PUBLICACIÓN
            =================================================

            true:
              visible para alumnos

            false:
              oculto para alumnos,
              pero visible para profesores
            */

          is_published: Boolean(formData.is_published),

          /*
            =================================================
            ORDEN
            =================================================
            */

          orden: Number(formData.orden),
        }),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        alert(result.message || "Error guardando material.");

        return;
      }

      /*
      ===================================================
      VOLVER AL AULA
      ===================================================
      */

      router.push(`/teacher/classrooms/${classroomId}`);

      router.refresh();
    } catch (error) {
      console.error("Error guardando material:", error);

      alert("Ocurrió un error al guardar el material.");
    } finally {
      setLoading(false);
    }
  };

  /*
  =====================================================
  RENDER
  =====================================================
  */

  return (
    <main className="min-h-screen bg-slate-100">
      {/* =================================================
          HEADER
      ================================================= */}

      <div
        className="
          bg-gradient-to-r
          from-slate-950
          via-blue-950
          to-cyan-900
          text-white
          px-6
          md:px-10
          py-8
        "
      >
        <div
          className="
            max-w-5xl
            mx-auto
            flex
            justify-between
            items-center
            gap-6
          "
        >
          <div>
            <p className="text-cyan-300 uppercase tracking-[4px] text-sm">
              Materiales
            </p>

            <h1 className="text-4xl font-bold mt-2">Subir material</h1>

            <p className="text-slate-300 mt-3">
              Agregá contenido para tus alumnos.
            </p>
          </div>

          <Link
            href={`/teacher/classrooms/${classroomId}`}
            className="
              h-12
              px-5
              rounded-2xl
              bg-white/10
              hover:bg-white/20
              flex
              items-center
              gap-2
              transition
              shrink-0
            "
          >
            <ArrowLeft size={18} />
            Volver
          </Link>
        </div>
      </div>

      {/* =================================================
          FORM
      ================================================= */}

      <div className="p-6 md:p-10">
        <form
          onSubmit={handleSubmit}
          className="
            max-w-5xl
            mx-auto
            bg-white
            rounded-[32px]
            shadow-xl
            p-8
            space-y-8
            text-slate-700
          "
        >
          {/* =================================================
              TITULO
          ================================================= */}

          <div>
            <label className="block mb-2 font-medium text-slate-700">
              Título
            </label>

            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              required
              placeholder="Ej: Present Perfect"
              className="
                w-full
                h-14
                px-5
                rounded-2xl
                border
                border-slate-200
                outline-none
                focus:ring-2
                focus:ring-cyan-500
              "
            />
          </div>

          {/* =================================================
              DESCRIPCIÓN
          ================================================= */}

          <div>
            <label className="block mb-2 font-medium text-slate-700">
              Descripción
            </label>

            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows={4}
              placeholder="Descripción del material..."
              className="
                w-full
                p-5
                rounded-2xl
                border
                border-slate-200
                outline-none
                focus:ring-2
                focus:ring-cyan-500
              "
            />
          </div>

          {/* =================================================
              SELECTS
          ================================================= */}

          <div className="grid md:grid-cols-3 gap-6">
            {/* =================================================
                CATEGORÍA
            ================================================= */}

            <div>
              <label className="block mb-2 font-medium text-slate-700">
                Categoría
              </label>

              <select
                name="material_category"
                value={formData.material_category}
                onChange={handleChange}
                className="
                  w-full
                  h-14
                  px-5
                  rounded-2xl
                  border
                  border-slate-200
                  outline-none
                  focus:ring-2
                  focus:ring-cyan-500
                "
              >
                <option value="grammar">Grammar</option>

                <option value="vocabulary">Vocabulary</option>

                <option value="reading">Reading</option>

                <option value="listening">Listening</option>

                <option value="speaking">Speaking</option>

                <option value="writing">Writing</option>

                <option value="homework">Homework</option>

                <option value="exam">Exam</option>
              </select>
            </div>

            {/* =================================================
                SUBCATEGORÍA
            ================================================= */}

            <div>
              <label className="block mb-2 font-medium text-slate-700">
                Tipo de recurso
              </label>

              <select
                name="sub_category"
                value={formData.sub_category}
                onChange={handleChange}
                className="
                  w-full
                  h-14
                  px-5
                  rounded-2xl
                  border
                  border-slate-200
                  outline-none
                  focus:ring-2
                  focus:ring-cyan-500
                "
              >
                <option value="imagen">Imagen</option>

                <option value="video">Video</option>

                <option value="audio">Audio</option>

                <option value="libro">Libro</option>

                <option value="documento">Documento</option>

                <option value="presentacion">Presentación</option>

                <option value="ejercicio">Ejercicio</option>

                <option value="enlace">Enlace</option>

                <option value="guia">Guía</option>

                <option value="otro">Otro</option>
              </select>
            </div>

            {/* =================================================
                TIPO
            ================================================= */}

            <div>
              <label className="block mb-2 font-medium text-slate-700">
                Formato
              </label>

              <select
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                className="
                  w-full
                  h-14
                  px-5
                  rounded-2xl
                  border
                  border-slate-200
                  outline-none
                  focus:ring-2
                  focus:ring-cyan-500
                "
              >
                <option value="file">Archivo</option>

                <option value="link">Link</option>

                <option value="text">Texto</option>
              </select>
            </div>
          </div>

          {/* =================================================
              ARCHIVO
          ================================================= */}

          {formData.tipo === "file" && (
            <div>
              <label className="block mb-2 font-medium text-slate-700">
                Archivo
              </label>

              <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="
                  w-full
                  rounded-2xl
                  border
                  border-slate-200
                  p-4
                "
              />

              {file && (
                <p className="mt-2 text-sm text-slate-500">
                  Archivo seleccionado:{" "}
                  <span className="font-medium text-slate-700">
                    {file.name}
                  </span>
                </p>
              )}
            </div>
          )}

          {/* =================================================
              LINK
          ================================================= */}

          {formData.tipo === "link" && (
            <div>
              <label className="block mb-2 font-medium text-slate-700">
                URL
              </label>

              <input
                type="url"
                name="url"
                value={formData.url}
                onChange={handleChange}
                placeholder="https://..."
                className="
                  w-full
                  h-14
                  px-5
                  rounded-2xl
                  border
                  border-slate-200
                  outline-none
                  focus:ring-2
                  focus:ring-cyan-500
                "
              />
            </div>
          )}

          {/* =================================================
              TEXTO
          ================================================= */}

          {formData.tipo === "text" && (
            <div>
              <label className="block mb-2 font-medium text-slate-700">
                Contenido
              </label>

              <textarea
                name="contenido_texto"
                value={formData.contenido_texto}
                onChange={handleChange}
                rows={8}
                placeholder="Escribí el contenido del material..."
                className="
                  w-full
                  p-5
                  rounded-2xl
                  border
                  border-slate-200
                  outline-none
                  focus:ring-2
                  focus:ring-cyan-500
                "
              />
            </div>
          )}

          {/* =================================================
              PUBLICACIÓN
          ================================================= */}

          <section
            className="
              rounded-3xl
              border
              border-slate-200
              bg-slate-50
              overflow-hidden
            "
          >
            {/* HEADER */}

            <div
              className="
                px-6
                py-5
                border-b
                border-slate-200
                bg-white
              "
            >
              <div className="flex items-center gap-3">
                <div
                  className="
                    w-10
                    h-10
                    rounded-xl
                    bg-cyan-100
                    flex
                    items-center
                    justify-center
                  "
                >
                  {formData.is_published ? (
                    <Globe size={20} className="text-cyan-600" />
                  ) : (
                    <LockKeyhole size={20} className="text-slate-500" />
                  )}
                </div>

                <div>
                  <h2 className="font-bold text-slate-900">
                    Visibilidad del material
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Elegí si los alumnos pueden verlo inmediatamente.
                  </p>
                </div>
              </div>
            </div>

            {/* OPTIONS */}

            <div className="p-5">
              <div className="grid md:grid-cols-2 gap-4">
                {/* =================================================
                    PUBLICADO
                ================================================= */}

                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      is_published: true,
                    }))
                  }
                  className={`
                    text-left
                    rounded-2xl
                    border-2
                    p-5
                    transition
                    ${
                      formData.is_published
                        ? `
                          border-cyan-500
                          bg-cyan-50
                        `
                        : `
                          border-slate-200
                          bg-white
                          hover:border-slate-300
                        `
                    }
                  `}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`
                        w-10
                        h-10
                        rounded-xl
                        flex
                        items-center
                        justify-center
                        shrink-0
                        ${
                          formData.is_published
                            ? "bg-cyan-500 text-white"
                            : "bg-slate-100 text-slate-500"
                        }
                      `}
                    >
                      <Eye size={20} />
                    </div>

                    <div>
                      <p className="font-bold text-slate-800">Publicar ahora</p>

                      <p className="text-sm text-slate-500 mt-1 leading-5">
                        Los alumnos podrán ver y acceder al material
                        inmediatamente.
                      </p>
                    </div>
                  </div>
                </button>

                {/* =================================================
                    OCULTO
                ================================================= */}

                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      is_published: false,
                    }))
                  }
                  className={`
                    text-left
                    rounded-2xl
                    border-2
                    p-5
                    transition
                    ${
                      !formData.is_published
                        ? `
                          border-amber-500
                          bg-amber-50
                        `
                        : `
                          border-slate-200
                          bg-white
                          hover:border-slate-300
                        `
                    }
                  `}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`
                        w-10
                        h-10
                        rounded-xl
                        flex
                        items-center
                        justify-center
                        shrink-0
                        ${
                          !formData.is_published
                            ? "bg-amber-500 text-white"
                            : "bg-slate-100 text-slate-500"
                        }
                      `}
                    >
                      <EyeOff size={20} />
                    </div>

                    <div>
                      <p className="font-bold text-slate-800">
                        Guardar como oculto
                      </p>

                      <p className="text-sm text-slate-500 mt-1 leading-5">
                        Los alumnos no podrán verlo. Solo los profesores podrán
                        acceder y publicarlo después.
                      </p>
                    </div>
                  </div>
                </button>
              </div>

              {/* =================================================
                  ESTADO ACTUAL
              ================================================= */}

              <div
                className={`
                  mt-5
                  rounded-2xl
                  px-4
                  py-3
                  flex
                  items-center
                  gap-3
                  text-sm
                  ${
                    formData.is_published
                      ? "bg-cyan-100 text-cyan-800"
                      : "bg-amber-100 text-amber-800"
                  }
                `}
              >
                {formData.is_published ? (
                  <>
                    <Eye size={18} />

                    <span>
                      Este material será{" "}
                      <strong>visible para los alumnos</strong> al guardarlo.
                    </span>
                  </>
                ) : (
                  <>
                    <EyeOff size={18} />

                    <span>
                      Este material quedará{" "}
                      <strong>oculto para los alumnos</strong>. Los profesores
                      podrán publicarlo posteriormente.
                    </span>
                  </>
                )}
              </div>
            </div>
          </section>

          {/* =================================================
              ORDEN

               <div>
            <label className="block mb-2 font-medium text-slate-700">
              Orden
            </label>

            <input
              type="number"
              name="orden"
              value={formData.orden}
              onChange={handleChange}
              min={0}
              className="
                w-full
                h-14
                px-5
                rounded-2xl
                border
                border-slate-200
                outline-none
                focus:ring-2
                focus:ring-cyan-500
              "
            />

            <p className="text-xs text-slate-400 mt-2">
              Permite determinar el orden en que aparecerá el material dentro
              del aula.
            </p>
          </div>
          ================================================= */}

          {/* =================================================
              RESUMEN
          ================================================= */}

          <div
            className="
              rounded-2xl
              bg-slate-50
              border
              border-slate-200
              p-5
            "
          >
            <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
              Estado del material
            </p>

            <div className="flex items-center gap-3 mt-3">
              {formData.is_published ? (
                <>
                  <div className="w-9 h-9 rounded-xl bg-cyan-100 flex items-center justify-center">
                    <Eye size={18} className="text-cyan-600" />
                  </div>

                  <div>
                    <p className="font-semibold text-slate-800">Publicado</p>

                    <p className="text-sm text-slate-500">
                      Visible para los alumnos.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center">
                    <EyeOff size={18} className="text-amber-600" />
                  </div>

                  <div>
                    <p className="font-semibold text-slate-800">Oculto</p>

                    <p className="text-sm text-slate-500">
                      Solo visible para profesores.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* =================================================
              BUTTON
          ================================================= */}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              h-14
              rounded-2xl
              bg-cyan-500
              hover:bg-cyan-400
              transition
              text-white
              font-semibold
              flex
              items-center
              justify-center
              gap-3
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            <Upload size={20} />

            {loading
              ? "Guardando..."
              : formData.is_published
                ? "Publicar material"
                : "Guardar material oculto"}
          </button>
        </form>
      </div>
    </main>
  );
}
