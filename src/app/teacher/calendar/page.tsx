import CalendarClient from "./CalendarClient";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function CalendarPage() {
  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      {/* Sidebar Desktop: Visible en md o superior */}
      <div className="hidden md:flex flex-shrink-0 h-full z-50">
        <Sidebar />
      </div>

      {/* Sidebar Mobile: Flotante y oculto en md o superior para no duplicarse */}
      <div className="fixed inset-y-0 left-0 z-50 md:hidden flex-shrink-0 h-full">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* z-40 en lugar de z-48 para que Tailwind lo reconozca */}
        <header className="sticky top-0 z-40 bg-slate-100">
          <Navbar />
        </header>

        <main className="flex-1">
          <CalendarClient />
        </main>
      </div>
    </div>
  );
}
