"use client";

import { Plus, ArrowLeft } from "lucide-react";

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

  const [loadingDashboard, setLoadingDashboard] = useState(false);

  /*
  =====================================================
  VOLVER AL DASHBOARD
  =====================================================
  */

  const handleBackToDashboard = async () => {
    if (loadingDashboard) {
      return;
    }

    try {
      setLoadingDashboard(true);

      /*
      ===================================================
      OBTENER USUARIO AUTENTICADO
      ===================================================
      */

      const response = await fetch("/api/auth/me", {
        method: "GET",

        credentials: "include",

        cache: "no-store",
      });

      const data = await response.json();

      /*
      ===================================================
      VALIDAR RESPUESTA
      ===================================================
      */

      if (!response.ok || !data.success || !data.user || !data.user.role) {
        console.error("No se pudo obtener el usuario autenticado:", data);

        return;
      }

      /*
      ===================================================
      OBTENER ROL
      ===================================================
      */

      const role = data.user.role;

      /*
      ===================================================
      VALIDAR ROL
      ===================================================
      */

      const allowedRoles = ["admin", "teacher", "student"];

      if (!allowedRoles.includes(role)) {
        console.error("Rol no válido:", role);

        return;
      }

      /*
      ===================================================
      REDIRECCIONAR
      ===================================================
      */

      window.location.href = `/${role}/dashboard`;
    } catch (error) {
      console.error("Error obteniendo el usuario autenticado:", error);
    } finally {
      setLoadingDashboard(false);
    }
  };

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
      {/* =================================================
          HEADER
      ================================================= */}

      <div className="px-6 py-5 border-b">
        {/* =================================================
            BOTÓN VOLVER
            SOLO MOBILE
        ================================================= */}

        <button
          type="button"
          onClick={handleBackToDashboard}
          disabled={loadingDashboard}
          className="
            md:hidden
            mb-5
            w-full
            h-11
            rounded-xl
            border
            border-slate-200
            bg-slate-50
            hover:bg-slate-100
            disabled:opacity-50
            disabled:cursor-not-allowed
            text-slate-700
            font-medium
            flex
            items-center
            justify-center
            gap-2
            transition
          "
        >
          <ArrowLeft size={18} />

          {loadingDashboard ? "Volviendo..." : "Volver al dashboard"}
        </button>

        {/* =================================================
            TITULO + NUEVA CONVERSACIÓN
        ================================================= */}

        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Chats</h2>

          <button
            type="button"
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

        {/* =================================================
            BUSCADOR
        ================================================= */}

        <div className="mt-5">
          <SearchConversation />
        </div>
      </div>

      {/* =================================================
          LISTADO DE CONVERSACIONES
      ================================================= */}

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

        {/* =================================================
            NUEVA CONVERSACIÓN
        ================================================= */}

        <NewConversationModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          onConversationCreated={onConversationCreated}
        />
      </div>
    </aside>
  );
}
