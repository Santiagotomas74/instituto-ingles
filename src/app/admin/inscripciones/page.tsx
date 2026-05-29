import Link from "next/link";

import {
  Mail,
  Phone,
  MessageCircle,
  Clock3,
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react";
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

export default async function InscriptionsAdminPage() {
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/admin/inscripciones`,
    {
      cache: "no-store",
    },
  );

  const data = await res.json();

  const inscriptions: Inscription[] = data.inscriptions || [];

  return (
    <main
      className="
    min-h-screen
    bg-slate-100
  "
    >
      {/* TOP HERO */}
      <section
        className="
      relative
      overflow-hidden
      bg-gradient-to-r
      from-slate-950
      via-blue-950
      to-cyan-900
      px-6
      md:px-10
      py-14
    "
      >
        {/* Glow */}
        <div
          className="
        absolute
        top-0
        left-0
        w-96
        h-96
        bg-cyan-500/20
        blur-[120px]
        rounded-full
      "
        />

        <div
          className="
        absolute
        right-0
        bottom-0
        w-96
        h-96
        bg-blue-500/20
        blur-[120px]
        rounded-full
      "
        />

        {/* CONTENT */}
        <div
          className="
        relative
        z-10
        max-w-7xl
        mx-auto
        flex
        flex-col
        md:flex-row
        md:items-center
        md:justify-between
        gap-8
      "
        >
          {/* LEFT */}
          <div>
            <p
              className="
            text-cyan-300
            text-sm
            font-semibold
            uppercase
            tracking-[0.2em]
          "
            >
              Administración
            </p>

            <h1
              className="
            text-4xl
            md:text-5xl
            font-bold
            text-white
            mt-4
            leading-tight
          "
            >
              Inscripciones
            </h1>

            <p
              className="
            text-slate-300
            mt-4
            max-w-2xl
            text-lg
          "
            >
              Gestioná todas las solicitudes enviadas desde el formulario de
              inscripción del instituto.
            </p>
          </div>

          {/* BUTTON */}
          <Link
            href="/admin/dashboard"
            className="
          h-14
          px-7
          rounded-2xl
          bg-white/10
          border
          border-white/10
          backdrop-blur-md
          hover:bg-white/20
          text-white
          transition-all
          font-semibold
          flex
          items-center
          justify-center
          gap-3
          shadow-lg
          hover:-translate-y-0.5
          w-full
          md:w-auto
        "
          >
            <ArrowLeft className="w-5 h-5" />
            Volver al panel
          </Link>
        </div>
      </section>

      {inscriptions.length === 0 ? (
        <div
          className="
      mt-12
      bg-white
      rounded-[32px]
      border
      border-slate-200
      shadow-sm
      p-12
      text-center
    "
        >
          <div
            className="
        w-24
        h-24
        mx-auto
        rounded-3xl
        bg-cyan-100
        text-cyan-700
        flex
        items-center
        justify-center
      "
          >
            <MessageCircle className="w-12 h-12" />
          </div>

          <h2
            className="
        mt-8
        text-3xl
        font-bold
        text-slate-900
      "
          >
            No hay inscripciones todavía
          </h2>

          <p
            className="
        mt-4
        text-slate-500
        max-w-2xl
        mx-auto
      "
          >
            Aún no se recibió ninguna solicitud de inscripción desde la página
            web. Cuando los usuarios completen el formulario aparecerán aquí
            automáticamente.
          </p>

          <Link
            href="/"
            className="
        mt-8
        inline-flex
        items-center
        gap-3
        h-14
        px-7
        rounded-2xl
        bg-cyan-600
        hover:bg-cyan-700
        transition
        text-white
        font-semibold
        shadow-lg
        hover:-translate-y-0.5
      "
          >
            <ArrowLeft className="w-5 h-5" />
            Volver al sitio
          </Link>
        </div>
      ) : (
        <section className="p-6 md:p-10">
          {/* GRID */}
          <div className="grid xl:grid-cols-2 gap-8 mt-6">
            {inscriptions.map((inscription) => (
              <div
                key={inscription.id}
                className="
              bg-white
              rounded-[32px]
              shadow-xl
              border
              border-slate-200
              overflow-hidden
            "
              >
                {/* TOP */}
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
                      <p className="text-cyan-100 text-sm">
                        Solicitud de inscripción
                      </p>

                      <h2 className="text-2xl font-bold mt-2">
                        {inscription.nombre}
                      </h2>

                      <p className="text-cyan-100 mt-2">
                        {new Date(inscription.created_at).toLocaleDateString(
                          "es-AR",
                        )}
                      </p>
                    </div>

                    <div>
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

                  {/* PHONE */}
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

                  {/* COURSE */}
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

                  {/* MESSAGE */}
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

                  {/* ACTIONS */}
                  <div className="flex flex-wrap gap-4 pt-3">
                    {/* EMAIL */}
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

                    {/* WHATSAPP */}
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

                  {/* MARK AS VIEWED */}
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
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
