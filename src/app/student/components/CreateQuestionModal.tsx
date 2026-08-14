"use client";

import { useEffect, useState } from "react";
import { X, Loader2, HelpCircle } from "lucide-react";

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !content.trim() || loading) return;

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
        throw new Error(data.message || "Error al publicar la consulta.");
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

  const isValid = title.trim().length > 0 && content.trim().length > 0;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col my-auto border border-slate-100">
        {/* Encabezado Fijo */}
        <div className="px-5 sm:px-8 py-4 sm:py-5 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-600 flex items-center justify-center shrink-0">
              <HelpCircle size={20} />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-800">
                Nueva consulta
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Escribí tu duda para que el profesor pueda responderla.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors shrink-0"
            aria-label="Cerrar modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Formulario / Cuerpo */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col flex-1 overflow-y-auto"
        >
          <div className="p-5 sm:p-8 space-y-5 flex-1">
            <div>
              <label className="block mb-1.5 text-xs sm:text-sm font-semibold text-slate-700">
                Título de la consulta
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej: Duda sobre el ejercicio de Present Perfect"
                className="w-full h-11 sm:h-12 text-xs sm:text-sm text-slate-800 bg-slate-50/50 rounded-xl border border-slate-200 px-4 outline-none focus:bg-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all placeholder:text-slate-400"
              />
            </div>

            <div>
              <label className="block mb-1.5 text-xs sm:text-sm font-semibold text-slate-700">
                Detalle de la consulta
              </label>
              <textarea
                rows={5}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Explicá tu duda de manera clara..."
                className="w-full text-xs sm:text-sm text-slate-800 bg-slate-50/50 rounded-xl border border-slate-200 p-4 resize-none outline-none focus:bg-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Pie de Modal */}
          <div className="px-5 sm:px-8 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 sm:px-5 h-10 sm:h-11 rounded-xl border border-slate-200 hover:bg-white text-slate-600 font-semibold text-xs sm:text-sm transition-colors"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={loading || !isValid}
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 h-10 sm:h-11 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-200 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all disabled:text-slate-400 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Publicando...</span>
                </>
              ) : (
                <span>Publicar consulta</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
