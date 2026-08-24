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

import AdminSidebar from "../dashboard/components/AdminSidebar";
import AdminNavbar from "../dashboard/components/AdminNavbar";
import InscriptionCard from "./InscriptionCard";

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
  console.log("data", data);

  const inscriptions: Inscription[] = data.inscriptions || [];

  return (
    <main className="min-h-screen bg-slate-100 flex">
      <AdminSidebar />

      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-30 ">
          <AdminNavbar />
        </header>

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
            <div>
              <p className="text-cyan-300 text-sm font-semibold uppercase tracking-[0.2em]">
                Administración
              </p>

              <h1 className="text-4xl md:text-5xl font-bold text-white mt-4">
                Inscripciones
              </h1>

              <p className="text-slate-300 mt-4 max-w-2xl text-lg">
                Gestioná todas las solicitudes enviadas desde el formulario de
                inscripción del instituto.
              </p>
            </div>

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
          <div className="p-6 md:p-10">
            <div
              className="
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

              <h2 className="mt-8 text-3xl font-bold text-slate-900">
                No hay inscripciones todavía
              </h2>

              <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
                Aún no se recibió ninguna solicitud de inscripción desde la
                página web. Cuando los usuarios completen el formulario
                aparecerán aquí automáticamente.
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
          </div>
        ) : (
          <section className="p-6 md:p-10">
            <div className="grid xl:grid-cols-2 gap-8 mt-6">
              {inscriptions.map((inscription) => (
                <InscriptionCard
                  key={inscription.id}
                  inscription={inscription}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
