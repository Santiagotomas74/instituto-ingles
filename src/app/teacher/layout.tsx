import { ReactNode } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

interface TeacherDashboardLayoutProps {
  children: ReactNode;
}

export default function TeacherDashboardLayout({
  children,
}: TeacherDashboardLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      <Sidebar />

      <div className="flex-1 flex flex-col h-full">
        {/* Navbar fijo en la parte superior con z-index */}
        <header className="shrink-0 z-10">
          <Navbar />
        </header>

        {/* Solo el área del main tiene scroll */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
