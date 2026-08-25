import Calendar from "./components/Calendar";
import Navbar from "../dashboard/components/AdminNavbar";
import AdminSidebar from "../dashboard/components/AdminSidebar";

export default function CalendarPage() {
  return (
    <main className="min-h-screen bg-slate-100 flex">
      {/* Oculto en mobile, visible desde pantallas medianas (768px+) */}
      <div className="hidden md:flex">
        <AdminSidebar />
      </div>

      <div className="flex-1 min-w-0">
        {/* Oculto en mobile, visible desde pantallas medianas (768px+) */}
        <header className="hidden md:block sticky top-0 z-45">
          <Navbar />
        </header>

        <div
          className="
            max-w-7xl
            mx-auto
            px-4
            sm:px-6
            lg:px-8
            py-8
          "
        >
          <Calendar />
        </div>
      </div>
    </main>
  );
}
