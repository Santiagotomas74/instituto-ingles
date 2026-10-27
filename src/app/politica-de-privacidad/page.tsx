import Link from "next/link";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import Navbar from "@/components/navbar/Navbar";

export const metadata = {
  title: "Política de Privacidad | Instituto I.N.K.",
  description:
    "Información sobre el uso de los datos personales en el Instituto de Inglés I.N.K.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />

      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-950 px-5 py-16">
        {/* Efectos de fondo */}
        <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px]" />

        <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-blue-500/20 blur-[120px]" />

        <section className="relative z-10 w-full max-w-2xl">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>

          <div className="rounded-3xl bg-white p-8 shadow-2xl sm:p-10">
            {/* Encabezado */}
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
              <ShieldCheck className="h-8 w-8 text-blue-600" />
            </div>

            <h1 className="text-3xl font-bold text-slate-900">
              Política de Privacidad
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Instituto de Inglés I.N.K. — Instituto New Knowledge
            </p>

            {/* Información */}
            <div className="mt-8 space-y-5 text-base leading-7 text-slate-600">
              <p>
                Los datos solicitados a través de nuestro formulario de
                contacto, como nombre, correo electrónico y teléfono, serán
                utilizados para comunicarnos con vos y responder tus consultas
                sobre nuestros cursos.
              </p>

              <p>
                La información proporcionada será tratada de manera responsable
                y se procurará mantener su confidencialidad, utilizándola
                únicamente para la finalidad mencionada.
              </p>

              <p>
                Si tenés alguna consulta sobre el uso de tus datos, podés
                comunicarte con nosotros a través de nuestros medios de contacto
                habituales.
              </p>
            </div>

            {/* Volver al formulario */}
            <div className="mt-8">
              <Link
                href="/inscriptions"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 sm:w-auto"
              >
                Volver al formulario
              </Link>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-slate-400">
            © {new Date().getFullYear()} Instituto de Inglés I.N.K.
          </p>
        </section>
      </main>
    </>
  );
}
