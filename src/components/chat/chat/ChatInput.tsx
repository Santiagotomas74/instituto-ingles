"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Send } from "lucide-react";

import { Conversation, Message } from "../types/chat";

type Props = {
  conversation: Conversation;
  setMessages: Dispatch<SetStateAction<Message[]>>;
};

export default function ChatInput({ conversation, setMessages }: Props) {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  async function sendMessage() {
    const content = message.trim();

    if (!content || sending) return;

    try {
      setSending(true);

      const res = await fetch(`/api/chat/${conversation.id}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message);
      }

      // NO agregar el mensaje manualmente.
      // El servidor Node lo enviará por Socket.IO.

      setMessage("");
    } catch (error) {
      console.error(error);
      alert("No se pudo enviar el mensaje.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="bg-white border-t p-5 flex gap-4">
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            sendMessage();
          }
        }}
        placeholder="Escribe un mensaje..."
        className="
          flex-1
          h-12
          rounded-xl
          border
          px-5
          outline-none
          disabled:bg-slate-100
          text-black
        "
      />

      <button
        onClick={sendMessage}
        disabled={sending || !message.trim()}
        className="
          w-12
          h-12
          rounded-xl
          bg-cyan-500
          hover:bg-cyan-600
          disabled:bg-slate-300
          text-white
          flex
          items-center
          justify-center
          transition
        "
      >
        <Send size={20} />
      </button>
    </div>
  );
}
