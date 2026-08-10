"use client";

import { useState } from "react";

type Props = {
  questionId: string;
  onReplyCreated: () => void;
};

export default function ReplyBox({ questionId, onReplyCreated }: Props) {
  const [contenido, setContenido] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!contenido.trim()) return;

    try {
      setLoading(true);

      const res = await fetch(`/api/teacher/questions/${questionId}/answers`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          contenido,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      setContenido("");

      onReplyCreated();
    } catch (error) {
      console.error(error);

      alert("No se pudo enviar la respuesta.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="
        bg-white
        rounded-3xl
        border
        border-slate-200
        p-6
        shadow-sm
      "
    >
      <h3 className="text-lg font-semibold text-slate-900 mb-4">
        Responder consulta
      </h3>

      <textarea
        rows={5}
        placeholder="Escribe tu respuesta..."
        value={contenido}
        onChange={(e) => setContenido(e.target.value)}
        className="
          w-full
          rounded-2xl
          border
          border-slate-200
          p-4
          resize-none
          outline-none
          focus:ring-2
          focus:ring-cyan-500
        "
      />

      <div className="flex justify-end mt-5">
        <button
          onClick={handleSubmit}
          disabled={loading || !contenido.trim()}
          className="
            px-6
            h-12
            rounded-2xl
            bg-cyan-600
            hover:bg-cyan-500
            disabled:opacity-50
            disabled:cursor-not-allowed
            text-white
            font-semibold
            transition
          "
        >
          {loading ? "Enviando..." : "Responder"}
        </button>
      </div>
    </div>
  );
}
