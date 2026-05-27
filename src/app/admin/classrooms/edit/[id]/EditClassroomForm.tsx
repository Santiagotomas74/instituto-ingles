"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Teacher = {
  id: string;
  nombre: string;
  apellido: string;
};

type Props = {
  classroom: any;
  teachers: Teacher[];
};

export default function EditClassroomForm({ classroom, teachers }: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    nombre: classroom.nombre,
    nivel: classroom.nivel,
    modalidad: classroom.modalidad,
    horario: classroom.horario,
    profesor_id: classroom.profesor_id,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.BACKEND_URL}/api/admin/classrooms/${classroom.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await res.json();

      if (data.success) {
        router.push("/admin/classrooms");
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 p-6 md:p-10">
      <div
        className="
          max-w-3xl
          mx-auto
          bg-white
          rounded-[32px]
          shadow-xl
          border
          border-slate-200
          p-8
        "
      >
        <h1 className="text-4xl font-bold text-slate-900">Edit Classroom</h1>

        <p className="text-slate-500 mt-3">
          Modificá la información del classroom.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          {/* Nombre */}

          <div>
            <label className="block mb-2 font-medium text-slate-700">
              Nombre
            </label>

            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              className="
                w-full
                h-14
                px-5
                rounded-2xl
                border
                border-slate-200
                text-gray-700
              "
            />
          </div>

          {/* Nivel */}

          <div>
            <label className="block mb-2 font-medium text-slate-700">
              Nivel
            </label>

            <input
              type="text"
              name="nivel"
              value={formData.nivel}
              onChange={handleChange}
              required
              className="
                w-full
                h-14
                px-5
                rounded-2xl
                border
                border-slate-200
                text-gray-700
              "
            />
          </div>

          {/* Modalidad */}

          <div>
            <label className="block mb-2 font-medium text-slate-700">
              Modalidad
            </label>

            <select
              name="modalidad"
              value={formData.modalidad}
              onChange={handleChange}
              className="
                w-full
                h-14
                px-5
                rounded-2xl
                border
                border-slate-200
                text-gray-700
              "
            >
              <option value="Presencial">Presencial</option>

              <option value="Virtual">Virtual</option>

              <option value="Híbrido">Híbrido</option>
            </select>
          </div>

          {/* Horario */}

          <div>
            <label className="block mb-2 font-medium text-slate-700">
              Horario
            </label>

            <input
              type="text"
              name="horario"
              value={formData.horario}
              onChange={handleChange}
              required
              className="
                w-full
                h-14
                px-5
                rounded-2xl
                border
                border-slate-200
                text-gray-700
              "
            />
          </div>

          {/* Profesor */}

          <div>
            <label className="block mb-2 font-medium text-slate-700">
              Profesor
            </label>

            <select
              name="profesor_id"
              value={formData.profesor_id}
              onChange={handleChange}
              required
              className="
                w-full
                h-14
                px-5
                rounded-2xl
                border
                border-slate-200
                text-gray-700
              "
            >
              <option value="">Seleccionar profesor</option>

              {teachers.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.nombre} {teacher.apellido}
                </option>
              ))}
            </select>
          </div>

          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              h-14
              rounded-2xl
              bg-blue-600
              hover:bg-blue-700
              transition
              text-white
              font-semibold
            "
          >
            {loading ? "Guardando..." : "Guardar cambios"}
          </button>
        </form>
      </div>
    </main>
  );
}
