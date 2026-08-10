"use client";

import Link from "next/link";
import { useState } from "react";

import {
  Download,
  Upload,
  FileText,
  LinkIcon,
  BookOpen,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import EditMaterialModal from "./EditMaterialModal";

import type { Material } from "@/types/material";

type Props = {
  classroomId: string;
  materials: Material[];
};

export default function ClassroomMaterials({
  classroomId,
  materials: initialMaterials,
}: Props) {
  const [materials, setMaterials] = useState(initialMaterials);

  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "¿Seguro que querés eliminar este material?",
    );

    if (!confirmed) return;

    try {
      const res = await fetch(`/api/admin/classrooms/materials/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message || "Error eliminando material");
        return;
      }

      setMaterials((prev) => prev.filter((material) => material.id !== id));
    } catch (error) {
      console.error(error);
      alert("Error eliminando material");
    }
  };

  const handleMaterialUpdated = (updatedMaterial: Material) => {
    setMaterials((prev) =>
      prev.map((material) =>
        material.id === updatedMaterial.id ? updatedMaterial : material,
      ),
    );

    setEditingMaterial(null);
  };

  const getMaterialIcon = (material: Material) => {
    if (material.sub_category === "libro") {
      return <BookOpen size={30} className="text-red-600" />;
    }

    if (material.sub_category === "video") {
      return <FileText size={30} className="text-blue-600" />;
    }

    if (material.sub_category === "imagen") {
      return <FileText size={30} className="text-purple-600" />;
    }

    if (material.tipo === "link") {
      return <LinkIcon size={30} className="text-blue-600" />;
    }

    if (material.tipo === "text") {
      return <BookOpen size={30} className="text-violet-600" />;
    }

    return <FileText size={30} className="text-cyan-600" />;
  };

  return (
    <>
      <section>
        {/* HEADER */}

        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Materiales</h2>

            <p className="text-slate-500 mt-1">
              {materials.length} materiales cargados
            </p>
          </div>

          <Link
            href={`/admin/classrooms/${classroomId}/materials/new`}
            className="
              h-12
              px-5
              rounded-2xl
              bg-cyan-500
              hover:bg-cyan-400
              transition
              text-white
              flex
              items-center
              gap-2
              font-medium
            "
          >
            <Upload size={18} />
            Subir material
          </Link>
        </div>

        {/* MATERIALS */}

        {materials.length === 0 ? (
          <div
            className="
              bg-white
              rounded-[32px]
              p-12
              text-center
              shadow-lg
            "
          >
            <BookOpen size={60} className="mx-auto text-slate-300" />

            <h3 className="mt-5 text-2xl font-bold text-slate-800">
              No hay materiales cargados
            </h3>

            <p className="mt-2 text-slate-500">
              Todavía no se publicó ningún material para esta clase.
            </p>
          </div>
        ) : (
          <div
            className="
              grid
              xl:grid-cols-2
              gap-8
            "
          >
            {materials.map((material) => (
              <div
                key={material.id}
                className="
                  bg-white
                  rounded-[28px]
                  overflow-hidden
                  border
                  border-slate-200
                  shadow-sm
                  hover:shadow-xl
                  transition
                "
              >
                <div
                  className="
                    h-2
                    w-full
                    bg-gradient-to-r
                    from-cyan-500
                    via-blue-500
                    to-violet-500
                  "
                />

                <div className="p-7">
                  {/* HEADER */}

                  <div className="flex justify-between items-start gap-4">
                    <div className="flex gap-4 min-w-0">
                      <div
                        className="
                          h-16
                          w-16
                          rounded-2xl
                          bg-slate-100
                          flex
                          items-center
                          justify-center
                          shrink-0
                        "
                      >
                        {getMaterialIcon(material)}
                      </div>

                      <div className="min-w-0">
                        <h3
                          className="
                            text-2xl
                            font-bold
                            text-slate-900
                            break-words
                          "
                        >
                          {material.titulo}
                        </h3>

                        <p className="text-sm text-slate-400 mt-2">
                          Publicado el{" "}
                          {new Date(material.created_at).toLocaleDateString(
                            "es-AR",
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap justify-end gap-2">
                      <span
                        className="
                          px-3
                          py-1
                          rounded-full
                          bg-blue-50
                          text-blue-600
                          text-xs
                          font-semibold
                        "
                      >
                        {material.material_category || "Sin categoría"}
                      </span>

                      {material.sub_category && (
                        <span
                          className="
                            px-3
                            py-1
                            rounded-full
                            bg-cyan-50
                            text-cyan-700
                            text-xs
                            font-semibold
                          "
                        >
                          {material.sub_category}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* DESCRIPCIÓN */}

                  <div className="mt-6">
                    {material.descripcion ? (
                      <p className="text-slate-600 leading-relaxed text-[15px]">
                        {material.descripcion}
                      </p>
                    ) : (
                      <p className="text-slate-400 italic">Sin descripción</p>
                    )}
                  </div>

                  <div className="my-6 border-t border-slate-100" />

                  {/* ACTIONS */}

                  <div className="flex flex-wrap gap-3">
                    {/* VER */}

                    {material.tipo === "file" && material.archivo_url && (
                      <>
                        <a
                          href={material.archivo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                              h-11
                              px-4
                              rounded-xl
                              bg-cyan-500
                              hover:bg-cyan-600
                              text-white
                              flex
                              items-center
                              gap-2
                              font-medium
                            "
                        >
                          <Eye size={18} />
                          Ver material
                        </a>

                        <a
                          href={material.archivo_url}
                          download
                          className="
                              h-11
                              px-4
                              rounded-xl
                              bg-slate-100
                              hover:bg-slate-200
                              text-slate-700
                              flex
                              items-center
                              gap-2
                              font-medium
                            "
                        >
                          <Download size={18} />
                          Descargar
                        </a>
                      </>
                    )}

                    {material.tipo === "link" && material.url && (
                      <a
                        href={material.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                            h-11
                            px-4
                            rounded-xl
                            bg-blue-500
                            hover:bg-blue-600
                            text-white
                            flex
                            items-center
                            gap-2
                            font-medium
                          "
                      >
                        <LinkIcon size={18} />
                        Abrir enlace
                      </a>
                    )}

                    {material.tipo === "text" && (
                      <div
                        className="
                          h-11
                          px-4
                          rounded-xl
                          bg-violet-100
                          text-violet-700
                          flex
                          items-center
                          gap-2
                          font-medium
                        "
                      >
                        <BookOpen size={18} />
                        Material de lectura
                      </div>
                    )}

                    {/* EDITAR */}

                    <button
                      onClick={() => setEditingMaterial(material)}
                      className="
                        h-11
                        px-4
                        rounded-xl
                        bg-blue-50
                        hover:bg-blue-100
                        text-blue-600
                        flex
                        items-center
                        gap-2
                        font-medium
                        transition
                      "
                    >
                      <Pencil size={18} />
                    </button>

                    {/* ELIMINAR */}

                    <button
                      onClick={() => handleDelete(material.id)}
                      className="
                      
                        h-11
                        px-4
                        rounded-xl
                        bg-red-50
                        hover:bg-red-100
                        text-red-600
                        flex
                        items-center
                        gap-2
                        font-medium
                        transition
                      "
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* EDIT MODAL */}

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
