"use client";

type Props = {
  typingUsers: string[];
};

export default function TypingIndicator({ typingUsers }: Props) {
  if (typingUsers.length === 0) return null;

  return (
    <div className="px-8 py-2 text-sm text-slate-500 italic">
      Escribiendo...
    </div>
  );
}
