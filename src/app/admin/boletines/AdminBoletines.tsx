"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  FileText,
  User,
  GraduationCap,
  CalendarDays,
  Eye,
  X,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Loader2,
  PenLine,
} from "lucide-react";
import FirmaAdmin from "./FirmaAdmin"; // Ajustá la ruta

export type AdminProfileData = {
  id: string;
  nombre: string | null;
  apellido: string | null;
  email: string | null;
  firma_url: string | null;
};

export type ConfirmacionBoletin = {
  id: string;
  nombre: string;
  apellido: string;
  dni: number;
  fecha_confirmacion: string;
};

export type AdminBoletin = {
  id: string;
  teacher_id: string;
  dni: number | string | null;
  estudiante_nombre: string | null;
  estudiante_apellido: string | null;
  profesor_nombre: string | null;
  profesor_apellido: string | null;
  anio: number | null;
  nivel: string | null;
  es_mayor_edad: boolean | null;
  nota_1: number | null;
  nota_2: number | null;
  nota_3: number | null;
  promedio: number | null;
  behaviour_1: string | null;
  behaviour_2: string | null;
  behaviour_3: string | null;
  ausentes: number | null;
  ausentes_2: number | null;
  ausentes_3: number | null;
  ausentes_promedio: number | null;
  observaciones_1: string | null;
  observaciones_2: string | null;
  observaciones_3: string | null;
  behaviour_final: string | null;
  observaciones_final: string | null;
  habilitado: boolean;
  created_at: string | null;
  updated_at: string | null;
  teacher_nombre: string | null;
  teacher_apellido: string | null;
  teacher_email: string | null;
  teacher_firma_url: string | null;
  confirmaciones?: ConfirmacionBoletin[]; // <-- Agregado
};

type Props = {
  boletines: AdminBoletin[];
  admin: AdminProfileData;
};

