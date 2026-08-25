import Aulas from "../components/Aulas";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function TeacherDashboardPage() {
  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      {/* SIDEBAR DESKTOP */}
      <aside className="hidden md:block shrink-0 h-full z-30">
        <Sidebar />
      </aside>

      {/* COLUMNA DERECHA CON SCROLL */}
      <div className="flex-1 flex flex-col overflow-y-auto min-w-0">
        {/* NAVBAR STICKY (z-40 para superponerse a Aulas) */}
        <header className="sticky top-0 z-40 bg-slate-100">
          <Navbar />
        </header>

        <main className="flex-1 relative z-0">
          <Aulas />
        </main>
      </div>
    </div>
  );
}
