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
      p-4
      "
    >
      <div
        className="
        w-full
        max-w-2xl
        rounded-[32px]
        bg-white
        shadow-2xl
        overflow-hidden
        "
      >
        {/* Header */}

        <div
          className="
          bg-gradient-to-r
          from-cyan-600
          to-blue-700
          p-6
          text-white
          flex
          items-start
          justify-between
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
              h-14
              w-14
              rounded-2xl
              bg-white/20
              flex
              items-center
              justify-center
              "
            >
              {global ? <Globe size={28} /> : <School size={28} />}
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                {global ? "Nueva fecha global" : "Nueva fecha para un aula"}
              </h2>

              <p className="text-cyan-100">
                {global
                  ? "Se creará una fecha para todas las aulas del instituto."
                  : "Seleccioná el aula y completá la información."}
              </p>
            </div>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="
            h-10
            w-10
            rounded-xl
            bg-white/15
            hover:bg-white/25
            flex
            items-center
            justify-center
            transition
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}

        <div className="p-6">
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
