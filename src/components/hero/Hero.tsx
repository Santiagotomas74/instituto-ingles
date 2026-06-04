import LondonHeroSlider from "./LondonHeroSlider";

export default function Hero() {
  return (
    <section
      className="
    relative
    overflow-hidden
    w-full
    min-h-[750px]
    flex
    items-center
  "
    >
      <LondonHeroSlider />
      {/* Background Effects */}
      <div
        className="
          absolute
          top-0
          left-0
          w-full
          h-full
          opacity-20
          bg-[radial-gradient(circle_at_top_right,white,transparent_35%)]
        "
      />

      <div
        className="
          absolute
          -bottom-32
          -right-32
          w-[400px]
          h-[400px]
          rounded-full
          bg-blue-400/20
          blur-3xl
        "
      />

      <div
        className="
          absolute
          top-10
          left-[-120px]
          w-[280px]
          h-[280px]
          rounded-full
          bg-cyan-300/10
          blur-3xl
        "
      />

      <div
        className="
          max-w-7xl
          mx-auto
          px-6
          relative
          z-10
          grid
          lg:grid-cols-2
          gap-16
          items-center
        "
      >
        {/* Left Content */}
        <div className="max-w-3xl">
          {/* Badge */}
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
              border-white/20
              backdrop-blur-sm
              text-white/90
              text-sm
              font-medium
              mb-1
            "
          >
            Instituto de Inglés en San Miguel desde 2010
          </div>

          {/* Title */}
          <h1
            className="
              mt-4
              text-white
              text-5xl
              md:text-5xl
              font-light
              leading-tight
              tracking-tight
            "
          >
            Aprendé inglés con
            <span className="font-semibold text-cyan-300">
              {" "}
              certificación Cambridge
            </span>
          </h1>

          {/* Description */}
          <p
            className="
              mt-4
              text-white/80
              text-lg
              md:text-lg
              leading-relaxed
              max-w-2xl
            "
          >
            Clases dinámicas para niños, adolescentes y adultos. Modalidad
            presencial y online con grupos reducidos, profesores especializados
            y programas oficiales Cambridge.
          </p>

          {/* Features */}
          <div
            className="
              mt-10
              flex
              flex-wrap
              gap-4
            "
          >
            {[
              "Cursos para todas las edades",
              "Modalidad online y presencial",
              "Clases reducidas",
              "Certificación Cambridge",
            ].map((item) => (
              <div
                key={item}
                className="
                  px-4
                  py-2
                  rounded-full
                  bg-white/10
                  border
                  border-white/10
                  text-white/90
                  text-sm
                  backdrop-blur-sm
                "
              >
                {item}
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div
            className="
              flex
              flex-col
              sm:flex-row
              items-start
              sm:items-center
              gap-4
              mt-12
            "
          >
            <button
              className="
                bg-white
                text-blue-800
                px-8
                py-4
                rounded-xl
                text-lg
                font-semibold
                hover:bg-blue-50
                transition
                shadow-2xl
                hover:scale-[1.02]
              "
            >
              Inscribirme ahora
            </button>

            <button
              className="
                border
                border-white/30
                bg-white/5
                backdrop-blur-sm
                text-white
                px-8
                py-4
                rounded-xl
                text-lg
                font-medium
                hover:bg-white
                hover:text-blue-800
                transition
              "
            >
              Ver programas
            </button>
          </div>
        </div>

        {/* Right Card */}
        <div
          className="
            hidden
            lg:flex
            justify-end
          "
        >
          <div
            className="
              w-full
              max-w-md
              rounded-3xl
              bg-white/10
              border
              border-white/20
              backdrop-blur-xl
              p-8
              shadow-2xl
            "
          >
            <div className="space-y-6">
              <div>
                <p className="text-cyan-300 text-sm font-medium">
                  I.N.K Instituto de Inglés en San Miguel
                </p>

                <h3
                  className="
                    text-white
                    text-3xl
                    font-semibold
                    mt-2
                  "
                >
                  Inglés para el mundo real
                </h3>
              </div>

              <div className="space-y-4">
                {[
                  "✔ Cursos regulares e intensivos",
                  "✔ Inglés para profesionales",
                  "✔ Conversación y apoyo escolar",
                  "✔ Exámenes en sede propia",
                ].map((item) => (
                  <div
                    key={item}
                    className="
                      flex
                      items-center
                      text-white/90
                      text-[15px]
                    "
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div
                className="
                  pt-6
                  border-t
                  border-white/10
                  flex
                  items-center
                  justify-between
                "
              >
                <div>
                  <p className="text-white text-2xl font-bold">+15 años</p>

                  <span className="text-white/60 text-sm">
                    enseñando inglés
                  </span>
                </div>

                <div>
                  <p className="text-white text-2xl font-bold">Cambridge</p>

                  <span className="text-white/60 text-sm">
                    Certificaciones oficiales
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
