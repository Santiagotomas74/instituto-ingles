import ChatLayout from "@/components/chat/ChatLayout";
import Navbar from "../dashboard/components/AdminNavbar";
import Sidebar from "../dashboard/components/AdminSidebar";

export default function AdminChatPage() {
  return (
    <div className="flex h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        <ChatLayout />
      </div>
    </div>
  );
}
