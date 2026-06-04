"use client";
const levels = [
  {
    level: "Kids",
    duration: "Desde 4 años",
    title: "Niños",
    description:
      "Clases dinámicas y divertidas para aprender inglés jugando, comunicándose y desarrollando confianza desde pequeños.",
    color: "from-pink-500 to-rose-500",

    details: {
      subtitle: "Aprendizaje temprano con metodología Cambridge",
      content: `
• Pre Kinder: niños de 4 y 5 años.

• Kinder A: alumnos que cursan 1° grado.

• Kinder B: alumnos que cursan 2° grado.

Durante esta etapa el aprendizaje se realiza de forma activa y didáctica mediante canciones, juegos, actividades orales y materiales especialmente diseñados para su edad.

Las actividades incluyen:
- Identificación de imágenes y palabras.
- Juegos interactivos.
- Actividades de unir, pegar y relacionar.
- Expresión oral guiada.

Los alumnos rinden una evaluación final oral en un entorno habitual de clase. La evaluación es observada por un docente especializado del Instituto Cambridge, quien determina la calificación final.

Además, todos los años participan de salidas educativas y obras de teatro en inglés que complementan su aprendizaje.
      `,
    },
  },

  {
    level: "Teens",
    duration: "Programa Cambridge",
    title: "Adolescentes",
    description:
      "Cursos orientados al desarrollo académico, conversación y preparación para certificaciones internacionales.",
    color: "from-blue-500 to-cyan-500",

    details: {
      subtitle: "Preparación académica y certificaciones",
      content: `
Los cursos para adolescentes fortalecen la comunicación oral, la comprensión auditiva, lectura y escritura.

Se trabaja con programas alineados a Cambridge y se prepara progresivamente a los alumnos para rendir certificaciones internacionales.

Incluye:
- Conversación.
- Gramática aplicada.
- Comprensión lectora.
- Producción escrita.
- Preparación para exámenes.
      `,
    },
  },

  {
    level: "Adults",
    duration: "Flexible",
    title: "Adultos",
    description:
      "Aprendé inglés para viajar, trabajar o desenvolverte profesionalmente en situaciones reales.",
    color: "from-indigo-500 to-blue-700",

    details: {
      subtitle: "Inglés para objetivos reales",
      content: `
Programas orientados a adultos que desean mejorar su nivel para viajar, trabajar o desarrollarse profesionalmente.

Las clases priorizan la comunicación práctica y situaciones reales.
      `,
    },
  },

  {
    level: "Speaking",
    duration: "Conversación",
    title: "Cursos Orales",
    description:
      "Mejorá tu fluidez, pronunciación y comprensión auditiva con clases enfocadas en speaking real.",
    color: "from-emerald-500 to-teal-600",

    details: {
      subtitle: "Fluidez y confianza",
      content: `
Cursos enfocados en la producción oral, pronunciación y comprensión auditiva.

Ideales para quienes desean soltarse al hablar inglés en contextos reales.
      `,
    },
  },

  {
    level: "Professional",
    duration: "Especializado",
    title: "Inglés Profesional",
    description:
      "Cursos orientados a ingeniería, medicina, azafatas y otras áreas profesionales específicas.",
    color: "from-violet-500 to-purple-600",

    details: {
      subtitle: "Especialización profesional",
      content: `
Programas adaptados a diferentes áreas laborales y profesionales.

Incluye vocabulario técnico, situaciones laborales reales y preparación para entornos internacionales.
      `,
    },
  },

  {
    level: "Cambridge",
    duration: "Certificación",
    title: "Exámenes Cambridge",
    description:
      "Preparación oficial para certificaciones Cambridge con evaluaciones realizadas en nuestra sede.",
    color: "from-amber-500 to-orange-500",

    details: {
      subtitle: "Certificaciones internacionales",
      content: `
Preparación oficial para rendir exámenes Cambridge.

Los alumnos desarrollan las cuatro habilidades fundamentales:
- Reading
- Writing
- Listening
- Speaking

Contamos con experiencia en preparación y acompañamiento durante todo el proceso de certificación.
      `,
    },
  },
];

import { useState } from "react";

import LevelModal from "./LevelModal";

export default function LevelsSection() {
  const [selectedLevel, setSelectedLevel] = useState<any>(null);

  return (
    <>
      <section
        id="levels"
        className="
          relative
          overflow-hidden
          bg-[#f7f9fc]
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
            bg-blue-100
            rounded-full
            blur-3xl
            opacity-30
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
          {/* Header */}
          <div className="text-center mb-20">
            <span
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
                mb-6
              "
            >
              PROGRAMAS ACADÉMICOS
            </span>

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
              Cursos para cada etapa
              <br />
              de tu aprendizaje
            </h2>

            <p
              className="
                mt-6
                text-xl
                text-gray-600
                max-w-3xl
                mx-auto
                leading-relaxed
              "
            >
              En I.N.K Instituto de Inglés en San Miguel ofrecemos programas
              modernos, dinámicos y adaptados a todas las edades y objetivos.
            </p>
          </div>

          {/* Cards */}
          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              xl:grid-cols-3
              gap-8
            "
          >
            {levels.map((item) => (
              <div
                key={item.title}
                className="
                  group
                  relative
                  overflow-hidden
                  bg-white
                  rounded-3xl
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
                {/* Glow */}
                <div
                  className={`
                    absolute
                    top-0
                    right-0
                    w-40
                    h-40
                    rounded-full
                    blur-3xl
                    opacity-10
                    bg-gradient-to-br
                    ${item.color}
                  `}
                />

                {/* Badge */}
                <div className="flex items-center justify-between">
                  <div
                    className={`
                      bg-gradient-to-r
                      ${item.color}
                      text-white
                      font-semibold
                      px-5
                      py-3
                      rounded-2xl
                      text-sm
                      shadow-lg
                    `}
                  >
                    {item.level}
                  </div>

                  <span className="text-gray-500 text-sm font-medium">
                    {item.duration}
                  </span>
                </div>

                {/* Content */}
                <div className="mt-10 relative z-10">
                  <h3
                    className="
                      text-3xl
                      font-semibold
                      text-gray-900
                      tracking-tight
                    "
                  >
                    {item.title}
                  </h3>

                  <p
                    className="
                      mt-5
                      text-gray-600
                      text-[17px]
                      leading-relaxed
                    "
                  >
                    {item.description}
                  </p>
                </div>

                {/* Button */}
                <div className="mt-10">
                  <button
                    onClick={() => setSelectedLevel(item)}
                    className={`
                      w-full
                      py-4
                      rounded-2xl
                      text-white
                      font-medium
                      bg-gradient-to-r
                      ${item.color}
                      hover:scale-[1.02]
                      transition-all
                      duration-300
                      shadow-lg
                    `}
                  >
                    Ver programa
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedLevel && (
        <LevelModal
          level={selectedLevel}
          onClose={() => setSelectedLevel(null)}
        />
      )}
    </>
  );
}
