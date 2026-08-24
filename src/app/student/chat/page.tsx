import ChatLayout from "@/components/chat/ChatLayout";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { cookies } from "next/headers";
export default async function StudentChatPage() {
  const cookieStore = await cookies();
  const nombre = cookieStore.get("student_name")?.value;
  const apellido = cookieStore.get("student_lastname")?.value;
  return (
    <div className="flex h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar nombre={nombre} apellido={apellido} />

        <ChatLayout />
      </div>
    </div>
  );
}
