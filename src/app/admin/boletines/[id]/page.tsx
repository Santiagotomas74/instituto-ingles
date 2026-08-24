import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";

import AdminBoletinDetail from "./AdminBoletinDetail";
// Ajustá estas rutas según dónde tengas guardados los componentes

import AdminNavbar from "../../dashboard/components/AdminNavbar";
import AdminSidebar from "../../dashboard/components/AdminSidebar";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminBoletinPage({ params }: Props) {
  const { id } = await params;

  const cookieStore = await cookies();
  const role = cookieStore.get("role")?.value;

  if (role !== "admin") {
    redirect("/login");
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const response = await fetch(
    `${baseUrl}/api/admin/boletines/${encodeURIComponent(id)}`,
    {
      method: "GET",
      cache: "no-store",
      headers: {
        Cookie: cookieStore.toString(),
      },
    },
  );

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error("No se pudo obtener el boletín.");
  }

  const data = await response.json();

  if (!data.success || !data.boletin) {
    notFound();
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar fijo a la izquierda */}
      <AdminSidebar />

      {/* Contenedor derecho (Navbar + Contenido) */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Navbar superior */}
        <AdminNavbar />

        {/* Área scrolleable principal */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-4">
          <AdminBoletinDetail boletin={data.boletin} />
        </main>
      </div>
    </div>
  );
}
