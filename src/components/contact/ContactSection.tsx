// ContactSection.tsx

import { MapPin, Phone, Mail, Clock3 } from "lucide-react";

export default function ContactSection() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className="
              text-5xl
              md:text-6xl
              font-semibold
              tracking-tight
              text-gray-900
            "
          >
            Contactanos
          </h2>

          <p
            className="
              mt-6
              text-xl
              text-gray-600
              max-w-3xl
              mx-auto
              leading-relaxed
            "
          >
            Estamos para ayudarte a encontrar el curso ideal para vos
          </p>
        </div>

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-12
            items-start
          "
        >
          {/* Left */}
          <div
            className="
              bg-[#f8fafc]
              border
              border-gray-100
              rounded-3xl
              p-10
              shadow-sm
            "
          >
            <div className="space-y-8">
              {/* Address */}
              <div className="flex items-start gap-5">
                <div
                  className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-blue-100
                    text-blue-700
                    flex
                    items-center
                    justify-center
                    shrink-0
                  "
                >
                  <MapPin className="w-7 h-7" />
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-gray-900">
                    Dirección
                  </h3>

                  <p className="mt-2 text-lg text-gray-600 leading-relaxed">
                    Marcos Sastre 4756
                    <br />
                    San Miguel, Buenos Aires
                  </p>
                </div>
              </div>

              {/* Phones */}
              <div className="flex items-start gap-5">
                <div
                  className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-blue-100
                    text-blue-700
                    flex
                    items-center
                    justify-center
                    shrink-0
                  "
                >
                  <Phone className="w-7 h-7" />
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-gray-900">
                    Teléfonos
                  </h3>

                  <div className="mt-2 space-y-1 text-lg text-gray-600">
                    <p>11 2710-8566</p>
                    <p>11 6981-0175</p>
                  </div>
                </div>
              </div>

              {/* Emails */}
              <div className="flex items-start gap-5">
                <div
                  className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-blue-100
                    text-blue-700
                    flex
                    items-center
                    justify-center
                    shrink-0
                  "
                >
                  <Mail className="w-7 h-7" />
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-gray-900">
                    Emails
                  </h3>

                  <div className="mt-2 space-y-1 text-lg text-gray-600 break-all">
                    <p>newknowledge@live.com.ar</p>
                    <p>institutoink2010@gmail.com</p>
                  </div>
                </div>
              </div>

              {/* Schedule */}
              <div className="flex items-start gap-5">
                <div
                  className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-blue-100
                    text-blue-700
                    flex
                    items-center
                    justify-center
                    shrink-0
                  "
                >
                  <Clock3 className="w-7 h-7" />
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-gray-900">
                    Horarios
                  </h3>

                  <div className="mt-2 space-y-1 text-lg text-gray-600">
                    <p>Lunes a viernes: 17:00 a 20:30 hs</p>
                    <p>Sábados: 08:30 a 13:30 hs</p>
                  </div>
                </div>
              </div>

              {/* Socials */}
              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-2xl font-semibold text-gray-900">
                  Redes Sociales
                </h3>

                <div className="flex items-center gap-4 mt-5">
                  <a
                    href="#"
                    className="
                      flex
                      items-center
                      gap-3
                      bg-white
                      border
                      border-gray-200
                      px-5
                      py-3
                      rounded-2xl
                      hover:border-blue-500
                      hover:shadow-md
                      transition-all
                    "
                  >
                    {/* Instagram */}
                    <a
                      href="https://www.instagram.com/i.n.k2010/"
                      className="text-white hover:text-pink-300 transition-colors"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                      >
                        <rect
                          width="20"
                          height="20"
                          x="2"
                          y="2"
                          rx="5"
                          ry="5"
                        />

                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"
                        />
                      </svg>
                    </a>

                    <span className="font-medium text-gray-700">
                      @I.n.k2010
                    </span>
                  </a>

                  <a
                    href="#"
                    className="
                      flex
                      items-center
                      gap-3
                      bg-white
                      border
                      border-gray-200
                      px-5
                      py-3
                      rounded-2xl
                      hover:border-blue-500
                      hover:shadow-md
                      transition-all
                    "
                  >
                    {/* Facebook */}
                    <a
                      href="#"
                      className="text-white text-blue-300 hover:text-blue-300 transition-colors"
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

                    <span className="font-medium text-gray-700">I.N.K</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div
            className="
              rounded-3xl
              overflow-hidden
              border
              border-gray-100
              shadow-sm
              h-[650px]
            "
          >
            <iframe
              src="https://www.google.com/maps?q=Marcos+Sastre+4756+San+Miguel+Buenos+Aires&output=embed"
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
    </section>
  );
}
