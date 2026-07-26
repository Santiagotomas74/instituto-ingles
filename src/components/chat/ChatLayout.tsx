"use client";

import { useEffect, useState } from "react";

import { getSocket } from "@/lib/socket-client";

import ConversationsSidebar from "./sidebar/ConversationsSidebar";
import ChatWindow from "./chat/ChatWindow";

import { Conversation, Message } from "./types/chat";

export default function ChatLayout() {
  const [loading, setLoading] = useState(true);

  const [currentUserId, setCurrentUserId] = useState("");

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);

  const [mobileView, setMobileView] = useState<"list" | "chat">("list");

  /*
  ====================================================
  Seleccionar conversación
  ====================================================
  */

  function handleSelectConversation(conversation: Conversation) {
    setSelectedConversation(conversation);

    if (window.innerWidth < 768) {
      setMobileView("chat");
    }
  }

  /*
  ====================================================
  Usuario actual
  ====================================================
  */

  useEffect(() => {
    async function loadCurrentUser() {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();

        if (!data.success) return;

        setCurrentUserId(data.user.id);

        const socket = getSocket();

        if (!socket.connected) {
          socket.connect();
        }

        socket.once("connect", () => {
          console.log("Registrando usuario");

          socket.emit("register", data.user.id);
        });

        const register = () => {
          console.log("Register:", data.user.id);
          socket.emit("register", data.user.id);
        };

        if (socket.connected) {
          register();
        } else {
          socket.once("connect", register);
        }
      } catch (err) {
        console.error(err);
      }
    }

    loadCurrentUser();
  }, []);

  /*
  ====================================================
  Entrar / salir conversación
  ====================================================
  */

  useEffect(() => {
    if (!selectedConversation) return;

    const socket = getSocket();

    const join = () => {
      console.log("Join:", selectedConversation.id);

      socket.emit("join_conversation", selectedConversation.id);
    };

    if (socket.connected) {
      join();
    } else {
      socket.once("connect", join);
    }

    return () => {
      socket.emit("leave_conversation", selectedConversation.id);

      socket.off("connect", join);
    };
  }, [selectedConversation]);

  /*
  ====================================================
  Escuchar mensajes
  ====================================================
  */

  useEffect(() => {
    const socket = getSocket();

    const handleNewMessage = (message: Message) => {
      setMessages((prev) => {
        if (prev.some((m) => m.id === message.id)) {
          return prev;
        }

        return [...prev, message];
      });

      setConversations((prev) => {
        const updated = prev.map((conversation) =>
          conversation.id === message.conversation_id
            ? {
                ...conversation,
                last_message: message.content,
                last_message_date: message.created_at,
              }
            : conversation,
        );

        updated.sort(
          (a, b) =>
            new Date(b.last_message_date ?? 0).getTime() -
            new Date(a.last_message_date ?? 0).getTime(),
        );

        return updated;
      });
    };

    socket.on("new_message", handleNewMessage);

    return () => {
      socket.off("new_message", handleNewMessage);
    };
  }, []);

  /*
  ====================================================
  Typing
  ====================================================
  */

  useEffect(() => {
    const socket = getSocket();

    const handleTyping = (userId: string) => {
      setTypingUsers((prev) =>
        prev.includes(userId) ? prev : [...prev, userId],
      );
    };

    const handleStopTyping = (userId: string) => {
      setTypingUsers((prev) => prev.filter((id) => id !== userId));
    };

    socket.on("typing", handleTyping);
    socket.on("stop_typing", handleStopTyping);

    return () => {
      socket.off("typing", handleTyping);
      socket.off("stop_typing", handleStopTyping);
    };
  }, []);

  /*
  ====================================================
  Conversaciones
  ====================================================
  */

  async function loadConversations() {
    try {
      const res = await fetch("/api/chat");

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message);
      }

      setConversations(data.conversations);

      setSelectedConversation((current) => {
        if (current) {
          const updated = data.conversations.find(
            (conversation: Conversation) => conversation.id === current.id,
          );

          return updated ?? current;
        }

        return data.conversations.length ? data.conversations[0] : null;
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadConversations();
  }, []);

  /*
  ====================================================
  Mensajes
  ====================================================
  */

  useEffect(() => {
    if (!selectedConversation) {
      setMessages([]);
      return;
    }

    async function loadMessages() {
      try {
        setMessages([]);

        const res = await fetch(
          `/api/chat/${selectedConversation.id}/messages`,
        );

        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.message);
        }

        setMessages(data.messages);

        await fetch(`/api/chat/${selectedConversation.id}/read`, {
          method: "PATCH",
        });
      } catch (err) {
        console.error(err);
      }
    }

    loadMessages();
  }, [selectedConversation]);

  /*
  ====================================================
  Nueva conversación
  ====================================================
  */

  function handleConversationCreated(conversation: Conversation) {
    setConversations((prev) => {
      if (prev.some((c) => c.id === conversation.id)) {
        return prev;
      }

      return [conversation, ...prev];
    });

    setSelectedConversation(conversation);

    if (window.innerWidth < 768) {
      setMobileView("chat");
    }
  }

  /*
  ====================================================
  Desconectar
  ====================================================
  */

  useEffect(() => {
    const socket = getSocket();

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-slate-100">
      <div
        className={`
          ${mobileView === "chat" ? "hidden" : "block"}

          w-screen
          md:w-[400px]
          md:flex-shrink-0
          flex
          flex-col
          border-r
          border-slate-200
          bg-white
        `}
      >
        <ConversationsSidebar
          loading={loading}
          conversations={conversations}
          selectedConversation={selectedConversation}
          onSelectConversation={handleSelectConversation}
          onConversationCreated={handleConversationCreated}
        />
      </div>

      <div
        className={`
          ${mobileView === "list" ? "hidden" : "flex"}

          flex-1
          min-w-0
          min-h-0
          md:flex
        `}
      >
        <ChatWindow
          conversation={selectedConversation}
          messages={messages}
          typingUsers={typingUsers}
          setMessages={setMessages}
          currentUserId={currentUserId}
          onBack={() => setMobileView("list")}
        />
      </div>
    </div>
  );
}
