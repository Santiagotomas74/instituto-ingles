import { Star, Quote, MessageCircle } from "lucide-react";

const testimonials = [
  {
    name: "Lucía Fernández",
    role: "Estudiante",
    text: "Las clases son súper dinámicas y divertidas. Perdí el miedo a hablar en inglés y mejoré muchísimo mi pronunciación.",
  },
  {
    name: "Martín Gómez",
    role: "Alumno Cambridge",
    text: "Gracias al acompañamiento de los profesores pude rendir mi examen Cambridge con mucha seguridad.",
  },
  {
    name: "Carolina Ruiz",
    role: "Madre de alumna",
    text: "Mi hija comenzó desde pequeña y realmente disfruta cada clase. El ambiente es excelente y muy profesional.",
  },
];

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
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
          right-0
          top-0
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
            TESTIMONIOS
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
            Lo que dicen
            <br />
            nuestros estudiantes
          </h2>

          <p
            className="
              mt-8
              text-xl
              text-gray-600
              leading-relaxed
            "
          >
            Experiencias reales de estudiantes y familias que forman parte de
            I.N.K Instituto de Inglés.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div
          className="
            mt-20
            grid
            grid-cols-1
            lg:grid-cols-3
            gap-8
          "
        >
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="
                relative
                bg-[#f8fafc]
                rounded-[32px]
                p-10
                border
                border-gray-100
                hover:shadow-2xl
                hover:-translate-y-2
                transition-all
                duration-500
              "
            >
              {/* Quote Icon */}
              <div
                className="
                  w-16
                  h-16
                  rounded-2xl
                  bg-blue-100
                  flex
                  items-center
                  justify-center
                "
              >
                <Quote
                  className="
                    w-8
                    h-8
                    text-blue-700
                  "
                />
              </div>

              {/* Stars */}
              <div className="flex items-center gap-1 mt-8">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="
                      w-5
                      h-5
                      fill-yellow-400
                      text-yellow-400
                    "
                  />
                ))}
              </div>

              {/* Text */}
              <p
                className="
                  mt-8
                  text-gray-700
                  text-lg
                  leading-relaxed
                "
              >
                “{item.text}”
              </p>

              {/* User */}
              <div
                className="
                  mt-10
                  flex
                  items-center
                  gap-4
                "
              >
                <div
                  className="
                    w-16
                    h-16
                    rounded-2xl
                    bg-gradient-to-br
                    from-blue-600
                    to-blue-900
                    flex
                    items-center
                    justify-center
                    text-white
                    text-xl
                    font-semibold
                    shrink-0
                  "
                >
                  {item.name.charAt(0)}
                </div>

                <div>
                  <h4
                    className="
                      text-xl
                      font-semibold
                      text-gray-900
                    "
                  >
                    {item.name}
                  </h4>

                  <p
                    className="
                      mt-1
                      text-gray-500
                    "
                  >
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div
          className="
            mt-24
            relative
            overflow-hidden
            rounded-[36px]
            bg-gradient-to-r
            from-blue-700
            via-blue-800
            to-blue-950
            p-12
            shadow-2xl
          "
        >
          {/* Glow */}
          <div
            className="
              absolute
              top-0
              right-0
              w-72
              h-72
              rounded-full
              bg-cyan-300/20
              blur-3xl
            "
          />

          <div
            className="
              relative
              z-10
              flex
              flex-col
              lg:flex-row
              items-start
              lg:items-center
              justify-between
              gap-10
            "
          >
            {/* Left */}
            <div className="max-w-3xl">
              <div
                className="
                  w-20
                  h-20
                  rounded-3xl
                  bg-white/10
                  border
                  border-white/10
                  backdrop-blur-sm
                  flex
                  items-center
                  justify-center
                "
              >
                <MessageCircle
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
                  md:text-5xl
                  font-semibold
                  text-white
                  leading-tight
                "
              >
                Aprender inglés
                <br />
                transforma oportunidades
              </h3>

              <p
                className="
                  mt-6
                  text-white/80
                  text-lg
                  leading-relaxed
                "
              >
                Cada estudiante vive una experiencia única de aprendizaje
                acompañada por un equipo comprometido y cercano.
              </p>
            </div>

            {/* Right */}
            <div
              className="
                bg-white/10
                border
                border-white/10
                backdrop-blur-sm
                rounded-3xl
                px-10
                py-8
              "
            >
              <h4
                className="
                  text-5xl
                  font-bold
                  text-white
                "
              >
                4,8★
              </h4>

              <p
                className="
                  mt-2
                  text-white/80
                  text-lg
                "
              >
                Experiencias positivas
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
