import ChatLayout from "@/components/chat/ChatLayout";
import AdminNavbar from "../dashboard/components/AdminNavbar";

export default function StudentChatPage() {
  return (
    <main className="h-screen flex flex-col bg-slate-100">
      <AdminNavbar />

      <div className="flex-1 min-h-0">
        <ChatLayout />
      </div>
    </main>
  );
}
