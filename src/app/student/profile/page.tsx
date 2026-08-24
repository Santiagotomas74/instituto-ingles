import Profile from "./Profile";
import Navbar from "../components/Navbar";
import { cookies } from "next/headers";

export default async function StudentProfile() {
  const cookieStore = await cookies();
  const nombre = cookieStore.get("student_name")?.value;
  const apellido = cookieStore.get("student_lastname")?.value;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-blue-100">
      {/* NAVEGACIÓN FIJA */}
      <header className="sticky top-0 z-50">
        <Navbar nombre={nombre} apellido={apellido} />
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12">
        <Profile />
      </main>
    </div>
  );
}
