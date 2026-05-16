import { Users, Clock3, BadgeCheck, BookOpen } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Clases en grupos reducidos",
    description: "Máximo 12 estudiantes por aula",
  },
  {
    icon: Clock3,
    title: "Horarios flexibles",
    description: "Mañana, tarde y noche",
  },
  {
    icon: BadgeCheck,
    title: "Certificación internacional",
    description: "Alineados con Marco Común Europeo",
  },
  {
    icon: BookOpen,
    title: "Material actualizado",
    description: "Contenido digital y libros premium",
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-[#ffffff] py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-4
            gap-6
          "
        >
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="
                  bg-white
                  border
                  border-gray-200
                  rounded-2xl
                  p-8
                  hover:shadow-xl
                  hover:-translate-y-1
                  transition-all
                  duration-300
                "
              >
                {/* Icon */}
                <div
                  className="
                    w-14
                    h-14
                    rounded-xl
                    bg-blue-50
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Icon className="w-7 h-7 text-blue-600" />
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
                      mt-3
                      text-gray-600
                      text-lg
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
    </section>
  );
}
