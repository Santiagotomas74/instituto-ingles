"use client";

import { useState } from "react";
import Link from "next/link";

import { Mail, Phone, Clock3, Eye, EyeOff } from "lucide-react";

import { FaWhatsapp } from "react-icons/fa";

type Inscription = {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  curso: string;
  mensaje: string;
  estado: "pendiente" | "visto";
  created_at: string;
};

type Props = {
  inscription: Inscription;
};

export default function InscriptionCard({ inscription }: Props) {
  const [estado, setEstado] = useState(inscription.estado);
  const [loading, setLoading] = useState(false);

  const handleMarcarComoVisto = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `/api/admin/inscripciones/${inscription.id}/viewed`,
        {
          method: "PATCH",
        },
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        alert(data.message || "No se pudo marcar la inscripción como vista.");
        return;
      }

      setEstado("visto");
    } catch (error) {
      console.error("Error marcando inscripción como vista:", error);

      alert("Error al actualizar la inscripción.");
    } finally {
      setLoading(false);
    }
  };
  const getWhatsappNumber = (telefono: string) => {
    if (!telefono) return "";

    // Dejamos solamente números
    let number = telefono.replace(/\D/g, "");

    /*
     * Si ya viene con código de Argentina:
     * 54...
     */
    if (number.startsWith("54")) {
      // Si viene como 549..., ya está en formato WhatsApp
      if (number.startsWith("549")) {
        return number;
      }

      // Argentina + 9 para celulares
      return `549${number.slice(2)}`;
    }

    /*
     * Teléfono argentino ingresado con 0 adelante.
     *
     * Ejemplo:
     * 01127157115
     */
    if (number.startsWith("0")) {
      number = number.slice(1);
    }

    /*
     * Si tiene 10 dígitos:
     *
     * 1127157115
     *
     * Lo interpretamos como celular argentino.
     */
    if (number.length === 10) {
      return `549${number}`;
    }

    /*
     * Si tiene 8 dígitos, puede ser un número
     * local. En este caso agregamos el código
     * de área de San Miguel / Buenos Aires.
     *
     * Ejemplo:
     * 27157115
     *
     * => 5491127157115
     */
    if (number.length === 8) {
      return `54911${number}`;
    }

    /*
     * Si ya viene en otro formato internacional,
     * lo dejamos como está.
     */
    return number;
  };

  const whatsappNumber = getWhatsappNumber(inscription.telefono);

  return (
    <div
      className="
        bg-white
        rounded-[32px]
        shadow-xl
        border
        border-slate-200
        overflow-hidden
      "
    >
      {/* HEADER */}
      <div
        className="
          bg-gradient-to-r
          from-blue-700
          to-cyan-600
          p-6
          text-white
        "
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-cyan-100 text-sm">Solicitud de inscripción</p>

            <h2 className="text-2xl font-bold mt-2">{inscription.nombre}</h2>

            <p className="text-cyan-100 mt-2">
              {new Date(inscription.created_at).toLocaleDateString("es-AR")}
            </p>
          </div>

          {estado === "visto" ? (
            <span
              className="
                px-4
                py-2
                rounded-full
                bg-emerald-400/20
                text-emerald-100
                text-sm
                font-medium
                flex
                items-center
                gap-2
              "
            >
              <Eye className="w-4 h-4" />
              Visto
            </span>
          ) : (
            <span
              className="
                px-4
                py-2
                rounded-full
                bg-yellow-400/20
                text-yellow-100
                text-sm
                font-medium
                flex
                items-center
                gap-2
              "
            >
              <EyeOff className="w-4 h-4" />
              Nuevo
            </span>
          )}
        </div>
      </div>

      {/* BODY */}
      <div className="p-6 space-y-5">
        {/* EMAIL */}
        <div
          className="
            flex
            items-start
            gap-4
            bg-slate-50
            rounded-2xl
            p-4
          "
        >
          <div
            className="
              w-11
              h-11
              rounded-xl
              bg-blue-100
              text-blue-700
              flex
              items-center
              justify-center
              shrink-0
            "
          >
            <Mail className="w-5 h-5" />
          </div>

          <div>
            <p className="text-sm text-slate-500">Email</p>

            <p className="font-semibold text-slate-900 break-all">
              {inscription.email}
            </p>
          </div>
        </div>

        {/* TELÉFONO */}
        <div
          className="
            flex
            items-start
            gap-4
            bg-slate-50
            rounded-2xl
            p-4
          "
        >
          <div
            className="
              w-11
              h-11
              rounded-xl
              bg-emerald-100
              text-emerald-700
              flex
              items-center
              justify-center
              shrink-0
            "
          >
            <Phone className="w-5 h-5" />
          </div>

          <div>
            <p className="text-sm text-slate-500">Teléfono</p>

            <p className="font-semibold text-slate-900">
              {inscription.telefono}
            </p>
          </div>
        </div>

        {/* CURSO */}
        <div
          className="
            flex
            items-start
            gap-4
            bg-slate-50
            rounded-2xl
            p-4
          "
        >
          <div
            className="
              w-11
              h-11
              rounded-xl
              bg-cyan-100
              text-cyan-700
              flex
              items-center
              justify-center
              shrink-0
            "
          >
            <Clock3 className="w-5 h-5" />
          </div>

          <div>
            <p className="text-sm text-slate-500">Curso de interés</p>

            <p className="font-semibold text-slate-900">
              {inscription.curso || "No especificado"}
            </p>
          </div>
        </div>

        {/* MENSAJE */}
        <div
          className="
            rounded-2xl
            bg-slate-50
            p-5
          "
        >
          <p className="text-sm text-slate-500 mb-2">Mensaje</p>

          <p className="text-slate-700 leading-relaxed">
            {inscription.mensaje || "Sin mensaje"}
          </p>
        </div>

        {/* BOTONES */}
        <div className="flex flex-wrap gap-4 pt-3">
          <Link
            href={`mailto:${inscription.email}`}
            className="
              flex-1
              min-w-[180px]
              h-12
              rounded-2xl
              bg-blue-600
              hover:bg-blue-700
              transition
              text-white
              font-semibold
              flex
              items-center
              justify-center
              gap-2
            "
          >
            <Mail className="w-4 h-4" />
            Enviar mail
          </Link>

          <Link
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex-1
              min-w-[180px]
              h-12
              rounded-2xl
              bg-emerald-600
              hover:bg-emerald-700
              transition
              text-white
              font-semibold
              flex
              items-center
              justify-center
              gap-2
            "
          >
            <FaWhatsapp size={20} />
            WhatsApp
          </Link>
        </div>

        {/* MARCAR COMO VISTO */}
        {estado === "pendiente" && (
          <button
            type="button"
            onClick={handleMarcarComoVisto}
            disabled={loading}
            className="
              w-full
              h-12
              rounded-2xl
              border
              border-slate-200
              hover:bg-slate-100
              transition
              font-semibold
              text-slate-700
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {loading ? "Guardando..." : "Marcar como visto"}
          </button>
        )}
      </div>
    </div>
  );
}
