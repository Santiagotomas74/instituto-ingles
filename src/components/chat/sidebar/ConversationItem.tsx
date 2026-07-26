"use client";

import { Users, User } from "lucide-react";

import { Conversation } from "../types/chat";

type Props = {
  conversation: Conversation;
  selected: boolean;
  onClick: () => void;
};

export default function ConversationItem({
  conversation,
  selected,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full
        px-5
        py-4
        flex
        gap-4
        transition
        text-left
        border-b
        hover:bg-slate-50

        ${selected ? "bg-cyan-50 border-l-4 border-cyan-500" : ""}
      `}
    >
      <div
        className="
          w-12
          h-12
          rounded-full
          bg-cyan-500
          text-white
          flex
          items-center
          justify-center
        "
      >
        {conversation.type === "group" ? (
          <Users size={22} />
        ) : (
          <User size={22} />
        )}
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="flex justify-between">
          <h3 className="font-semibold text-slate-900 truncate">
            {conversation.name || "Sin nombre"}
          </h3>

          {conversation.last_message_date && (
            <span className="text-xs text-slate-400">
              {new Date(conversation.last_message_date).toLocaleDateString(
                "es-AR",
              )}
            </span>
          )}
        </div>

        <p className="mt-1 text-sm text-slate-500 truncate">
          {conversation.last_message || "Sin mensajes"}
        </p>
      </div>
    </button>
  );
}
