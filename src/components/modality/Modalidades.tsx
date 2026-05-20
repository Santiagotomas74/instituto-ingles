import {
  MonitorSmartphone,
  Building2,
  UserRound,
  Clock3,
  GraduationCap,
  Sparkles,
} from "lucide-react";

const modalities = [
  {
    icon: Building2,
    title: "Clases Presenciales",
    description:
      "Aprendé en nuestras aulas con grupos reducidos y clases dinámicas.",
  },
  {
    icon: MonitorSmartphone,
    title: "Modalidad Online",
    description:
      "Tomá clases desde cualquier lugar con encuentros virtuales en vivo.",
  },
  {
    icon: UserRound,
    title: "Clases Personalizadas",
    description:
      "Programas adaptados a tus objetivos, nivel y disponibilidad horaria.",
  },
];

const features = [
  "Cursos regulares de 10 meses",
  "Clases para niños, adolescentes y adultos",
  "Cursos intensivos",
  "Clases de conversación",
  "Apoyo escolar todo el año",
  "Inglés para profesiones específicas",
];

export default function ModalitiesSection() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#f8fafc]
        py-28
      "
    >
      {/* Background */}
      <div
        className="
          absolute
          right-0
          bottom-0
          w-[500px]
          h-[500px]
          bg-blue-100/40
          rounded-full
          blur-3xl
        "
      />

      <div
        className="
          relative
          z-10
          max-w-7xl
          mx-auto
          px-6
        "
      >
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto">
          <div
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
              mb-8
            "
          >
            MODALIDADES DE ESTUDIO
          </div>

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
            Elegí la forma
            <br />
            de aprender ideal para vos
          </h2>

          <p
            className="
              mt-8
              text-xl
              text-gray-600
              leading-relaxed
            "
          >
            En I.N.K ofrecemos distintas modalidades para adaptarnos a cada
            estudiante, sus horarios y objetivos.
          </p>
        </div>

        {/* Cards */}
        <div
          className="
            mt-20
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3
            gap-8
          "
        >
          {modalities.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="
                  group
                  bg-white
                  rounded-[28px]
                  p-10
                  border
                  border-gray-100
                  shadow-sm
                  hover:shadow-2xl
                  hover:-translate-y-2
                  transition-all
                  duration-500
                "
              >
                {/* Icon */}
                <div
                  className="
                    w-20
                    h-20
                    rounded-3xl
                    bg-blue-100
                    text-blue-700
                    flex
                    items-center
                    justify-center
                    group-hover:bg-blue-600
                    group-hover:text-white
                    transition-all
                    duration-500
                  "
                >
                  <Icon className="w-10 h-10" />
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
                      mt-5
                      text-lg
                      text-gray-600
                      leading-relaxed
                    "
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Content */}
        <div
          className="
            mt-24
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-12
            items-center
          "
        >
          {/* Left */}
          <div
            className="
              bg-gradient-to-br
              from-blue-700
              via-blue-800
              to-blue-950
              rounded-[32px]
              p-10
              shadow-2xl
              relative
              overflow-hidden
            "
          >
            <div
              className="
                absolute
                top-0
                right-0
                w-52
                h-52
                rounded-full
                bg-cyan-300/20
                blur-3xl
              "
            />

            <div className="relative z-10">
              <div
                className="
                  w-20
                  h-20
                  rounded-3xl
                  bg-white/10
                  backdrop-blur-sm
                  border
                  border-white/10
                  flex
                  items-center
                  justify-center
                "
              >
                <Clock3
                  className="
                    w-10
                    h-10
                    text-cyan-300
                  "
                />
              </div>

              <h3
                className="
                  mt-8
                  text-4xl
                  font-semibold
                  text-white
                  leading-tight
                "
              >
                Flexibilidad y
                <br />
                acompañamiento
              </h3>

              <p
                className="
                  mt-6
                  text-white/80
                  text-lg
                  leading-relaxed
                "
              >
                Nos adaptamos a cada estudiante para que aprender inglés sea una
                experiencia cómoda, efectiva y motivadora.
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="space-y-5">
            {features.map((item, index) => (
              <div
                key={index}
                className="
                  bg-white
                  rounded-2xl
                  border
                  border-gray-100
                  p-6
                  flex
                  items-center
                  gap-5
                  shadow-sm
                "
              >
                <div
                  className="
                    w-12
                    h-12
                    rounded-xl
                    bg-blue-100
                    flex
                    items-center
                    justify-center
                    shrink-0
                  "
                >
                  <Sparkles
                    className="
                      w-6
                      h-6
                      text-blue-700
                    "
                  />
                </div>

                <p
                  className="
                    text-lg
                    text-gray-700
                    font-medium
                  "
                >
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
