"use client";

import { useEffect, useMemo, useState } from "react";

import { ExternalLink, FileText, Trash2 } from "lucide-react";

import { Material } from "../types";

type Props = {
  classroomId: string;
};

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

export default function MaterialsTab({ classroomId }: Props) {
  const [materials, setMaterials] = useState<Material[]>([]);

  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("all");

  const loadMaterials = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `/api/teacher/classroom/${classroomId}/materials`,
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

  const filteredMaterials = useMemo(() => {
    if (selectedCategory === "all") {
      return materials;
    }

    return materials.filter(
      (material) => material.material_category === selectedCategory,
    );
  }, [materials, selectedCategory]);

  const getMaterialLink = (material: Material) => {
    if (material.tipo === "link") {
      return material.url || "#";
    }

    return material.archivo_url || "#";
  };

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

  if (loading) {
    return (
      <div
        className="
        bg-white
        rounded-2xl
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

  return (
    <div>
      <div
        className="
        flex
        items-center
        justify-between
        mb-6
      "
      >
        <h2
          className="
          text-2xl
          font-semibold
          text-gray-900
        "
        >
          Materiales
        </h2>

        <span
          className="
          text-sm
          text-gray-500
        "
        >
          {filteredMaterials.length} materiales
        </span>
      </div>

      <div
        className="
        flex
        flex-wrap
        gap-3
        mb-8
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
                  ? "bg-blue-600 text-white"
                  : "bg-white border text-gray-600 hover:border-blue-300"
              }
            `}
          >
            {category === "all" ? "Todos" : categoryLabels[category]}
          </button>
        ))}
      </div>

      {filteredMaterials.length === 0 ? (
        <div
          className="
          bg-white
          rounded-2xl
          border
          p-6
          text-gray-500
        "
        >
          No hay materiales en esta categoría.
        </div>
      ) : (
        <div
          className="
          grid
          md:grid-cols-2
          xl:grid-cols-3
          gap-5
        "
        >
          {filteredMaterials.map((material) => (
            <div
              key={material.id}
              className="
              bg-white
              rounded-2xl
              border
              p-5
              shadow-sm
              hover:shadow-lg
              transition-all
            "
            >
              <div>
                <span
                  className="
                  inline-flex
                  px-3
                  py-1
                  rounded-full
                  bg-blue-50
                  text-blue-600
                  text-xs
                  font-medium
                  mr-2
                "
                >
                  {categoryLabels[material.material_category]}
                </span>

                <span
                  className={`
                    inline-flex
                    px-2
                    py-1
                    rounded-full
                    text-xs
                    font-medium
                    ${
                      material.tipo === "link"
                        ? "bg-green-50 text-green-700"
                        : "bg-purple-50 text-purple-700"
                    }
                  `}
                >
                  {material.tipo === "link" ? "Enlace" : "Archivo"}
                </span>

                <h3
                  className="
                  mt-3
                  font-semibold
                  text-lg
                  text-gray-900
                "
                >
                  {material.titulo}
                </h3>
              </div>

              <p
                className="
                mt-3
                text-gray-600
                line-clamp-3
              "
              >
                {material.descripcion}
              </p>

              <p
                className="
                mt-4
                text-sm
                text-gray-400
              "
              >
                {new Date(material.created_at).toLocaleDateString("es-AR")}
              </p>

              <div
                className="
                mt-6
                flex
                gap-3
              "
              >
                <a
                  href={getMaterialLink(material)}
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
                "
                >
                  {material.tipo === "link" ? (
                    <>
                      <ExternalLink size={16} />
                      Abrir enlace
                    </>
                  ) : (
                    <>
                      <FileText size={16} />
                      Ver archivo
                    </>
                  )}
                </a>

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
                "
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
