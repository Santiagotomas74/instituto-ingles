const levels = [
  {
    level: "Kids",
    duration: "Desde 4 años",
    title: "Niños",
    description:
      "Clases dinámicas y divertidas para aprender inglés jugando, comunicándose y desarrollando confianza desde pequeños.",
    color: "from-pink-500 to-rose-500",
  },
  {
    level: "Teens",
    duration: "Programa Cambridge",
    title: "Adolescentes",
    description:
      "Cursos orientados al desarrollo académico, conversación y preparación para certificaciones internacionales.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    level: "Adults",
    duration: "Flexible",
    title: "Adultos",
    description:
      "Aprendé inglés para viajar, trabajar o desenvolverte profesionalmente en situaciones reales.",
    color: "from-indigo-500 to-blue-700",
  },
  {
    level: "Speaking",
    duration: "Conversación",
    title: "Cursos Orales",
    description:
      "Mejorá tu fluidez, pronunciación y comprensión auditiva con clases enfocadas en speaking real.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    level: "Professional",
    duration: "Especializado",
    title: "Inglés Profesional",
    description:
      "Cursos orientados a ingeniería, medicina, azafatas y otras áreas profesionales específicas.",
    color: "from-violet-500 to-purple-600",
  },
  {
    level: "Cambridge",
    duration: "Certificación",
    title: "Exámenes Cambridge",
    description:
      "Preparación oficial para certificaciones Cambridge con evaluaciones realizadas en nuestra sede.",
    color: "from-amber-500 to-orange-500",
  },
];

export default function LevelsSection() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#f7f9fc]
        py-28
      "
    >
      {/* Background */}
      <div
        className="
          absolute
          top-0
          right-0
          w-[500px]
          h-[500px]
          bg-blue-100
          rounded-full
          blur-3xl
          opacity-30
        "
      />

      <div
        className="
          max-w-7xl
          mx-auto
          px-6
          relative
          z-10
        "
      >
        {/* Header */}
        <div className="text-center mb-20">
          <span
            className="
              inline-flex
              items-center
              px-4
              py-2
              rounded-full
              bg-blue-100
              text-blue-700
              text-sm
              font-semibold
              mb-6
            "
          >
            PROGRAMAS ACADÉMICOS
          </span>

          <h2
            className="
              text-5xl
              md:text-6xl
              font-semibold
              text-gray-900
              tracking-tight
              leading-tight
            "
          >
            Cursos para cada etapa
            <br />
            de tu aprendizaje
          </h2>

          <p
            className="
              mt-6
              text-xl
              text-gray-600
              max-w-3xl
              mx-auto
              leading-relaxed
            "
          >
            En I.N.K Instituto de Inglés ofrecemos programas modernos, dinámicos
            y adaptados a todas las edades y objetivos.
          </p>
        </div>

        {/* Cards */}
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3
            gap-8
          "
        >
          {levels.map((item) => (
            <div
              key={item.title}
              className="
                group
                relative
                overflow-hidden
                bg-white
                rounded-3xl
                p-8
                border
                border-gray-100
                shadow-sm
                hover:shadow-2xl
                hover:-translate-y-2
                transition-all
                duration-500
              "
            >
              {/* Gradient Glow */}
              <div
                className={`
                  absolute
                  top-0
                  right-0
                  w-40
                  h-40
                  rounded-full
                  blur-3xl
                  opacity-10
                  bg-gradient-to-br
                  ${item.color}
                `}
              />

              {/* Badge */}
              <div className="flex items-center justify-between">
                <div
                  className={`
                    bg-gradient-to-r
                    ${item.color}
                    text-white
                    font-semibold
                    px-5
                    py-3
                    rounded-2xl
                    text-sm
                    shadow-lg
                  `}
                >
                  {item.level}
                </div>

                <span className="text-gray-500 text-sm font-medium">
                  {item.duration}
                </span>
              </div>

              {/* Content */}
              <div className="mt-10 relative z-10">
                <h3
                  className="
                    text-3xl
                    font-semibold
                    text-gray-900
                    tracking-tight
                  "
                >
                  {item.title}
                </h3>

                <p
                  className="
                    mt-5
                    text-gray-600
                    text-[17px]
                    leading-relaxed
                  "
                >
                  {item.description}
                </p>
              </div>

              {/* Bottom */}
              <div className="mt-10">
                <button
                  className={`
                    w-full
                    py-4
                    rounded-2xl
                    text-white
                    font-medium
                    bg-gradient-to-r
                    ${item.color}
                    hover:scale-[1.02]
                    transition-all
                    duration-300
                    shadow-lg
                  `}
                >
                  Ver programa
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
