import {
  Award,
  FileCheck,
  GraduationCap,
  Globe,
  CheckCircle2,
} from "lucide-react";

const benefits = [
  "Exámenes escritos y orales supervisados por evaluadores Cambridge",
  "Certificaciones oficiales reconocidas internacionalmente",
  "Preparación integral durante todo el año",
  "Seguimiento personalizado para cada estudiante",
];

export default function CambridgeSection() {
  return (
    <section
      id="cambridge"
      className="
        relative
        overflow-hidden
        bg-white
        py-28
      "
    >
      {/* Background Glow */}
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
            CERTIFICACIONES CAMBRIDGE
          </div>

          {/* Title */}
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
            Preparación oficial
            <br />
            Cambridge
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
            En I.N.K Instituto de Inglés trabajamos con programas oficiales
            Cambridge y acompañamos a nuestros estudiantes en cada etapa de su
            formación académica.
          </p>

          <p
            className="
              mt-6
              text-lg
              text-gray-600
              leading-relaxed
            "
          >
            Actualmente los exámenes se realizan directamente en nuestra sede,
            permitiendo a los alumnos rendir sus evaluaciones escritas y orales
            en un entorno cómodo, profesional y supervisado por profesores
            altamente calificados.
          </p>

          {/* Benefits */}
          <div className="mt-12 space-y-6">
            {benefits.map((item, index) => (
              <div
                key={index}
                className="
                  flex
                  items-start
                  gap-4
                "
              >
                <div
                  className="
                    w-10
                    h-10
                    rounded-xl
                    bg-green-100
                    flex
                    items-center
                    justify-center
                    shrink-0
                  "
                >
                  <CheckCircle2
                    className="
                      w-5
                      h-5
                      text-green-600
                    "
                  />
                </div>

                <p
                  className="
                    text-lg
                    text-gray-700
                    leading-relaxed
                  "
                >
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Content */}
        <div className="relative">
          {/* Main Card */}
          <div
            className="
              relative
              overflow-hidden
              rounded-[36px]
              bg-gradient-to-br
              from-blue-700
              via-blue-800
              to-blue-950
              p-10
              shadow-2xl
            "
          >
            {/* Glow */}
            <div
              className="
                absolute
                top-0
                right-0
                w-56
                h-56
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
                  border
                  border-white/10
                  backdrop-blur-sm
                  flex
                  items-center
                  justify-center
                "
              >
                <Award
                  className="
                    w-12
                    h-12
                    text-yellow-300
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
                Certificaciones
                <br />
                internacionales
              </h3>

              <p
                className="
                  mt-6
                  text-white/80
                  text-lg
                  leading-relaxed
                "
              >
                Nuestros estudiantes obtienen certificaciones reconocidas
                mundialmente que validan su nivel de inglés para estudios,
                trabajo y oportunidades internacionales.
              </p>
            </div>

            {/* Cards */}
            <div
              className="
                mt-12
                grid
                grid-cols-1
                sm:grid-cols-2
                gap-4
                relative
                z-10
              "
            >
              {/* Card */}
              <div
                className="
                  bg-white/10
                  border
                  border-white/10
                  backdrop-blur-sm
                  rounded-2xl
                  p-5
                "
              >
                <GraduationCap
                  className="
                    w-8
                    h-8
                    text-cyan-300
                  "
                />

                <h4
                  className="
                    mt-4
                    text-white
                    text-lg
                    font-semibold
                  "
                >
                  Evaluaciones Oficiales
                </h4>

                <p
                  className="
                    mt-2
                    text-white/70
                    text-sm
                    leading-relaxed
                  "
                >
                  Exámenes escritos y orales siguiendo estándares
                  internacionales.
                </p>
              </div>

              {/* Card */}
              <div
                className="
                  bg-white/10
                  border
                  border-white/10
                  backdrop-blur-sm
                  rounded-2xl
                  p-5
                "
              >
                <FileCheck
                  className="
                    w-8
                    h-8
                    text-cyan-300
                  "
                />

                <h4
                  className="
                    mt-4
                    text-white
                    text-lg
                    font-semibold
                  "
                >
                  Certificación
                </h4>

                <p
                  className="
                    mt-2
                    text-white/70
                    text-sm
                    leading-relaxed
                  "
                >
                  Cada alumno recibe su certificación correspondiente al nivel
                  aprobado.
                </p>
              </div>

              {/* Card */}
              <div
                className="
                  bg-white/10
                  border
                  border-white/10
                  backdrop-blur-sm
                  rounded-2xl
                  p-5
                "
              >
                <Globe
                  className="
                    w-8
                    h-8
                    text-cyan-300
                  "
                />

                <h4
                  className="
                    mt-4
                    text-white
                    text-lg
                    font-semibold
                  "
                >
                  Reconocimiento Mundial
                </h4>

                <p
                  className="
                    mt-2
                    text-white/70
                    text-sm
                    leading-relaxed
                  "
                >
                  Certificados válidos para ámbitos académicos y profesionales
                  internacionales.
                </p>
              </div>

              {/* Card */}
              <div
                className="
                  bg-white/10
                  border
                  border-white/10
                  backdrop-blur-sm
                  rounded-2xl
                  p-5
                "
              >
                <Award
                  className="
                    w-8
                    h-8
                    text-cyan-300
                  "
                />

                <h4
                  className="
                    mt-4
                    text-white
                    text-lg
                    font-semibold
                  "
                >
                  Preparación Completa
                </h4>

                <p
                  className="
                    mt-2
                    text-white/70
                    text-sm
                    leading-relaxed
                  "
                >
                  Entrenamiento continuo para alcanzar seguridad, fluidez y
                  precisión.
                </p>
              </div>
            </div>

            {/* Bottom */}
            <div
              className="
                mt-10
                pt-8
                border-t
                border-white/10
                relative
                z-10
                flex
                items-center
                justify-between
              "
            >
              <div>
                <h4
                  className="
                    text-3xl
                    font-bold
                    text-white
                  "
                >
                  Cambridge
                </h4>

                <p
                  className="
                    text-white/70
                    text-sm
                  "
                >
                  Programa oficial
                </p>
              </div>

              <div>
                <h4
                  className="
                    text-3xl
                    font-bold
                    text-white
                  "
                >
                  Internacional
                </h4>

                <p
                  className="
                    text-white/70
                    text-sm
                  "
                >
                  Reconocimiento global
                </p>
              </div>
            </div>
          </div>

          {/* Floating Badge */}
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
                bg-yellow-100
                flex
                items-center
                justify-center
              "
            >
              <Award
                className="
                  w-7
                  h-7
                  text-yellow-600
                "
              />
            </div>

            <div>
              <h4 className="font-semibold text-gray-900">
                Certificación oficial
              </h4>

              <p className="text-gray-500 text-sm">
                Aval internacional Cambridge
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
