"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditTeacherForm({ teacher }: { teacher: any }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    dni: teacher.dni,
    nombre: teacher.nombre,
    apellido: teacher.apellido,
    fecha_nacimiento: teacher.fecha_nacimiento?.split("T")[0],
    email: teacher.email,
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(`/api/admin/teachers/${teacher.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/admin/teachers");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 p-10">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-xl">
        <h1 className="text-3xl text-gray-600 font-bold mb-8">
          Editar profesor
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="number"
            name="dni"
            placeholder="DNI"
            value={formData.dni}
            onChange={handleChange}
            className="w-full h-14 px-5 rounded-2xl border text-gray-500"
          />

          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full h-14 px-5 rounded-2xl border text-gray-500 "
          />

          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={formData.apellido}
            onChange={handleChange}
            className="w-full h-14 px-5 rounded-2xl border text-gray-500"
          />

          <input
            type="date"
            name="fecha_nacimiento"
            value={formData.fecha_nacimiento}
            onChange={handleChange}
            className="w-full h-14 px-5 rounded-2xl border text-gray-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full h-14 px-5 rounded-2xl border text-gray-500 "
          />

          <input
            type="password"
            name="password"
            placeholder="Nueva contraseña (opcional)"
            value={formData.password}
            onChange={handleChange}
            className="w-full h-14 px-5 rounded-2xl border text-gray-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              h-14
              rounded-2xl
              bg-blue-600
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
