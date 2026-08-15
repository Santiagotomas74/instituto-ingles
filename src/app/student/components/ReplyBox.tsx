"use client";

import { useState } from "react";
import { SendHorizontal } from "lucide-react";

type Props = {
  questionId: string;
  onReplyCreated: () => void;
};

export default function ReplyBox({ questionId, onReplyCreated }: Props) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!content.trim()) return;

    try {
      setLoading(true);

      const res = await fetch(`/api/student/questions/${questionId}/answers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contenido: content,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message);
      }

      setContent("");

      onReplyCreated();
    } catch (err) {
      console.error(err);
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
       
      
        shadow-sm
        p-3
      "
    >
      <h3 className="text-lg font-semibold text-slate-900 mb-2">
        Escribir respuesta
      </h3>

      <textarea
        rows={3}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Escribí tu respuesta..."
        className="
          w-full
          resize-none
          rounded-2xl
          border
          border-slate-200
          p-4
          outline-none
          focus:ring-2
          focus:ring-cyan-500
          focus:border-cyan-500
          transition
          text-gray-600
        "
      />

      <div className="flex justify-end mt-5">
        <button
          onClick={handleSubmit}
          disabled={loading || !content.trim()}
          className="
            inline-flex
            items-center
            gap-2
            px-6
            h-12
            rounded-2xl
            bg-cyan-600
            hover:bg-cyan-700
            disabled:bg-slate-300
            disabled:cursor-not-allowed
            text-white
            font-semibold
            transition
          "
        >
          <SendHorizontal size={18} />

          {loading ? "Enviando..." : "Responder"}
        </button>
      </div>
    </div>
  );
}
