"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

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
      load();
    }
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
        p-6
      "
    >
      <div
        className="
          bg-white
          rounded-3xl
          w-full
          max-w-7xl
          h-[90vh]
          shadow-2xl
          overflow-hidden
          flex
          flex-col
        "
      >
        {/* Header */}

        <div
          className="
            h-20
            border-b
            px-8
            flex
            items-center
            justify-between
          "
        >
          <div>
            <h2 className="text-2xl font-bold text-gray-600">
              Entregas de la tarea
            </h2>

            <p className="text-slate-500 text-sm">
              {submissions.length} estudiantes
            </p>
          </div>

          <button
            onClick={handleClose}
            className="
              w-11
              h-11
              rounded-xl
              hover:bg-slate-100
              flex
              items-center
              justify-center
              text-slate-500
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}

        <div className="flex flex-1 overflow-hidden">
          <SubmissionList
            loading={loading}
            submissions={submissions}
            selected={selected}
            onSelect={setSelected}
          />

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
              "
            >
              No hay entregas.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
