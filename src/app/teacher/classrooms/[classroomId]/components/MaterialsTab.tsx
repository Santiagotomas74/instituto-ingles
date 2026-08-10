"use client";

import { useEffect, useMemo, useState } from "react";

import {
  ExternalLink,
  FileText,
  Trash2,
  Pencil,
  Video,
  Image as ImageIcon,
  BookOpen,
  Headphones,
  Presentation,
  File,
  Dumbbell,
} from "lucide-react";

import { Material } from "../types";
import EditMaterialModal from "./EditMaterialModal";

type Props = {
  classroomId: string;
};

// =====================================================
// CATEGORÍAS
// =====================================================

const categoryLabels: Record<string, string> = {
  grammar: "Grammar",
  vocabulary: "Vocabulary",
  reading: "Reading",
  listening: "Listening",
  speaking: "Speaking",
  writing: "Writing",
  homework: "Homework",
  exam: "Exam",
};

const categories = [
  "all",
  "grammar",
  "vocabulary",
  "reading",
  "listening",
  "speaking",
  "writing",
  "homework",
  "exam",
];

// =====================================================
// SUBCATEGORÍAS
// =====================================================

const subCategoryLabels: Record<string, string> = {
  libro: "Libros",
  documento: "Documentos",
  imagen: "Imágenes",
  video: "Videos",
  audio: "Audios",
  presentacion: "Presentaciones",
  ejercicio: "Ejercicios",
  guia: "Guías",
  quiz: "Quizzes",
  texto: "Material escrito",
};

// =====================================================
// CONFIGURACIÓN VISUAL DE SUBCATEGORÍAS
// =====================================================

const subCategoryConfig: Record<
  string,
  {
    icon: React.ReactNode;
    iconColor: string;
    iconBg: string;
  }
> = {
  libro: {
    icon: <BookOpen size={28} />,
    iconColor: "text-red-600",
    iconBg: "bg-red-100",
  },

  documento: {
    icon: <FileText size={28} />,
    iconColor: "text-orange-600",
    iconBg: "bg-orange-100",
  },

  imagen: {
    icon: <ImageIcon size={28} />,
    iconColor: "text-purple-600",
    iconBg: "bg-purple-100",
  },

  video: {
    icon: <Video size={28} />,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100",
  },

  audio: {
    icon: <Headphones size={28} />,
    iconColor: "text-pink-600",
    iconBg: "bg-pink-100",
  },

  presentacion: {
    icon: <Presentation size={28} />,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-100",
  },

  ejercicio: {
    icon: <Dumbbell size={28} />,
    iconColor: "text-green-600",
    iconBg: "bg-green-100",
  },

  guia: {
    icon: <File size={28} />,
    iconColor: "text-cyan-600",
    iconBg: "bg-cyan-100",
  },

  quiz: {
    icon: <FileText size={28} />,
    iconColor: "text-indigo-600",
    iconBg: "bg-indigo-100",
  },

  texto: {
    icon: <FileText size={28} />,
    iconColor: "text-slate-600",
    iconBg: "bg-slate-100",
  },
};

// =====================================================
// COMPONENTE
// =====================================================

