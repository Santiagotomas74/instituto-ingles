"use client";

import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import ReplyBox from "./ReplyBox";

type Props = {
  questionId: string;
  onBack: () => void;
};

export default function QuestionThread({ questionId, onBack }: Props) {
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState<any>(null);
  const [answers, setAnswers] = useState<any[]>([]);

  async function loadThread() {
    try {
      setLoading(true);

      const res = await fetch(`/api/teacher/questions/${questionId}`);
      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      setQuestion(data.question);
      setAnswers(data.answers);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadThread();
  }, [questionId]);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl sm:rounded-3xl p-8 sm:p-10 text-center text-sm sm:text-base text-slate-500">
        Cargando conversación...
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Botón volver */}
      <button
        onClick={onBack}
        className="
          flex 
          items-center 
          gap-2 
          text-cyan-600 
          font-semibold 
          text-sm 
          sm:text-base
          hover:text-cyan-700
          transition
          py-1
          px-2
          -ml-2
          rounded-lg
          hover:bg-cyan-50
        "
      >
        <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
        Volver a consultas
      </button>

      {/* Pregunta Principal */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-6 shadow-sm">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 break-words">
          {question.titulo}
        </h2>

        <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-600 whitespace-pre-wrap">
          {question.contenido}
        </p>

        <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-slate-100 text-xs sm:text-sm text-slate-500 font-medium">
          Preguntado por:{" "}
          <span className="text-slate-700">
            {question.student_name} {question.student_lastname}
          </span>
        </div>
      </div>

      {/* Respuestas */}
      <div className="space-y-3 sm:space-y-4">
        {answers.map((answer) => (
          <div
            key={answer.id}
            className={`
              bg-white 
              rounded-xl 
              sm:rounded-2xl 
              border 
              p-4 
              sm:p-5
              ${answer.teacher_name ? "border-cyan-200 bg-cyan-50/30 ml-4 sm:ml-8" : "border-slate-200 mr-4 sm:mr-8"}
            `}
          >
            <div className="flex justify-between items-center gap-2 mb-2">
              <div className="font-semibold text-sm sm:text-base text-slate-800 truncate">
                {answer.teacher_name
                  ? `Prof. ${answer.teacher_name} ${answer.teacher_lastname}`
                  : `${answer.student_name} ${answer.student_lastname}`}
              </div>

              <div className="text-[10px] sm:text-xs text-slate-400 shrink-0">
                {new Date(answer.created_at).toLocaleDateString()}
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-700 whitespace-pre-wrap">
              {answer.contenido}
            </p>
          </div>
        ))}
      </div>

      {/* Caja de respuesta */}
      <div className="pt-2">
        <ReplyBox questionId={questionId} onReplyCreated={loadThread} />
      </div>
    </div>
  );
}
