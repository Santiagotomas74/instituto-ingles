import { Plus } from "lucide-react";

export default function ClassroomAssignments() {
  const assignments = [
    {
      id: 1,
      title: "Homework Unit 5",
      deadline: "15/06/2026",
      status: "Activa",
    },
  ];

  return (
    <section>
      <div className="flex justify-between mb-6">
        <h2 className="text-3xl font-bold">Tareas</h2>

        <button
          className="
            h-12
            px-5
            rounded-2xl
            bg-cyan-500
            text-white
            flex
            items-center
            gap-2
          "
        >
          <Plus size={18} />
          Crear tarea
        </button>
      </div>

      <div className="grid gap-6">
        {assignments.map((assignment) => (
          <div
            key={assignment.id}
            className="
              bg-white
              rounded-[28px]
              p-6
              shadow-lg
            "
          >
            <h3 className="text-xl font-bold">{assignment.title}</h3>

            <p className="mt-3 text-gray-500">Entrega: {assignment.deadline}</p>

            <span
              className="
                mt-4
                inline-block
                px-4
                py-2
                rounded-full
                bg-emerald-100
                text-emerald-700
              "
            >
              {assignment.status}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
