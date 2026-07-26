"use client";

import { useEffect, useRef } from "react";

import { Message } from "../types/chat";
import MessageBubble from "./MessageBubble";

type Props = {
  messages: Message[];
  currentUserId: string;
};

export default function MessagesList({ messages, currentUserId }: Props) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div
      className="
        flex-1
        overflow-y-auto
        px-8
        py-6
        space-y-4
      "
    >
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
          own={message.sender_id === currentUserId}
        />
      ))}

      <div ref={bottomRef} />
    </div>
  );
}
