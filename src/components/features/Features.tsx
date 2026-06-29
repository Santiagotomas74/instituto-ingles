import {
  Users,
  Clock3,
  BadgeCheck,
  BookOpen,
  GraduationCap,
  Globe,
  MonitorSmartphone,
  MessageCircleMore,
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Grupos reducidos",
    description:
      "Clases dinámicas con atención personalizada y máximo acompañamiento.",
  },
  {
    icon: Clock3,
    title: "Horarios flexibles",
    description: "Opciones por la mañana, tarde y noche para todas las edades.",
  },
  {
    icon: BadgeCheck,
    title: "Certificación Cambridge",
    description:
      "Preparación oficial con evaluaciones alineadas al sistema Cambridge.",
  },
  {
    icon: BookOpen,
    title: "Material actualizado",
    description:
      "Libros, ejercicios y recursos digitales modernos e interactivos.",
  },
  {
    icon: GraduationCap,
    title: "Profesores capacitados",
    description:
      "Equipo docente con experiencia y formación en enseñanza del idioma.",
  },
  {
    icon: Globe,
    title: "Inglés para la vida real",
    description:
      "Aprendé a comunicarte en situaciones cotidianas y profesionales.",
  },
  {
    icon: MonitorSmartphone,
    title: "Modalidad online",
    description:
      "Accedé a tus clases desde cualquier lugar con seguimiento continuo.",
  },
  {
    icon: MessageCircleMore,
    title: "Enfoque comunicativo",
    description:
      "Desarrollamos oralidad, escucha, lectura y escritura desde el inicio.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="bg-[#f8fafc] py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span
            className="
              inline-flex
              items-center
              rounded-full
              bg-blue-100
              px-5
              py-2
              text-sm
              font-medium
              text-blue-700
            "
          >
            ¿Por qué elegir I.N.K?
          </span>

          <h2
            className="
              mt-6
              text-5xl
              md:text-6xl
              font-semibold
              tracking-tight
              text-gray-900
            "
          >
            Una experiencia moderna
            <br />
            para aprender inglés
          </h2>

          <p
            className="
              mt-6
              max-w-3xl
              mx-auto
              text-xl
              leading-relaxed
              text-gray-600
            "
          >
            Combinamos enseñanza dinámica, tecnología y acompañamiento
            personalizado para que cada estudiante avance con confianza.
          </p>
        </div>

        {/* Cards */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-4
            gap-7
          "
        >
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="
                  group
                  relative
                  overflow-hidden
                  bg-white
                  border
                  border-gray-100
                  rounded-3xl
                  p-8
                  shadow-sm
                  hover:shadow-2xl
                  hover:-translate-y-2
                  transition-all
                  duration-300
                "
              >
                {/* Glow */}
                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-br
                    from-blue-50
                    to-transparent
                    opacity-0
                    group-hover:opacity-100
                    transition-opacity
                  "
                />

                {/* Icon */}
                <div
                  className="
                    relative
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
                    duration-300
                  "
                >
                  <Icon className="w-8 h-8" />
                </div>

                {/* Content */}
                <div className="relative mt-7">
                  <h3
                    className="
                      text-2xl
                      font-semibold
                      text-gray-900
                      leading-snug
                    "
                  >
                    {item.title}
                  </h3>

                  <p
                    className="
                      mt-4
                      text-[17px]
                      text-gray-600
                      leading-relaxed
                    "
                  >
                    {item.description}
                  </p>
                </div>

                {/* Bottom line */}
                <div
                  className="
                    relative
                    mt-8
                    h-[3px]
                    w-12
                    rounded-full
                    bg-red-600
                  "
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
