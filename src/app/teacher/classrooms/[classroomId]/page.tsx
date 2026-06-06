"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Plus, Upload } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { Trash2, Eye } from "lucide-react";

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
  archivo_url: string;
  material_category: string;
  created_at: string;
};
type Announcement = {
  id: string;
  titulo: string;
  contenido: string;
  created_at: string;
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
  if (!classroom) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Cargando...
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

            <button
              className="
                h-11
                px-5
                rounded-xl
                bg-blue-600
                text-white
                flex
                items-center
                gap-2
              "
            >
              <Upload size={18} />
              Subir material
            </button>
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
                  "
                          >
                            {categoryLabels[material.material_category]}
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
                          href={material.archivo_url}
                          target="_blank"
                          rel="noreferrer"
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
                          <Eye size={16} />
                          Ver material
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
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">
                Anuncios
              </h2>

              <div className="space-y-4">
                {announcements.length === 0 ? (
                  <div className="bg-white rounded-2xl border p-6 text-gray-500">
                    No hay anuncios publicados.
                  </div>
                ) : (
                  announcements.map((announcement) => (
                    <div
                      key={announcement.id}
                      className="bg-white rounded-2xl border p-6"
                    >
                      <h3 className="text-lg font-semibold text-gray-900">
                        {announcement.titulo}
                      </h3>

                      <p className="mt-3 text-gray-600 whitespace-pre-wrap">
                        {announcement.contenido}
                      </p>

                      <p className="mt-4 text-sm text-gray-400">
                        {new Date(announcement.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
