"use client";

import { useEffect, useState } from "react";

import { Plus } from "lucide-react";

import QuestionCard from "./QuestionCard";
import CreateQuestionModal from "./CreateQuestionModal";
import { useSearchParams, useRouter } from "next/navigation";

import QuestionThread from "./QuestionThread";

type Props = {
  classroomId: string;
};

export type Question = {
  id: string;
  titulo: string;
  contenido: string;

  student_id: string;

  student_name: string;
  student_lastname: string;

  replies: number;

  created_at: string;
};

export default function Questions({ classroomId }: Props) {
  const [loading, setLoading] = useState(true);

  const [questions, setQuestions] = useState<Question[]>([]);

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const searchParams = useSearchParams();

  const router = useRouter();

  const selectedQuestionId = searchParams.get("question");

  async function loadQuestions() {
    try {
      setLoading(true);

      const res = await fetch(
        `/api/student/classroom/${classroomId}/questions`,
        {
          cache: "no-store",
        },
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message);
      }

      setQuestions(data.questions ?? []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!classroomId) return;

    loadQuestions();
  }, [classroomId]);
  if (selectedQuestionId) {
    return (
      <QuestionThread
        questionId={selectedQuestionId}
        onBack={() => router.push(`?tab=questions`)}
      />
    );
  }
  return (
    <>
      <div className="space-y-6">
        {/* Header */}

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              Consultas generales
            </h2>

            <p className="text-slate-500 mt-2">
              Realizá consultas al profesor y participá de las respuestas.
            </p>
          </div>

          <button
            onClick={() => setOpenCreateModal(true)}
            className="
              flex
              items-center
              gap-2
              h-12
              px-6
              rounded-2xl
              bg-cyan-600
              hover:bg-cyan-500
              text-white
              font-semibold
              transition
            "
          >
            <Plus size={18} />
            Nueva consulta
          </button>
        </div>

        {/* Loading */}

        {loading && (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center">
            <p className="text-slate-500">Cargando consultas...</p>
          </div>
        )}

        {/* Empty */}

        {!loading && questions.length === 0 && (
          <div className="bg-white rounded-3xl border border-slate-200 p-14 text-center">
            <h3 className="text-2xl font-bold text-slate-900">
              Todavía no hay consultas
            </h3>

            <p className="mt-3 text-slate-500">
              Sé el primero en realizar una pregunta al profesor.
            </p>
          </div>
        )}

        {/* Lista */}

        {!loading && questions.length > 0 && (
          <div className="space-y-5">
            {questions.map((question) => (
              <QuestionCard key={question.id} question={question} />
            ))}
          </div>
        )}
      </div>

      <CreateQuestionModal
        open={openCreateModal}
        classroomId={classroomId}
        onClose={() => setOpenCreateModal(false)}
        onCreated={loadQuestions}
      />
    </>
  );
}
