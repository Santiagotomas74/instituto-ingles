"use client";

import { X } from "lucide-react";

export default function LevelModal({
  level,
  onClose,
}: {
  level: any;
  onClose: () => void;
}) {
  return (
    <div
      className="
        fixed
        inset-0
        z-50
        bg-black/60
        backdrop-blur-sm
        flex
        items-center
        justify-center
        p-6
      "
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          bg-white
          rounded-3xl
          max-w-4xl
          w-full
          max-h-[90vh]
          overflow-y-auto
          shadow-2xl
          p-8
          relative
        "
      >
        <button
          onClick={onClose}
          className="
            absolute
            top-6
            right-6
            text-gray-500
            hover:text-gray-800
            transition
          "
        >
          <X size={28} />
        </button>

        {/* Badge */}
        <div
          className={`
            inline-flex
            px-4
            py-2
            rounded-full
            text-white
            bg-gradient-to-r
            ${level.color}
            mb-6
          `}
        >
          {level.level}
        </div>

        {/* Título */}
        <h2 className="text-4xl font-bold text-gray-900">{level.title}</h2>

        <p className="text-gray-600 text-lg mt-4">{level.description}</p>

        {/* Subtitulo */}
        <div className="mt-10">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            {level.details.subtitle}
          </h3>

          <div
            className="
              bg-slate-50
              border
              border-slate-200
              rounded-2xl
              p-6
              text-gray-700
              leading-8
              whitespace-pre-line
            "
          >
            {level.details.content}
          </div>
        </div>
      </div>
    </div>
  );
}
