import { GraduationCap, Globe, Award, Users } from "lucide-react";

const teachers = [
  {
    name: "Jazmín Trindade",
    role: "Profesora de Inglés",
  },
  {
    name: "Julieta Mendoza",
    role: "Profesora de Inglés",
  },
  {
    name: "Abril Landaida",
    role: "Profesora de Inglés",
  },
  {
    name: "Sofía Salinas",
    role: "Profesora de Inglés",
  },
  {
    name: "Marcela Barberan",
    role: "Coordinadora & Profesora",
  },
];

export default function TeachersSection() {
  return (
    <section
      id="teachers"
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
          left-0
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
            NUESTRO EQUIPO
          </div>

          <h2
            className="
              text-5xl
              md:text-6xl
              font-semibold
              text-gray-900
              leading-tight
              tracking-tight
            "
          >
            Profesores apasionados
            <br />
            por la enseñanza
          </h2>

          <p
            className="
              mt-8
              text-xl
              text-gray-600
              leading-relaxed
            "
          >
            Contamos con un equipo docente comprometido con el aprendizaje, la
            motivación y el crecimiento académico de cada estudiante.
          </p>
        </div>

        {/* Teachers Grid */}
        <div
          className="
            mt-20
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-3
            gap-8
          "
        >
          {teachers.map((teacher, index) => (
            <div
              key={index}
              className="
                group
                bg-[#f8fafc]
                rounded-[30px]
                p-8
                border
                border-gray-100
                hover:shadow-2xl
                hover:-translate-y-2
                transition-all
                duration-500
              "
            >
              {/* Avatar */}
              <div
                className="
                  w-24
                  h-24
                  rounded-3xl
                  bg-gradient-to-br
                  from-yellow-300
                  to-yellow-500
                  flex
                  items-center
                  justify-center
                  text-white
                  text-3xl
                  font-semibold
                  shadow-lg
                "
              >
                {teacher.name.charAt(0)}
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
                  {teacher.name}
                </h3>

                <p
                  className="
                    mt-3
                    text-blue-700
                    text-lg
                    font-medium
                  "
                >
                  {teacher.role}
                </p>

                <p
                  className="
                    mt-5
                    text-gray-600
                    leading-relaxed
                    text-lg
                  "
                >
                  Formación académica y experiencia en enseñanza del idioma
                  inglés para diferentes edades y niveles.
                </p>
              </div>

              {/* Icons */}
              <div
                className="
                  mt-8
                  flex
                  items-center
                  gap-4
                "
              >
                <div
                  className="
                    w-12
                    h-12
                    rounded-xl
                    bg-white
                    border
                    border-gray-100
                    flex
                    items-center
                    justify-center
                  "
                >
                  <GraduationCap
                    className="
                      w-6
                      h-6
                      text-blue-700
                    "
                  />
                </div>

                <div
                  className="
                    w-12
                    h-12
                    rounded-xl
                    bg-white
                    border
                    border-gray-100
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Globe
                    className="
                      w-6
                      h-6
                      text-blue-700
                    "
                  />
                </div>

                <div
                  className="
                    w-12
                    h-12
                    rounded-xl
                    bg-white
                    border
                    border-gray-100
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Award
                    className="
                      w-6
                      h-6
                      text-blue-700
                    "
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Card */}
        <div
          className="
            mt-24
            bg-gradient-to-r
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
              right-0
              top-0
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
                <Users
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
                Un equipo comprometido
                <br />
                con tu crecimiento
              </h3>

              <p
                className="
                  mt-6
                  text-white/80
                  text-lg
                  leading-relaxed
                "
              >
                Nuestros docentes acompañan a cada estudiante para desarrollar
                confianza, comunicación y seguridad en inglés.
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
                +15
              </h4>

              <p
                className="
                  mt-2
                  text-white/80
                  text-lg
                "
              >
                años formando estudiantes
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
