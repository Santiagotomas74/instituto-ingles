import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

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
      {/* Sidebar fijo en desktop */}
      <aside className="hidden md:block shrink-0 h-full z-30">
        <Sidebar />
      </aside>

      {/* Columna derecha con scroll independiente */}
      <div className="flex-1 flex flex-col overflow-y-auto min-w-0">
        {/* Navbar superior pegajoso (z-40) */}
        <header className="sticky top-0 z-40 bg-slate-100">
          <Navbar />
        </header>

        {/* Contenido principal con nivel de apilamiento base (z-0) */}
        <main className="flex-1 bg-slate-50 relative z-0">
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