export default function AdminBoletines({ boletines, admin }: Props) {
  const router = useRouter();
  const [habilitandoId, setHabilitandoId] = useState<string | null>(null);
  const [boletinSuccess, setBoletinSuccess] = useState("");
  const [boletinError, setBoletinError] = useState("");
  const [search, setSearch] = useState("");

  const filteredBoletines = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    if (!normalizedSearch) {
      return boletines;
    }
    return boletines.filter((boletin) => {
      const estudiante = [
        boletin.estudiante_nombre,
        boletin.estudiante_apellido,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      const profesor = [
        boletin.teacher_nombre ?? boletin.profesor_nombre,
        boletin.teacher_apellido ?? boletin.profesor_apellido,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      const dni = String(boletin.dni ?? "").toLowerCase();
      const nivel = String(boletin.nivel ?? "").toLowerCase();
      const anio = String(boletin.anio ?? "").toLowerCase();

      return (
        estudiante.includes(normalizedSearch) ||
        profesor.includes(normalizedSearch) ||
        dni.includes(normalizedSearch) ||
        nivel.includes(normalizedSearch) ||
        anio.includes(normalizedSearch)
      );
    });
  }, [boletines, search]);

  const handleHabilitarBoletin = async (boletinId: string) => {
    if (habilitandoId) return;
    setBoletinError("");
    setBoletinSuccess("");
    setHabilitandoId(boletinId);

    try {
      const response = await fetch(
        `/api/admin/boletines/${boletinId}/habilitar`,
        { method: "PATCH" },
      );
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "No se pudo habilitar el boletín.");
      }
      setBoletinSuccess("Boletín habilitado correctamente.");
      router.refresh();
    } catch (error) {
      console.error("Error habilitando boletín:", error);
      setBoletinError(
        error instanceof Error
          ? error.message
          : "No se pudo habilitar el boletín.",
      );
    } finally {
      setHabilitandoId(null);
    }
  };

  const handleDeshabilitarBoletin = async (boletinId: string) => {
    if (habilitandoId) return;
    setBoletinError("");
    setBoletinSuccess("");
    setHabilitandoId(boletinId);

    try {
      const response = await fetch(
        `/api/admin/boletines/${boletinId}/deshabilitar`,
        { method: "PATCH" },
      );
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "No se pudo deshabilitar el boletín.");
      }
      setBoletinSuccess("Boletín deshabilitado correctamente.");
      router.refresh();
    } catch (error) {
      console.error("Error deshabilitando boletín:", error);
      setBoletinError(
        error instanceof Error
          ? error.message
          : "No se pudo deshabilitar el boletín.",
      );
    } finally {
      setHabilitandoId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-10">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Boletines</h1>
        <p className="text-sm text-slate-500 mt-1">
          Consulta todos los boletines creados por los profesores y administra
          tu firma.
        </p>
      </div>

      <FirmaAdmin admin={admin} />

      {/* Alertas de Éxito y Error */}
      {(boletinError || boletinSuccess) && (
        <div className="flex flex-col gap-3">
          {boletinError && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center justify-between gap-3 shadow-sm">
              <div className="flex items-center gap-3">
                <AlertCircle size={18} />
                <span>{boletinError}</span>
              </div>
              <button
                onClick={() => setBoletinError("")}
                className="hover:text-red-900"
              >
                <X size={18} />
              </button>
            </div>
          )}
          {boletinSuccess && (
            <div className="p-4 rounded-2xl bg-green-50 border border-green-200 text-green-700 text-sm flex items-center justify-between gap-3 shadow-sm">
              <div className="flex items-center gap-3">
                <CheckCircle2 size={18} />
                <span>{boletinSuccess}</span>
              </div>
              <button
                onClick={() => setBoletinSuccess("")}
                className="hover:text-green-900"
              >
                <X size={18} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Sección de Gestión de Boletines */}
      <section className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
        {/* Header de la Tabla y Buscador */}
        <div className="border-b border-slate-200 bg-slate-50 px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-indigo-100 flex items-center justify-center">
              <FileText size={22} className="text-indigo-600" />
            </div>
            <div>
              <h2 className="font-bold text-slate-900">Gestión de Boletines</h2>
              <p className="text-sm text-slate-500">
                {filteredBoletines.length}{" "}
                {filteredBoletines.length === 1
                  ? "boletín encontrado"
                  : "boletines encontrados"}
              </p>
            </div>
          </div>

          <div className="relative w-full sm:w-72">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Buscar por alumno, profesor , nivel..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-black pl-10 pr-4 h-11 rounded-xl border border-slate-200 bg-white text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
            />
          </div>
        </div>

        {/* Tabla de Boletines */}
        {/* Tabla / Cards de Boletines */}
        <div>
          {/* =========================
      DESKTOP - TABLA
  ========================== */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-200">
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Estudiante
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Curso
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Profesor
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Estado
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Firmas
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">
                    Acciones
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredBoletines.length > 0 ? (
                  filteredBoletines.map((boletin) => {
                    const alumnoNombreCompleto =
                      [boletin.estudiante_nombre, boletin.estudiante_apellido]
                        .filter(Boolean)
                        .join(" ") || "Sin nombre";

                    const profeNombreCompleto =
                      [
                        boletin.teacher_nombre ?? boletin.profesor_nombre,
                        boletin.teacher_apellido ?? boletin.profesor_apellido,
                      ]
                        .filter(Boolean)
                        .join(" ") || "No asignado";

                    return (
                      <tr
                        key={boletin.id}
                        className="hover:bg-slate-50/50 transition-colors"
                      >
                        {/* ESTUDIANTE */}
                        <td className="px-6 py-4 align-top">
                          <div className="flex items-center gap-3 min-w-[220px]">
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                              <User size={18} className="text-slate-500" />
                            </div>

                            <div className="min-w-0">
                              <p className="font-medium text-slate-900 truncate">
                                {alumnoNombreCompleto}
                              </p>

                              <p className="text-xs text-slate-500 mt-0.5">
                                DNI: {boletin.dni || "N/A"}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* CURSO */}
                        <td className="px-6 py-4 align-top">
                          <div className="space-y-1 min-w-[130px]">
                            <div className="flex items-center gap-1.5 text-sm text-slate-700">
                              <GraduationCap
                                size={14}
                                className="text-indigo-400 flex-shrink-0"
                              />

                              <span className="truncate">
                                {boletin.nivel || "N/A"}
                              </span>
                            </div>

                            <div className="flex items-center gap-1.5 text-xs text-slate-500">
                              <CalendarDays
                                size={14}
                                className="text-slate-400 flex-shrink-0"
                              />

                              <span>Año: {boletin.anio || "N/A"}</span>
                            </div>
                          </div>
                        </td>

                        {/* PROFESOR */}
                        <td className="px-6 py-4 align-top">
                          <span className="text-sm text-slate-700 font-medium whitespace-nowrap">
                            {profeNombreCompleto}
                          </span>
                        </td>

                        {/* ESTADO */}
                        <td className="px-6 py-4 align-top">
                          {boletin.habilitado ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium border border-green-200 whitespace-nowrap">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                              Habilitado
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium border border-slate-200 whitespace-nowrap">
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                              Oculto
                            </span>
                          )}
                        </td>

                        {/* FIRMAS */}
                        <td className="px-6 py-4 align-top">
                          {boletin.confirmaciones &&
                          boletin.confirmaciones.length > 0 ? (
                            <div className="space-y-2 min-w-[150px]">
                              <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-200">
                                <CheckCircle2 size={14} />
                                {boletin.confirmaciones.length}{" "}
                                {boletin.confirmaciones.length === 1
                                  ? "Firma"
                                  : "Firmas"}
                              </span>

                              <div className="flex flex-col gap-2 mt-1">
                                {boletin.confirmaciones.map((conf) => (
                                  <div key={conf.id} className="text-xs">
                                    <p className="font-medium text-slate-700">
                                      {conf.nombre} {conf.apellido}
                                    </p>

                                    <p className="text-slate-500">
                                      DNI: {conf.dni}
                                    </p>

                                    <p className="text-slate-400 text-[10px] mt-0.5">
                                      {new Date(
                                        conf.fecha_confirmacion,
                                      ).toLocaleDateString("es-AR", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                      })}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-50 text-slate-500 text-xs font-medium border border-slate-200 whitespace-nowrap">
                              <PenLine size={14} />
                              Sin firmar
                            </span>
                          )}
                        </td>

                        {/* ACCIONES */}
                        <td className="px-6 py-4 align-top">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/admin/boletines/${boletin.id}`}
                              className="p-2.5 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-xl transition-colors"
                              title="Ver detalles"
                            >
                              <Eye size={18} />
                            </Link>

                            {boletin.habilitado ? (
                              <button
                                onClick={() =>
                                  handleDeshabilitarBoletin(boletin.id)
                                }
                                disabled={habilitandoId !== null}
                                className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors disabled:opacity-50"
                                title="Deshabilitar (ocultar)"
                              >
                                {habilitandoId === boletin.id ? (
                                  <Loader2
                                    size={18}
                                    className="animate-spin text-slate-400"
                                  />
                                ) : (
                                  <XCircle size={18} />
                                )}
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  handleHabilitarBoletin(boletin.id)
                                }
                                disabled={habilitandoId !== null}
                                className="p-2.5 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-xl transition-colors disabled:opacity-50"
                                title="Habilitar (publicar)"
                              >
                                {habilitandoId === boletin.id ? (
                                  <Loader2
                                    size={18}
                                    className="animate-spin text-slate-400"
                                  />
                                ) : (
                                  <CheckCircle2 size={18} />
                                )}
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-50 mb-4">
                        <Search size={28} className="text-slate-400" />
                      </div>

                      <p className="text-slate-900 font-medium">
                        No se encontraron boletines
                      </p>

                      <p className="text-slate-500 text-sm mt-1">
                        {search
                          ? "Probá buscando con otros términos."
                          : "Todavía no hay boletines cargados en el sistema."}
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* =========================
      MOBILE - CARDS
  ========================== */}
          <div className="md:hidden">
            {filteredBoletines.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {filteredBoletines.map((boletin) => {
                  const alumnoNombreCompleto =
                    [boletin.estudiante_nombre, boletin.estudiante_apellido]
                      .filter(Boolean)
                      .join(" ") || "Sin nombre";

                  const profeNombreCompleto =
                    [
                      boletin.teacher_nombre ?? boletin.profesor_nombre,
                      boletin.teacher_apellido ?? boletin.profesor_apellido,
                    ]
                      .filter(Boolean)
                      .join(" ") || "No asignado";

                  const cantidadFirmas = boletin.confirmaciones?.length ?? 0;

                  return (
                    <article key={boletin.id} className="p-4 sm:p-5 bg-white">
                      {/* Cabecera de la card */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-11 h-11 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0">
                            <User size={19} className="text-indigo-500" />
                          </div>

                          <div className="min-w-0">
                            <h3 className="font-semibold text-slate-900 leading-tight truncate">
                              {alumnoNombreCompleto}
                            </h3>

                            <p className="text-xs text-slate-500 mt-1">
                              DNI: {boletin.dni || "N/A"}
                            </p>
                          </div>
                        </div>

                        {/* Estado */}
                        {boletin.habilitado ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-50 text-green-700 text-[11px] font-medium border border-green-200 whitespace-nowrap flex-shrink-0">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            Habilitado
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-slate-100 text-slate-600 text-[11px] font-medium border border-slate-200 whitespace-nowrap flex-shrink-0">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                            Oculto
                          </span>
                        )}
                      </div>

                      {/* Información principal */}
                      <div className="mt-4 grid grid-cols-2 gap-3">
                        <div className="rounded-2xl bg-slate-50 border border-slate-100 p-3">
                          <p className="text-[10px] uppercase tracking-wide font-semibold text-slate-400">
                            Curso
                          </p>

                          <div className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700">
                            <GraduationCap
                              size={15}
                              className="text-indigo-500 flex-shrink-0"
                            />

                            <span className="truncate">
                              {boletin.nivel || "N/A"}
                            </span>
                          </div>

                          <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                            <CalendarDays
                              size={13}
                              className="text-slate-400 flex-shrink-0"
                            />

                            <span>Año: {boletin.anio || "N/A"}</span>
                          </div>
                        </div>

                        <div className="rounded-2xl bg-slate-50 border border-slate-100 p-3">
                          <p className="text-[10px] uppercase tracking-wide font-semibold text-slate-400">
                            Profesor
                          </p>

                          <div className="mt-1.5 flex items-start gap-1.5 text-sm font-medium text-slate-700">
                            <User
                              size={15}
                              className="text-slate-400 flex-shrink-0 mt-0.5"
                            />

                            <span className="line-clamp-2">
                              {profeNombreCompleto}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Firmas */}
                      <div className="mt-3 rounded-2xl border border-slate-100 bg-slate-50 p-3">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <PenLine
                              size={15}
                              className={
                                cantidadFirmas > 0
                                  ? "text-emerald-600"
                                  : "text-slate-400"
                              }
                            />

                            <span className="text-xs font-semibold text-slate-600">
                              Firmas
                            </span>
                          </div>

                          {cantidadFirmas > 0 ? (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-[11px] font-medium border border-emerald-200">
                              <CheckCircle2 size={13} />
                              {cantidadFirmas}{" "}
                              {cantidadFirmas === 1 ? "firma" : "firmas"}
                            </span>
                          ) : (
                            <span className="text-[11px] text-slate-400">
                              Sin firmar
                            </span>
                          )}
                        </div>

                        {cantidadFirmas > 0 && (
                          <div className="mt-3 space-y-2">
                            {boletin.confirmaciones?.map((conf) => (
                              <div
                                key={conf.id}
                                className="rounded-xl bg-white border border-slate-100 p-3"
                              >
                                <div className="flex items-start justify-between gap-3">
                                  <div className="min-w-0">
                                    <p className="text-xs font-semibold text-slate-700">
                                      {conf.nombre} {conf.apellido}
                                    </p>

                                    <p className="text-[11px] text-slate-500 mt-0.5">
                                      DNI: {conf.dni}
                                    </p>
                                  </div>

                                  <span className="text-[10px] text-slate-400 whitespace-nowrap">
                                    {new Date(
                                      conf.fecha_confirmacion,
                                    ).toLocaleDateString("es-AR", {
                                      day: "2-digit",
                                      month: "short",
                                      year: "numeric",
                                    })}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Acciones */}
                      <div className="mt-4 grid grid-cols-2 gap-2">
                        <Link
                          href={`/admin/boletines/${boletin.id}`}
                          className="h-11 inline-flex items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 text-indigo-700 text-sm font-medium hover:bg-indigo-100 transition-colors"
                        >
                          <Eye size={17} />
                          Ver boletín
                        </Link>

                        {boletin.habilitado ? (
                          <button
                            onClick={() =>
                              handleDeshabilitarBoletin(boletin.id)
                            }
                            disabled={habilitandoId !== null}
                            className="h-11 inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 text-red-700 text-sm font-medium hover:bg-red-100 transition-colors disabled:opacity-50"
                          >
                            {habilitandoId === boletin.id ? (
                              <Loader2 size={17} className="animate-spin" />
                            ) : (
                              <XCircle size={17} />
                            )}
                            Ocultar
                          </button>
                        ) : (
                          <button
                            onClick={() => handleHabilitarBoletin(boletin.id)}
                            disabled={habilitandoId !== null}
                            className="h-11 inline-flex items-center justify-center gap-2 rounded-xl border border-green-200 bg-green-50 text-green-700 text-sm font-medium hover:bg-green-100 transition-colors disabled:opacity-50"
                          >
                            {habilitandoId === boletin.id ? (
                              <Loader2 size={17} className="animate-spin" />
                            ) : (
                              <CheckCircle2 size={17} />
                            )}
                            Publicar
                          </button>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="px-5 py-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-50 mb-4">
                  <Search size={28} className="text-slate-400" />
                </div>

                <p className="text-slate-900 font-medium">
                  No se encontraron boletines
                </p>

                <p className="text-slate-500 text-sm mt-1">
                  {search
                    ? "Probá buscando con otros términos."
                    : "Todavía no hay boletines cargados en el sistema."}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
