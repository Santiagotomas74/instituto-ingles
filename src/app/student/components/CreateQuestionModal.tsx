"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  classroomId: string;
  onClose: () => void;
  onCreated: () => void;
};

export default function CreateQuestionModal({
  open,
  classroomId,
  onClose,
  onCreated,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!open) {
      setTitle("");
      setContent("");
      setLoading(false);
    }
  }, [open]);

  async function handleSubmit() {
    if (!title.trim() || !content.trim()) return;

    try {
      setLoading(true);

      const res = await fetch("/api/student/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          classroom_id: classroomId,
          title,
          content,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message);
      }

      setTitle("");
      setContent("");

      onClose();

      onCreated();
    } catch (err) {
      console.error(err);
      alert("No se pudo publicar la consulta.");
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl">
        {/* Header */}

        <div className="flex justify-between items-center p-7 border-b">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Nueva consulta
            </h2>

            <p className="text-slate-500 mt-1">
              Escribí tu duda para que el profesor pueda responderla.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl text-black hover:bg-slate-100 flex items-center justify-center"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}

        <div className="p-7 space-y-5">
          <div>
            <label className="block mb-2 font-medium text-slate-700">
              Título
            </label>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Duda sobre el Present Perfect "
              className="w-full h-14 text-gray-600 rounded-2xl border border-slate-200 px-5 outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-slate-700">
              Consulta
            </label>

            <textarea
              rows={7}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Escribí tu consulta..."
              className="w-full text-gray-600 rounded-2xl border border-slate-200 p-5 resize-none outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 p-7 border-t">
          <button
            onClick={onClose}
            className="px-6 h-12 rounded-2xl border border-slate-300 hover:bg-slate-50 text-gray-700"
          >
            Cancelar
          </button>

          <button
            disabled={loading}
            onClick={handleSubmit}
            className="px-7 h-12 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold disabled:opacity-50"
          >
            {loading ? "Publicando..." : "Publicar consulta"}
          </button>
        </div>
      </div>
    </div>
  );
}
