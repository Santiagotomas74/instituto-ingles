export default function CTASection() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-gradient-to-br
        from-blue-700
        via-blue-600
        to-sky-500
        py-28
      "
    >
      {/* Background Glow */}
      <div
        className="
          absolute
          top-0
          left-0
          w-96
          h-96
          bg-white/10
          rounded-full
          blur-3xl
          -translate-x-1/2
          -translate-y-1/2
        "
      />

      <div
        className="
          absolute
          bottom-0
          right-0
          w-[500px]
          h-[500px]
          bg-blue-300/10
          rounded-full
          blur-3xl
          translate-x-1/3
          translate-y-1/3
        "
      />

      <div
        className="
          relative
          max-w-5xl
          mx-auto
          px-6
          text-center
        "
      >
        {/* Badge */}
        <div
          className="
            inline-flex
            items-center
            gap-2
            bg-white/15
            border
            border-white/20
            backdrop-blur-md
            text-white
            px-5
            py-2
            rounded-full
            text-sm
            font-medium
            shadow-lg
          "
        >
          ✨ Inscripciones abiertas 2026
        </div>

        {/* Title */}
        <h2
          className="
            mt-8
            text-white
            text-5xl
            md:text-7xl
            font-semibold
            tracking-tight
            leading-tight
          "
        >
          Comenzá tu camino
          <br />
          en inglés hoy
        </h2>

        {/* Description */}
        <p
          className="
            mt-8
            text-white/90
            text-xl
            md:text-2xl
            leading-relaxed
            max-w-3xl
            mx-auto
          "
        >
          En I.N.K Instituto de Inglés en San Miguel ayudamos a niños,
          adolescentes y adultos a aprender inglés de forma dinámica, práctica y
          orientada al mundo real.
        </p>

        {/* Buttons */}
        <div
          className="
            mt-12
            flex
            flex-col
            sm:flex-row
            items-center
            justify-center
            gap-5
          "
        >
          <button
            className="
              bg-white
              text-blue-700
              px-10
              py-4
              rounded-2xl
              text-lg
              font-semibold
              shadow-2xl
              hover:bg-gray-100
              hover:scale-105
              transition-all
              duration-300
            "
          >
            Inscribirme ahora
          </button>

          <button
            className="
              border
              border-white/40
              bg-white/10
              backdrop-blur-md
              text-white
              px-10
              py-4
              rounded-2xl
              text-lg
              font-semibold
              hover:bg-white
              hover:text-blue-700
              transition-all
              duration-300
            "
          >
            Solicitar información
          </button>
        </div>
      </div>
    </section>
  );
}
