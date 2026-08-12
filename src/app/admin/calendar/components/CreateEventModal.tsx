"use client";

import { X, Globe, School } from "lucide-react";

import { Classroom } from "../types";
import CreateEventForm from "./CreateEventForm";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
  global: boolean;
  classrooms: Classroom[];
  reload: () => void;
};

export default function CreateEventModal({
  open,
  setOpen,
  global,
  classrooms,
  reload,
}: Props) {
  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        bg-black/50
        backdrop-blur-sm
        flex
        items-center
        justify-center
        p-3
        sm:p-4
        md:p-6
        overflow-y-auto
      "
    >
      <div
        className="
          w-full
          max-w-2xl
          rounded-2xl
          sm:rounded-[32px]
          bg-white
          shadow-2xl
          overflow-hidden
          max-h-[90vh]
          flex
          flex-col
          my-auto
        "
      >
        {/* Header */}
        <div
          className="
            bg-gradient-to-r
            from-cyan-600
            to-blue-700
            p-4
            sm:p-6
            text-white
            flex
            items-start
            justify-between
            gap-3
            shrink-0
          "
        >
          <div className="flex items-start sm:items-center gap-3 min-w-0">
            <div
              className="
                h-10
                w-10
                sm:h-14
                sm:w-14
                rounded-xl
                sm:rounded-2xl
                bg-white/20
                flex
                items-center
                justify-center
                shrink-0
              "
            >
              {global ? (
                <Globe className="w-5 h-5 sm:w-7 sm:h-7" />
              ) : (
                <School className="w-5 h-5 sm:w-7 sm:h-7" />
              )}
            </div>

            <div className="min-w-0">
              <h2 className="text-lg sm:text-2xl font-bold leading-tight truncate">
                {global ? "Nueva fecha global" : "Nueva fecha para un aula"}
              </h2>

              <p className="text-xs sm:text-sm text-cyan-100 mt-0.5 sm:mt-1">
                {global
                  ? "Se creará una fecha para todas las aulas del instituto."
                  : "Seleccioná el aula y completá la información."}
              </p>
            </div>
          </div>

          <button
            onClick={() => setOpen(false)}
            aria-label="Cerrar modal"
            className="
              h-8
              w-8
              sm:h-10
              sm:w-10
              rounded-lg
              sm:rounded-xl
              bg-white/15
              hover:bg-white/25
              flex
              items-center
              justify-center
              transition
              shrink-0
            "
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          <CreateEventForm
            global={global}
            classrooms={classrooms}
            closeModal={() => setOpen(false)}
            reload={reload}
          />
        </div>
      </div>
    </div>
  );
}
