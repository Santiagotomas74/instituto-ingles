"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock3, MessageCircle } from "lucide-react";
import Navbar from "@/components/navbar/Navbar";

export default function InscriptionsPage() {
  const [loading, setLoading] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    confirmPhone: "",
    course: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const normalizePhone = (phone: string) => {
    return phone.replace(/\D/g, "");
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    const cleanPhone = normalizePhone(formData.phone);

    const cleanConfirmPhone = normalizePhone(formData.confirmPhone);

    if (cleanPhone !== cleanConfirmPhone) {
      setErrorMessage("Los teléfonos no coinciden.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`/api/inscriptions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: formData.name,
          email: formData.email,
          telefono: cleanPhone,
          curso: formData.course,
          mensaje: formData.message,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.message || "Ocurrió un error.");
        return;
      }

      setSuccessMessage(
        "¡Solicitud enviada correctamente! Nuestro equipo se pondrá en contacto pronto.",
      );

      setFormData({
        name: "",
        email: "",
        phone: "",
        confirmPhone: "",
        course: "",
        message: "",
      });
    } catch (error) {
      console.error(error);

      setErrorMessage("Error al enviar la solicitud.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Navbar />

      <main
        className="
        min-h-screen
        bg-gradient-to-br
        from-slate-950
        via-blue-950
        to-cyan-950
        py-20
        px-5
        relative
        overflow-hidden
      "
      >
        {/* Glow effects */}
        <div
          className="
          absolute
          top-0
          left-0
          w-96
          h-96
          bg-cyan-500/20
          blur-[120px]
          rounded-full
        "
        />

        <div
          className="
          absolute
          bottom-0
          right-0
          w-96
          h-96
          bg-blue-500/20
          blur-[120px]
          rounded-full
        "
        />

        <div
          className="
          max-w-7xl
          mx-auto
          relative
          z-10
        "
        >
          {/* Header */}
          <div className="text-center mb-16">
            <p
              className="
              inline-flex
              items-center
              gap-2
              px-4
              py-2
              rounded-full
              bg-white/10
              border
              border-white/10
              text-cyan-300
              text-sm
              backdrop-blur-md
            "
            >
              <MessageCircle className="w-4 h-4" />
              Inscripciones abiertas
            </p>

            <h1
              className="
              mt-6
              text-4xl
              md:text-6xl
              font-bold
              text-white
              leading-tight
            "
            >
              Comenzá tu camino
              <br />
              en inglés con I.N.K
            </h1>

            <p
              className="
              mt-6
              text-gray-300
              text-lg
              max-w-2xl
              mx-auto
            "
            >
              Completá el formulario y nuestro equipo se pondrá en contacto para
              ayudarte a encontrar el curso ideal según tu nivel y objetivos.
            </p>
          </div>

          {/* Content */}
          <div
            className="
            grid
            lg:grid-cols-2
            gap-10
            items-start
          "
          >
            {/* Form */}
            <div
              className="
              bg-white
              rounded-[32px]
              shadow-2xl
              p-8
              md:p-10
            "
            >
              <h2 className="text-3xl font-bold text-gray-900">
                Formulario de inscripción
              </h2>

              <p className="text-gray-500 mt-2 mb-8">
                Respondemos consultas dentro de las próximas 24 horas.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nombre */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre completo
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    className="
                    w-full
                    h-14
                    px-5
                    rounded-2xl
                    border
                    border-gray-200
                    text-gray-900
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                    transition
                  "
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@gmail.com"
                    className="
                    w-full
                    h-14
                    px-5
                    rounded-2xl
                    border
                    border-gray-200
                    text-gray-900
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                    transition
                  "
                    required
                  />
                </div>

                {/* Teléfono */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+54 11 1234-5678"
                    className="
                    w-full
                    h-14
                    px-5
                    rounded-2xl
                    border
                    border-gray-200
                    text-gray-900
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                    transition
                  "
                  />
                </div>
                {/* Confirmar teléfono */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirmar teléfono
                  </label>

                  <input
                    type="tel"
                    name="confirmPhone"
                    value={formData.confirmPhone}
                    onChange={handleChange}
                    placeholder="+54 11 1234-5678"
                    className="
      w-full
      h-14
      px-5
      rounded-2xl
      border
      border-gray-200
      text-gray-900
      focus:outline-none
      focus:ring-2
      focus:ring-blue-500
      transition
    "
                    required
                  />
                </div>

                {/* Curso */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Curso de interés
                  </label>

                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    className="
                    w-full
                    h-14
                    px-5
                    rounded-2xl
                    border
                    border-gray-200
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                    transition
                    bg-white
                    text-gray-900
                  "
                  >
                    <option value="">Seleccionar</option>
                    <option value="Kids">Kids</option>
                    <option value="Teens">Teens</option>
                    <option value="Adults">Adults</option>
                    <option value="Conversation">Conversation</option>
                    <option value="Cambridge">Cambridge Preparation</option>
                  </select>
                </div>

                {/* Mensaje */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mensaje
                  </label>

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Contanos qué estás buscando y nos contactaremos contigo..."
                    rows={5}
                    className="
                    w-full
                    px-5
                    py-4
                    rounded-2xl
                    border
                    border-gray-200
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                    transition
                    resize-none
                    text-gray-900
                  "
                  />
                </div>
                {/* SUCCESS MESSAGE */}
                {successMessage && (
                  <div
                    className="
      rounded-2xl
      border
      border-emerald-200
      bg-emerald-50
      px-5
      py-4
      text-emerald-700
      text-sm
      font-medium
    "
                  >
                    {successMessage}
                  </div>
                )}

                {/* ERROR MESSAGE */}
                {errorMessage && (
                  <div
                    className="
      rounded-2xl
      border
      border-red-200
      bg-red-50
      px-5
      py-4
      text-red-700
      text-sm
      font-medium
    "
                  >
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="
    w-full
    h-14
    rounded-2xl
    bg-blue-600
    hover:bg-blue-700
    disabled:bg-blue-400
    disabled:cursor-not-allowed
    text-white
    font-semibold
    text-lg
    transition-all
    shadow-lg
    hover:shadow-2xl
    hover:-translate-y-0.5
  "
                >
                  {loading ? "Enviando..." : "Enviar solicitud"}
                </button>
              </form>
            </div>

            {/* Contact Card */}
            <div
              className="
              sticky
              top-24
              rounded-[32px]
              border
              border-white/10
              bg-white/10
              backdrop-blur-xl
              p-8
              text-white
              overflow-hidden
            "
            >
              <div
                className="
                absolute
                inset-0
                bg-gradient-to-br
                from-cyan-400/10
                to-blue-500/10
              "
              />

              <div className="relative z-10">
                <img
                  src="/logo3.png"
                  alt="I.N.K Logo"
                  className="
                  h-24
                  w-auto
                  object-contain
                  mb-8
                "
                />

                <h2 className="text-3xl font-bold leading-tight">
                  Estamos para ayudarte
                </h2>

                <p className="text-gray-300 mt-4 leading-relaxed">
                  Nuestro equipo puede asesorarte sobre niveles, modalidades,
                  horarios y certificaciones Cambridge.
                </p>

                {/* Info */}
                <div className="mt-10 space-y-6">
                  <div className="flex items-start gap-4">
                    <div
                      className="
                      w-12
                      h-12
                      rounded-2xl
                      bg-white/10
                      flex
                      items-center
                      justify-center
                      shrink-0
                    "
                    >
                      <Phone className="w-5 h-5 text-cyan-300" />
                    </div>

                    <div>
                      <p className="text-sm text-gray-400">Teléfono</p>
                      <p className="font-medium">+54 11 1234-5678</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div
                      className="
                      w-12
                      h-12
                      rounded-2xl
                      bg-white/10
                      flex
                      items-center
                      justify-center
                      shrink-0
                    "
                    >
                      <Mail className="w-5 h-5 text-cyan-300" />
                    </div>

                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <p className="font-medium">contacto@institutoink.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div
                      className="
                      w-12
                      h-12
                      rounded-2xl
                      bg-white/10
                      flex
                      items-center
                      justify-center
                      shrink-0
                    "
                    >
                      <MapPin className="w-5 h-5 text-cyan-300" />
                    </div>

                    <div>
                      <p className="text-sm text-gray-400">Ubicación</p>
                      <p className="font-medium">San Miguel, Buenos Aires</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div
                      className="
                      w-12
                      h-12
                      rounded-2xl
                      bg-white/10
                      flex
                      items-center
                      justify-center
                      shrink-0
                    "
                    >
                      <Clock3 className="w-5 h-5 text-cyan-300" />
                    </div>

                    <div>
                      <p className="text-sm text-gray-400">Horarios</p>
                      <p className="font-medium">Lun a Vie · 09:00 a 20:00</p>
                    </div>
                  </div>
                </div>

                {/* Bottom box */}
                <div
                  className="
                  mt-10
                  rounded-3xl
                  bg-white/10
                  border
                  border-white/10
                  p-6
                "
                >
                  <p className="text-sm text-gray-300">
                    ✔ Clases presenciales y online
                  </p>

                  <p className="text-sm text-gray-300 mt-3">
                    ✔ Cursos para niños, adolescentes y adultos
                  </p>

                  <p className="text-sm text-gray-300 mt-3">
                    ✔ Certificaciones Cambridge
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
