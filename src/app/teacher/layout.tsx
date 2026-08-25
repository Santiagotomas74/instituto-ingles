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
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
