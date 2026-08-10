"use client";

import { useEffect, useState } from "react";
import { X, Save } from "lucide-react";

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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(
        `/api/admin/classrooms/materials/${material.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            titulo: formData.titulo,
            descripcion: formData.descripcion || null,
            tipo: formData.tipo,
            material_category: formData.material_category,
            sub_category: formData.sub_category || null,
            contenido_texto:
              formData.tipo === "text"
                ? formData.contenido_texto || null
                : null,
            url:
              formData.tipo === "link" || formData.tipo === "video"
                ? formData.url || null
                : null,
            is_published: formData.is_published,
            orden: Number(formData.orden),
          }),
        },
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(data.message || "Error actualizando material");
        return;
      }

      onUpdated(data.material);
    } catch (error) {
      console.error(error);
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
        bg-black/50
        backdrop-blur-sm
        flex
        items-center
        justify-center
        p-4
      "
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="
          w-full
          max-w-2xl
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
            px-6
            py-5
            flex
            items-center
            justify-between
          "
        >
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Editar material
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Modificá la información del material.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              w-10
              h-10
              rounded-xl
              hover:bg-slate-100
              flex
              items-center
              justify-center
              text-slate-500
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* FORM */}

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
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
              className="
                w-full
                h-12
                px-4
                rounded-xl
                border
                border-slate-200
                outline-none
                focus:border-cyan-500
                text-slate-600
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
              className="
                w-full
                p-4
                rounded-xl
                border
                border-slate-200
                outline-none
                focus:border-cyan-500
                resize-none
                text-slate-600
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
                className="
                  w-full
                  h-12
                  px-4
                  rounded-xl
                  border
                  border-slate-200
                  text-slate-600
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
                className="
                  w-full
                  h-12
                  px-4
                  rounded-xl
                  border
                  border-slate-200
                  text-slate-600
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
              className="
                w-full
                h-12
                px-4
                rounded-xl
                border
                border-slate-200
                text-slate-600
              "
            >
              <option value="file">Archivo</option>
              <option value="link">Link</option>
              <option value="text">Texto</option>
              <option value="video">Video</option>
            </select>
          </div>

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
                className="
                  w-full
                  h-12
                  px-4
                  rounded-xl
                  border
                  border-slate-200
                  text-slate-600
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
                className="
                  w-full
                  p-4
                  rounded-xl
                  border
                  border-slate-200
                  resize-none
                "
              />
            </div>
          )}

          {/* ACTIONS */}

          <div
            className="
              flex
              justify-end
              gap-3
              pt-4
              border-t
              border-slate-100
            "
          >
            <button
              type="button"
              onClick={onClose}
              className="
                h-11
                px-5
                rounded-xl
                bg-slate-100
                hover:bg-slate-200
                text-slate-700
                font-medium
              "
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={loading}
              className="
                h-11
                px-5
                rounded-xl
                bg-cyan-500
                hover:bg-cyan-600
                text-white
                font-medium
                flex
                items-center
                gap-2
                disabled:opacity-50
              "
            >
              <Save size={18} />

              {loading ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
