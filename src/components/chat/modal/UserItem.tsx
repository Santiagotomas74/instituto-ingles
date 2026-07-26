"use client";

import { User } from "lucide-react";

export type ChatUser = {
  id: string;
  role: "admin" | "teacher" | "student";
  name: string;
  lastname: string;
};

type Props = {
  user: ChatUser;
  onSelect: (user: ChatUser) => void;
};

export default function UserItem({ user, onSelect }: Props) {
  return (
    <button
      onClick={() => onSelect(user)}
      className="
        w-full
        flex
        items-center
        gap-4
        p-4
        hover:bg-slate-50
        transition
        border-b
      "
    >
      <div
        className="
          w-11
          h-11
          rounded-full
          bg-cyan-500
          text-white
          flex
          items-center
          justify-center
        "
      >
        <User size={20} />
      </div>

      <div className="flex-1 text-left">
        <h3 className="font-semibold text-slate-800">
          {user.lastname} {user.name}
        </h3>

        <p className="text-sm text-slate-500 capitalize">{user.role}</p>
      </div>
    </button>
  );
}
