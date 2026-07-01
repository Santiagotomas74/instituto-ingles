"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload } from "lucide-react";
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
    material_category: "grammar",
    contenido_texto: "",
    url: "",
    is_published: true,
    orden: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;

    setFormData({
      ...formData,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      let archivo_url = "";
      let archivo_nombre = "";
      let archivo_size = 0;

      /*
       * SUBIR ARCHIVO A CLOUDINARY
       */

      if (formData.tipo === "file" && file) {
        const uploadData = new FormData();

        uploadData.append("file", file);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: uploadData,
        });

        const uploadResult = await uploadRes.json();

        if (!uploadResult.success) {
          alert("Error subiendo archivo");
          return;
        }

        archivo_url = uploadResult.url;
        archivo_nombre = file.name;
        archivo_size = file.size;
      }

      /*
       * GUARDAR MATERIAL EN DB
       */
      console.log("classroomId:", classroomId);

      const res = await fetch("/api/teacher/classrooms/materials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          classroom_id: classroomId,

          titulo: formData.titulo,
          descripcion: formData.descripcion,

          tipo: formData.tipo,
          material_category: formData.material_category,

          contenido_texto: formData.contenido_texto,
          url: formData.url,

          archivo_url,
          archivo_nombre,
          archivo_size,

          is_published: formData.is_published,
          orden: Number(formData.orden),
        }),
      });

      const result = await res.json();

      if (!result.success) {
        alert(result.message || "Error");
        return;
      }

      router.push(`/teacher/classrooms/${classroomId}`);

      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  // todo tu código actual...
  return (
    <main className="min-h-screen bg-slate-100">
      {/* HEADER */}

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
            "
          >
            <ArrowLeft size={18} />
            Volver
          </Link>
        </div>
      </div>

      {/* FORM */}

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
                h-14
                px-5
                rounded-2xl
                border
                border-slate-200
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
                p-5
                rounded-2xl
                border
                border-slate-200
              "
            />
          </div>

          {/* SELECTS */}

          <div className="grid md:grid-cols-2 gap-6">
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
                  h-14
                  px-5
                  rounded-2xl
                  border
                  border-slate-200
                "
              >
                <option value="file">Archivo</option>

                <option value="link">Link</option>

                <option value="text">Texto</option>
              </select>
            </div>
          </div>

          {/* FILE */}

          {formData.tipo === "file" && (
            <div>
              <label className="block mb-2 font-medium text-slate-700">
                Archivo
              </label>

              <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="w-full"
              />
            </div>
          )}

          {/* LINK */}

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
                className="
                  w-full
                  h-14
                  px-5
                  rounded-2xl
                  border
                  border-slate-200
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
                  p-5
                  rounded-2xl
                  border
                  border-slate-200
                "
              />
            </div>
          )}

          {/* CONFIG */}

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-medium text-slate-700">
                Orden
              </label>

              <input
                type="number"
                name="orden"
                value={formData.orden}
                onChange={handleChange}
                className="
                  w-full
                  h-14
                  px-5
                  rounded-2xl
                  border
                  border-slate-200
                "
              />
            </div>

            <div className="flex items-center gap-3 pt-9">
              <input
                type="checkbox"
                name="is_published"
                checked={formData.is_published}
                onChange={handleChange}
              />

              <label className="font-medium text-slate-700">
                Publicado para alumnos
              </label>
            </div>
          </div>

          {/* BUTTON */}

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
            "
          >
            <Upload size={20} />

            {loading ? "Subiendo..." : "Guardar material"}
          </button>
        </form>
      </div>
    </main>
  );
}
