import Profile from "./Profile";
import Navbar from "../components/Navbar";

export default function StudentProfile() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-amber-50/50 to-amber-100/30">
      {/* NAVEGACIÓN */}
      <Navbar />

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12">
        <Profile />
      </main>
    </div>
  );
}
