import ChatLayout from "@/components/chat/ChatLayout";
import ChatTopbar from "../components/ChatTopbar";

export default function StudentChatPage() {
  return (
    <main className="h-screen flex flex-col bg-slate-100">
      <ChatTopbar />

      <div className="flex-1 min-h-0">
        <ChatLayout />
      </div>
    </main>
  );
}
