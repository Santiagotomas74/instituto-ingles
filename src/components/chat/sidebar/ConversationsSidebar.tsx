"use client";

import { Plus } from "lucide-react";

import ConversationItem from "./ConversationItem";
import SearchConversation from "./SearchConversation";

import { Conversation } from "../types/chat";
import { useState } from "react";
import NewConversationModal from "../modal/NewConversationModal";

type Props = {
  loading: boolean;
  conversations: Conversation[];
  selectedConversation: Conversation | null;

  onSelectConversation: (conversation: Conversation) => void;

  onConversationCreated: (conversation: Conversation) => void;
};

export default function ConversationsSidebar({
  loading,
  conversations,
  selectedConversation,
  onSelectConversation,
  onConversationCreated,
}: Props) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <aside
      className="
    w-full
    md:w-[400px]
    bg-white
    border-r
    flex
    flex-col
  "
    >
      <div className="px-6 py-5 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Chats</h2>

          <button
            onClick={() => setOpenModal(true)}
            className="
              w-10
              h-10
              rounded-xl
              bg-cyan-500
              hover:bg-cyan-600
              text-white
              flex
              items-center
              justify-center
              transition
            "
          >
            <Plus size={20} />
          </button>
        </div>

        <div className="mt-5">
          <SearchConversation />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="p-6 text-slate-500">Cargando conversaciones...</div>
        ) : conversations.length === 0 ? (
          <div className="p-6 text-slate-500">No tienes conversaciones.</div>
        ) : (
          conversations.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
              selected={selectedConversation?.id === conversation.id}
              onClick={() => onSelectConversation(conversation)}
            />
          ))
        )}
        <NewConversationModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          onConversationCreated={onConversationCreated}
        />
      </div>
    </aside>
  );
}
