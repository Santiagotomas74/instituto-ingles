import { GraduationCap, Globe, Users, BadgeCheck } from "lucide-react";

const features = [
  {
    icon: GraduationCap,
    title: "Metodología Moderna",
    description:
      "Clases dinámicas, prácticas y enfocadas en situaciones reales para aprender inglés de forma natural.",
  },
  {
    icon: Users,
    title: "Grupos Reducidos",
    description:
      "Seguimiento personalizado para potenciar el aprendizaje y la participación de cada estudiante.",
  },
  {
    icon: Globe,
    title: "Preparación Internacional",
    description:
      "Programas alineados al sistema Cambridge con certificaciones reconocidas mundialmente.",
  },
  {
    icon: BadgeCheck,
    title: "Desde 2010",
    description:
      "Más de 15 años formando estudiantes de todas las edades en San Miguel.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="
        relative
        overflow-hidden
        bg-white
        py-28
      "
    >
      {/* Background */}
      <div
        className="
          absolute
          top-0
          left-0
          w-[400px]
          h-[400px]
          bg-blue-100/40
          rounded-full
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
        "
      >
        <div
          className="
            grid
            lg:grid-cols-2
            gap-20
            items-center
          "
        >
          {/* Left Content */}
          <div>
            {/* Badge */}
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
              SOBRE NOSOTROS
            </div>

            {/* Title */}
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
              Más que un instituto,
              <br />
              una experiencia de aprendizaje
            </h2>

            {/* Description */}
            <p
              className="
                mt-8
                text-xl
                text-gray-600
                leading-relaxed
              "
            >
              En{" "}
              <span className="font-semibold">
                I.N.K Instituto de Inglés en San Miguel
              </span>
              , enseñamos inglés desde el año 2010 con una metodología moderna,
              dinámica y enfocada en la comunicación real.
            </p>

            <p
              className="
                mt-6
                text-lg
                text-gray-600
                leading-relaxed
              "
            >
              Ofrecemos cursos para niños, adolescentes y adultos, clases
              presenciales y online, preparación para certificaciones Cambridge
              y programas orientados a diferentes profesiones.
            </p>

            {/* Stats */}
            <div
              className="
    grid
    grid-cols-1
    sm:grid-cols-2
    gap-5
    mt-10
  "
            >
              <div
                className="
      bg-[#f7f9fc]
      rounded-3xl
      p-6
      border
      border-gray-100
      text-center
      sm:text-left
    "
              >
                <h3
                  className="
        text-3xl
        sm:text-4xl
        font-bold
        text-blue-700
        break-words
      "
                >
                  +15
                </h3>

                <p
                  className="
        mt-2
        text-gray-600
        text-sm
        sm:text-base
        leading-relaxed
      "
                >
                  años enseñando inglés
                </p>
              </div>

              <div
                className="
      bg-[#f7f9fc]
      rounded-3xl
      p-6
      border
      border-gray-100
      text-center
      sm:text-left
    "
              >
                <h3
                  className="
        text-2xl
        sm:text-4xl
        font-bold
        text-blue-700
        break-words
      "
                >
                  Cambridge
                </h3>

                <p
                  className="
        mt-2
        text-gray-600
        text-sm
        sm:text-base
        leading-relaxed
      "
                >
                  certificaciones oficiales
                </p>
              </div>
            </div>
          </div>

          {/* Right Cards */}
          <div
            className="
              grid
              sm:grid-cols-2
              gap-6
            "
          >
            {features.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="
                    group
                    bg-[#f7f9fc]
                    rounded-3xl
                    p-8
                    border
                    border-gray-100
                    hover:bg-white
                    hover:shadow-2xl
                    hover:-translate-y-1
                    transition-all
                    duration-500
                  "
                >
                  {/* Icon */}
                  <div
                    className="
                      w-16
                      h-16
                      rounded-2xl
                      bg-blue-100
                      text-blue-700
                      flex
                      items-center
                      justify-center
                      group-hover:scale-110
                      transition-transform
                    "
                  >
                    <Icon size={30} />
                  </div>

                  {/* Content */}
                  <div className="mt-6">
                    <h3
                      className="
                        text-2xl
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
        </div>
      </div>
    </section>
  );
}
