"use client";

import { useEffect, useState } from "react";
import { X, Upload, Save, FileText, Paperclip } from "lucide-react";

import type { Material } from "@/types/material";

type Props = {
  material: Material;
  onClose: () => void;
  onUpdated: (material: Material) => void;
};

const categories = [
  { value: "grammar", label: "Grammar" },
  { value: "vocabulary", label: "Vocabulary" },
  { value: "reading", label: "Reading" },
  { value: "listening", label: "Listening" },
  { value: "speaking", label: "Speaking" },
  { value: "writing", label: "Writing" },
  { value: "homework", label: "Homework" },
  { value: "exam", label: "Exam" },
];

const subCategories = [
  { value: "libro", label: "Libro" },
  { value: "documento", label: "Documento" },
  { value: "imagen", label: "Imagen" },
  { value: "video", label: "Video" },
  { value: "audio", label: "Audio" },
  { value: "presentacion", label: "Presentación" },
  { value: "ejercicio", label: "Ejercicio" },
  { value: "guia", label: "Guía" },
  { value: "quiz", label: "Quiz" },
  { value: "texto", label: "Texto" },
];

export default function EditMaterialModal({
  material,
  onClose,
  onUpdated,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [file, setFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    titulo: material.titulo,
    descripcion: material.descripcion || "",
    tipo: material.tipo,
    material_category: material.material_category || "grammar",
    sub_category: material.sub_category || "",
    contenido_texto: material.contenido_texto || "",
    url: material.url || "",
    is_published: material.is_published ?? true,
    orden: material.orden ?? 0,
  });

  useEffect(() => {
    setFormData({
      titulo: material.titulo,
      descripcion: material.descripcion || "",
      tipo: material.tipo,
      material_category: material.material_category || "grammar",
      sub_category: material.sub_category || "",
      contenido_texto: material.contenido_texto || "",
      url: material.url || "",
      is_published: material.is_published ?? true,
      orden: material.orden ?? 0,
    });

    setFile(null);
  }, [material]);

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

    // Si cambia el tipo, limpiamos el archivo nuevo seleccionado.
    if (name === "tipo") {
      setFile(null);
    }
  };

  /**
   * Sube el archivo a Cloudinary mediante /api/upload.
   */
  async function uploadFile() {
    if (!file) return null;

    setUploading(true);

    try {
      const uploadData = new FormData();

      uploadData.append("file", file);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });

      const uploadResult = await uploadRes.json();

      if (!uploadRes.ok || !uploadResult.success) {
        throw new Error(uploadResult.message || "Error subiendo el archivo.");
      }

      if (!uploadResult.url) {
        throw new Error("El servidor no devolvió la URL del archivo.");
      }

      return {
        url: uploadResult.url,
        name: file.name,
        size: file.size,
      };
    } finally {
      setUploading(false);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      /*
       * =====================================================
       * ARCHIVO ACTUAL
       * =====================================================
       *
       * Si no se selecciona un archivo nuevo,
       * conservamos el archivo existente.
       */

      let archivo_url = material.archivo_url ?? null;
      let archivo_nombre = material.archivo_nombre ?? null;
      let archivo_size = material.archivo_size ?? null;

      /*
       * =====================================================
       * NUEVO ARCHIVO
       * =====================================================
       */

      if (formData.tipo === "file" && file) {
        const uploadedFile = await uploadFile();

        if (!uploadedFile) {
          throw new Error("No se pudo subir el archivo.");
        }

        archivo_url = uploadedFile.url;
        archivo_nombre = uploadedFile.name;
        archivo_size = uploadedFile.size;
      }

      /*
       * =====================================================
       * SI DEJÓ DE SER FILE
       * =====================================================
       *
       * En ese caso ya no tiene sentido conservar
       * archivo_url / archivo_nombre / archivo_size.
       */

      if (formData.tipo !== "file") {
        archivo_url = null;
        archivo_nombre = null;
        archivo_size = null;
      }

      /*
       * =====================================================
       * ACTUALIZAR MATERIAL
       * =====================================================
       */

      const response = await fetch(
        `/api/admin/classrooms/materials/${material.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            titulo: formData.titulo,

            descripcion: formData.descripcion.trim() || null,

            tipo: formData.tipo,

            material_category: formData.material_category,

            sub_category: formData.sub_category || null,

            contenido_texto:
              formData.tipo === "text"
                ? formData.contenido_texto.trim() || null
                : null,

            url:
              formData.tipo === "link" || formData.tipo === "video"
                ? formData.url.trim() || null
                : null,

            archivo_url,

            archivo_nombre,

            archivo_size,

            is_published: formData.is_published,

            orden: Number(formData.orden),
          }),
        },
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Error actualizando material.");
      }

      /*
       * Actualizamos el estado del padre
       */
      onUpdated(data.material);
    } catch (error) {
      console.error("Error actualizando material:", error);

      alert(
        error instanceof Error ? error.message : "Error actualizando material.",
      );
    } finally {
      setLoading(false);
    }
  };

  const isBusy = loading || uploading;

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        bg-black/50
        backdrop-blur-sm
        flex
        items-center
        justify-center
        p-4
      "
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !isBusy) {
          onClose();
        }
      }}
    >
      <div
        className="
          w-full
          max-w-3xl
          max-h-[90vh]
          overflow-y-auto
          bg-white
          rounded-[28px]
          shadow-2xl
        "
      >
        {/* HEADER */}

        <div
          className="
            sticky
            top-0
            z-10
            bg-white
            border-b
            border-slate-100
            px-7
            py-5
            flex
            items-center
            justify-between
          "
        >
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Editar material
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Modificá la información del material.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isBusy}
            className="
              w-10
              h-10
              rounded-xl
              hover:bg-slate-100
              flex
              items-center
              justify-center
              text-slate-500
              transition
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* FORM */}

        <form onSubmit={handleSubmit} className="p-7 space-y-6">
          {/* TITULO */}

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
              disabled={isBusy}
              className="
                w-full
                h-12
                px-4
                rounded-xl
                border
                border-slate-200
                outline-none
                focus:border-cyan-500
                focus:ring-2
                focus:ring-cyan-500/20
                text-slate-600
                disabled:bg-slate-50
              "
            />
          </div>

          {/* DESCRIPCION */}

          <div>
            <label className="block mb-2 font-medium text-slate-700">
              Descripción
            </label>

            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows={4}
              disabled={isBusy}
              className="
                w-full
                p-4
                rounded-xl
                border
                border-slate-200
                outline-none
                focus:border-cyan-500
                focus:ring-2
                focus:ring-cyan-500/20
                resize-none
                text-slate-600
                disabled:bg-slate-50
              "
            />
          </div>

          {/* CATEGORIAS */}

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block mb-2 font-medium text-slate-700">
                Categoría
              </label>

              <select
                name="material_category"
                value={formData.material_category}
                onChange={handleChange}
                disabled={isBusy}
                className="
                  w-full
                  h-12
                  px-4
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  text-slate-600
                  outline-none
                  focus:border-cyan-500
                "
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium text-slate-700">
                Subcategoría
              </label>

              <select
                name="sub_category"
                value={formData.sub_category}
                onChange={handleChange}
                disabled={isBusy}
                className="
                  w-full
                  h-12
                  px-4
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  text-slate-600
                  outline-none
                  focus:border-cyan-500
                "
              >
                <option value="">Sin subcategoría</option>

                {subCategories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* TIPO */}

          <div>
            <label className="block mb-2 font-medium text-slate-700">
              Tipo
            </label>

            <select
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              disabled={isBusy}
              className="
                w-full
                h-12
                px-4
                rounded-xl
                border
                border-slate-200
                bg-white
                text-slate-600
                outline-none
                focus:border-cyan-500
              "
            >
              <option value="file">Archivo</option>
              <option value="link">Link</option>
              <option value="text">Texto</option>
              <option value="video">Video</option>
            </select>
          </div>

          {/* ARCHIVO */}

          {formData.tipo === "file" && (
            <div className="space-y-4">
              <label className="block font-medium text-slate-700">
                Archivo
              </label>

              {/* Archivo actual */}

              {material.archivo_url && (
                <div
                  className="
                    rounded-2xl
                    border
                    border-slate-200
                    bg-slate-50
                    p-5
                  "
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="
                        w-11
                        h-11
                        rounded-xl
                        bg-cyan-100
                        text-cyan-700
                        flex
                        items-center
                        justify-center
                        shrink-0
                      "
                    >
                      <FileText size={22} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-slate-400 uppercase tracking-wide">
                        Archivo actual
                      </p>

                      <p className="mt-1 font-semibold text-slate-800 truncate">
                        {material.archivo_nombre || "Archivo sin nombre"}
                      </p>

                      {material.archivo_size && (
                        <p className="mt-1 text-xs text-slate-500">
                          {(material.archivo_size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      )}
                    </div>

                    <a
                      href={material.archivo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        shrink-0
                        px-4
                        h-10
                        rounded-xl
                        bg-white
                        border
                        border-slate-200
                        text-sm
                        font-medium
                        text-slate-700
                        hover:bg-slate-100
                        flex
                        items-center
                      "
                    >
                      Ver archivo
                    </a>
                  </div>
                </div>
              )}

              {/* Selector */}

              <div
                className="
                  rounded-2xl
                  border-2
                  border-dashed
                  border-slate-300
                  bg-slate-50
                  p-6
                  text-center
                "
              >
                <Paperclip className="mx-auto text-slate-400" size={30} />

                <p className="mt-3 font-medium text-slate-700">
                  {file
                    ? "Nuevo archivo seleccionado"
                    : material.archivo_url
                      ? "Reemplazar archivo"
                      : "Seleccionar archivo"}
                </p>

                <input
                  id="material-file"
                  type="file"
                  disabled={isBusy}
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="hidden"
                />

                <label
                  htmlFor="material-file"
                  className="
                    mt-4
                    inline-flex
                    items-center
                    gap-2
                    h-11
                    px-5
                    rounded-xl
                    bg-white
                    border
                    border-slate-300
                    text-slate-700
                    font-medium
                    cursor-pointer
                    hover:bg-slate-100
                    transition
                  "
                >
                  <Upload size={17} />

                  {file ? "Cambiar archivo" : "Seleccionar archivo"}
                </label>

                {file && (
                  <div className="mt-4">
                    <p className="font-semibold text-slate-700 truncate">
                      {file.name}
                    </p>

                    <p className="text-xs text-slate-400 mt-1">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                )}

                <p className="mt-3 text-xs text-slate-400">
                  Si no seleccionás un archivo nuevo, se conservará el actual.
                </p>
              </div>
            </div>
          )}

          {/* URL */}

          {(formData.tipo === "link" || formData.tipo === "video") && (
            <div>
              <label className="block mb-2 font-medium text-slate-700">
                URL
              </label>

              <input
                type="url"
                name="url"
                value={formData.url}
                onChange={handleChange}
                disabled={isBusy}
                placeholder="https://..."
                className="
                  w-full
                  h-12
                  px-4
                  rounded-xl
                  border
                  border-slate-200
                  text-slate-600
                  outline-none
                  focus:border-cyan-500
                  focus:ring-2
                  focus:ring-cyan-500/20
                  disabled:bg-slate-50
                "
              />
            </div>
          )}

          {/* TEXTO */}

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
                disabled={isBusy}
                className="
                  w-full
                  p-4
                  rounded-xl
                  border
                  border-slate-200
                  resize-none
                  outline-none
                  focus:border-cyan-500
                  focus:ring-2
                  focus:ring-cyan-500/20
                  disabled:bg-slate-50
                "
              />
            </div>
          )}

          {/* PUBLICADO / ORDEN */}

          <div
            className="
              flex
              flex-col
              sm:flex-row
              sm:items-center
              gap-6
              bg-slate-50
              p-5
              rounded-2xl
              border
              border-slate-100
            "
          >
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="is_published"
                checked={formData.is_published}
                onChange={handleChange}
                disabled={isBusy}
                className="
                  w-5
                  h-5
                  text-cyan-600
                  rounded
                  border-slate-300
                  focus:ring-cyan-500
                  cursor-pointer
                "
              />

              <div>
                <span className="font-medium text-slate-700">
                  Publicar material
                </span>

                <p className="text-xs text-slate-500">
                  {formData.is_published
                    ? "Visible para los estudiantes"
                    : "Oculto (guardado como borrador)"}
                </p>
              </div>
            </label>

            <div className="hidden sm:block w-px h-10 bg-slate-200" />
          </div>

          {/* ACTIONS */}

          <div
            className="
              flex
              justify-end
              gap-3
              pt-5
              border-t
              border-slate-100
            "
          >
            <button
              type="button"
              onClick={onClose}
              disabled={isBusy}
              className="
                h-12
                px-6
                rounded-xl
                border
                border-slate-200
                text-slate-700
                font-medium
                hover:bg-slate-50
                transition
                disabled:opacity-50
              "
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={isBusy}
              className="
                h-12
                px-6
                rounded-xl
                bg-cyan-600
                hover:bg-cyan-500
                text-white
                font-semibold
                flex
                items-center
                gap-2
                transition
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              {isBusy ? (
                <>
                  <Upload size={18} className="animate-pulse" />

                  {uploading ? "Subiendo archivo..." : "Guardando..."}
                </>
              ) : (
                <>
                  <Save size={18} />
                  Guardar cambios
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
