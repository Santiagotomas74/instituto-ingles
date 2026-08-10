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
      <div className="bg-white rounded-3xl p-10 text-center">
        Cargando conversación...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-cyan-600 font-semibold"
      >
        <ArrowLeft size={18} />
        Volver
      </button>

      <div className="bg-white rounded-3xl border p-6">
        <h2 className="text-2xl font-bold">{question.titulo}</h2>

        <p className="mt-4 text-slate-600">{question.contenido}</p>

        <div className="mt-5 text-sm text-slate-500">
          {question.student_name} {question.student_lastname}
        </div>
      </div>

      <div className="space-y-4">
        {answers.map((answer) => (
          <div key={answer.id} className="bg-white rounded-2xl border p-5">
            <div className="font-semibold">
              {answer.teacher_name
                ? `Prof. ${answer.teacher_name} ${answer.teacher_lastname}`
                : `${answer.student_name} ${answer.student_lastname}`}
            </div>

            <p className="mt-2 whitespace-pre-wrap">{answer.contenido}</p>

            <div className="mt-3 text-xs text-slate-400">
              {new Date(answer.created_at).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      <ReplyBox questionId={questionId} onReplyCreated={loadThread} />
    </div>
  );
}
