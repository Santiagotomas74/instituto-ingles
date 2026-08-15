"use client";

import { Dispatch, SetStateAction, useState, useRef, useEffect } from "react";
import { Send, Loader2 } from "lucide-react";

import { Conversation, Message } from "../types/chat";

type Props = {
  conversation: Conversation;
  setMessages: Dispatch<SetStateAction<Message[]>>;
};

export default function ChatInput({ conversation, setMessages }: Props) {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-enfocar el input cuando se cambia de conversación
  useEffect(() => {
    inputRef.current?.focus();
  }, [conversation.id]);

  async function handleSubmit(e?: React.FormEvent) {
    if (e) e.preventDefault();

    const content = message.trim();
    if (!content || sending) return;

    try {
      setSending(true);

      const res = await fetch(`/api/chat/${conversation.id}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Error al enviar el mensaje");
      }

      // NO agregar el mensaje manualmente.
      // El servidor Node lo enviará por Socket.IO.
      setMessage("");
    } catch (error) {
      console.error(error);
      alert("No se pudo enviar el mensaje. Inténtalo de nuevo.");
    } finally {
      setSending(false);
      // Volver a enfocar el input automáticamente tras enviar el mensaje
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-2 sm:p-3 flex items-center gap-2 sm:gap-3 w-full"
    >
      <input
        ref={inputRef}
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={sending}
        placeholder="Escribe un mensaje..."
        autoComplete="off"
        className="
          flex-1
          h-11
          rounded-full
          bg-slate-100
          border
          border-transparent
          px-5
          text-sm
          text-slate-700
          placeholder:text-slate-400
          outline-none
          focus:bg-white
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-500/20
          transition-all
          disabled:opacity-60
          disabled:cursor-not-allowed
        "
      />

      <button
        type="submit"
        disabled={sending || !message.trim()}
        title="Enviar mensaje"
        className="
          w-11
          h-11
          shrink-0
          rounded-full
          bg-blue-600
          text-white
          flex
          items-center
          justify-center
          transition-all
          hover:bg-blue-700
          active:scale-95
          disabled:bg-slate-100
          disabled:text-slate-400
          disabled:cursor-not-allowed
          disabled:active:scale-100
        "
      >
        {sending ? (
          <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
        ) : (
          /* mr-0.5 compensa visualmente el peso del icono hacia la derecha */
          <Send className="w-5 h-5 mr-0.5" />
        )}
      </button>
    </form>
  );
}
