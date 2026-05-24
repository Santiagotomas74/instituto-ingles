import {
  GraduationCap,
  Calendar,
  User,
  BookOpen,
  ClipboardCheck,
} from "lucide-react";

import ConfirmacionBoletin from "./ConfirmacionBoletin";
import Footer from "../../../components/footer/Footer";

type Props = {
  params: Promise<{
    dni: string;
  }>;
};

export default async function StudentBoletinPage({ params }: Props) {
  const { dni } = await params;
  const res = await fetch(`${process.env.BACKEND_URL}/api/boletines/${dni}`, {
    cache: "no-store",
  });
  const data = await res.json();

  if (!data.success) {
    return (
      <main
        className="
          min-h-screen
          bg-slate-950
          flex
          items-center
          justify-center
          text-white
        "
      >
        No se encontró el boletín.
      </main>
    );
  }

  const boletin = data.boletin;

  return (
    <>
      <main
        className="
    min-h-screen
    bg-gradient-to-br
    from-slate-100
    via-white
    to-blue-50
    py-6
    px-0
  "
      >
        <div
          className="
      w-full
      bg-white
      shadow-2xl
      overflow-hidden
      border-y
      border-gray-200
    
    "
        >
          {/* Header */}
          <div
            className="
            bg-gradient-to-r
            from-blue-700
            to-cyan-600
            text-white
            px-8
            py-10
            relative
          "
          >
            <div
              className="
              absolute
              inset-0
              bg-[url('/noise.png')]
              opacity-10
            "
            />

            <div className="relative z-10">
              <div
                className="
    flex
    flex-col
    md:flex-row
    items-center
    md:items-start
    justify-between
    gap-6
    text-center
    md:text-left
  "
              >
                <div>
                  <p className="uppercase tracking-[4px] text-cyan-100 text-sm">
                    Instituto de Inglés I.N.K
                  </p>

                  <h1
                    className="
                    mt-3
                    text-4xl
                    md:text-5xl
                    font-bold
                  "
                  >
                    Boletín Académico
                  </h1>

                  <p className="mt-4 text-blue-100">
                    Documento académico oficial
                  </p>
                </div>

                <img
                  src="/logo3.png"
                  alt="Logo"
                  className="
                  h-24
                  md:h-32
                  w-auto
                  object-contain
                  mx-auto
                  md:mx-0
                "
                />
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-8 md:p-12">
            {/* Student Info */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-blue-100
                  text-blue-700
                  flex
                  items-center
                  justify-center
                "
                >
                  <User className="w-6 h-6" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Información del estudiante
                  </h2>

                  <p className="text-gray-500">Datos personales y académicos</p>
                </div>
              </div>

              <div
                className="
    grid
    grid-cols-1
    sm:grid-cols-2
    xl:grid-cols-4
    gap-5
  "
              >
                <InfoCard
                  title="Alumno"
                  value={`${boletin.estudiante_nombre} ${boletin.estudiante_apellido}`}
                />

                {/* <InfoCard title="DNI" value={String(boletin.dni)} /> */}

                <InfoCard title="Level" value={boletin.nivel} />

                <InfoCard title="Year" value={String(boletin.anio)} />

                <InfoCard
                  title="Teacher"
                  value={`${boletin.profesor_nombre} ${boletin.profesor_apellido}`}
                />

                {/* Attendance
              <InfoCard title="Ausentes" value={String(boletin.ausentes)} />

              <InfoCard title="Promedio" value={String(boletin.promedio)} /> */}
              </div>
            </section>

            {/* Grades */}
            <section className="mt-14">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-cyan-100
                  text-cyan-700
                  flex
                  items-center
                  justify-center
                "
                >
                  <GraduationCap className="w-6 h-6" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Calificaciones
                  </h2>

                  <p className="text-gray-500">
                    Rendimiento académico del alumno
                  </p>
                </div>
              </div>

              <div
                className="
                grid
                grid-cols-2
                md:grid-cols-4
                gap-6
              "
              >
                <GradeCard
                  title="Nota 1"
                  value={boletin.nota_1}
                  ausentes={boletin.ausentes}
                />

                <GradeCard
                  title="Nota 2"
                  value={boletin.nota_2}
                  ausentes={boletin.ausentes_2}
                />

                <GradeCard
                  title="Nota 3"
                  value={boletin.nota_3}
                  ausentes={boletin.ausentes_3}
                />

                <GradeCard
                  title="Promedio"
                  value={boletin.promedio}
                  ausentes={boletin.ausentes_promedio}
                />
              </div>
            </section>

            {/* Behaviour */}
            <section className="mt-14">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-purple-100
                  text-purple-700
                  flex
                  items-center
                  justify-center
                "
                >
                  <ClipboardCheck className="w-6 h-6" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Behaviour
                  </h2>

                  <p className="text-gray-500">Seguimiento conductual</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-5">
                <BehaviourCard
                  title="Primer trimestre"
                  value={boletin.behaviour_1}
                />

                <BehaviourCard
                  title="Segundo trimestre"
                  value={boletin.behaviour_2}
                />

                <BehaviourCard
                  title="Tercer trimestre"
                  value={boletin.behaviour_3}
                />

                <BehaviourCard
                  title="Comportamiento final"
                  value={boletin.behaviour_final}
                />
              </div>
            </section>

            {/* Observations */}
            <section className="mt-14">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-orange-100
                  text-orange-700
                  flex
                  items-center
                  justify-center
                "
                >
                  <BookOpen className="w-6 h-6" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Observaciones
                  </h2>

                  <p className="text-gray-500">Comentarios académicos</p>
                </div>
              </div>

              <div className="space-y-5">
                <ObservationCard
                  title="Observación 1"
                  value={boletin.observaciones_1}
                />

                <ObservationCard
                  title="Observación 2"
                  value={boletin.observaciones_2}
                />

                <ObservationCard
                  title="Observación 3"
                  value={boletin.observaciones_3}
                />
                <ObservationCard
                  title="Observación final"
                  value={boletin.observaciones_final}
                />
              </div>
            </section>

            {/* Signatures */}
            <section className="mt-16">
              <div
                className="
                grid
                md:grid-cols-2
                gap-10
                bg-gray-50
              "
              >
                <SignatureCard
                  title="Firma del profesor"
                  image={boletin.firma_teacher}
                />

                <SignatureCard
                  title="Firma del coordinador"
                  image={boletin.firma_coordinator}
                />
              </div>
            </section>
            <ConfirmacionBoletin
              boletinId={boletin.id}
              esMayorEdad={boletin.es_mayor_edad}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

/* COMPONENTS */

function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <div
      className="
        bg-gray-50
        border
        border-gray-100
        rounded-3xl
        p-5
      "
    >
      <p className="text-sm text-gray-500 mb-2">{title}</p>

      <h3 className="text-lg font-semibold text-gray-900">{value}</h3>
    </div>
  );
}

function GradeCard({
  title,
  value,
  ausentes,
}: {
  title: string;
  value: number;
  ausentes: number;
}) {
  return (
    <div
      className="
        rounded-3xl
        overflow-hidden
        shadow-xl
        border
        border-blue-200
      "
    >
      {/* Top */}
      <div
        className="
          bg-gradient-to-br
          from-blue-600
          to-cyan-500
          text-white
          p-8
          text-center
        "
      >
        <p className="text-blue-100">{title}</p>

        <div className="text-5xl font-bold mt-4">{value}</div>
      </div>

      {/* Bottom */}
      <div
        className="
          bg-white
          px-6
          py-4
          flex
          items-center
          justify-between
        "
      >
        <span className="text-gray-500 font-medium">Ausentes</span>

        <span
          className="
            text-lg
            font-bold
            text-red-500
          "
        >
          {ausentes}
        </span>
      </div>
    </div>
  );
}

function BehaviourCard({ title, value }: { title: string; value: string }) {
  return (
    <div
      className="
        bg-purple-50
        border
        border-purple-100
        rounded-3xl
        p-6
      "
    >
      <p className="text-sm text-purple-700 mb-3 font-medium">{title}</p>

      <p className="text-gray-700 leading-relaxed">{value}</p>
    </div>
  );
}

function ObservationCard({ title, value }: { title: string; value: string }) {
  return (
    <div
      className="
        bg-orange-50
        border
        border-orange-100
        rounded-3xl
        p-6
      "
    >
      <h3 className="font-semibold text-orange-900 mb-3">{title}</h3>

      <p className="text-gray-700 leading-relaxed">{value}</p>
    </div>
  );
}

function SignatureCard({ title, image }: { title: string; image: string }) {
  return (
    <div
      className="
        border-b
        border-gray-200
        text-center
      "
    >
      <img
        src={image}
        alt={title}
        className="
          h-100
          object-contain
          mx-auto
        "
      />

      <p className="mt-[-6rem] text-gray-700 font-medium">{title}</p>
    </div>
  );
}
