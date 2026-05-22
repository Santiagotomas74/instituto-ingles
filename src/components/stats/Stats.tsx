import {
  Award,
  Users,
  Globe,
  BookOpen,
  GraduationCap,
  Sparkles,
} from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "+1500",
    label: "Estudiantes formados",
    description: "Niños, adolescentes y adultos aprendiendo inglés desde 2010.",
  },
  {
    icon: Award,
    value: "+15",
    label: "Años de experiencia",
    description:
      "Trayectoria enseñando inglés con metodología moderna y dinámica.",
  },
  {
    icon: GraduationCap,
    value: "Cambridge",
    label: "Programa oficial",
    description: "Cursos alineados al sistema internacional Cambridge.",
  },
  {
    icon: Globe,
    value: "Online",
    label: "y presencial",
    description: "Modalidades adaptadas a cada estudiante y necesidad.",
  },
];

const achievements = [
  "Preparación para certificaciones internacionales",
  "Clases para todas las edades y niveles",
  "Cursos de conversación y apoyo escolar",
  "Inglés orientado a profesiones específicas",
  "Evaluaciones orales y escritas en sede propia",
  "Metodología basada en situaciones reales",
];

export default function StatsSection() {
  return (
    <section
      id="stats"
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
          left-0
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
            NUESTRA TRAYECTORIA
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
            Más de una década
            <br />
            formando estudiantes
          </h2>

          <p
            className="
              mt-8
              text-xl
              text-gray-600
              leading-relaxed
            "
          >
            En I.N.K Instituto de Inglés acompañamos a cientos de estudiantes en
            su crecimiento académico, personal y profesional.
          </p>
        </div>

        {/* Stats Grid */}
        <div
          className="
            mt-20
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
            gap-8
          "
        >
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="
                  group
                  bg-white
                  rounded-[30px]
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
                      text-5xl
                      font-bold
                      text-gray-900
                      tracking-tight
                    "
                  >
                    {item.value}
                  </h3>

                  <p
                    className="
                      mt-3
                      text-xl
                      font-semibold
                      text-gray-900
                    "
                  >
                    {item.label}
                  </p>

                  <p
                    className="
                      mt-4
                      text-gray-600
                      leading-relaxed
                      text-lg
                    "
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Section */}
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
              rounded-[36px]
              p-12
              shadow-2xl
              relative
              overflow-hidden
            "
          >
            {/* Glow */}
            <div
              className="
                absolute
                top-0
                right-0
                w-60
                h-60
                rounded-full
                bg-cyan-300/20
                blur-3xl
              "
            />

            <div className="relative z-10">
              <div
                className="
    w-30
    h-30
    rounded-3xl
    bg-white/15
    border
    border-white/30
    backdrop-blur-sm
    flex
    items-center
    justify-center
    overflow-hidden
    p-2
  "
              >
                <img
                  src="/logo2.png"
                  alt="I.N.K Logo"
                  className="
      w-full
      h-full
      object-contain
    "
                />
              </div>

              <h3
                className="
                  mt-8
                  text-4xl
                  md:text-5xl
                  font-semibold
                  text-white
                  leading-tight
                "
              >
                Inglés para el
                <br />
                mundo real
              </h3>

              <p
                className="
                  mt-6
                  text-white/80
                  text-lg
                  leading-relaxed
                "
              >
                Nuestro objetivo es que cada estudiante pueda comunicarse con
                confianza y desenvolverse en ámbitos nacionales e
                internacionales.
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="space-y-5">
            {achievements.map((item, index) => (
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
