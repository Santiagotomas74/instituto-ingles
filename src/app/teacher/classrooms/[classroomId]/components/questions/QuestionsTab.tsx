"use client";

import { useEffect, useState } from "react";

import EmptyQuestions from "./EmptyQuestions";
import QuestionCard from "./QuestionCard";
import QuestionThread from "./QuestionThread";

type Props = {
  classroomId: string;
};

export type Question = {
  id: string;
  titulo: string;
  contenido: string;
  student_name: string;
  student_lastname: string;
  created_at: string;
  replies_count: number;
  is_closed: boolean;
};

export default function QuestionsTab({ classroomId }: Props) {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(
    null,
  );

  async function loadQuestions() {
    try {
      setLoading(true);

      const res = await fetch(
        `/api/teacher/classroom/${classroomId}/questions`,
        {
          cache: "no-store",
        },
      );

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      setQuestions(data.questions);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadQuestions();
  }, [classroomId]);

  if (selectedQuestionId) {
    return (
      <div className="w-full">
        <QuestionThread
          questionId={selectedQuestionId}
          onBack={() => {
            setSelectedQuestionId(null);
            loadQuestions();
          }}
        />
      </div>
    );
  }

  if (loading) {
    return (
      <div
        className="
              bg-white
              rounded-[32px]
              border
              border-slate-200
              shadow-sm
              p-16
              flex
              flex-col
              items-center
              justify-center
            "
      >
        <div className="relative">
          <div
            className="
                  absolute
                  inset-0
                  rounded-full
                  border-4
                  border-cyan-200
                  border-t-cyan-600
                  animate-spin
                "
          />
          <div
            className="
                  w-24
                  h-24
                  rounded-full
                  bg-white
                  flex
                  items-center
                  justify-center
                  p-2
                "
          >
            <img
              src="/logo2.png"
              alt="Instituto"
              className="w-20 h-20 object-contain"
            />
          </div>
        </div>
        <h2 className="mt-8 text-2xl font-bold text-slate-900">
          Cargando consultas...
        </h2>
        <p className="mt-3 text-slate-500">Aguarde unos segundos.</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return <EmptyQuestions />;
  }

  return (
    <div className="space-y-4 sm:space-y-5">
      {questions.map((question) => (
        <QuestionCard
          key={question.id}
          question={question}
          onOpen={() => setSelectedQuestionId(question.id)}
        />
      ))}
    </div>
  );
}
