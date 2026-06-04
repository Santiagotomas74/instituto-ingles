import { Users, BookOpen, Megaphone, ClipboardList } from "lucide-react";

export default function ClassroomOverview() {
  const stats = [
    {
      title: "Alumnos",
      value: 24,
      icon: <Users />,
    },
    {
      title: "Materiales",
      value: 12,
      icon: <BookOpen />,
    },
    {
      title: "Anuncios",
      value: 8,
      icon: <Megaphone />,
    },
    {
      title: "Tareas",
      value: 4,
      icon: <ClipboardList />,
    },
  ];

  return (
    <section className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((item) => (
          <div
            key={item.title}
            className="
          bg-white
          rounded-[28px]
          p-6
          shadow-lg
          border
          border-slate-100
          min-w-0
        "
          >
            <div
              className="
            w-14
            h-14
            rounded-2xl
            bg-cyan-50
            flex
            items-center
            justify-center
            text-cyan-600
          "
            >
              {item.icon}
            </div>

            <p className="mt-5 text-gray-500 text-sm">{item.title}</p>

            <h2
              className="
            mt-2
            text-4xl
            font-bold
            text-slate-900
            break-words
          "
            >
              {item.value}
            </h2>
          </div>
        ))}
      </div>
    </section>
  );
}
