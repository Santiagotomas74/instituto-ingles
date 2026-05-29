"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  student: any;
};

export default function EditStudentForm({ student }: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    nombre: student.nombre || "",
    apellido: student.apellido || "",
    email: student.email || "",
    dni: student.dni || "",
    nivel: student.nivel || "",
    status: student.status || "active",
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

      const res = await fetch(`/api/admin/students/${student.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Error");
        return;
      }

      alert("Alumno actualizado");

      router.push("/admin/students");
      router.refresh();
    } catch (error) {
      console.error(error);

      alert("Error actualizando alumno");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-6 text-gray-700">
        {/* Nombre */}
        <Input
          label="Nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
        />

        {/* Apellido */}
        <Input
          label="Apellido"
          name="apellido"
          value={formData.apellido}
          onChange={handleChange}
        />

        {/* Email */}
        <Input
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        {/* DNI */}
        <Input
          label="DNI"
          name="dni"
          value={formData.dni}
          onChange={handleChange}
        />

        {/* Nivel */}
        <Input
          label="Nivel"
          name="nivel"
          value={formData.nivel}
          onChange={handleChange}
        />

        {/* Status */}
        <div>
          <label
            className="
              block
              text-sm
              font-medium
              text-slate-700
              mb-2
            "
          >
            Estado
          </label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="
              w-full
              h-14
              rounded-2xl
              border
              border-slate-200
              px-4
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          >
            <option value="active">Activo</option>

            <option value="inactive">Inactivo</option>

            <option value="pending">Pendiente</option>
          </select>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="
            h-14
            px-8
            rounded-2xl
            bg-blue-600
            hover:bg-blue-700
            text-white
            font-semibold
            transition
          "
        >
          {loading ? "Guardando..." : "Guardar cambios"}
        </button>
      </div>
    </form>
  );
}

function Input({ label, name, value, onChange }: any) {
  return (
    <div>
      <label
        className="
          block
          text-sm
          font-medium
          text-slate-700
          mb-2
        "
      >
        {label}
      </label>

      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="
          w-full
          h-14
          rounded-2xl
          border
          border-slate-200
          px-4
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
        "
      />
    </div>
  );
}
