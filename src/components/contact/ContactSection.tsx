// ContactSection.tsx

import { MapPin, Phone, Mail, Clock3 } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="bg-white py-24">
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
              <div className="pt-8 border-t border-gray-200">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h3
                      className="
          text-2xl
          font-semibold
          text-gray-900
        "
                    >
                      Redes Sociales
                    </h3>

                    <p
                      className="
          mt-2
          text-gray-500
          text-[15px]
        "
                    >
                      Seguinos para conocer novedades, eventos y actividades.
                    </p>
                  </div>

                  <div
                    className="
        flex
        flex-col
        sm:flex-row
        gap-4
        w-full
        sm:w-auto
      "
                  >
                    {/* Instagram */}
                    <a
                      href="https://www.instagram.com/i.n.k2010/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
          group
          flex
          items-center
          gap-4
          bg-gradient-to-br
          from-pink-500
          via-fuchsia-500
          to-orange-400
          text-white
          px-5
          py-4
          rounded-2xl
          shadow-lg
          hover:scale-[1.02]
          transition-all
          duration-300
          w-full
          sm:w-auto
        "
                    >
                      <div
                        className="
            w-12
            h-12
            rounded-xl
            bg-white/20
            flex
            items-center
            justify-center
            backdrop-blur-sm
          "
                      >
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
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
                      </div>

                      <div>
                        <p className="text-sm text-white/80">Instagram</p>

                        <span className="font-semibold text-lg">
                          @I.n.k2010
                        </span>
                      </div>
                    </a>

                    {/* Facebook */}
                    <a
                      href="https://www.facebook.com/institutoNK"
                      className="
          group
          flex
          items-center
          gap-4
          bg-blue-600
          hover:bg-blue-700
          text-white
          px-5
          py-4
          rounded-2xl
          shadow-lg
          hover:scale-[1.02]
          transition-all
          duration-300
          w-full
          sm:w-auto
        "
                    >
                      <div
                        className="
            w-12
            h-12
            rounded-xl
            bg-white/15
            flex
            items-center
            justify-center
          "
                      >
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"
                          />
                        </svg>
                      </div>

                      <div>
                        <p className="text-sm text-blue-100">Facebook</p>

                        <span className="font-semibold text-lg">I.N.K</span>
                      </div>
                    </a>
                  </div>
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
    </section>
  );
}
