"use client";

import { useState } from "react";
import { Eye, EyeOff, Laptop, Lock, Mail } from "lucide-react";

export default function CampusLoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(formData);

    /*
      ACA:
      fetch("/api/auth/login")
    */
  };

  return (
    <main
      className="
        min-h-screen
        bg-gradient-to-br
        from-slate-950
        via-blue-950
        to-cyan-950
        flex
        items-center
        justify-center
        px-5
        py-10
        relative
        overflow-hidden
      "
    >
      {/* Glow Effects */}
      <div
        className="
          absolute
          top-0
          left-0
          w-[500px]
          h-[500px]
          bg-cyan-500/20
          blur-[140px]
          rounded-full
        "
      />

      <div
        className="
          absolute
          bottom-0
          right-0
          w-[500px]
          h-[500px]
          bg-blue-500/20
          blur-[140px]
          rounded-full
        "
      />

      {/* Card */}
      <div
        className="
          relative
          z-10
          w-full
          max-w-md
        "
      >
        <div
          className="
            bg-white/95
            backdrop-blur-xl
            rounded-[36px]
            shadow-2xl
            overflow-hidden
            border
            border-white/20
          "
        >
          {/* Header */}
          <div
            className="
              bg-gradient-to-r
              from-blue-700
              to-cyan-600
              px-8
              py-10
              text-white
              text-center
            "
          >
            <div
              className="
                w-20
                h-20
                rounded-3xl
                bg-white/15
                backdrop-blur-md
                flex
                items-center
                justify-center
                mx-auto
                mb-6
              "
            >
              <Laptop className="w-10 h-10" />
            </div>

            <h1
              className="
                text-3xl
                font-bold
              "
            >
              Campus Virtual
            </h1>

            <p className="mt-3 text-cyan-100">Accedé a tu cuenta académica</p>
          </div>

          {/* Form */}
          <div className="p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label
                  className="
                    text-sm
                    font-medium
                    text-gray-700
                    mb-2
                    block
                  "
                >
                  Correo electrónico
                </label>

                <div className="relative">
                  <Mail
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      w-5
                      h-5
                      text-gray-400
                    "
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ejemplo@email.com"
                    className="
                      w-full
                      h-14
                      rounded-2xl
                      border
                      border-gray-200
                      pl-12
                      pr-4
                      text-gray-900
                      focus:outline-none
                      focus:ring-2
                      focus:ring-blue-500
                      transition
                    "
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  className="
                    text-sm
                    font-medium
                    text-gray-700
                    mb-2
                    block
                  "
                >
                  Contraseña
                </label>

                <div className="relative">
                  <Lock
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      w-5
                      h-5
                      text-gray-400
                    "
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="
                      w-full
                      h-14
                      rounded-2xl
                      border
                      border-gray-200
                      pl-12
                      pr-14
                      text-gray-900
                      focus:outline-none
                      focus:ring-2
                      focus:ring-blue-500
                      transition
                    "
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="
                      absolute
                      right-4
                      top-1/2
                      -translate-y-1/2
                      text-gray-400
                      hover:text-gray-600
                    "
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot */}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="
                    text-sm
                    text-blue-600
                    hover:text-blue-700
                    font-medium
                  "
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="
                  w-full
                  h-14
                  rounded-2xl
                  bg-gradient-to-r
                  from-blue-600
                  to-cyan-500
                  hover:from-blue-700
                  hover:to-cyan-600
                  text-white
                  font-semibold
                  text-lg
                  shadow-xl
                  transition-all
                  hover:-translate-y-0.5
                "
              >
                Ingresar al campus
              </button>
            </form>

            {/* Footer */}
            <div
              className="
                mt-8
                pt-6
                border-t
                border-gray-100
                text-center
              "
            >
              <p className="text-sm text-gray-500">Instituto de Inglés I.N.K</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
