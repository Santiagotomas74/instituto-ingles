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
  visto: boolean;
  created_at: string;
};

type Props = {
  inscription: Inscription;
};

export default function InscriptionCard({ inscription }: Props) {
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

          {inscription.visto ? (
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
            href={`https://wa.me/${inscription.telefono}`}
            target="_blank"
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

        {!inscription.visto && (
          <button
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
            "
          >
            Marcar como visto
          </button>
        )}
      </div>
    </div>
  );
}
