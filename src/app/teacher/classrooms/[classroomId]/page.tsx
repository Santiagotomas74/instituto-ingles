"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Plus, Upload } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Loader2 } from "lucide-react";

import {
  Trash2,
  Eye,
  ExternalLink,
  FileText,
  Pencil,
  Megaphone,
  AlertTriangle,
  X,
} from "lucide-react";

type Classroom = {
  id: string;
  nombre: string;
  nivel: string;
  horario: string;
  profesor?: string;
};
type Student = {
  id: string;
  nombre: string;
  apellido: string;
};

type Material = {
  id: string;
  titulo: string;
  descripcion: string;
  archivo_url: string | null;
  url: string | null;
  tipo: "file" | "link";
  material_category: string;
  created_at: string;
};

type Announcement = {
  id: string;
  titulo: string;
  contenido: string;
  created_at: string;
  is_important?: boolean;
};

export default function ClassroomPage() {
  const params = useParams();

  const classroomId = params.classroomId as string;
  const [tab, setTab] = useState("materiales");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [classroom, setClassroom] = useState<Classroom | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "",
    content: "",
    is_important: false,
  });

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

  const filteredMaterials =
    selectedCategory === "all"
      ? materials
      : materials.filter(
          (material) => material.material_category === selectedCategory,
        );
  useEffect(() => {
    if (classroomId) {
      loadClassroom();
    }
  }, [classroomId]);

  const loadClassroom = async () => {
    try {
      console.log("Cargando aula con ID:", classroomId);

      const res = await fetch(`/api/teacher/classroom/${classroomId}`);

      if (!res.ok) {
        throw new Error("Error cargando aula");
      }

      const data = await res.json();

      console.log(data);

      setClassroom(data.classroom);
      setStudents(data.students);
      setMaterials(data.materials);
      setAnnouncements(data.announcements);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteMaterial = async (materialId: string) => {
    const confirmed = confirm("¿Desea eliminar este material?");

    if (!confirmed) return;

    try {
      const res = await fetch(`/api/teacher/materials/${materialId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error();
      }

      setMaterials((prev) => prev.filter((m) => m.id !== materialId));
    } catch (error) {
      console.error(error);
      alert("Error eliminando material");
    }
  };
  const groupedMaterials = materials.reduce((acc: any, material: any) => {
    const category = material.material_category || "other";

    if (!acc[category]) {
      acc[category] = [];
    }

    acc[category].push(material);
    console.log(
      materials.map((m) => ({
        titulo: m.titulo,
        category: m.material_category,
      })),
    );

    return acc;
  }, {});
  console.log(
    materials.map((m) => ({
      titulo: m.titulo,
      category: m.material_category,
    })),
  );
  const handleDeleteAnnouncement = async (id: string) => {
    const confirmed = confirm("¿Eliminar anuncio?");

    if (!confirmed) return;

    try {
      const res = await fetch(`/api/teacher/classrooms/announcements/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error();

      setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    } catch (error) {
      console.error(error);
      alert("Error eliminando anuncio");
    }
  };

  const getMaterialLink = (material: Material) => {
    if (material.tipo === "link") {
      return material.url || "#";
    }

    return material.archivo_url || "#";
  };
  const handleEdit = (announcement: Announcement) => {
    setEditingId(announcement.id);

    setForm({
      title: announcement.titulo,
      content: announcement.contenido,
      is_important: announcement.is_important ?? false,
    });

    setOpen(true);
  };
  const handleSubmit = async () => {
    if (!form.title.trim() || !form.content.trim()) {
      alert("Completa título y contenido");
      return;
    }

    try {
      setLoading(true);

      const method = editingId ? "PUT" : "POST";

      const url = editingId
        ? `/api/teacher/classrooms/announcements/${editingId}`
        : `/api/teacher/classrooms/announcements`;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          classroom_id: classroomId,
          titulo: form.title,
          contenido: form.content,
          is_important: form.is_important,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error();
      }

      setOpen(false);
      setEditingId(null);

      setForm({
        title: "",
        content: "",
        is_important: false,
      });

      loadClassroom();
    } catch (error) {
      console.error(error);
      alert("Error guardando anuncio");
    } finally {
      setLoading(false);
    }
  };
  if (!classroom) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center">
          <Image
            src="/logo2.png"
            alt="Instituto"
            width={140}
            height={140}
            priority
            className="mb-8"
          />

          <Loader2 size={40} className="animate-spin text-blue-600" />

          <p className="mt-4 text-slate-600 font-medium">Cargando aula...</p>
        </div>
      </div>
    );
  }
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Volver */}
        <Link
          href="/teacher/dashboard"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft size={18} />
          Volver a mis aulas
        </Link>

        {/* Header */}
        <div className="mt-8 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-4">
              <div
                className="
                  w-12
                  h-12
                  rounded-full
                  bg-blue-600
                  text-white
                  flex
                  items-center
                  justify-center
                  font-semibold
                "
              >
                {classroom.nivel}
              </div>

              <div>
                <h1 className="text-4xl font-bold text-gray-900">
                  {classroom.nombre}
                </h1>

                <p className="text-gray-500 mt-1">{classroom.horario}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => {
                setEditingId(null);

                setForm({
                  title: "",
                  content: "",
                  is_important: false,
                });

                setOpen(true);
              }}
              className="
    h-11
    px-5
    rounded-xl
    border
    border-blue-200
    text-blue-600
    flex
    items-center
    gap-2
  "
            >
              <Plus size={18} />
              Nuevo anuncio
            </button>

            <Link
              href={`/teacher/classrooms/${classroomId}/materials/new`}
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
        </div>

        {/* Tabs */}
        <div className="mt-10 border-b">
          <div className="flex gap-10">
            <button
              onClick={() => setTab("materiales")}
              className={`pb-4 ${
                tab === "materiales"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500"
              }`}
            >
              Materiales
            </button>

            <button
              onClick={() => setTab("estudiantes")}
              className={`pb-4 ${
                tab === "estudiantes"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500"
              }`}
            >
              Estudiantes
            </button>

            <button
              onClick={() => setTab("anuncios")}
              className={`pb-4 ${
                tab === "anuncios"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500"
              }`}
            >
              Anuncios
            </button>
          </div>
        </div>

        {/* Contenido */}
        <div className="mt-8">
          {tab === "materiales" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Materiales
                </h2>

                <span className="text-sm text-gray-500">
                  {filteredMaterials.length} materiales
                </span>
              </div>

              {/* Filtros */}
              <div className="flex flex-wrap gap-3 mb-8">
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
                <div className="bg-white rounded-2xl border p-6 text-gray-500">
                  No hay materiales en esta categoría.
                </div>
              ) : (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
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
                      {/* Header */}
                      <div className="flex justify-between items-start">
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
                          <h3 className="mt-3 font-semibold text-lg text-gray-900">
                            {material.titulo}
                          </h3>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="mt-3 text-gray-600 line-clamp-3">
                        {material.descripcion}
                      </p>

                      {/* Date */}
                      <p className="mt-4 text-sm text-gray-400">
                        {new Date(material.created_at).toLocaleDateString()}
                      </p>

                      {/* Actions */}
                      <div className="mt-6 flex gap-3">
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
          )}

          {tab === "estudiantes" && (
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">
                Estudiantes
              </h2>

              <div className="bg-white rounded-2xl border overflow-hidden">
                {students.length === 0 ? (
                  <div className="p-6 text-gray-500">
                    No hay estudiantes asignados.
                  </div>
                ) : (
                  <table className="w-full">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="text-left p-4 text-gray-700">Alumno</th>
                      </tr>
                    </thead>

                    <tbody>
                      {students.map((student) => (
                        <tr key={student.id} className="border-t">
                          <td className="p-4 text-gray-800">
                            {student.apellido}, {student.nombre}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {tab === "anuncios" && (
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-900">Anuncios</h2>
              </div>

              {announcements.length === 0 ? (
                <div
                  className="
              bg-white
              rounded-[28px]
              p-10
              shadow-lg
              text-center
            "
                >
                  <Megaphone size={48} className="mx-auto text-slate-300" />

                  <h3 className="mt-4 text-xl font-semibold text-slate-800">
                    No hay anuncios
                  </h3>

                  <p className="mt-2 text-slate-500">
                    Todavía no se publicó ningún anuncio.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {announcements.map((announcement) => (
                    <article
                      key={announcement.id}
                      className="
        bg-white
        rounded-[32px]
        p-7
        shadow-lg
        border
        border-slate-100
      "
                    >
                      <div className="flex items-start justify-between gap-6">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-3">
                            <h3 className="text-xl font-bold text-slate-900">
                              {announcement.titulo}
                            </h3>

                            {announcement.is_important && (
                              <span
                                className="
                  inline-flex
                  items-center
                  gap-1
                  px-3
                  py-1
                  rounded-full
                  bg-red-100
                  text-red-700
                  text-xs
                  font-semibold
                "
                              >
                                <AlertTriangle size={14} />
                                Importante
                              </span>
                            )}
                          </div>

                          <p className="mt-4 text-slate-600 leading-relaxed">
                            {announcement.contenido}
                          </p>

                          <p className="mt-5 text-sm text-slate-400">
                            {new Date(
                              announcement.created_at,
                            ).toLocaleDateString("es-AR")}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(announcement)}
                            className="
              h-10
              w-10
              rounded-xl
              flex
              items-center
              justify-center
            
              transition
              bg-blue-500
            "
                          >
                            <Pencil size={18} />
                          </button>

                          <button
                            onClick={() =>
                              handleDeleteAnnouncement(announcement.id)
                            }
                            className="
              h-10
              w-10
              rounded-xl
              flex
              items-center
              justify-center
              text-red-500
              hover:bg-red-50
              transition
            "
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          )}
        </div>
      </div>
      {open && (
        <div
          className="
      fixed
      inset-0
      bg-black/40
      flex
      items-center
      justify-center
      z-50
      p-4
    "
        >
          <div
            className="
        bg-white
        rounded-[28px]
        w-full
        max-w-2xl
        p-6
      "
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-slate-900">
                {editingId ? "Editar anuncio" : "Crear anuncio"}
              </h3>

              <button
                onClick={() => {
                  setOpen(false);
                  setEditingId(null);

                  setForm({
                    title: "",
                    content: "",
                    is_important: false,
                  });
                }}
                className="
          h-10
          w-10
          rounded-xl
          flex
          items-center
          justify-center
          text-gray-500
          hover:bg-gray-100
          transition
        "
              >
                <X />
              </button>
            </div>

            <div className="space-y-4 text-gray-700">
              <input
                type="text"
                placeholder="Título"
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value,
                  })
                }
                className="
          w-full
          h-14
          px-5
          rounded-2xl
          border
          "
              />

              <textarea
                rows={6}
                placeholder="Contenido"
                value={form.content}
                onChange={(e) =>
                  setForm({
                    ...form,
                    content: e.target.value,
                  })
                }
                className="
          w-full
          p-5
          rounded-2xl
          border
          "
              />

              <label className="flex gap-3 items-center">
                <input
                  type="checkbox"
                  checked={form.is_important}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      is_important: e.target.checked,
                    })
                  }
                />
                Importante
              </label>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => {
                  setOpen(false);
                  setEditingId(null);

                  setForm({
                    title: "",
                    content: "",
                    is_important: false,
                  });
                }}
                className="
          px-5
          h-12
          rounded-2xl
          bg-red-500
          text-white
          "
              >
                Cancelar
              </button>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="
          px-6
          h-12
          rounded-2xl
          bg-cyan-500
          text-white
          font-semibold
          "
              >
                {loading
                  ? "Guardando..."
                  : editingId
                    ? "Guardar cambios"
                    : "Publicar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
