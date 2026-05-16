export default function Hero() {
  return (
    <section
      className="
        w-full
        bg-gradient-to-r
        from-blue-700
        via-blue-600
        to-blue-900
        py-28
      "
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl">
          {/* Title */}
          <h1
            className="
              text-white
              text-5xl
              md:text-7xl
              font-light
              leading-tight
              tracking-tight
            "
          >
            Aprende inglés con un
            <br />
            método moderno y efectivo
          </h1>

          {/* Description */}
          <p
            className="
              mt-8
              text-white/90
              text-lg
              md:text-xl
              leading-relaxed
              max-w-2xl
            "
          >
            Clases personalizadas, profesores certificados y una plataforma
            académica diseñada para tu éxito.
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-4 mt-10">
            <button
              className="
                bg-white
                text-blue-700
                px-7
                py-3
                rounded-md
                text-lg
                font-medium
                hover:bg-gray-100
                transition
                shadow-lg
              "
            >
              Comenzar ahora
            </button>

            <button
              className="
                border
                border-white
                text-white
                px-7
                py-3
                rounded-md
                text-lg
                font-medium
                hover:bg-white
                hover:text-blue-700
                transition
              "
            >
              Conocer más
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
