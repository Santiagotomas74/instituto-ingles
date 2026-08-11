import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href="https://wa.me/541127108566"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Comunicate con nosotros por WhatsApp"
        className="group flex items-center gap-3"
      >
        {/* Mensaje */}
        <div
          className="
            hidden
            sm:block
            max-w-0
            overflow-hidden
            opacity-0
            translate-x-4
            group-hover:max-w-xs
            group-hover:opacity-100
            group-hover:translate-x-0
            transition-all
            duration-500
            ease-out
          "
        >
          <div
            className="
              whitespace-nowrap
              rounded-xl
              bg-white
              px-4
              py-3
              shadow-xl
              border
              border-gray-100
            "
          >
            <p className="text-sm font-semibold text-slate-800">
              ¿Necesitás ayuda?
            </p>

            <p className="text-xs text-slate-500 mt-0.5">
              Comunicate con nosotros
            </p>
          </div>
        </div>

        {/* Botón WhatsApp */}
        <div
          className="
            relative
            flex
            items-center
            justify-center
            w-14
            h-14
            rounded-full
            bg-[#25D366]
            text-white
            shadow-xl
            shadow-[#25D366]/30
            transition-all
            duration-300
            hover:scale-110
            hover:shadow-[#25D366]/50
          "
        >
          {/* Pulso */}
          <span
            className="
              absolute
              inset-0
              rounded-full
              bg-[#25D366]
              animate-ping
              opacity-20
            "
          />

          <FaWhatsapp size={30} className="relative z-10" />
        </div>
      </a>
    </div>
  );
}
