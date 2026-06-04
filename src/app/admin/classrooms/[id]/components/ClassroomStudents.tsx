type Student = {
  id: string;
  nombre: string;
  apellido: string;
  status: string;
  email?: string;
  nivel?: string;
};

type Props = {
  students: Student[];
};

export default function ClassroomStudents({ students }: Props) {
  return (
    <section>
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Alumnos</h2>

      <div
        className="
          bg-white
          rounded-[28px]
          overflow-hidden
          shadow-lg
        "
      >
        {students.length === 0 ? (
          <div className="p-10 text-center">
            <h3 className="text-lg font-semibold text-slate-800">
              No hay alumnos asignados
            </h3>

            <p className="text-slate-500 mt-2">
              Esta classroom todavía no tiene estudiantes.
            </p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                <th className="p-4 text-left text-gray-900">Alumno</th>

                <th className="p-4 text-left text-gray-900">Estado</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="border-t border-slate-100">
                  <td className="p-4">
                    <div>
                      <p className="font-medium text-slate-900">
                        {student.nombre} {student.apellido}
                      </p>
                    </div>
                  </td>

                  <td className="p-4">
                    <span
                      className={`
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-medium
                        ${
                          student.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }
                      `}
                    >
                      {student.status === "active" ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
