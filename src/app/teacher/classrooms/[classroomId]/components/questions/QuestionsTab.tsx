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
      <div className="bg-white rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center">
        <p className="text-slate-500 text-sm sm:text-base">
          Cargando consultas...
        </p>
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
