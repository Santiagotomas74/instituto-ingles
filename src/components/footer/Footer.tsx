// Footer.tsx

import Link from "next/link";
import { BookOpen, Phone, Mail, MapPin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

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
                href="https://www.facebook.com/institutoNK"
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

              {/* Mini Map Footer */}
              <div
                className="
    rounded-2xl
    overflow-hidden
    border
    border-white/10
    shadow-lg
    h-[180px]
    w-full
    bg-white/5
    backdrop-blur-sm
  "
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3285.6149704455106!2d-58.753302387921046!3d-34.56330285525341!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bc9632ce631f6b%3A0xf6206d3c20f731f9!2sInstituto%20New%20Knowledge!5e0!3m2!1ses-419!2sar!4v1779404183099!5m2!1ses-419!2sar"
                  width="100%"
                  height="100%"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  className="border-0"
                />
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
        {/* 🔻 SEPARADOR & CRÉDITOS */}
        {/* Cambiamos justify-between por justify-center y ajustamos el gap */}
        <div className="border-t border-[#1E293B] mt-12 pt-8 flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12">
          {/* 👨‍💻 DESARROLLADOR */}
          {/* Quitamos md:text-left para que siempre esté centrado */}
          <div className="text-center text-sm text-gray-400">
            <p>
              Desarrollado por{" "}
              <span className="text-white font-semibold tracking-wide">
                Santiago Taher
              </span>
            </p>
            <p className="mt-1 text-xs">
              Respaldado por{" "}
              <span className="text-gray-300 font-medium">
                ST Tech Solutions
              </span>
            </p>
          </div>

          {/* 🌐 REDES */}
          <div className="flex items-center gap-4">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/santiago-taher-239008317/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="bg-[#162032] text-gray-400 hover:text-white hover:bg-[#0A66C2] p-2.5 rounded-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#0A66C2]/30"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/s_tech.solutions/?hl=es"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="bg-[#162032] text-gray-400 hover:text-white hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] p-2.5 rounded-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-pink-500/30"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/541126042925"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="bg-[#162032] text-gray-400 hover:text-white hover:bg-[#25D366] p-2.5 rounded-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#25D366]/30"
            >
              <FaWhatsapp size={20} />
            </a>

            {/* Web */}
            <a
              href="https://santiago-taher-portafolio.vercel.app/services"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Sitio Web"
              className="bg-[#162032] text-gray-400 hover:text-white hover:bg-indigo-500 p-2.5 rounded-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/30"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" />
                <ellipse cx="12" cy="12" rx="4" ry="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
