import EditStudentForm from "./EditStudentForm";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditStudentPage({ params }: Props) {
  const { id } = await params;

  const res = await fetch(
    `${process.env.BACKEND_URL}/api/admin/students/${id}`,
    {
      cache: "no-store",
    },
  );

  const data = await res.json();

  const student = data.student;

  return (
    <main
      className="
        min-h-screen
        bg-gradient-to-br
        from-slate-100
        via-white
        to-cyan-50
        p-6
        md:p-10
      "
    >
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="mb-10">
          <p className="text-blue-600 font-medium">Administración académica</p>

          <h1
            className="
              text-4xl
              font-bold
              text-slate-900
              mt-2
            "
          >
            Editar estudiante
          </h1>

          <p className="text-slate-500 mt-3">
            Modificá la información del alumno.
          </p>
        </div>

        {/* CARD */}
        <div
          className="
            bg-white
            rounded-[32px]
            shadow-2xl
            border
            border-slate-200
            overflow-hidden
          "
        >
          {/* TOP */}
          <div
            className="
              bg-gradient-to-r
              from-blue-700
              to-cyan-600
              p-8
              text-white
            "
          >
            <div className="flex items-center gap-5">
              <div
                className="
                  w-20
                  h-20
                  rounded-3xl
                  bg-white/15
                  flex
                  items-center
                  justify-center
                  text-3xl
                  font-bold
                "
              >
                {student.nombre[0]}
              </div>

              <div>
                <h2 className="text-3xl font-bold">
                  {student.nombre} {student.apellido}
                </h2>

                <p className="text-cyan-100 mt-2">DNI: {student.dni}</p>
              </div>
            </div>
          </div>

          {/* FORM */}
          <div className="p-8 md:p-10">
            <EditStudentForm student={student} />
          </div>
        </div>
      </div>
    </main>
  );
}
