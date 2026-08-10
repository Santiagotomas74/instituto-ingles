import { ReactNode } from "react";
import Navbar from "@/app/student/components/Navbar";
import Sidebar from "@/app/student/components/Sidebar";

interface Props {
  children: ReactNode;
}

export default function StudentClassroomLayout({ children }: Props) {
  return (
    <div className="flex h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
