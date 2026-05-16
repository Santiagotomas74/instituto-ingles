import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function Navbar() {
  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <nav className="max-w-7xl mx-auto h-14 px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-blue-600" />

          <h1 className="text-[28px] font-medium text-black">
            English Institute
          </h1>
        </div>

        {/* Links */}
        <ul className="hidden md:flex items-center gap-10 text-[16px] text-gray-800">
          <li>
            <Link href="/" className="hover:text-blue-600 transition">
              Inicio
            </Link>
          </li>

          <li>
            <Link href="/courses" className="hover:text-blue-600 transition">
              Cursos
            </Link>
          </li>

          <li>
            <Link
              href="/methodology"
              className="hover:text-blue-600 transition"
            >
              Metodología
            </Link>
          </li>

          <li>
            <Link
              href="/testimonials"
              className="hover:text-blue-600 transition"
            >
              Testimonios
            </Link>
          </li>

          <li>
            <Link href="/contact" className="hover:text-blue-600 transition">
              Contacto
            </Link>
          </li>
        </ul>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-blue-600 text-[15px] hover:underline"
          >
            Iniciar sesión
          </Link>

          <Link
            href="/register"
            className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              text-[15px]
              px-5
              py-2
              rounded-md
              transition
              shadow-sm
            "
          >
            Inscribirse
          </Link>
        </div>
      </nav>
    </header>
  );
}
