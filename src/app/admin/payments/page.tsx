import Payments from "./Payments";
import Navbar from "../dashboard/components/AdminNavbar";
import AdminSidebar from "../dashboard/components/AdminSidebar";

export default function PaymentsPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex">
      <AdminSidebar />

      <div className="flex-1 min-w-0">
        <Navbar />

        <div>
          <Payments />
        </div>
      </div>
    </main>
  );
}
