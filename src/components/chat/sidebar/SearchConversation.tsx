"use client";

import { Search } from "lucide-react";

export default function SearchConversation() {
  return (
    <div className="relative">
      <Search
        size={18}
        className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-slate-400
        "
      />

      <input
        type="text"
        placeholder="Buscar conversación..."
        className="
          w-full
          h-11
          rounded-xl
          border
          border-slate-200
          pl-11
          pr-4
          text-sm
          outline-none
          focus:ring-2
          focus:ring-cyan-500
          text-slate-600
        "
      />
    </div>
  );
}
