"use client";

import { useState, useEffect } from "react";
import { X, Gift } from "lucide-react";

export default function BirthdayModal({
  isBirthday,
  role = "student", // Por defecto es estudiante
}: {
  isBirthday: boolean;
  role?: "student" | "teacher";
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isBirthday) {
      setIsOpen(true);
    }
  }, [isBirthday]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-[32px] shadow-2xl max-w-sm w-full p-8 relative text-center animate-in fade-in zoom-in duration-300">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-20 h-20 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
          <Gift className="w-10 h-10" />
        </div>

        <h2 className="text-3xl font-bold text-slate-800 mb-3">
          ¡Feliz Cumpleaños! 🎉
        </h2>

        <p className="text-slate-600 mb-8 leading-relaxed">
          {role === "teacher" ? (
            <>
              De parte de todo el equipo del{" "}
              <strong className="text-cyan-700">Instituto I.N.K</strong> te
              deseamos un excelente día. ¡Gracias por tu dedicación y compromiso
              enseñando con nosotros!
            </>
          ) : (
            <>
              De parte de todo el equipo del{" "}
              <strong className="text-cyan-700">Instituto I.N.K</strong> te
              deseamos un excelente día. ¡Que se cumplan todos tus objetivos
              este año!
            </>
          )}
        </p>

        <button
          onClick={() => setIsOpen(false)}
          className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-6 rounded-2xl transition-all hover:-translate-y-0.5 shadow-lg shadow-cyan-600/30"
        >
          ¡Muchas gracias!
        </button>
      </div>
    </div>
  );
}
