"use client";

import { useState } from "react";
import { X, Upload, Save } from "lucide-react";

import { Material } from "../types";

type Props = {
  material: Material;
  onClose: () => void;
  onUpdated: (material: Material) => void;
};

export default function EditMaterialModal({
  material,
  onClose,
  onUpdated,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [file, setFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    titulo: material.titulo ?? "",
    descripcion: material.descripcion ?? "",

    tipo: material.tipo ?? "file",

    material_category: material.material_category ?? "grammar",

    sub_category: material.sub_category ?? "",

    contenido_texto: material.contenido_texto ?? "",

    url: material.url ?? "",

    is_published: material.is_published ?? true,

    orden: material.orden ?? 0,
  });

  // =====================================================
  // Cambiar campos
  // =====================================================

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

  // =====================================================
  // Guardar cambios
  // =====================================================

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      let archivo_url = material.archivo_url ?? "";
      let archivo_nombre = material.archivo_nombre ?? "";
      let archivo_size = material.archivo_size ?? 0;

      // =================================================
      // Si seleccionó un nuevo archivo
      // =================================================

      if (formData.tipo === "file" && file) {
        const uploadData = new FormData();

        uploadData.append("file", file);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: uploadData,
        });

        const uploadResult = await uploadRes.json();

        if (!uploadRes.ok || !uploadResult.success) {
          alert(uploadResult.message || "Error subiendo archivo");

          return;
        }

        archivo_url = uploadResult.url;
        archivo_nombre = file.name;
        archivo_size = file.size;
      }

      // =================================================
      // Actualizar material
      // =================================================

      const response = await fetch(`/api/teacher/materials/${material.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titulo: formData.titulo,
          descripcion: formData.descripcion,

          tipo: formData.tipo,

          material_category: formData.material_category,

          sub_category: formData.sub_category || null,

          contenido_texto:
            formData.tipo === "text" ? formData.contenido_texto : null,

          url: formData.tipo === "link" ? formData.url : null,

          archivo_url: formData.tipo === "file" ? archivo_url : null,

          archivo_nombre: formData.tipo === "file" ? archivo_nombre : null,

          archivo_size: formData.tipo === "file" ? archivo_size : null,

          is_published: formData.is_published,

          orden: Number(formData.orden),
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        alert(result.message || "Error actualizando material");

        return;
      }

      // =================================================
      // Actualizar estado del padre
      // =================================================

      onUpdated(result.material);
    } catch (error) {
      console.error("Error actualizando material:", error);

      alert("Error actualizando material");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/50
        p-4
      "
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
        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            sticky
            top-0
            z-10
            flex
            items-center
            justify-between
            px-7
            py-5
            bg-white
            border-b
            border-slate-200
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
            disabled={loading}
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
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* =================================================
            FORM
        ================================================= */}

        <form onSubmit={handleSubmit} className="p-7 space-y-6">
          {/* =================================================
              TITULO
          ================================================= */}

          <div>
            <label
              className="
                block
                mb-2
                font-medium
                text-slate-700
              "
            >
              Título
            </label>

            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              required
              className="
                w-full
                h-12
                px-4
                rounded-xl
                border
                border-slate-200
                focus:outline-none
                focus:ring-2
                focus:ring-cyan-500
                  text-slate-600
              "
            />
          </div>

          {/* =================================================
              DESCRIPCIÓN
          ================================================= */}

          <div>
            <label
              className="
                block
                mb-2
                font-medium
                text-slate-700
              "
            >
              Descripción
            </label>

            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows={4}
              className="
                w-full
                p-4
                rounded-xl
                border
                border-slate-200
                resize-none
                focus:outline-none
                focus:ring-2
                focus:ring-cyan-500
                text-slate-600
              "
            />
          </div>

          {/* =================================================
              CATEGORÍA / SUBCATEGORÍA
          ================================================= */}

          <div className="grid md:grid-cols-2 gap-5">
            {/* CATEGORÍA */}

            <div>
              <label
                className="
                  block
                  mb-2
                  font-medium
                  text-slate-700
                "
              >
                Categoría
              </label>

              <select
                name="material_category"
                value={formData.material_category}
                onChange={handleChange}
                className="
                  w-full
                  h-12
                  px-4
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  focus:outline-none
                  focus:ring-2
                  focus:ring-cyan-500
                    text-slate-600
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

            {/* SUBCATEGORÍA */}

            <div>
              <label
                className="
                  block
                  mb-2
                  font-medium
                  text-slate-700
                "
              >
                Subcategoría
              </label>

              <select
                name="sub_category"
                value={formData.sub_category}
                onChange={handleChange}
                className="
                  w-full
                  h-12
                  px-4
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  focus:outline-none
                  focus:ring-2
                  focus:ring-cyan-500
                    text-slate-600
                "
              >
                <option value="">Sin subcategoría</option>

                <option value="imagen">Imagen</option>

                <option value="video">Video</option>

                <option value="audio">Audio</option>

                <option value="libro">Libro</option>

                <option value="documento">Documento</option>

                <option value="presentacion">Presentación</option>

                <option value="ficha">Ficha</option>

                <option value="ejercicio">Ejercicio</option>

                <option value="guia">Guía</option>

                <option value="quiz">Quiz</option>

                <option value="otro">Otro</option>
              </select>
            </div>
          </div>

          {/* =================================================
              TIPO
          ================================================= */}

          <div>
            <label
              className="
                block
                mb-2
                font-medium
                text-slate-700
              "
            >
              Tipo
            </label>

            <select
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              className="
                w-full
                h-12
                px-4
                rounded-xl
                border
                border-slate-200
                bg-white
                focus:outline-none
                focus:ring-2
                focus:ring-cyan-500
                  text-slate-600
              "
            >
              <option value="file">Archivo</option>

              <option value="link">Link</option>

              <option value="text">Texto</option>
            </select>
          </div>

          {/* =================================================
              ARCHIVO
          ================================================= */}

          {formData.tipo === "file" && (
            <div>
              <label
                className="
                  block
                  mb-2
                  font-medium
                  text-slate-700
                "
              >
                Archivo
              </label>

              {material.archivo_nombre && (
                <div
                  className="
                    mb-3
                    p-4
                    rounded-xl
                    bg-slate-50
                    border
                    border-slate-200
                  "
                >
                  <p className="text-sm text-slate-500">Archivo actual</p>

                  <p className="font-medium text-slate-800 mt-1">
                    {material.archivo_nombre}
                  </p>
                </div>
              )}

              <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="
                  w-full
                  text-sm
                  text-slate-600
                "
              />

              <p className="text-xs text-slate-400 mt-2">
                Si no seleccionás un archivo nuevo, se conservará el actual.
              </p>
            </div>
          )}

          {/* =================================================
              LINK
          ================================================= */}

          {formData.tipo === "link" && (
            <div>
              <label
                className="
                  block
                  mb-2
                  font-medium
                  text-slate-700
                "
              >
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
                  h-12
                  px-4
                  rounded-xl
                  border
                  border-slate-200
                  focus:outline-none
                  focus:ring-2
                  focus:ring-cyan-500
                    text-slate-600
                "
              />
            </div>
          )}

          {/* =================================================
              TEXTO
          ================================================= */}

          {formData.tipo === "text" && (
            <div>
              <label
                className="
                  block
                  mb-2
                  font-medium
                  text-slate-700
                "
              >
                Contenido
              </label>

              <textarea
                name="contenido_texto"
                value={formData.contenido_texto}
                onChange={handleChange}
                rows={8}
                className="
                  w-full
                  p-4
                  rounded-xl
                  border
                  border-slate-200
                  resize-none
                  focus:outline-none
                  focus:ring-2
                  focus:ring-cyan-500
                "
              />
            </div>
          )}

          {/* =================================================
              PUBLICADO / ORDEN
          ================================================= */}

          {/* =================================================
              BOTONES
          ================================================= */}

          <div
            className="
              flex
              justify-end
              gap-3
              pt-5
             
              border-slate-200
            "
          >
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
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
              "
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={loading}
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
              "
            >
              {loading ? (
                <>
                  <Upload size={18} className="animate-pulse" />
                  Guardando...
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
