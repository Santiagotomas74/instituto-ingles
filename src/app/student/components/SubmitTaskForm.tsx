"use client";

import { useState } from "react";
import { Send, FileText, Paperclip, AlertCircle, Loader2 } from "lucide-react";

type Props = {
  classroomId: string;
  taskId: string;
  onSuccess: () => void;
};

export default function SubmitTaskForm({
  classroomId,
  taskId,
  onSuccess,
}: Props) {
  const [texto, setTexto] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    if (!texto.trim()) return;

    setLoading(true);

    try {
      await fetch(`/api/student/tasks/${taskId}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          classroom_id: classroomId,
          comentario: texto,
        }),
      });

      onSuccess();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-slate-900">Entregar tarea</h2>

        <p className="mt-2 text-slate-500">
          Escribí tu respuesta o adjuntá un archivo antes de enviar la entrega.
        </p>
      </div>

      {/* Editor */}
      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b bg-slate-50 px-6 py-4 flex items-center gap-3">
          <FileText className="text-cyan-600" size={20} />

          <span className="font-semibold text-slate-700">
            Respuesta escrita
          </span>
        </div>

        <textarea
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          rows={12}
          placeholder="Escribí aquí tu respuesta..."
          className="
            w-full
            resize-none
            outline-none
            px-6
            py-5
            text-[15px]
            leading-7
            text-slate-700
          "
        />

        <div className="border-t bg-slate-50 px-6 py-3 flex items-center justify-between">
          <span className="text-sm text-slate-500">
            {texto.length} caracteres
          </span>

          <span className="text-xs text-slate-400">
            Se guarda cuando envíes la tarea.
          </span>
        </div>
      </div>

      {/* Adjuntos */}
      <div className="rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center">
        <Paperclip className="mx-auto text-slate-400" size={36} />

        <h3 className="mt-4 font-semibold text-slate-700">Adjuntar archivos</h3>

        <p className="mt-2 text-sm text-slate-500">
          Próximamente podrás subir documentos PDF, Word, imágenes,
          presentaciones y otros archivos.
        </p>

        <button
          disabled
          className="
            mt-5
            px-5
            h-11
            rounded-xl
            bg-slate-200
            text-slate-500
            cursor-not-allowed
          "
        >
          Seleccionar archivo
        </button>
      </div>

      {/* Botones */}
      <div className="flex justify-end gap-4">
        <button
          onClick={onSuccess}
          className="
            h-12
            px-6
            rounded-xl
            border
            border-slate-300
            hover:bg-slate-100
            transition
          "
        >
          Cancelar
        </button>

        <button
          onClick={submit}
          disabled={loading || !texto.trim()}
          className="
            h-12
            px-7
            rounded-xl
            bg-cyan-600
            hover:bg-cyan-700
            disabled:opacity-50
            text-white
            font-medium
            flex
            items-center
            gap-2
            transition
          "
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              Enviando...
            </>
          ) : (
            <>
              <Send size={18} />
              Entregar tarea
            </>
          )}
        </button>
      </div>
    </div>
  );
}
