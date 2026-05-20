// Footer.tsx

import Link from "next/link";
import { BookOpen, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-4
            gap-14
          "
        >
          {/* Logo */}
          <div>
            <div className="flex items-center gap-3">
              <div
                className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-blue-600
                  flex
                  items-center
                  justify-center
                "
              >
                <BookOpen className="w-6 h-6 text-white" />
              </div>

              <div>
                <h3 className="text-2xl font-semibold">I.N.K</h3>

                <p className="text-sm text-gray-400">Instituto de Inglés</p>
              </div>
            </div>

            <p
              className="
                mt-6
                text-gray-400
                leading-relaxed
                text-[17px]
              "
            >
              Más de 15 años enseñando inglés con una metodología dinámica,
              moderna y orientada a situaciones reales.
            </p>

            <div className="flex items-center gap-4 mt-8">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/i.n.k2010/"
                className="text-white hover:text-gray-300 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"
                  />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="#"
                className="text-white hover:text-gray-300 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xl font-semibold mb-6">Navegación</h4>

            <ul className="space-y-4 text-gray-400">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Inicio
                </Link>
              </li>

              <li>
                <Link href="/courses" className="hover:text-white transition">
                  Cursos
                </Link>
              </li>

              <li>
                <Link
                  href="/methodology"
                  className="hover:text-white transition"
                >
                  Metodología
                </Link>
              </li>

              <li>
                <Link href="/cambridge" className="hover:text-white transition">
                  Cambridge
                </Link>
              </li>

              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="text-xl font-semibold mb-6">Programas</h4>

            <ul className="space-y-4 text-gray-400">
              <li>Inglés para niños</li>
              <li>Inglés para adolescentes</li>
              <li>Inglés para adultos</li>
              <li>Cursos intensivos</li>
              <li>Preparación Cambridge</li>
              <li>Clases online</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xl font-semibold mb-6">Contacto</h4>

            <div className="space-y-5 text-gray-400">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 mt-1 text-blue-400" />

                <div>
                  <p>11 2710-8566</p>
                  <p>11 6981-0175</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 mt-1 text-blue-400" />

                <div>
                  <p>newknowledge@live.com.ar</p>
                  <p>institutoink2010@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1 text-blue-400" />

                <p>
                  Marcos Sastre 4756
                  <br />
                  San Miguel, Buenos Aires
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="
            mt-16
            pt-8
            border-t
            border-white/10
            flex
            flex-col
            md:flex-row
            items-center
            justify-between
            gap-4
          "
        >
          <p className="text-gray-500 text-sm">
            © 2026 I.N.K Instituto de Inglés. Todos los derechos reservados.
          </p>

          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link href="/privacy" className="hover:text-white transition">
              Política de Privacidad
            </Link>

            <Link href="/terms" className="hover:text-white transition">
              Términos y Condiciones
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
