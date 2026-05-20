import {
  CheckCircle2,
  BookOpen,
  Globe,
  Users,
  Headphones,
  MessageSquare,
} from "lucide-react";

const methodologyItems = [
  {
    title: "Enfoque comunicativo",
    description:
      "Desde la primera clase trabajamos situaciones reales para desarrollar confianza y fluidez al hablar.",
  },
  {
    title: "Clases dinámicas y divertidas",
    description:
      "Aprender inglés puede ser entretenido gracias a actividades interactivas, conversación y trabajo grupal.",
  },
  {
    title: "Grupos reducidos",
    description:
      "Cada estudiante recibe atención personalizada y seguimiento constante durante el aprendizaje.",
  },
  {
    title: "Preparación Cambridge",
    description:
      "Nuestros programas siguen el sistema oficial Cambridge con evaluaciones escritas y orales.",
  },
];

const skills = [
  {
    icon: MessageSquare,
    label: "Oralidad",
  },
  {
    icon: Headphones,
    label: "Listening",
  },
  {
    icon: BookOpen,
    label: "Lectura",
  },
  {
    icon: Globe,
    label: "Comunicación real",
  },
];

export default function MethodologySection() {
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
          top-0
          right-0
          w-[500px]
          h-[500px]
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
          grid
          grid-cols-1
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
            NUESTRA METODOLOGÍA
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
            Aprender inglés
            <br />
            puede ser divertido
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
            En I.N.K Instituto de Inglés trabajamos con una metodología moderna,
            práctica y enfocada en la comunicación real. Nuestro objetivo es que
            cada estudiante pueda desenvolverse con seguridad en contextos
            sociales, académicos y profesionales.
          </p>

          {/* Items */}
          <div className="mt-14 space-y-10">
            {methodologyItems.map((item, index) => (
              <div
                key={index}
                className="
                  flex
                  items-start
                  gap-5
                "
              >
                {/* Icon */}
                <div
                  className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-green-100
                    flex
                    items-center
                    justify-center
                    shrink-0
                  "
                >
                  <CheckCircle2
                    className="
                      w-7
                      h-7
                      text-green-600
                    "
                  />
                </div>

                {/* Text */}
                <div>
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
                      mt-3
                      text-lg
                      text-gray-600
                      leading-relaxed
                    "
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Content */}
        <div
          className="
            relative
            flex
            justify-center
          "
        >
          {/* Main Card */}
          <div
            className="
              relative
              overflow-hidden
              bg-gradient-to-br
              from-blue-700
              via-blue-800
              to-blue-950
              rounded-[32px]
              p-10
              w-full
              max-w-xl
              shadow-2xl
              mt-50
            "
          >
            {/* Glow */}
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

            {/* Top */}
            <div className="relative z-10">
              <div
                className="
                  w-24
                  h-24
                  rounded-3xl
                  bg-white/10
                  backdrop-blur-sm
                  flex
                  items-center
                  justify-center
                  border
                  border-white/10
                "
              >
                <BookOpen
                  className="
                    w-12
                    h-12
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
                Inglés para la vida real
              </h3>

              <p
                className="
                  mt-6
                  text-white/80
                  text-lg
                  leading-relaxed
                "
              >
                Desarrollamos habilidades de conversación, comprensión,
                escritura y escucha mediante experiencias reales y clases
                participativas.
              </p>
            </div>

            {/* Skills */}
            <div
              className="
                mt-12
                grid
                grid-cols-2
                gap-4
                relative
                z-10
              "
            >
              {skills.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="
                      bg-white/10
                      border
                      border-white/10
                      backdrop-blur-sm
                      rounded-2xl
                      p-5
                    "
                  >
                    <Icon
                      className="
                        w-7
                        h-7
                        text-cyan-300
                      "
                    />

                    <p
                      className="
                        mt-4
                        text-white
                        font-medium
                      "
                    >
                      {item.label}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Bottom Stats */}
            <div
              className="
                mt-10
                pt-8
                border-t
                border-white/10
                flex
                items-center
                justify-between
                relative
                z-10
              "
            >
              <div>
                <h4 className="text-3xl font-bold text-white">+15</h4>

                <p className="text-white/70 text-sm">años enseñando</p>
              </div>

              <div>
                <h4 className="text-3xl font-bold text-white">Cambridge</h4>

                <p className="text-white/70 text-sm">programas oficiales</p>
              </div>

              <div>
                <h4 className="text-3xl font-bold text-white">Online</h4>

                <p className="text-white/70 text-sm">y presencial</p>
              </div>
            </div>
          </div>

          {/* Floating Card 
          <div
            className="
              hidden
              md:flex
              absolute
              -bottom-8
              -left-10
              bg-white
              rounded-3xl
              shadow-2xl
              p-6
              items-center
              gap-4
              border
              border-gray-100
            "
          >
            <div
              className="
                w-14
                h-14
                rounded-2xl
                bg-blue-100
                flex
                items-center
                justify-center
              "
            >
              <Users
                className="
                  w-7
                  h-7
                  text-blue-700
                "
              />
            </div>

            <div>
              <h4 className="font-semibold text-gray-900">Grupos reducidos</h4>

              <p className="text-gray-500 text-sm">Atención personalizada</p>
            </div>
          </div> +*/}
        </div>
      </div>
    </section>
  );
}
