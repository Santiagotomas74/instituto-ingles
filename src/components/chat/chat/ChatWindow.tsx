"use client";

import { Dispatch, SetStateAction } from "react";

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
  if (!conversation) {
    return (
      <section className="flex-1 bg-slate-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-slate-700">
            Selecciona una conversación
          </h2>

          <p className="mt-2 text-slate-500">Elige un chat para comenzar.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex-1 flex flex-col bg-yellow-100">
      <ChatHeader conversation={conversation} onBack={onBack} />

      <MessagesList messages={messages} currentUserId={currentUserId} />

      <TypingIndicator typingUsers={typingUsers} />

      <ChatInput conversation={conversation} setMessages={setMessages} />
    </section>
  );
}
