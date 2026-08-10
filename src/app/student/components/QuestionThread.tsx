"use client";

import { useEffect, useState } from "react";

import { ArrowLeft, MessageCircle, Clock3 } from "lucide-react";

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

  const [question, setQuestion] = useState<Question | null>(null);

  const [replies, setReplies] = useState<Reply[]>([]);

  /*
  ==========================================
  Cargar hilo completo
  ==========================================
  */

  async function loadThread() {
    try {
      setLoading(true);

      const res = await fetch(`/api/student/questions/${questionId}`, {
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message);
      }

      setQuestion(data.question);

      setReplies(data.replies);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  /*
  ==========================================
  Recargar respuestas
  ==========================================
  */

  async function reloadReplies() {
    try {
      const res = await fetch(`/api/student/questions/${questionId}`, {
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message);
      }

      setReplies(data.replies);
    } catch (err) {
      console.error(err);
    }
  }

  /*
  ==========================================
  useEffect
  ==========================================
  */

  useEffect(() => {
    if (!questionId) return;

    loadThread();
  }, [questionId]);

  /*
  ==========================================
  Cuando se crea una respuesta
  ==========================================
  */

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
      return `${reply.teacher_name ?? ""} ${reply.teacher_lastname ?? ""}`;
    }

    return `${reply.student_name ?? ""} ${reply.student_lastname ?? ""}`;
  }

  /*
  ==========================================
  Loading
  ==========================================
  */

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
        <div className="bg-white rounded-3xl p-10 shadow-xl">
          <p className="text-slate-500">Cargando conversación...</p>
        </div>
      </div>
    );
  }

  /*
  ==========================================
  Pregunta inexistente
  ==========================================
  */

  if (!question) {
    return (
      <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
        <div className="bg-white rounded-3xl p-10 shadow-xl text-center">
          <p className="text-slate-500 mb-6">No se encontró la consulta.</p>

          <button
            onClick={onClose}
            className="px-6 h-11 rounded-2xl bg-cyan-600 text-white"
          >
            Cerrar
          </button>
        </div>
      </div>
    );
  }

  /*
  ==========================================
  Modal completo
  ==========================================
  */

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-6">
      <div className="bg-slate-50 rounded-[32px] shadow-2xl w-full max-w-5xl max-h-[92vh] overflow-hidden flex flex-col">
        {/* HEADER */}

        <div className="flex items-center justify-between border-b bg-white px-8 py-6">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-medium"
          >
            <ArrowLeft size={18} />
            Volver
          </button>

          <h2 className="text-xl font-bold text-slate-900">
            Consulta del aula
          </h2>

          <div />
        </div>

        {/* CONTENIDO */}

        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {/* Pregunta */}

          <div className="bg-white rounded-3xl border border-slate-200 p-7 shadow-sm">
            <div className="flex justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {question.titulo}
                </h2>

                <div className="flex items-center gap-5 mt-3 text-sm text-slate-500">
                  <span className="font-medium">
                    {question.student_name} {question.student_lastname}
                  </span>

                  <span className="flex items-center gap-1">
                    <Clock3 size={15} />

                    {formatDistanceToNow(new Date(question.created_at), {
                      addSuffix: true,
                      locale: es,
                    })}
                  </span>
                </div>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-cyan-100 flex items-center justify-center">
                <MessageCircle className="text-cyan-600" />
              </div>
            </div>

            <div className="mt-6">
              <p className="text-slate-700 whitespace-pre-wrap leading-7">
                {question.contenido}
              </p>
            </div>
          </div>

          {/* RESPUESTAS */}

          {replies.length === 0 ? (
            <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center">
              <MessageCircle size={48} className="mx-auto text-slate-300" />

              <h3 className="mt-5 text-xl font-semibold text-slate-700">
                Todavía no hay respuestas
              </h3>

              <p className="mt-2 text-slate-500">
                Sé el primero en responder esta consulta.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {replies.map((reply) => (
                <div
                  key={reply.id}
                  className={`
                    rounded-3xl
                    border
                    p-6
                    shadow-sm
                    ${
                      isTeacher(reply)
                        ? "bg-cyan-50 border-cyan-200"
                        : "bg-white border-slate-200"
                    }
                  `}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-slate-900">
                        {getAuthor(reply)}
                      </h4>

                      <span
                        className={`
                          inline-flex
                          mt-2
                          px-3
                          py-1
                          rounded-full
                          text-xs
                          font-semibold
                          ${
                            isTeacher(reply)
                              ? "bg-cyan-100 text-cyan-700"
                              : "bg-slate-100 text-slate-700"
                          }
                        `}
                      >
                        {isTeacher(reply) ? "Profesor" : "Alumno"}
                      </span>
                    </div>

                    <span className="text-sm text-slate-500">
                      {formatDistanceToNow(new Date(reply.created_at), {
                        addSuffix: true,
                        locale: es,
                      })}
                    </span>
                  </div>

                  <div className="mt-5">
                    <p className="text-slate-700 whitespace-pre-wrap leading-7">
                      {reply.contenido}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FOOTER */}

        <div className="border-t bg-white p-6">
          <ReplyBox
            questionId={questionId}
            onReplyCreated={handleReplyCreated}
          />
        </div>
      </div>
    </div>
  );
}
