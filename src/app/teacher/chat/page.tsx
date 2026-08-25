import ChatLayout from "@/components/chat/ChatLayout";
import Navbar from "../components/Navbar"; // Ajusta la ruta si es necesario
import Sidebar from "../components/Sidebar"; // Ajusta la ruta si es necesario

export default function TeacherChatPage() {
  return (
    <div className="flex h-screen bg-slate-100">
      {/* Sidebar: Oculto en mobile, visible en pantallas medianas o más grandes */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar: Oculto en mobile, visible en pantallas medianas o más grandes */}
        <header className="hidden md:block sticky top-0 z-48">
          <Navbar />
          {/* Nota: Si el Navbar necesita nombre/apellido aquí, deberás obtenerlos de tu estado global o sesión en el cliente */}
        </header>

        <main className="flex-1 overflow-hidden">
          <ChatLayout />
        </main>
      </div>
    </div>
  );
}
