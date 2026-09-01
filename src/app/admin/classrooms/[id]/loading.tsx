// loading.tsx
import React from "react";

export default function LoadingClassroom() {
  return (
    <main className="min-h-screen bg-slate-100">
      {/* 1. SKELETON DEL HEADER */}
      <div className="w-full bg-white border-b border-slate-200 h-48 md:h-[280px] shadow-sm animate-pulse">
        <div className="max-w-7xl mx-auto p-6 md:px-10 h-full flex flex-col justify-end pb-8">
          {/* Nivel / Badge */}
          <div className="w-24 h-6 bg-slate-200 rounded-md mb-4" />
          {/* Título del Aula */}
          <div className="w-3/4 md:w-1/2 h-10 sm:h-12 bg-slate-300 rounded-xl mb-3" />
          {/* Profesor / Horario */}
          <div className="w-1/2 md:w-1/3 h-5 bg-slate-200 rounded-md" />
        </div>
      </div>

      {/* 2. SKELETON DEL CONTENIDO */}
      <div className="max-w-7xl mx-auto p-6 md:p-10">
        <div className="grid xl:grid-cols-3 gap-8">
          {/* COLUMNA PRINCIPAL (Anuncios y Materiales) */}
          <div className="xl:col-span-2 space-y-8">
            {/* Skeleton Anuncios */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm animate-pulse">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-6 h-6 bg-slate-200 rounded-md" />
                <div className="w-40 h-6 bg-slate-200 rounded-md" />
              </div>
              <div className="space-y-4">
                <div className="h-32 bg-slate-100 rounded-xl w-full" />
                <div className="h-32 bg-slate-100 rounded-xl w-full" />
              </div>
            </div>

            {/* Skeleton Materiales */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm animate-pulse">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-6 h-6 bg-slate-200 rounded-md" />
                <div className="w-32 h-6 bg-slate-200 rounded-md" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="h-24 bg-slate-100 rounded-xl w-full" />
                <div className="h-24 bg-slate-100 rounded-xl w-full" />
                <div className="h-24 bg-slate-100 rounded-xl w-full" />
                <div className="h-24 bg-slate-100 rounded-xl w-full" />
              </div>
            </div>
          </div>

          {/* BARRA LATERAL (Estudiantes) */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm animate-pulse">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-6 h-6 bg-slate-200 rounded-md" />
                <div className="w-28 h-6 bg-slate-200 rounded-md" />
              </div>
              <div className="space-y-5">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-200 shrink-0" />
                    <div className="space-y-2 w-full">
                      <div className="h-4 bg-slate-200 rounded w-3/4" />
                      <div className="h-3 bg-slate-100 rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
