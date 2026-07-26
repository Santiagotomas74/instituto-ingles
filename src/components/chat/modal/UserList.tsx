"use client";

import UserItem, { ChatUser } from "./UserItem";

type Props = {
  users: ChatUser[];
  onSelect: (user: ChatUser) => void;
};

export default function UserList({ users, onSelect }: Props) {
  if (users.length === 0) {
    return (
      <div className="py-10 text-center text-slate-500">
        No se encontraron usuarios.
      </div>
    );
  }

  return (
    <div className="max-h-[450px] overflow-y-auto">
      {users.map((user) => (
        <UserItem
          key={`${user.role}-${user.id}`}
          user={user}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
