import ChatLayout from "@/components/chat/ChatLayout";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function StudentChatPage() {
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
