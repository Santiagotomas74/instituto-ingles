"use client";

import { useEffect, useState } from "react";
import { FileText, Video, Link as LinkIcon, ExternalLink } from "lucide-react";

interface Props {
  classroomId: string;
}

interface Material {
  id: string;
  titulo: string;
  descripcion: string | null;
  tipo: "file" | "video" | "link" | "text";
  material_category: string | null;
  contenido_texto: string | null;
  url: string | null;
  archivo_url: string | null;
  archivo_nombre: string | null;
  archivo_size: number | null;
  created_at: string;
  created_by_name: string | null;
}

export default function Materials({ classroomId }: Props) {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const res = await fetch(
          `/api/student/classroom/${classroomId}/materials`,
          {
            cache: "no-store",
          },
        );

        const data = await res.json();

        if (data.success) {
          setMaterials(data.materials);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, [classroomId]);

  const documents = materials.filter((m) => m.tipo === "file");
  const videos = materials.filter((m) => m.tipo === "video");
  const links = materials.filter((m) => m.tipo === "link");

  const MaterialCard = ({
    material,
    icon,
    iconBg,
    iconColor,
    href,
  }: {
    material: Material;
    icon: React.ReactNode;
    iconBg: string;
    iconColor: string;
    href: string;
  }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        group
        block
        bg-white
        rounded-3xl
        border
        border-slate-200
        shadow-sm
        hover:shadow-xl
        hover:-translate-y-1
        transition-all
        duration-300
        p-6
      "
    >
      <div className="flex justify-between items-start">
        <div className="flex gap-4">
          <div
            className={`w-14 h-14 rounded-2xl ${iconBg} flex items-center justify-center`}
          >
            <div className={iconColor}>{icon}</div>
          </div>

          <div>
            <h3 className="font-bold text-xl text-slate-900 group-hover:text-cyan-600 transition">
              {material.titulo}
            </h3>

            {material.descripcion && (
              <p className="text-slate-500 mt-1">{material.descripcion}</p>
            )}

            <p className="text-sm text-slate-500 mt-2">
              {material.created_by_name}
            </p>

            <p className="text-sm text-slate-400">
              {new Date(material.created_at).toLocaleDateString("es-AR")}
            </p>
          </div>
        </div>

        <ExternalLink className="text-slate-400 group-hover:text-cyan-600 transition" />
      </div>
    </a>
  );

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-500">
        Cargando materiales...
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* DOCUMENTOS */}

      <section>
        <h2 className="flex items-center gap-3 text-3xl font-bold text-slate-900 mb-6">
          <FileText className="text-red-500" />
          Libros y Documentos
        </h2>

        {documents.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-slate-500">
            No hay documentos.
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            {documents.map((material) => (
              <MaterialCard
                key={material.id}
                material={material}
                href={material.archivo_url || "#"}
                icon={<FileText />}
                iconBg="bg-red-100"
                iconColor="text-red-600"
              />
            ))}
          </div>
        )}
      </section>

      {/* VIDEOS */}

      <section>
        <h2 className="flex items-center gap-3 text-3xl font-bold text-slate-900 mb-6">
          <Video className="text-blue-600" />
          Videos
        </h2>

        {videos.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-slate-500">
            No hay videos.
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            {videos.map((material) => (
              <MaterialCard
                key={material.id}
                material={material}
                href={material.url || material.archivo_url || "#"}
                icon={<Video />}
                iconBg="bg-blue-100"
                iconColor="text-blue-600"
              />
            ))}
          </div>
        )}
      </section>

      {/* LINKS */}

      <section>
        <h2 className="flex items-center gap-3 text-3xl font-bold text-slate-900 mb-6">
          <LinkIcon className="text-green-600" />
          Enlaces
        </h2>

        {links.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-slate-500">
            No hay enlaces.
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            {links.map((material) => (
              <MaterialCard
                key={material.id}
                material={material}
                href={material.url || "#"}
                icon={<LinkIcon />}
                iconBg="bg-green-100"
                iconColor="text-green-600"
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
