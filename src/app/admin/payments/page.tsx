import Payments from "./Payments";
import Navbar from "../dashboard/components/AdminNavbar";
import AdminSidebar from "../dashboard/components/AdminSidebar";

export default function PaymentsPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex">
      {/* SIDEBAR FIJO */}
      <aside className="sticky top-0 h-screen shrink-0 z-30">
        <AdminSidebar />
      </aside>

      <div className="flex-1 min-w-0">
        {/* NAVBAR STICKY (z-40) */}
        <header className="sticky top-0 z-40">
          <Navbar />
        </header>

        <div className="relative z-0">
          <Payments />
        </div>
      </div>
    </main>
  );
}
