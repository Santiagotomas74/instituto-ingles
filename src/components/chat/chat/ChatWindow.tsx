"use client";

import { Dispatch, SetStateAction } from "react";
import { MessageSquareDashed } from "lucide-react";

import { Conversation, Message } from "../types/chat";
import ChatHeader from "./ChatHeader";
import MessagesList from "./MessagesList";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";

type Props = {
  conversation: Conversation | null;
  messages: Message[];
  typingUsers: string[];
  setMessages: Dispatch<SetStateAction<Message[]>>;
  currentUserId: string;
  onBack: () => void;
};

export default function ChatWindow({
  conversation,
  messages,
  typingUsers,
  setMessages,
  currentUserId,
  onBack,
}: Props) {
  // VISTA 1: NINGÚN CHAT SELECCIONADO (EMPTY STATE)
  if (!conversation) {
    return (
      <section className="flex-1 h-full bg-blue-50 flex items-center justify-center md:border-l border-blue-100 p-6">
        <div className="flex flex-col items-center text-center max-w-sm">
          <div className="w-24 h-24 bg-white rounded-full shadow-sm flex items-center justify-center mb-6 text-blue-300">
            <MessageSquareDashed strokeWidth={1.5} size={48} />
          </div>
          <h2 className="text-xl font-bold text-slate-800">Tus Mensajes</h2>
          <p className="mt-2 text-sm text-slate-500 leading-relaxed">
            Selecciona una conversación del panel lateral para comenzar a
            chatear o inicia una nueva.
          </p>
        </div>
      </section>
    );
  }

  // VISTA 2: CHAT ACTIVO
  return (
    <section className="flex-1 flex flex-col h-full bg-blue-50 relative overflow-hidden md:border-l border-blue-100">
      {/* HEADER: Fijo en la parte superior */}
      <div className="shrink-0 z-20 bg-white shadow-sm">
        <ChatHeader conversation={conversation} onBack={onBack} />
      </div>

      {/* ÁREA DE MENSAJES: Ocupa el espacio restante y hace scroll */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Asumimos que MessagesList maneja su propio overflow-y-auto */}
        <MessagesList messages={messages} currentUserId={currentUserId} />

        {/* INDICADOR DE ESCRITURA: Flotante al final de los mensajes */}
        {typingUsers.length > 0 && (
          <div className="shrink-0 px-4 pb-2 z-10">
            <TypingIndicator typingUsers={typingUsers} />
          </div>
        )}
      </div>

      {/* INPUT: Fijo en la parte inferior */}
      <div className="shrink-0 z-20 bg-white border-t border-slate-200 p-2 sm:p-4">
        <ChatInput conversation={conversation} setMessages={setMessages} />
      </div>
    </section>
  );
}
