import Navbar from "../dashboard/components/AdminNavbar";
import AdminSidebar from "../dashboard/components/AdminSidebar";

import ClassroomsClient from "./ClassroomsClient";

export default async function AdminClassroomsPage() {
  const res = await fetch(`${process.env.BACKEND_URL}/api/admin/classrooms`, {
    cache: "no-store",
  });

  const data = await res.json();

  return (
    <main className="min-h-screen bg-slate-100 flex">
      <AdminSidebar />

      <div className="flex-1 min-w-0">
        <Navbar />

        <div>
          <ClassroomsClient classrooms={data.classrooms || []} />
        </div>
      </div>
    </main>
  );
}
