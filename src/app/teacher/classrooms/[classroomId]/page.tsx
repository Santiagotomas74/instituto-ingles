import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "../../components/Navbar"; // Ajusta la ruta si es necesario
import Sidebar from "../../components/Sidebar"; // Ajusta la ruta si es necesario

import ClassroomHeader from "./components/ClassroomHeader";
import Tabs from "./Tabs";

interface ClassroomPageProps {
  params: Promise<{ classroomId: string }> | { classroomId: string };
}

export default async function ClassroomPage({ params }: ClassroomPageProps) {
  const resolvedParams = await params;
  const classroomId = resolvedParams.classroomId;

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
        <main className="flex-1 bg-slate-50">
          <div className="max-w-7xl mx-auto px-8 py-8">
            <Link
              href="/teacher/dashboard"
              className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8"
            >
              <ArrowLeft size={18} />
              Volver a mis aulas
            </Link>

            <ClassroomHeader classroomId={classroomId} />

            <Tabs classroomId={classroomId} />
          </div>
        </main>
      </div>
    </div>
  );
}
