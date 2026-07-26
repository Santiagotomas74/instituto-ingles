"use client";

import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";

import UserList from "./UserList";
import { ChatUser } from "./UserItem";
import { Conversation } from "../types/chat";

type Props = {
  open: boolean;
  onClose: () => void;
  onConversationCreated: (conversation: Conversation) => void;
};

export default function NewConversationModal({
  open,
  onClose,
  onConversationCreated,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [users, setUsers] = useState<ChatUser[]>([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!open) return;

    loadUsers();
  }, [open]);

  async function loadUsers() {
    try {
      setLoading(true);

      const res = await fetch("/api/chat/users");

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message);
      }

      setUsers(data.users);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function createConversation(user: ChatUser) {
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "private",
          participants: [
            {
              user_id: user.id,
              role: user.role,
            },
          ],
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message);
      }

      onConversationCreated(data.conversation);

      onClose();
    } catch (error) {
      console.error(error);
      alert("No se pudo crear la conversación.");
    }
  }

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const text = `${user.name} ${user.lastname}`.toLowerCase();

      return text.includes(search.toLowerCase());
    });
  }, [search, users]);

  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        bg-black/40
        flex
        items-center
        justify-center
        z-50
      "
    >
      <div
        className="
          w-full
          max-w-xl
          bg-white
          rounded-3xl
          shadow-xl
          overflow-hidden
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
            p-6
            border-b
          "
        >
          <h2 className="text-2xl font-bold text-gray-600">
            Nueva conversación
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-900"
          >
            <X />
          </button>
        </div>

        <div className="p-6">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar usuario..."
            className="
              w-full
              h-12
              border
              rounded-xl
              px-4
              mb-5
              text-stone-700
            "
          />

          {loading ? (
            <div className="py-10 text-center text-gray-700">
              Cargando usuarios...
            </div>
          ) : (
            <UserList users={filteredUsers} onSelect={createConversation} />
          )}
        </div>
      </div>
    </div>
  );
}
