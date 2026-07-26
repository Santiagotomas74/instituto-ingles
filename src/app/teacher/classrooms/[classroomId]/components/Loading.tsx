"use client";

import Image from "next/image";

import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div
      className="
min-h-screen
bg-slate-50
flex
flex-col
items-center
justify-center
"
    >
      <Image
        src="/logo2.png"
        alt="Instituto"
        width={140}
        height={140}
        priority
        className="mb-8"
      />

      <Loader2
        size={40}
        className="
animate-spin
text-blue-600
"
      />

      <p
        className="
mt-4
text-slate-600
font-medium
"
      >
        Cargando aula...
      </p>
    </div>
  );
}
