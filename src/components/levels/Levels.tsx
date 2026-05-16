const levels = [
  {
    level: "A1",
    duration: "3 meses",
    title: "Principiante",
    description: "Fundamentos del inglés para empezar desde cero",
  },
  {
    level: "A2",
    duration: "3 meses",
    title: "Elemental",
    description: "Conversaciones básicas y gramática elemental",
  },
  {
    level: "B1",
    duration: "4 meses",
    title: "Intermedio",
    description: "Comunicación efectiva en situaciones cotidianas",
  },
  {
    level: "B2",
    duration: "4 meses",
    title: "Intermedio Alto",
    description: "Fluidez y precisión en contextos variados",
  },
  {
    level: "C1",
    duration: "5 meses",
    title: "Avanzado",
    description: "Dominio avanzado para contextos académicos y profesionales",
  },
];

export default function LevelsSection() {
  return (
    <section className="bg-[#f7f8fa] py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className="
              text-5xl
              font-semibold
              text-gray-900
              tracking-tight
            "
          >
            Nuestros Niveles
          </h2>

          <p
            className="
              mt-5
              text-xl
              text-gray-600
              max-w-3xl
              mx-auto
              leading-relaxed
            "
          >
            Desde principiante hasta avanzado, según el Marco Común Europeo
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
              key={item.level}
              className="
                bg-white
                rounded-2xl
                p-8
                border
                border-gray-100
                shadow-sm
                hover:shadow-xl
                hover:-translate-y-1
                transition-all
                duration-300
              "
            >
              {/* Top */}
              <div className="flex items-center gap-4">
                <div
                  className="
                    bg-blue-100
                    text-blue-700
                    font-semibold
                    px-5
                    py-3
                    rounded-xl
                    text-lg
                  "
                >
                  {item.level}
                </div>

                <span className="text-gray-500 text-lg">{item.duration}</span>
              </div>

              {/* Content */}
              <div className="mt-8">
                <h3
                  className="
                    text-3xl
                    font-semibold
                    text-gray-900
                  "
                >
                  {item.title}
                </h3>

                <p
                  className="
                    mt-4
                    text-gray-600
                    text-lg
                    leading-relaxed
                  "
                >
                  {item.description}
                </p>
              </div>

              {/* Button */}
              <button
                className="
                  mt-8
                  w-full
                  border
                  border-blue-500
                  text-blue-600
                  py-4
                  rounded-xl
                  text-lg
                  font-medium
                  hover:bg-blue-600
                  hover:text-white
                  transition-all
                  duration-300
                "
              >
                Más información
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
