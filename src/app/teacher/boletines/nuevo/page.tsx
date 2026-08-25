import CreateBoletinForm from "./CreateBoletinForm";
import Navbar from "../../components/Navbar"; // Ajusta la ruta si es necesario
import Sidebar from "../../components/Sidebar";
export default function CreateBoletinPage() {
  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      {/* Sidebar: flotante en mobile, fijo en la estructura en md+ */}
      <div className="hidden md:flex flex-shrink-0 h-full z-50">
        <Sidebar />
      </div>
      <div className="fixed inset-y-0 left-0 z-50 md:static md:flex flex-shrink-0 h-full">
        <Sidebar />
      </div>

      {/* Columna derecha con scroll independiente */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Navbar superior pegajoso */}
        <header className="sticky top-0 z-48 bg-slate-100">
          <Navbar />
        </header>

        {/* Contenido principal de la página */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <CreateBoletinForm />
        </div>
      </div>
    </div>
  );
}
