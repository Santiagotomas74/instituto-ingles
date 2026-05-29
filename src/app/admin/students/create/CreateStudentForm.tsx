"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
  User,
  Mail,
  Lock,
  Calendar,
  GraduationCap,
  CreditCard,
} from "lucide-react";

export default function CreateStudentForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    dni: "",
    nombre: "",
    apellido: "",
    fecha_nacimiento: "",
    email: "",
    password: "",
    nivel: "",
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

      const res = await fetch("/api/admin/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/admin/students");
        router.refresh();
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
        <div
          className="
      max-w-7xl
      mx-auto
      flex
      items-start
      justify-between
      gap-6
      flex-wrap
    "
        >
          <div>
            <p className="text-cyan-300 uppercase tracking-[4px] text-sm">
              Admin Panel
            </p>

            <h1 className="text-4xl font-bold mt-3">Nuevo estudiante</h1>

            <p className="text-slate-300 mt-4">
              Creá una nueva cuenta de alumno.
            </p>
          </div>

          <Link
            href="/admin/students"
            className="
        h-14
        px-6
        rounded-2xl
        bg-white/10
        hover:bg-white/20
        border
        border-white/10
        backdrop-blur-md
        transition
        font-medium
        flex
        items-center
        gap-3
      "
          >
            <ArrowLeft className="w-5 h-5" />
            Volver
          </Link>
        </div>
      </div>

      {/* FORM */}

      <div className="p-6 md:p-10">
        <form
          onSubmit={handleSubmit}
          className="
            max-w-4xl
            mx-auto
            bg-white
            rounded-[32px]
            border
            border-slate-200
            shadow-xl
            p-8
            space-y-6
          "
        >
          <InputField
            icon={<CreditCard className="w-5 h-5" />}
            label="DNI"
            name="dni"
            value={formData.dni}
            onChange={handleChange}
            type="number"
          />

          <InputField
            icon={<User className="w-5 h-5" />}
            label="Nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />

          <InputField
            icon={<User className="w-5 h-5" />}
            label="Apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
          />

          <InputField
            icon={<Calendar className="w-5 h-5" />}
            label="Fecha de nacimiento"
            name="fecha_nacimiento"
            value={formData.fecha_nacimiento}
            onChange={handleChange}
            type="date"
          />

          <InputField
            icon={<Mail className="w-5 h-5" />}
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
          />

          <InputField
            icon={<Lock className="w-5 h-5" />}
            label="Contraseña"
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
          />

          <InputField
            icon={<GraduationCap className="w-5 h-5" />}
            label="Nivel"
            name="nivel"
            value={formData.nivel}
            onChange={handleChange}
          />

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
            "
          >
            {loading ? "Creando..." : "Crear estudiante"}
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
  type = "text",
}: {
  icon: React.ReactNode;
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="block mb-2 font-medium text-slate-700">{label}</label>

      <div className="relative">
        <div
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-slate-400
          "
        >
          {icon}
        </div>

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required
          className="
            w-full
            h-14
            pl-12
            pr-5
            rounded-2xl
            border
            border-slate-200
            focus:outline-none
            focus:ring-2
            focus:ring-cyan-500
            text-slate-700
          "
        />
      </div>
    </div>
  );
}
