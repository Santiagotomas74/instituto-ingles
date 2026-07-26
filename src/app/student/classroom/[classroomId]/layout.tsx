import { ReactNode } from "react";
import Navbar from "@/app/student/components/Navbar";
import Sidebar from "@/app/student/components/Sidebar";

interface Props {
  children: ReactNode;
}

export default function StudentClassroomLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
