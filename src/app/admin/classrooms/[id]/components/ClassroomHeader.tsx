import Link from "next/link";
import { ArrowLeft, Pencil, Users } from "lucide-react";

type Props = {
  classroom: {
    id: string;
    nombre: string;
    nivel: string;
    modalidad: string;
    horario: string;
    profesor_id: string;
    profesor_nombre: string;
    profesor_apellido: string;
    studentsCount: number;
  };
};

export default function ClassroomHeader({ classroom }: Props) {
  return (
    <section
      className="
        
        overflow-hidden
        bg-gradient-to-r
        from-slate-950
        via-blue-950
        to-cyan-900
        text-white
      "
    >
      <div className="p-8 md:p-10">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold">{classroom.nombre}</h1>

            <div className="mt-5 space-y-2 text-slate-300">
              <p>Nivel: {classroom.nivel}</p>
              <p>Modalidad: {classroom.modalidad}</p>
              <p>Horario: {classroom.horario}</p>
              <p>
                Profesor: {classroom.profesor_nombre}{" "}
                {classroom.profesor_apellido}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              href="/admin/classrooms"
              className="
                h-12
                px-5
                rounded-2xl
                bg-white/10
                flex
                items-center
                gap-2
              "
            >
              <ArrowLeft size={18} />
              Volver
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
