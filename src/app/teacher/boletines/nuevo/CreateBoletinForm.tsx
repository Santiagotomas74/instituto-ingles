"use client";

import { useEffect, useMemo, useState } from "react";
import {
  User,
  GraduationCap,
  CalendarDays,
  ClipboardList,
  MessageSquareText,
  Save,
  Loader2,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";

type Student = {
  id: string;
  dni: number;
  nombre: string;
  apellido: string;
  nivel?: string | null;
};

type FormData = {
  student_id: string;

  anio: string;
  nivel: string;

  es_mayor_edad: boolean;

  nota_1: string;
  nota_2: string;
  nota_3: string;

  behaviour_1: string;
  behaviour_2: string;
  behaviour_3: string;

  ausentes: string;
  ausentes_2: string;
  ausentes_3: string;

  observaciones_1: string;
  observaciones_2: string;
  observaciones_3: string;

  behaviour_final: string;
  observaciones_final: string;
};

const initialForm: FormData = {
  student_id: "",

  anio: new Date().getFullYear().toString(),
  nivel: "",

  es_mayor_edad: false,

  nota_1: "",
  nota_2: "",
  nota_3: "",

  behaviour_1: "",
  behaviour_2: "",
  behaviour_3: "",

  ausentes: "",
  ausentes_2: "",
  ausentes_3: "",

  observaciones_1: "",
  observaciones_2: "",
  observaciones_3: "",

  behaviour_final: "",
  observaciones_final: "",
};

export default function CreateBoletinForm() {
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>([]);

  const [form, setForm] = useState<FormData>(initialForm);

  const [loadingStudents, setLoadingStudents] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [successDetails, setSuccessDetails] = useState<{
    studentName: string;
    dni: number;
    anio: string;
  } | null>(null);

  /*
  =====================================
  CARGAR ALUMNOS
  =====================================
  */

  useEffect(() => {
    async function loadStudents() {
      try {
        setLoadingStudents(true);
        setError("");

        const res = await fetch("/api/teacher/boletines/students", {
          cache: "no-store",
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.message || "No se pudieron cargar los alumnos");
        }

        setStudents(data.students || []);
      } catch (error) {
        console.error("Error cargando alumnos:", error);

        setError(
          error instanceof Error
            ? error.message
            : "No se pudieron cargar los alumnos",
        );
      } finally {
        setLoadingStudents(false);
      }
    }

    loadStudents();
  }, []);

  /*
  =====================================
  ALUMNO SELECCIONADO
  =====================================
  */

  const selectedStudent = useMemo(() => {
    return students.find((student) => student.id === form.student_id);
  }, [students, form.student_id]);

  /*
  =====================================
  PROMEDIO
  =====================================
  */

  const promedio = useMemo(() => {
    const notas = [form.nota_1, form.nota_2, form.nota_3]
      .filter((value) => value !== "")
      .map(Number)
      .filter((value) => !Number.isNaN(value));

    if (notas.length === 0) {
      return null;
    }

    return notas.reduce((total, nota) => total + nota, 0) / notas.length;
  }, [form.nota_1, form.nota_2, form.nota_3]);

  /*
  =====================================
  PROMEDIO AUSENCIAS
  =====================================
  */

  const ausentesPromedio = useMemo(() => {
    const ausencias = [form.ausentes, form.ausentes_2, form.ausentes_3]
      .filter((value) => value !== "")
      .map(Number)
      .filter((value) => !Number.isNaN(value));

    if (ausencias.length === 0) {
      return null;
    }

    return (
      ausencias.reduce((total, value) => total + value, 0) / ausencias.length
    );
  }, [form.ausentes, form.ausentes_2, form.ausentes_3]);

  /*
  =====================================
  HANDLE CHANGE
  =====================================
  */

  function updateField<K extends keyof FormData>(field: K, value: FormData[K]) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  /*
  =====================================
  SELECCIONAR ALUMNO
  =====================================
  */

  function handleStudentChange(studentId: string) {
    const student = students.find((item) => item.id === studentId);

    setForm((prev) => ({
      ...prev,

      student_id: studentId,

      nivel: student?.nivel || "",

      es_mayor_edad: false,
    }));
  }

  /*
  =====================================
  LIMPIAR FORMULARIO
  =====================================
  */

  function handleClear() {
    setForm({
      ...initialForm,
      anio: new Date().getFullYear().toString(),
    });

    setError("");
    setSuccess("");
    setSuccessDetails(null);
  }
  /*
  =====================================
  CREAR BOLETÍN
  =====================================
  */

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");

    /*
  =====================================
  VALIDACIONES
  =====================================
  */

    if (!form.student_id) {
      setError("Debes seleccionar un alumno.");
      return;
    }

    if (!selectedStudent) {
      setError("No se pudo obtener la información del alumno seleccionado.");
      return;
    }

    if (!form.anio) {
      setError("Debes indicar el año.");
      return;
    }

    try {
      setSaving(true);

      /*
    =====================================
    ENVIAR DATOS
    =====================================

    El DNI se obtiene del alumno seleccionado
    y se envía explícitamente al backend.
    */

      const res = await fetch("/api/teacher/boletines", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          ...form,

          // DNI del alumno seleccionado
          dni: selectedStudent.dni,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "No se pudo crear el boletín");
      }

      setSuccess("¡Boletín creado correctamente!");

      setSuccessDetails({
        studentName: `${selectedStudent.nombre} ${selectedStudent.apellido}`,
        dni: selectedStudent.dni,
        anio: form.anio,
      });

      /*
    =====================================
    RESET
    =====================================
    */

      setForm({
        ...initialForm,
        anio: new Date().getFullYear().toString(),
      });
    } catch (error) {
      console.error("Error creando boletín:", error);

      setError(
        error instanceof Error ? error.message : "No se pudo crear el boletín",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      {/* =====================================
          MODAL DE ÉXITO
      ===================================== */}
      {success && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="
              relative
              w-full
              max-w-lg
              overflow-hidden
              rounded-3xl
              border
              border-emerald-200
              bg-white
              shadow-2xl
              animate-in
              zoom-in-95
              slide-in-from-bottom-4
              duration-300
            "
          >
            {/* Línea decorativa superior */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-500 to-cyan-500" />

            <div className="p-6 sm:p-8">
              <div className="flex items-start gap-4">
                {/* Icono */}
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                  <CheckCircle2 size={32} />
                </div>

                {/* Contenido principal */}
                <div className="pt-1">
                  <h3 className="text-xl font-bold text-slate-900">
                    {success}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    El boletín fue registrado y guardado correctamente en la
                    base de datos.
                  </p>
                </div>
              </div>

              {/* Detalles del Alumno */}
              {successDetails && (
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Alumno
                    </p>
                    <p className="mt-1 font-bold text-slate-800 line-clamp-1">
                      {successDetails.studentName}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      DNI
                    </p>
                    <p className="mt-1 font-bold text-slate-800">
                      {successDetails.dni}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Año
                    </p>
                    <p className="mt-1 font-bold text-slate-800">
                      {successDetails.anio}
                    </p>
                  </div>
                </div>
              )}

              {/* Botón de Cierre */}
              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setSuccess("");
                    setSuccessDetails(null);
                    router.push("/teacher/boletines");
                  }}
                  className="
                    w-full sm:w-auto
                    rounded-xl
                    bg-emerald-600
                    px-8
                    py-3
                    text-sm
                    font-bold
                    text-white
                    transition
                    hover:bg-emerald-700
                    active:bg-emerald-800
                    focus:outline-none
                    focus:ring-2
                    focus:ring-emerald-500
                    focus:ring-offset-2
                  "
                >
                  Aceptar y Continuar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================
          FORMULARIO PRINCIPAL
      ===================================== */}
      <form onSubmit={handleSubmit} className="space-y-8 pb-10">
        {/* HEADER */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Crear boletín
          </h1>

          <p className="mt-2 text-slate-500">
            Completa la información académica del alumno.
          </p>
        </div>

        {/* MENSAJES DE ERROR */}
        {error && (
          <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
            <AlertCircle size={20} className="shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}

        {/* ALUMNO Y PERÍODO */}
        <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="border-b bg-slate-50 px-6 py-5 flex items-center gap-3">
            <User className="text-cyan-600" />
            <div>
              <h2 className="font-bold text-slate-900">Alumno y período</h2>
              <p className="text-sm text-slate-500">
                Selecciona el alumno al que corresponde el boletín.
              </p>
            </div>
          </div>

          <div className="p-6 grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Alumno *
              </label>

              <div className="relative">
                <select
                  value={form.student_id}
                  onChange={(e) => handleStudentChange(e.target.value)}
                  disabled={loadingStudents}
                  className="
                    w-full
                    h-12
                    appearance-none
                    rounded-xl
                    border
                    border-slate-300
                    bg-white
                    px-4
                    pr-10
                    text-slate-700
                    outline-none
                    focus:border-cyan-500
                    focus:ring-2
                    focus:ring-cyan-100
                    disabled:bg-slate-100
                  "
                >
                  <option value="">
                    {loadingStudents
                      ? "Cargando alumnos..."
                      : "Seleccionar alumno"}
                  </option>

                  {students.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.apellido}, {student.nombre}
                      {" — DNI "}
                      {student.dni}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  className="absolute right-4 top-3.5 text-slate-400 pointer-events-none"
                  size={20}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Año *
              </label>

              <input
                type="number"
                value={form.anio}
                onChange={(e) => updateField("anio", e.target.value)}
                className="
                  w-full
                  h-12
                  rounded-xl
                  border
                  border-slate-300
                  px-4
                  outline-none
                  focus:border-cyan-500
                  focus:ring-2
                  focus:ring-cyan-100
                  text-gray-600
                "
              />
            </div>

            {selectedStudent && (
              <div className="md:col-span-3 grid sm:grid-cols-3 gap-4">
                <div className="rounded-2xl bg-cyan-50 p-4">
                  <p className="text-xs text-cyan-600 font-semibold">Alumno</p>
                  <p className="mt-1 font-bold text-slate-800">
                    {selectedStudent.nombre} {selectedStudent.apellido}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-500 font-semibold">DNI</p>
                  <p className="mt-1 font-bold text-slate-800">
                    {selectedStudent.dni}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-500 font-semibold">Nivel</p>
                  <p className="mt-1 font-bold text-slate-800">
                    {selectedStudent.nivel || "-"}
                  </p>
                </div>
              </div>
            )}

            <label className="flex items-center gap-3 h-12 mt-7 cursor-pointer">
              <input
                type="checkbox"
                checked={form.es_mayor_edad}
                onChange={(e) => updateField("es_mayor_edad", e.target.checked)}
                className="
                  w-5
                  h-5
                  rounded
                  border-slate-300
                  text-cyan-600
                  focus:ring-cyan-500
                "
              />
              <span className="text-sm font-medium text-slate-700">
                Es mayor de edad
              </span>
            </label>
          </div>
        </section>

        {/* CALIFICACIONES */}
        <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="border-b bg-slate-50 px-6 py-5 flex items-center gap-3">
            <GraduationCap className="text-cyan-600" />
            <div>
              <h2 className="font-bold text-slate-900">Calificaciones</h2>
              <p className="text-sm text-slate-500">
                Ingresa las tres calificaciones del período.
              </p>
            </div>
          </div>

          <div className="p-6 grid sm:grid-cols-3 gap-6">
            {[1, 2, 3].map((period) => {
              const field = `nota_${period}` as keyof FormData;
              return (
                <div key={period}>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Nota {period}
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    step="0.01"
                    value={form[field] as string}
                    onChange={(e) => updateField(field, e.target.value)}
                    placeholder="0 - 10"
                    className="
                      w-full
                      h-12
                      rounded-xl
                      border
                      border-slate-300
                      px-4
                      outline-none
                      focus:border-cyan-500
                      focus:ring-2
                      focus:ring-cyan-100
                      text-gray-600
                    "
                  />
                </div>
              );
            })}

            <div className="sm:col-span-3">
              <div className="rounded-2xl bg-cyan-50 border border-cyan-100 p-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-cyan-700">
                    Promedio
                  </p>
                  <p className="text-xs text-cyan-600 mt-1">
                    Calculado automáticamente
                  </p>
                </div>
                <span className="text-3xl font-bold text-cyan-700">
                  {promedio !== null ? promedio.toFixed(2) : "-"}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ASISTENCIA */}
        <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="border-b bg-slate-50 px-6 py-5 flex items-center gap-3">
            <CalendarDays className="text-cyan-600" />
            <div>
              <h2 className="font-bold text-slate-900">Asistencia</h2>
              <p className="text-sm text-slate-500">
                Registra las ausencias de cada período.
              </p>
            </div>
          </div>

          <div className="p-6 grid sm:grid-cols-3 gap-6">
            {[1, 2, 3].map((period) => {
              const field = `ausentes${
                period === 1 ? "" : `_${period}`
              }` as keyof FormData;

              return (
                <div key={period}>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Ausentes {period}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={form[field] as string}
                    onChange={(e) => updateField(field, e.target.value)}
                    placeholder="0"
                    className="
                      w-full
                      h-12
                      rounded-xl
                      border
                      border-slate-300
                      px-4
                      outline-none
                      focus:border-cyan-500
                      focus:ring-2
                      focus:ring-cyan-100
                      text-gray-600
                    "
                  />
                </div>
              );
            })}

            <div className="sm:col-span-3">
              <div className="rounded-2xl bg-orange-50 border border-orange-100 p-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-orange-700">
                    Promedio de ausencias
                  </p>
                  <p className="text-xs text-orange-600 mt-1">
                    Calculado automáticamente
                  </p>
                </div>
                <span className="text-3xl font-bold text-orange-700">
                  {ausentesPromedio !== null
                    ? ausentesPromedio.toFixed(2)
                    : "-"}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* COMPORTAMIENTO */}
        <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="border-b bg-slate-50 px-6 py-5 flex items-center gap-3">
            <ClipboardList className="text-cyan-600" />
            <div>
              <h2 className="font-bold text-slate-900">Comportamiento</h2>
              <p className="text-sm text-slate-500">
                Evaluación del comportamiento del alumno.
              </p>
            </div>
          </div>

          <div className="p-6 grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((period) => {
              const field = `behaviour_${period}` as keyof FormData;
              return (
                <div key={period}>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Comportamiento {period}
                  </label>
                  <select
                    value={form[field] as string}
                    onChange={(e) => updateField(field, e.target.value)}
                    className="
                      w-full
                      h-12
                      rounded-xl
                      border
                      border-slate-300
                      bg-white
                      px-4
                      outline-none
                      focus:border-cyan-500
                      focus:ring-2
                      focus:ring-cyan-100
                      text-gray-600
                    "
                  >
                    <option value="">Seleccionar</option>
                    <option value="Excellent">Excellent</option>
                    <option value="Very Good">Very Good</option>
                    <option value="Good">Good</option>
                    <option value="Needs Improvement">Needs Improvement</option>
                  </select>
                </div>
              );
            })}
          </div>
        </section>

        {/* OBSERVACIONES */}
        <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="border-b bg-slate-50 px-6 py-5 flex items-center gap-3">
            <MessageSquareText className="text-cyan-600" />
            <div>
              <h2 className="font-bold text-slate-900">Observaciones</h2>
              <p className="text-sm text-slate-500">
                Comentarios correspondientes a cada período.
              </p>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {[1, 2, 3].map((period) => {
              const field = `observaciones_${period}` as keyof FormData;
              return (
                <div key={period}>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Observaciones {period}
                  </label>
                  <textarea
                    rows={4}
                    value={form[field] as string}
                    onChange={(e) => updateField(field, e.target.value)}
                    placeholder={`Observaciones del período ${period}...`}
                    className="
                      w-full
                      resize-y
                      rounded-xl
                      border
                      border-slate-300
                      px-4
                      py-3
                      text-slate-700
                      outline-none
                      focus:border-cyan-500
                      focus:ring-2
                      focus:ring-cyan-100
                    "
                  />
                </div>
              );
            })}
          </div>
        </section>

        {/* EVALUACIÓN FINAL */}
        <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="border-b bg-slate-50 px-6 py-5">
            <h2 className="font-bold text-slate-900">Evaluación final</h2>
            <p className="text-sm text-slate-500 mt-1">
              Información final del boletín.
            </p>
          </div>

          <div className="p-6 grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Comportamiento final
              </label>
              <select
                value={form.behaviour_final}
                onChange={(e) => updateField("behaviour_final", e.target.value)}
                className="
                  w-full
                  h-12
                  rounded-xl
                  border
                  border-slate-300
                  bg-white
                  px-4
                  outline-none
                  focus:border-cyan-500
                  focus:ring-2
                  focus:ring-cyan-100
                  text-gray-600
                "
              >
                <option value="">Seleccionar</option>
                <option value="Excellent">Excellent</option>
                <option value="Very Good">Very Good</option>
                <option value="Good">Good</option>
                <option value="Needs Improvement">Needs Improvement</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Observación final
              </label>
              <textarea
                rows={4}
                value={form.observaciones_final}
                onChange={(e) =>
                  updateField("observaciones_final", e.target.value)
                }
                placeholder="Observación final..."
                className="
                  w-full
                  resize-y
                  rounded-xl
                  border
                  border-slate-300
                  px-4
                  py-3
                  text-slate-700
                  outline-none
                  focus:border-cyan-500
                  focus:ring-2
                  focus:ring-cyan-100
                "
              />
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
          <button
            type="button"
            onClick={handleClear}
            disabled={saving}
            className="
              h-12
              px-6
              rounded-xl
              border
              border-slate-300
              bg-white
              hover:bg-slate-50
              text-slate-700
              font-medium
              transition
              disabled:opacity-50
            "
          >
            Limpiar
          </button>

          <button
            type="submit"
            disabled={saving || loadingStudents || !form.student_id}
            className="
              h-12
              px-7
              rounded-xl
              bg-cyan-600
              hover:bg-cyan-700
              active:bg-cyan-800
              disabled:opacity-50
              disabled:cursor-not-allowed
              text-white
              font-semibold
              flex
              items-center
              justify-center
              gap-2
              transition
            "
          >
            {saving ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                <Save size={18} />
                Crear boletín
              </>
            )}
          </button>
        </div>
      </form>
    </>
  );
}