export default function MaterialsTab({ classroomId }: Props) {
  const [materials, setMaterials] = useState<Material[]>([]);

  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("all");

  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);

  // =====================================================
  // CARGAR MATERIALES
  // =====================================================

  const loadMaterials = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `/api/teacher/classroom/${classroomId}/materials`,
        {
          cache: "no-store",
        },
      );

      if (!response.ok) {
        throw new Error("Error cargando materiales");
      }

      const data = await response.json();

      setMaterials(data.materials ?? []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (classroomId) {
      loadMaterials();
    }
  }, [classroomId]);

  // =====================================================
  // FILTRAR POR CATEGORÍA
  // =====================================================

  const filteredMaterials = useMemo(() => {
    if (selectedCategory === "all") {
      return materials;
    }

    return materials.filter(
      (material) => material.material_category === selectedCategory,
    );
  }, [materials, selectedCategory]);

  // =====================================================
  // OBTENER MATERIAL POR SUBCATEGORÍA
  // =====================================================

  const getMaterialsBySubCategory = (subCategory: string) => {
    return filteredMaterials.filter(
      (material) => material.sub_category === subCategory,
    );
  };

  // =====================================================
  // LINK DEL MATERIAL
  // =====================================================

  const getMaterialLink = (material: Material) => {
    if (material.tipo === "link") {
      return material.url || "#";
    }

    return material.archivo_url || material.url || "#";
  };

  // =====================================================
  // ELIMINAR
  // =====================================================

  const handleDeleteMaterial = async (id: string) => {
    const confirmed = confirm("¿Desea eliminar este material?");

    if (!confirmed) return;

    try {
      const response = await fetch(`/api/teacher/materials/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error();
      }

      setMaterials((prev) => prev.filter((material) => material.id !== id));
    } catch (error) {
      console.error(error);

      alert("Error eliminando material");
    }
  };

  // =====================================================
  // MATERIAL ACTUALIZADO
  // =====================================================

  const handleMaterialUpdated = (updatedMaterial: Material) => {
    setMaterials((prev) =>
      prev.map((material) =>
        material.id === updatedMaterial.id ? updatedMaterial : material,
      ),
    );

    setEditingMaterial(null);
  };

  // =====================================================
  // TARJETA
  // =====================================================

  const MaterialCard = ({
    material,
    icon,
    iconBg,
    iconColor,
  }: {
    material: Material;
    icon: React.ReactNode;
    iconBg: string;
    iconColor: string;
  }) => {
    const href = getMaterialLink(material);

    return (
      <div
        className="
          group
          bg-white
          rounded-3xl
          p-5
          border
          border-slate-200
          shadow-sm
          hover:shadow-xl
          hover:-translate-y-1
          transition-all
        "
      >
        {/* =================================================
            CONTENIDO
        ================================================= */}

        <div className="flex items-start gap-4">
          {/* ICONO */}

          <div
            className={`
              w-14
              h-14
              rounded-2xl
              ${iconBg}
              ${iconColor}
              flex
              items-center
              justify-center
              shrink-0
            `}
          >
            {icon}
          </div>

          {/* INFO */}

          <div className="min-w-0 flex-1">
            <h3
              className="
                font-bold
                text-lg
                text-slate-900
                group-hover:text-blue-600
                transition
                line-clamp-2
              "
            >
              {material.titulo}
            </h3>

            {material.descripcion && (
              <p
                className="
                  text-slate-500
                  mt-1
                  text-sm
                  line-clamp-2
                "
              >
                {material.descripcion}
              </p>
            )}

            {/* BADGES */}

            <div className="flex flex-wrap gap-2 mt-3">
              {material.material_category && (
                <span
                  className="
                    text-xs
                    px-2.5
                    py-1
                    rounded-full
                    bg-slate-100
                    text-slate-600
                    font-medium
                  "
                >
                  {categoryLabels[material.material_category] ||
                    material.material_category}
                </span>
              )}

              {material.sub_category && (
                <span
                  className="
                    text-xs
                    px-2.5
                    py-1
                    rounded-full
                    bg-cyan-50
                    text-cyan-700
                    font-medium
                  "
                >
                  {subCategoryLabels[material.sub_category] ||
                    material.sub_category}
                </span>
              )}

              <span
                className={`
                  text-xs
                  px-2.5
                  py-1
                  rounded-full
                  font-medium

                  ${
                    material.tipo === "link"
                      ? "bg-green-50 text-green-700"
                      : material.tipo === "text"
                        ? "bg-orange-50 text-orange-700"
                        : "bg-purple-50 text-purple-700"
                  }
                `}
              >
                {material.tipo === "link"
                  ? "Enlace"
                  : material.tipo === "text"
                    ? "Texto"
                    : "Archivo"}
              </span>
            </div>

            {/* FECHA */}

            <p className="text-xs text-slate-400 mt-3">
              {new Date(material.created_at).toLocaleDateString("es-AR")}
            </p>
          </div>
        </div>

        {/* =================================================
            ACCIONES
        ================================================= */}

        <div
          className="
            mt-5
            flex
            gap-2
          "
        >
          {/* ABRIR */}

          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex-1
              h-10
              rounded-xl
              bg-blue-600
              text-white
              flex
              items-center
              justify-center
              gap-2
              text-sm
              font-medium
              hover:bg-blue-700
              transition
            "
          >
            <ExternalLink size={15} />
            Abrir
          </a>

          {/* EDITAR */}

          <button
            onClick={() => setEditingMaterial(material)}
            className="
              w-10
              h-10
              rounded-xl
              border
              border-blue-200
              text-blue-600
              hover:bg-blue-50
              flex
              items-center
              justify-center
              transition
            "
            title="Editar material"
          >
            <Pencil size={17} />
          </button>

          {/* ELIMINAR */}

          <button
            onClick={() => handleDeleteMaterial(material.id)}
            className="
              w-10
              h-10
              rounded-xl
              border
              border-red-200
              text-red-600
              hover:bg-red-50
              flex
              items-center
              justify-center
              transition
            "
            title="Eliminar material"
          >
            <Trash2 size={17} />
          </button>
        </div>
      </div>
    );
  };

  // =====================================================
  // SECCIÓN
  // =====================================================

  const MaterialSection = ({ subCategory }: { subCategory: string }) => {
    const sectionMaterials = getMaterialsBySubCategory(subCategory);

    const config = subCategoryConfig[subCategory];

    if (!config || sectionMaterials.length === 0) {
      return null;
    }

    return (
      <section className="mb-10">
        {/* HEADER DE SECCIÓN */}

        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div
              className={`
                w-11
                h-11
                rounded-2xl
                ${config.iconBg}
                ${config.iconColor}
                flex
                items-center
                justify-center
              `}
            >
              {config.icon}
            </div>

            <div>
              <h2
                className="
                  text-2xl
                  font-bold
                  text-slate-900
                "
              >
                {subCategoryLabels[subCategory]}
              </h2>

              <p className="text-sm text-slate-400">
                {sectionMaterials.length}{" "}
                {sectionMaterials.length === 1 ? "material" : "materiales"}
              </p>
            </div>
          </div>
        </div>

        {/* MATERIALES */}

        <div
          className="
            grid
            md:grid-cols-2
            xl:grid-cols-3
            gap-5
          "
        >
          {sectionMaterials.map((material) => (
            <MaterialCard
              key={material.id}
              material={material}
              icon={config.icon}
              iconBg={config.iconBg}
              iconColor={config.iconColor}
            />
          ))}
        </div>
      </section>
    );
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div
        className="
          bg-white
          rounded-3xl
          border
          p-8
          text-center
          text-gray-500
        "
      >
        Cargando materiales...
      </div>
    );
  }

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <>
      <div>
        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            flex
            flex-col
            md:flex-row
            md:items-center
            md:justify-between
            gap-4
            mb-6
          "
        >
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Materiales</h2>

            <p className="text-sm text-gray-500 mt-1">
              {filteredMaterials.length}{" "}
              {filteredMaterials.length === 1 ? "material" : "materiales"}
            </p>
          </div>
        </div>

        {/* =================================================
            FILTROS POR CATEGORÍA
        ================================================= */}

        <div
          className="
            flex
            flex-wrap
            gap-2
            mb-8
            pb-5
            border-b
            border-slate-200
          "
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`
                px-4
                py-2
                rounded-full
                text-sm
                font-medium
                transition-all

                ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-white border border-slate-200 text-gray-600 hover:border-blue-300 hover:text-blue-600"
                }
              `}
            >
              {category === "all" ? "Todos" : categoryLabels[category]}
            </button>
          ))}
        </div>

        {/* =================================================
            SIN MATERIALES
        ================================================= */}

        {filteredMaterials.length === 0 ? (
          <div
            className="
              bg-white
              rounded-3xl
              border
              border-slate-200
              p-10
              text-center
              text-slate-500
            "
          >
            <FileText size={40} className="mx-auto mb-3 text-slate-300" />

            <p>No hay materiales en esta categoría.</p>
          </div>
        ) : (
          <>
            {/* =================================================
                SECCIONES
            ================================================= */}

            <MaterialSection subCategory="libro" />

            <MaterialSection subCategory="documento" />

            <MaterialSection subCategory="imagen" />

            <MaterialSection subCategory="video" />

            <MaterialSection subCategory="audio" />

            <MaterialSection subCategory="presentacion" />

            <MaterialSection subCategory="ejercicio" />

            <MaterialSection subCategory="guia" />

            <MaterialSection subCategory="quiz" />

            <MaterialSection subCategory="texto" />

            {/* =================================================
                MATERIALES SIN SUBCATEGORÍA
            ================================================= */}

            {filteredMaterials.some((material) => !material.sub_category) && (
              <section className="mb-10">
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="
                      w-11
                      h-11
                      rounded-2xl
                      bg-slate-100
                      text-slate-600
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <FileText size={26} />
                  </div>

                  <div>
                    <h2
                      className="
                        text-2xl
                        font-bold
                        text-slate-900
                      "
                    >
                      Otros materiales
                    </h2>

                    <p className="text-sm text-slate-400">
                      Materiales sin subcategoría
                    </p>
                  </div>
                </div>

                <div
                  className="
                    grid
                    md:grid-cols-2
                    xl:grid-cols-3
                    gap-5
                  "
                >
                  {filteredMaterials
                    .filter((material) => !material.sub_category)
                    .map((material) => (
                      <MaterialCard
                        key={material.id}
                        material={material}
                        icon={<FileText size={28} />}
                        iconBg="bg-slate-100"
                        iconColor="text-slate-600"
                      />
                    ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>

      {/* =====================================================
          MODAL EDITAR
      ===================================================== */}

      {editingMaterial && (
        <EditMaterialModal
          material={editingMaterial}
          onClose={() => setEditingMaterial(null)}
          onUpdated={handleMaterialUpdated}
        />
      )}
    </>
  );
}
