import Calendar from "./components/Calendar";
import Navbar from "../dashboard/components/AdminNavbar";
import AdminSidebar from "../dashboard/components/AdminSidebar";

export default function CalendarPage() {
  return (
    <main className="min-h-screen bg-slate-100 flex">
      {/* SIDEBAR FIJO DESKTOP (z-30) */}
      <aside className="sticky top-0 h-screen shrink-0 z-30">
        <AdminSidebar />
      </aside>

      <div className="flex-1 min-w-0">
        {/* NAVBAR STICKY (z-40 para superponerse al calendario) */}
        <header className="sticky top-0 z-40">
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
            relative
            z-0
          "
        >
          <Calendar />
        </div>
      </div>
    </main>
  );
}
