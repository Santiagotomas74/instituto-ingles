"use client";
import Link from "next/link";

import {
  Download,
  Upload,
  FileText,
  LinkIcon,
  BookOpen,
  Eye,
} from "lucide-react";

type Material = {
  id: string;
  titulo: string;
  descripcion: string | null;
  tipo: string;
  archivo_url: string | null;
  url: string | null;
  created_at: string;
};

type Props = {
  classroomId: string;
  materials: Material[];
};
import { useState } from "react";
import { Trash2 } from "lucide-react";

export default function ClassroomMaterials({
  classroomId,
  materials: initialMaterials,
}: Props) {
  const [materials, setMaterials] = useState(initialMaterials);
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
  return (
    <section>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900">Materiales</h2>

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
        group
        relative
        bg-white
        rounded-[32px]
        border
        border-slate-200
        shadow-sm
        hover:shadow-2xl
        hover:-translate-y-1
        transition-all
        duration-300
        overflow-hidden
      "
            >
              {/* Barra superior */}

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
                {/* Header */}

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
                      {material.tipo === "file" && (
                        <FileText size={30} className="text-cyan-600" />
                      )}

                      {material.tipo === "link" && (
                        <LinkIcon size={30} className="text-blue-600" />
                      )}

                      {material.tipo === "text" && (
                        <BookOpen size={30} className="text-violet-600" />
                      )}
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

                  <span
                    className="
              shrink-0
              px-3
              py-1
              rounded-full
              bg-slate-100
              text-slate-600
              text-xs
              font-semibold
              uppercase
            "
                  >
                    {material.tipo}
                  </span>
                </div>

                {/* Descripción */}

                <div className="mt-6">
                  {material.descripcion ? (
                    <p
                      className="
                text-slate-600
                leading-relaxed
                text-[15px]
              "
                    >
                      {material.descripcion}
                    </p>
                  ) : (
                    <p className="text-slate-400 italic">Sin descripción</p>
                  )}
                </div>

                {/* Divider */}

                <div className="my-6 border-t border-slate-100" />

                {/* Acciones */}

                <div className="flex flex-wrap gap-3">
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
                    transition
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
                    transition
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
                  transition
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

                  <button
                    onClick={() => handleDelete(material.id)}
                    className="
              ml-auto
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
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
