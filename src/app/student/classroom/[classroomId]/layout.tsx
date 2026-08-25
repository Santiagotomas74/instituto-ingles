import { ReactNode } from "react";
import Navbar from "@/app/student/components/Navbar";
import Sidebar from "@/app/student/components/Sidebar";
import { cookies } from "next/headers";
interface Props {
  children: ReactNode;
}

export default async function StudentClassroomLayout({ children }: Props) {
  const cookieStore = await cookies();
  const nombre = cookieStore.get("student_name")?.value;
  const apellido = cookieStore.get("student_lastname")?.value;

  return (
    <div className="flex h-screen bg-slate-100">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar nombre={nombre} apellido={apellido} />

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
