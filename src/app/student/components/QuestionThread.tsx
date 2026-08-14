"use client";

import { useEffect, useState, useRef } from "react";
import {
  ArrowLeft,
  MessageCircle,
  Clock3,
  Loader2,
  X,
  GraduationCap,
  User,
  AlertCircle,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import ReplyBox from "./ReplyBox";

type Props = {
  questionId: string;
  onClose: () => void;
};

type Question = {
  id: string;
  titulo: string;
  contenido: string;
  student_name: string;
  student_lastname: string;
  created_at: string;
};

type Reply = {
  id: string;
  contenido: string;
  created_at: string;
  sender_type: "student" | "teacher";
  student_name?: string;
  student_lastname?: string;
  teacher_name?: string;
  teacher_lastname?: string;
};

export default function QuestionThread({ questionId, onClose }: Props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [question, setQuestion] = useState<Question | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const bottomAnchorRef = useRef<HTMLDivElement>(null);

  // Función para desplazar la vista al final del hilo
  const scrollToBottom = (smooth = true) => {
    if (bottomAnchorRef.current) {
      bottomAnchorRef.current.scrollIntoView({
        behavior: smooth ? "smooth" : "auto",
      });
    }
  };

  /*
  ==========================================
  Cargar hilo completo
  ==========================================
  */
  async function loadThread() {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`/api/student/questions/${questionId}`, {
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "No se pudo obtener la consulta.");
      }

      setQuestion(data.question);
      setReplies(data.replies ?? []);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Ocurrió un error al cargar la conversación.");
    } finally {
      setLoading(false);
    }
  }

  /*
  ==========================================
  Recargar respuestas tras responder
  ==========================================
  */
  async function reloadReplies() {
    try {
      const res = await fetch(`/api/student/questions/${questionId}`, {
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Error al actualizar respuestas.");
      }

      setReplies(data.replies ?? []);
      // Desplazamiento suave al recibir nueva respuesta
      setTimeout(() => scrollToBottom(true), 100);
    } catch (err) {
      console.error("Error al refrescar respuestas:", err);
    }
  }

  /*
  ==========================================
  Efectos: Carga inicial y escucha de tecla Esc
  ==========================================
  */
  useEffect(() => {
    if (!questionId) return;

    loadThread();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [questionId, onClose]);

  // Scroll automático al finalizar la carga inicial
  useEffect(() => {
    if (!loading && question) {
      scrollToBottom(false);
    }
  }, [loading, question]);

  async function handleReplyCreated() {
    await reloadReplies();
  }

  /*
  ==========================================
  Helpers
  ==========================================
  */
  function isTeacher(reply: Reply) {
    return reply.sender_type === "teacher";
  }

  function getAuthor(reply: Reply) {
    if (reply.sender_type === "teacher") {
      return (
        `${reply.teacher_name ?? ""} ${reply.teacher_lastname ?? ""}`.trim() ||
        "Profesor"
      );
    }

    return (
      `${reply.student_name ?? ""} ${reply.student_lastname ?? ""}`.trim() ||
      "Alumno"
    );
  }

  function getInitials(name: string) {
    return (
      name
        .split(" ")
        .filter(Boolean)
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) || "?"
    );
  }

  /*
  ==========================================
  Estado: Cargando
  ==========================================
  */
  if (loading) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 shadow-2xl flex flex-col items-center gap-4 max-w-sm w-full border border-slate-100 text-center">
          <Loader2 size={36} className="text-cyan-600 animate-spin" />
          <div>
            <p className="font-semibold text-slate-800 text-base">
              Cargando conversación
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Obteniendo detalles y respuestas...
            </p>
          </div>
        </div>
      </div>
    );
  }

  /*
  ==========================================
  Estado: Error o Pregunta inexistente
  ==========================================
  */
  if (error || !question) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 shadow-2xl text-center max-w-md w-full border border-slate-100">
          <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={24} />
          </div>
          <h3 className="text-lg font-bold text-slate-800">Error de carga</h3>
          <p className="text-slate-500 text-xs sm:text-sm mt-2 mb-6">
            {error || "No se encontró la consulta solicitada o fue eliminada."}
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={loadThread}
              className="px-5 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm transition-colors"
            >
              Reintentar
            </button>
            <button
              onClick={onClose}
              className="px-5 h-10 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs sm:text-sm transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    );
  }

  /*
  ==========================================
  Modal Completo
  ==========================================
  */
  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-slate-50 rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-4xl max-h-[92vh] overflow-hidden flex flex-col border border-slate-100 my-auto">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-white px-5 sm:px-8 py-4 sm:py-5 shrink-0">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-slate-600 hover:text-cyan-600 font-medium text-xs sm:text-sm transition-colors py-1 px-2 rounded-lg hover:bg-slate-50 -ml-2"
          >
            <ArrowLeft size={18} />
            <span className="hidden sm:inline">Volver a consultas</span>
            <span className="sm:hidden">Volver</span>
          </button>

          <h2 className="text-sm sm:text-base font-bold text-slate-800 truncate max-w-[200px] sm:max-w-xs text-center">
            Hilo de Consulta
          </h2>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors shrink-0"
            aria-label="Cerrar modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* CUERPO DEL HILO CON SCROLL INTERNO */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6"
        >
          {/* Tarjeta de Pregunta Principal */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-5 sm:p-7 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-50 text-cyan-700 border border-cyan-100">
                  <MessageCircle size={14} />
                  Consulta
                </span>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                  {question.titulo}
                </h1>
              </div>

              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-cyan-100/80 text-cyan-700 flex items-center justify-center shrink-0 font-bold text-sm sm:text-base">
                {getInitials(
                  `${question.student_name} ${question.student_lastname}`,
                )}
              </div>
            </div>

            {/* Metadatos del Autor */}
            <div className="flex flex-wrap items-center gap-4 mt-4 text-xs sm:text-sm text-slate-500 pt-4 border-t border-slate-100">
              <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                <User size={15} className="text-slate-400" />
                {question.student_name} {question.student_lastname}
              </span>

              <span className="flex items-center gap-1 text-slate-400">
                <Clock3 size={14} />
                {formatDistanceToNow(new Date(question.created_at), {
                  addSuffix: true,
                  locale: es,
                })}
              </span>
            </div>

            {/* Detalle del Mensaje */}
            <div className="mt-5 text-slate-700 text-xs sm:text-sm whitespace-pre-wrap leading-relaxed bg-slate-50/50 p-4 rounded-xl border border-slate-100">
              {question.contenido}
            </div>
          </div>

          {/* Separador de Respuestas */}
          <div className="flex items-center gap-3 px-2">
            <div className="h-px bg-slate-200 flex-1" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              {replies.length}{" "}
              {replies.length === 1 ? "Respuesta" : "Respuestas"}
            </span>
            <div className="h-px bg-slate-200 flex-1" />
          </div>

          {/* LISTADO DE RESPUESTAS */}
          {replies.length === 0 ? (
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-dashed border-slate-300 p-8 sm:p-12 text-center">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                <MessageCircle size={24} />
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-slate-800">
                Todavía no hay respuestas
              </h3>
              <p className="mt-1 text-xs text-slate-500 max-w-xs mx-auto">
                Sé el primero en responder esta consulta o aguardá la respuesta
                del docente.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {replies.map((reply) => {
                const teacher = isTeacher(reply);
                const authorName = getAuthor(reply);

                return (
                  <div
                    key={reply.id}
                    className={`
                      rounded-2xl sm:rounded-3xl
                      border
                      p-4 sm:p-6
                      shadow-sm
                      transition-all
                      ${
                        teacher
                          ? "bg-cyan-50/60 border-cyan-200/80 text-slate-800"
                          : "bg-white border-slate-200 text-slate-800"
                      }
                    `}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-xs sm:text-sm font-bold shrink-0 ${
                            teacher
                              ? "bg-cyan-600 text-white shadow-sm"
                              : "bg-slate-200 text-slate-600"
                          }`}
                        >
                          {teacher ? (
                            <GraduationCap size={18} />
                          ) : (
                            getInitials(authorName)
                          )}
                        </div>

                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-semibold text-xs sm:text-sm text-slate-900">
                              {authorName}
                            </h4>
                            <span
                              className={`
                                inline-flex
                                items-center
                                px-2.5
                                py-0.5
                                rounded-full
                                text-[10px]
                                sm:text-xs
                                font-bold
                                ${
                                  teacher
                                    ? "bg-cyan-200/60 text-cyan-800"
                                    : "bg-slate-100 text-slate-600"
                                }
                              `}
                            >
                              {teacher ? "Profesor" : "Alumno"}
                            </span>
                          </div>

                          <span className="text-[11px] sm:text-xs text-slate-400 block mt-0.5">
                            {formatDistanceToNow(new Date(reply.created_at), {
                              addSuffix: true,
                              locale: es,
                            })}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap text-slate-700">
                      {reply.contenido}
                    </div>
                  </div>
                );
              })}

              {/* Anchor para desplazamiento suave */}
              <div ref={bottomAnchorRef} />
            </div>
          )}
        </div>

        {/* FOOTER - REPLY BOX */}
        <div className="border-t border-slate-200 bg-white p-4 sm:p-6 shrink-0">
          <ReplyBox
            questionId={questionId}
            onReplyCreated={handleReplyCreated}
          />
        </div>
      </div>
    </div>
  );
}
