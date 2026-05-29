import Link from "next/link";

import { Users, GraduationCap, BookOpen, MessageCircle } from "lucide-react";

export default async function Stats() {
  const [studentsRes, teachersRes, classroomsRes, inscriptionsRes] =
    await Promise.all([
      fetch(`${process.env.BACKEND_URL}/api/admin/students`, {
        cache: "no-store",
      }),

      fetch(`${process.env.BACKEND_URL}/api/admin/teachers`, {
        cache: "no-store",
      }),

      fetch(`${process.env.BACKEND_URL}/api/admin/classrooms`, {
        cache: "no-store",
      }),

      fetch(`${process.env.BACKEND_URL}/api/admin/inscripciones`, {
        cache: "no-store",
      }),
    ]);

  const studentsData = await studentsRes.json();

  const teachersData = await teachersRes.json();

  const classroomsData = await classroomsRes.json();

  const inscriptionsData = await inscriptionsRes.json();

  const stats = [
    {
      title: "Students",
      value: studentsData.students?.length || 0,
      icon: <Users className="w-8 h-8" />,
      color: "from-blue-600 to-cyan-500",
      href: "/admin/students",
    },

    {
      title: "Teachers",
      value: teachersData.teachers?.length || 0,
      icon: <GraduationCap className="w-8 h-8" />,
      color: "from-violet-600 to-fuchsia-500",
      href: "/admin/teachers",
    },

    {
      title: "Classrooms",
      value: classroomsData.classrooms?.length || 0,
      icon: <BookOpen className="w-8 h-8" />,
      color: "from-emerald-600 to-teal-500",
      href: "/admin/classrooms",
    },

    {
      title: "Inscripciones",
      value: inscriptionsData.inscriptions?.length || 0,
      icon: <MessageCircle className="w-8 h-8" />,
      color: "from-orange-500 to-amber-500",
      href: "/admin/inscripciones",
    },
  ];

  return (
    <section
      className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-4
        gap-6
        mt-4
        mb-8
      "
    >
      {stats.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className="
            rounded-[32px]
            overflow-hidden
            shadow-xl
            bg-white
            border
            border-gray-100
            hover:-translate-y-1
            transition-all
          "
        >
          <div
            className={`
              h-2
              bg-gradient-to-r
              ${item.color}
            `}
          />

          <div className="p-7">
            <div
              className={`
                w-16
                h-16
                rounded-3xl
                bg-gradient-to-br
                ${item.color}
                text-white
                flex
                items-center
                justify-center
              `}
            >
              {item.icon}
            </div>

            <p className="mt-6 text-gray-500">{item.title}</p>

            <h2
              className="
                text-4xl
                font-bold
                text-gray-900
                mt-2
              "
            >
              {item.value}
            </h2>
          </div>
        </Link>
      ))}
    </section>
  );
}
