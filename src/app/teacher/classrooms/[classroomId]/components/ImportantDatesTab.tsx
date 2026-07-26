"use client";

import { useEffect, useState } from "react";

import { CalendarPlus, Trash2, Plus, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { ImportantDate } from "../types";

import ImportantDateModal from "./ImportantDateModal";

type Props = {
  classroomId: string;
};

export default function ImportantDatesTab({ classroomId }: Props) {
  const [dates, setDates] = useState<ImportantDate[]>([]);

  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);

  const searchParams = useSearchParams();

  const loadDates = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `/api/teacher/classroom/${classroomId}/important-dates`,
      );

      if (!res.ok) {
        throw new Error();
      }

      const data = await res.json();

      setDates(data.importantDates ?? []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (classroomId) {
      loadDates();
    }
  }, [classroomId]);

  useEffect(() => {
    if (
      searchParams.get("tab") === "important-dates" &&
      searchParams.get("new") === "true"
    ) {
      setOpenModal(true);
    }
  }, [searchParams]);
  const handleDelete = async (id: string) => {
    const confirmed = confirm("¿Eliminar esta fecha importante?");

    if (!confirmed) return;

    try {
      const res = await fetch(`/api/teacher/classrooms/important-dates/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error();
      }

      setDates((prev) => prev.filter((date) => date.id !== id));
    } catch (error) {
      console.error(error);

      alert("Error eliminando la fecha");
    }
  };

  return (
    <section>
      <div
        className="
flex
justify-between
items-center
mb-6
"
      >
        <h2
          className="
text-3xl
font-bold
text-gray-900
"
        >
          Fechas importantes
        </h2>

        <button
          onClick={() => setOpenModal(true)}
          className="
px-5
py-3
rounded-xl
bg-green-500
hover:bg-green-600
text-white
flex
items-center
gap-2
"
        >
          <Plus size={18} />
          Nueva fecha
        </button>
      </div>

      {loading ? (
        <div
          className="
bg-white
rounded-3xl
p-12
shadow
flex
flex-col
items-center
justify-center
"
        >
          <Loader2
            size={40}
            className="
animate-spin
text-green-500
"
          />

          <p
            className="
mt-4
text-slate-500
font-medium
"
          >
            Cargando fechas importantes...
          </p>
        </div>
      ) : dates.length === 0 ? (
        <div
          className="
bg-white
rounded-3xl
p-10
shadow
text-center
"
        >
          <CalendarPlus
            size={50}
            className="
mx-auto
text-slate-300
"
          />

          <h3
            className="
mt-4
text-xl
font-semibold
text-slate-800
"
          >
            No hay fechas importantes
          </h3>

          <p
            className="
mt-2
text-slate-500
"
          >
            Todavía no se registró ninguna fecha.
          </p>
        </div>
      ) : (
        <div
          className="
space-y-5
"
        >
          {dates.map((date) => (
            <div
              key={date.id}
              className="
bg-white
rounded-3xl
border
p-6
shadow
"
            >
              <div
                className="
flex
justify-between
items-start
"
              >
                <div>
                  <div
                    className="
flex
items-center
gap-3
"
                  >
                    <h3
                      className="
text-xl
font-bold
text-slate-900
"
                    >
                      {date.titulo}
                    </h3>

                    <span
                      className={`
px-3
py-1
rounded-full
text-xs
font-semibold
${
  date.tipo === "clase"
    ? "bg-blue-100 text-blue-700"
    : date.tipo === "examen"
      ? "bg-red-100 text-red-700"
      : date.tipo === "evento"
        ? "bg-green-100 text-green-700"
        : "bg-yellow-100 text-yellow-700"
}
`}
                    >
                      {date.tipo}
                    </span>
                  </div>

                  <p
                    className="
mt-3
text-slate-600
"
                  >
                    {date.descripcion}
                  </p>

                  <div
                    className="
mt-5
flex
gap-6
text-sm
text-slate-500
"
                  >
                    <span>
                      📅 {new Date(date.fecha).toLocaleDateString("es-AR")}
                    </span>

                    <span>🕒 {date.hora}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(date.id)}
                  className="
w-10
h-10
rounded-xl
flex
items-center
justify-center
text-red-500
hover:bg-red-50
"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ImportantDateModal
        open={openModal}
        setOpen={setOpenModal}
        classroomId={classroomId}
        loadDates={loadDates}
      />
    </section>
  );
}
