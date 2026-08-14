"use client";

import { useEffect, useState } from "react";
import { X, ChevronLeft } from "lucide-react";

import SubmissionList from "./SubmissionList";
import SubmissionViewer from "./SubmissionViewer";

type Props = {
  open: boolean;
  onClose: () => void;
  taskId: string;
};

export type Submission = {
  id: string;
  student_id: string;
  nombre: string;
  apellido: string;
  email?: string;
  submitted: boolean;
  submitted_at: string | null;
  comentario: string | null;
  archivo_url: string | null;
  archivo_nombre: string | null;
  archivo_size: number | null;
  grade: number | null;
  teacher_feedback: string | null;
};

export default function TaskSubmissionsModal({ open, onClose, taskId }: Props) {
  const [loading, setLoading] = useState(true);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selected, setSelected] = useState<Submission | null>(null);

  // Estado para controlar la vista en móviles (Lista vs Detalle)
  const [isMobileListVisible, setIsMobileListVisible] = useState(true);

  async function load() {
    try {
      setLoading(true);
      const res = await fetch(`/api/teacher/tasks/${taskId}/submissions`);
      const data = await res.json();

      if (!data.success) return;

      setSubmissions(data.submissions);
      setSelected(data.submissions[0] ?? null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (open) {
      setIsMobileListVisible(true); // Reinicia a la vista de lista al abrir en móviles
      load();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, taskId]);

  function handleClose() {
    setSelected(null);
    onClose();
  }

  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        bg-black/40
        backdrop-blur-sm
        flex
        items-center
        justify-center
        p-0
        sm:p-6
      "
    >
      <div
        className="
          bg-white
          w-full
          h-full
          sm:h-[90vh]
          sm:max-w-7xl
          sm:rounded-3xl
          shadow-2xl
          overflow-hidden
          flex
          flex-col
        "
      >
        {/* Header */}
        <div
          className="
            h-16
            sm:h-20
            border-b
            px-4
            sm:px-8
            flex
            items-center
            justify-between
            shrink-0
          "
        >
          <div className="flex items-center gap-2 sm:gap-0">
            {/* Botón de retroceso (solo móvil cuando se ve el detalle) */}
            {!isMobileListVisible && selected && (
              <button
                onClick={() => setIsMobileListVisible(true)}
                className="md:hidden p-2 -ml-2 rounded-xl hover:bg-slate-100 text-slate-500 transition"
                aria-label="Volver a la lista"
              >
                <ChevronLeft size={24} />
              </button>
            )}

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 line-clamp-1">
                {!isMobileListVisible && selected
                  ? `${selected.nombre} ${selected.apellido}`
                  : "Entregas de la tarea"}
              </h2>

              <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
                {submissions.length} estudiantes
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="
              w-10
              h-10
              sm:w-11
              sm:h-11
              rounded-xl
              hover:bg-slate-100
              flex
              items-center
              justify-center
              text-slate-500
              transition
              shrink-0
            "
            aria-label="Cerrar modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body (Master-Detail Layout) */}
        <div className="flex flex-1 overflow-hidden relative">
          {/* Columna Izquierda: Lista de Entregas */}
          <div
            className={`
              w-full 
              md:w-80 
              lg:w-96 
              border-r 
              border-slate-200 
              flex-shrink-0 
              flex-col 
              overflow-hidden
              ${!isMobileListVisible ? "hidden md:flex" : "flex"}
            `}
          >
            <SubmissionList
              loading={loading}
              submissions={submissions}
              selected={selected}
              onSelect={(sub) => {
                setSelected(sub);
                setIsMobileListVisible(false); // Oculta la lista en móviles al seleccionar
              }}
            />
          </div>

          {/* Columna Derecha: Visor de Entrega */}
          <div
            className={`
              flex-1 
              flex-col 
              bg-slate-50
              overflow-hidden
              ${isMobileListVisible ? "hidden md:flex" : "flex"}
            `}
          >
            {selected ? (
              <SubmissionViewer submission={selected} onUpdated={load} />
            ) : (
              <div
                className="
                  flex-1
                  flex
                  items-center
                  justify-center
                  text-slate-500
                  text-sm
                  sm:text-base
                "
              >
                No hay entregas.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
