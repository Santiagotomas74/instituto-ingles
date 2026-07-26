"use client";

import { Message } from "../types/chat";

type Props = {
  message: Message;
  own: boolean;
};

export default function MessageBubble({ message, own }: Props) {
  return (
    <div className={`flex ${own ? "justify-end" : "justify-start"}`}>
      <div
        className={`
          max-w-md
          rounded-3xl
          px-5
          py-3
          shadow-sm
          ${own ? "bg-cyan-500 text-white" : "bg-white text-slate-800"}
        `}
      >
        {!own && (
          <p className="text-xs font-semibold text-cyan-600 mb-1">
            {message.lastname} {message.name}
          </p>
        )}

        <p>{message.content}</p>

        <p
          className={`
            mt-2
            text-xs
            ${own ? "text-cyan-100" : "text-slate-400"}
          `}
        >
          {new Date(message.created_at).toLocaleTimeString("es-AR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
}
