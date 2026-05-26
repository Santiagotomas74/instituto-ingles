"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { GraduationCap, Clock3, Users, BookOpen } from "lucide-react";

export default function CreateClassroomForm({ teachers }: { teachers: any[] }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    nombre: "",
    nivel: "",
    modalidad: "",
    horario: "",
    profesor_id: "",
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

      const res = await fetch("/api/admin/classrooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/admin/classrooms");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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
        <p className="text-cyan-300 uppercase tracking-[4px] text-sm">
          Admin Panel
        </p>

        <h1 className="text-4xl font-bold mt-3">Nuevo Classroom</h1>

        <p className="text-slate-300 mt-4">Creá un nuevo curso académico.</p>
      </div>

      {/* FORM */}

      <div className="p-6 md:p-10">
        <form
          onSubmit={handleSubmit}
          className="
            bg-white
            rounded-[32px]
            shadow-xl
            border
            border-slate-200
            p-8
            max-w-4xl
            mx-auto
            space-y-8
          "
        >
          {/* Nombre */}

          <InputField
            icon={<BookOpen className="w-5 h-5 text-slate-500" />}
            label="Nombre del classroom"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />

          {/* Nivel */}

          <InputField
            icon={<GraduationCap className="w-5 h-5 text-slate-500" />}
            label="Nivel"
            name="nivel"
            value={formData.nivel}
            onChange={handleChange}
          />

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
                rounded-2xl
                border
                border-slate-200
                px-5
                text-slate-700
                focus:outline-none
                focus:ring-2
                focus:ring-cyan-500
              "
            >
              <option value="">Seleccionar modalidad</option>

              <option value="Presencial">Presencial</option>

              <option value="Virtual">Virtual</option>

              <option value="Híbrida">Híbrida</option>
            </select>
          </div>

          {/* Horario */}

          <InputField
            icon={<Clock3 className="w-5 h-5 text-slate-500" />}
            label="Horario"
            name="horario"
            value={formData.horario}
            onChange={handleChange}
          />

          {/* Profesor */}

          <div>
            <label className="block mb-2 font-medium text-slate-700">
              Profesor asignado
            </label>

            <select
              name="profesor_id"
              value={formData.profesor_id}
              onChange={handleChange}
              className="
                w-full
                h-14
                rounded-2xl
                border
                text-slate-700
                border-slate-200
                px-5
                focus:outline-none
                focus:ring-2
                focus:ring-cyan-500
              "
            >
              <option value="">Sin asignar</option>

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
              bg-cyan-500
              hover:bg-cyan-400
              transition
              text-white
              font-semibold
              text-lg
              shadow-lg
            "
          >
            {loading ? "Creando..." : "Crear classroom"}
          </button>
        </form>
      </div>
    </main>
  );
}

function InputField({
  icon,
  label,
  name,
  value,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label className="block mb-2 font-medium text-slate-700">{label}</label>

      <div className="relative">
        <div
          className="
            absolute
            text-slate-500
            left-4
            top-1/2
            -translate-y-1/2
            text-slate-400
          "
        >
          {icon}
        </div>

        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          className="
            w-full
            h-14
            pl-12
            pr-5
            rounded-2xl
            border
            text-slate-700
            border-slate-200
            focus:outline-none
            focus:ring-2
            focus:ring-cyan-500
          "
        />
      </div>
    </div>
  );
}
