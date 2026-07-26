"use client";

import { ArrowLeft, User, Users } from "lucide-react";

import { Conversation } from "../types/chat";

type Props = {
  conversation: Conversation;
  onBack: () => void;
};

export default function ChatHeader({ conversation, onBack }: Props) {
  return (
    <header
      className="
    h-20
    bg-white
    border-b
    px-4 md:px-8
    flex
    items-center
    gap-4
  "
    >
      <button
        onClick={onBack}
        className="
      md:hidden
      w-10
      h-10
      rounded-full
      hover:bg-slate-100
      flex
      items-center
      justify-center
      text-slate-500
    "
      >
        <ArrowLeft size={22} />
      </button>

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

      <div className="min-w-0">
        <h2 className="font-semibold text-lg text-gray-700 truncate">
          {conversation.name}
        </h2>

        <p className="text-sm text-slate-500">
          {conversation.type === "group" ? "Grupo" : "Conversación privada"}
        </p>
      </div>
    </header>
  );
}
