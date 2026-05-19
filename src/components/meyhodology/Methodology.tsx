import { CheckCircle2, BookOpen } from "lucide-react";

const methodologyItems = [
  {
    title: "Enfoque comunicativo",
    description:
      "Practicarás el idioma desde el primer día con situaciones reales",
  },
  {
    title: "Plataforma digital integrada",
    description:
      "Accede a materiales, videos y ejercicios desde cualquier dispositivo",
  },
  {
    title: "Profesores certificados",
    description:
      "Equipo docente con certificaciones internacionales y años de experiencia",
  },
  {
    title: "Seguimiento personalizado",
    description: "Evaluaciones continuas y retroalimentación constante",
  },
];

export default function MethodologySection() {
  return (
    <section className="bg-[#f8f9fb] py-24">
      <div
        className="
          max-w-7xl
          mx-auto
          px-6
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-16
          items-center
        "
      >
        {/* Left Content */}
        <div>
          <h2
            className="
              text-5xl
              font-semibold
              text-gray-900
              tracking-tight
            "
          >
            Nuestra Metodología
          </h2>

          <div className="mt-12 space-y-10">
            {methodologyItems.map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                {/* Icon */}
                <div
                  className="
                    mt-1
                    flex
                    items-center
                    justify-center
                  "
                >
                  <CheckCircle2
                    className="
                      w-7
                      h-7
                      text-green-500
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
                      mt-2
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

        {/* Right Card */}
        <div
          className="
            bg-gray-100
            rounded-3xl
            h-[420px]
            flex
            items-center
            justify-center
            shadow-inner
          "
        >
          <div
            className="
              w-32
              h-32
              rounded-3xl
              bg-white
              flex
              items-center
              justify-center
              shadow-lg
            "
          >
            <BookOpen
              className="
                w-16
                h-16
                text-blue-600
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
}
