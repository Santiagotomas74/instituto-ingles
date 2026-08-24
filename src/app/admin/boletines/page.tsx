import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import AdminBoletines from "./AdminBoletines";

import AdminNavbar from "../dashboard/components/AdminNavbar";
import AdminSidebar from "../dashboard/components/AdminSidebar";

export default async function AdminBoletinesPage() {
  const cookieStore = await cookies();

  const role = cookieStore.get("role")?.value;

  if (role !== "admin") {
    redirect("/login");
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  /*
  =====================================================
  OBTENER BOLETINES
  =====================================================
  */

  const boletinesResponse = await fetch(`${baseUrl}/api/admin/boletines`, {
    method: "GET",
    cache: "no-store",
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  if (!boletinesResponse.ok) {
    throw new Error("No se pudieron obtener los boletines.");
  }

  const boletinesData = await boletinesResponse.json();

  if (!boletinesData.success) {
    throw new Error(
      boletinesData.message || "No se pudieron obtener los boletines.",
    );
  }

  /*
  =====================================================
  OBTENER PERFIL DEL ADMIN
  =====================================================
  */

  const profileResponse = await fetch(`${baseUrl}/api/admin/profile`, {
    method: "GET",
    cache: "no-store",
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  if (!profileResponse.ok) {
    throw new Error("No se pudo obtener el perfil del administrador.");
  }

  const profileData = await profileResponse.json();

  if (!profileData.success) {
    throw new Error(
      profileData.message || "No se pudo obtener el perfil del administrador.",
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <AdminSidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminNavbar />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <AdminBoletines
            boletines={boletinesData.boletines}
            admin={profileData.admin}
          />
        </main>
      </div>
    </div>
  );
}
