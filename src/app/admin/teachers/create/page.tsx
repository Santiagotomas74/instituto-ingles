"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateTeacherPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    dni: "",
    nombre: "",
    apellido: "",
    fecha_nacimiento: "",
    email: "",
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

      const res = await fetch("/api/admin/teachers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/admin/teachers");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Error creando profesor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Crear Profesor
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="DNI"
            name="dni"
            value={formData.dni}
            onChange={handleChange}
          />

          <Input
            label="Nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />

          <Input
            label="Apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
          />

          <input
            className="
              w-full
              h-12
                px-4
                rounded-xl
                text-gray-700
                border
                border-gray-300
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
            "
            type="date"
            name="fecha_nacimiento"
            value={formData.fecha_nacimiento}
            onChange={handleChange}
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />

          <Input
            label="Contraseña"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              h-14
              rounded-2xl
              bg-blue-600
              hover:bg-blue-700
              text-white
              font-semibold
            "
          >
            {loading ? "Creando..." : "Crear Profesor"}
          </button>
        </form>
      </div>
    </main>
  );
}

function Input({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
}) {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        {...props}
        className="
          w-full
          h-12
          px-4
          rounded-xl
          border
          border-gray-300
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
        "
      />
    </div>
  );
}
