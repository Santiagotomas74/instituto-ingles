"use client";

import { useEffect, useState } from "react";
import {
  User,
  Calendar,
  Paperclip,
  Download,
  MessageSquare,
} from "lucide-react";

type Submission = {
  id: string;
  nombre: string;
  apellido: string;
  comentario: string | null;
  archivo_url: string | null;
  archivo_nombre: string | null;
  submitted_at: string;
};

type Props = {
  taskId: string;
};

export default function PoolSubmissions({ taskId }: Props) {
  const [loading, setLoading] = useState(true);

  const [submissions, setSubmissions] = useState<Submission[]>([]);

  async function loadPool() {
    try {
      const res = await fetch(`/api/student/tasks/${taskId}/submissions`);

      const data = await res.json();

      if (!data.success) return;

      setSubmissions(data.submissions);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPool();
  }, [taskId]);

  if (loading) {
    return (
      <div className="mt-8 rounded-2xl border bg-slate-50 p-6 text-center text-slate-500">
        Cargando entregas...
      </div>
    );
  }

  if (!submissions.length) {
    return (
      <div className="mt-8 rounded-2xl border bg-slate-50 p-6 text-center text-slate-500">
        Todavía ningún estudiante entregó esta actividad.
      </div>
    );
  }

  return (
    <section className="mt-10">
      <div className="flex items-center gap-3 mb-5">
        <MessageSquare className="text-cyan-600" size={22} />

        <h3 className="text-xl font-bold text-gray-700">
          Entregas de la clase
        </h3>

        <span className="text-sm text-slate-500">({submissions.length})</span>
      </div>

      <div className="space-y-5">
        {submissions.map((submission) => (
          <article
            key={submission.id}
            className="
              rounded-3xl
              border
              border-slate-200
              bg-slate-50
              text-gray-700
              p-6
            "
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 font-semibold">
                  <User size={18} />
                  {submission.nombre} {submission.apellido}
                </div>

                <div className="flex items-center gap-2 mt-2 text-sm text-slate-500">
                  <Calendar size={15} />

                  {new Date(submission.submitted_at).toLocaleString()}
                </div>
              </div>
            </div>

            {submission.comentario && (
              <div className="mt-5 rounded-xl bg-white border p-4 whitespace-pre-wrap">
                {submission.comentario}
              </div>
            )}

            {submission.archivo_url && (
              <a
                href={submission.archivo_url}
                target="_blank"
                className="
                  mt-5
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-cyan-600
                  hover:bg-cyan-700
                  px-4
                  py-2
                  text-white
                  transition
                "
              >
                <Paperclip size={18} />

                {submission.archivo_nombre}

                <Download size={16} />
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
