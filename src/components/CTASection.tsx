export default function CTASection() {
  return (
    <section
      className="
        bg-gradient-to-r
        from-blue-600
        via-blue-500
        to-blue-700
        py-24
      "
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Title */}
        <h2
          className="
            text-white
            text-5xl
            md:text-6xl
            font-semibold
            tracking-tight
          "
        >
          ¿Listo para comenzar?
        </h2>

        {/* Description */}
        <p
          className="
            mt-6
            text-white/90
            text-xl
            md:text-2xl
            leading-relaxed
          "
        >
          Únete a cientos de estudiantes que ya están mejorando su inglés con
          nosotros
        </p>

        {/* Button */}
        <div className="mt-12">
          <button
            className="
              bg-white
              text-blue-700
              px-10
              py-4
              rounded-xl
              text-xl
              font-medium
              shadow-xl
              hover:bg-gray-100
              hover:scale-105
              transition-all
              duration-300
            "
          >
            Inscribirse ahora
          </button>
        </div>
      </div>
    </section>
  );
}
