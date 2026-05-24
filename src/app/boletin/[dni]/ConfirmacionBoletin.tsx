"use client";

import { useEffect, useState } from "react";
import Footer from "../../../components/footer/Footer";

type Props = {
  boletinId: string;
  esMayorEdad: boolean;
};

export default function ConfirmacionBoletin({ boletinId, esMayorEdad }: Props) {
  const [loading, setLoading] = useState(false);

  const [checking, setChecking] = useState(true);

  const [alreadyConfirmed, setAlreadyConfirmed] = useState(false);

  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    dni: "",
  });

  useEffect(() => {
    checkConfirmation();
  }, []);

  const checkConfirmation = async () => {
    try {
      const res = await fetch(
        `${process.env.BACKEND_URL}/api/boletines/confirmar-boletin?boletin_id=${boletinId}`,
      );

      const data = await res.json();

      if (data.confirmed) {
        setAlreadyConfirmed(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setChecking(false);
    }
  };

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

      const res = await fetch(
        "http://localhost:3000/api/boletines/confirmar-boletin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            boletin_id: boletinId,
            ...formData,
          }),
        },
      );

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="mt-10 text-center text-gray-500">
        Verificando confirmación...
      </div>
    );
  }

  if (alreadyConfirmed || success) {
    return (
      <section className="mt-16">
        <div
          className="
            bg-green-50
            border
            border-green-200
            rounded-[32px]
            p-8
            text-center
          "
        >
          <h2 className="text-3xl font-bold text-green-800">
            Boletín confirmado
          </h2>

          <p className="mt-3 text-green-700">
            Este boletín ya fue visualizado y confirmado.
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="mt-16">
        <div
          className="
          bg-white
          border
          border-gray-200
          rounded-[32px]
          p-8
          shadow-xl
        "
        >
          <h2 className="text-3xl font-bold text-gray-900">
            Confirmar visualización
          </h2>

          <p className="mt-3 text-gray-600">
            {esMayorEdad
              ? "El estudiante debe confirmar el boletín."
              : "El padre, madre o tutor debe confirmar el boletín."}
          </p>

          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-3 gap-5 mt-8"
          >
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              className="
              h-14
              px-5
              rounded-2xl
              text-gray-700
              border
              border-gray-200
            "
            />

            <input
              type="text"
              name="apellido"
              placeholder="Apellido"
              value={formData.apellido}
              onChange={handleChange}
              required
              className="
              h-14
              px-5
              rounded-2xl
                text-gray-700
              border
              border-gray-200
            "
            />

            <input
              type="number"
              name="dni"
              placeholder="DNI"
              value={formData.dni}
              onChange={handleChange}
              required
              className="
              h-14
              px-5
              rounded-2xl
                text-gray-700
              border
              border-gray-200
            "
            />

            <div className="md:col-span-3">
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
                {loading ? "Confirmando..." : "Confirmar visualización"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
