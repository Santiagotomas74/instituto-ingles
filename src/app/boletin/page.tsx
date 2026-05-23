"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Search, FileText, User, GraduationCap } from "lucide-react";

export default function BulletinSearchPage() {
  const [dni, setDni] = useState("");

  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Buscando boletín para DNI:", dni);

    if (!dni) return;

    router.push(`/boletin/${dni}`);
  };

  return (
    <main
      className="
        min-h-screen
        bg-gradient-to-br
        from-slate-950
        via-blue-950
        to-cyan-950
        flex
        items-center
        justify-center
        px-5
        py-20
        relative
        overflow-hidden
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
          bottom-0
          right-0
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
          w-full
          max-w-6xl
          grid
          lg:grid-cols-2
          gap-10
          items-center
        "
      >
        {/* LEFT */}
        <div className="text-white">
          <div
            className="
              inline-flex
              items-center
              gap-2
              px-4
              py-2
              rounded-full
              bg-white/10
              border
              border-white/10
              backdrop-blur-md
              text-cyan-300
              text-sm
            "
          >
            <FileText className="w-4 h-4" />
            Sistema académico
          </div>

          <h1
            className="
              mt-6
              text-4xl
              md:text-6xl
              font-bold
              leading-tight
            "
          >
            Consultá tu
            <br />
            boletín académico
          </h1>

          <p
            className="
              mt-6
              text-gray-300
              text-lg
              leading-relaxed
              max-w-xl
            "
          >
            Ingresá el DNI del estudiante para acceder al boletín,
            calificaciones, observaciones y asistencia.
          </p>

          <div className="mt-10 space-y-5">
            <FeatureItem
              icon={<User className="w-5 h-5 text-cyan-300" />}
              title="Acceso rápido"
              description="Buscá boletines por DNI"
            />

            <FeatureItem
              icon={<GraduationCap className="w-5 h-5 text-cyan-300" />}
              title="Seguimiento académico"
              description="Consultá notas y observaciones"
            />
          </div>
        </div>

        {/* RIGHT */}
        <div
          className="
            bg-white
            rounded-[32px]
            shadow-2xl
            p-8
            md:p-10
          "
        >
          <div className="text-center">
            <img
              src="/logo3.png"
              alt="I.N.K Logo"
              className="
                h-24
                w-auto
                object-contain
                mx-auto
              "
            />

            <h2
              className="
                mt-6
                text-3xl
                font-bold
                text-gray-900
              "
            >
              Buscar boletín
            </h2>

            <p className="text-gray-500 mt-3">Ingresá el DNI del estudiante</p>
          </div>

          <form onSubmit={handleSearch} className="mt-10 space-y-6">
            <div>
              <label
                className="
                  block
                  text-sm
                  font-medium
                  text-gray-700
                  mb-2
                "
              >
                DNI
              </label>

              <input
                type="number"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                placeholder="Ej: 40123456"
                className="
                  w-full
                  h-14
                  px-5
                  rounded-2xl
                  border
                  border-gray-200
                  text-gray-900
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
                required
              />
            </div>

            <button
              type="submit"
              className="
                w-full
                h-14
                rounded-2xl
                bg-blue-600
                hover:bg-blue-700
                text-white
                font-semibold
                text-lg
                transition-all
                shadow-lg
                hover:shadow-2xl
                hover:-translate-y-0.5
                flex
                items-center
                justify-center
                gap-2
              "
            >
              <Search className="w-5 h-5" />
              Buscar boletín
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

function FeatureItem({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <div
        className="
          w-12
          h-12
          rounded-2xl
          bg-white/10
          flex
          items-center
          justify-center
        "
      >
        {icon}
      </div>

      <div>
        <p className="font-medium">{title}</p>

        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </div>
  );
}
