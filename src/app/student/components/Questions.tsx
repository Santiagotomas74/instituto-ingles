"use client";

import { useEffect, useState } from "react";
import { Plus, HelpCircle } from "lucide-react";
import QuestionCard from "./QuestionCard";
import CreateQuestionModal from "./CreateQuestionModal";
import { useSearchParams, useRouter } from "next/navigation";
import QuestionThread from "./QuestionThread";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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
      console.error("Error al obtener las consultas:", err);
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
        onClose={() => router.push("?tab=questions")}
      />
    );
  }

  return (
    <>
      <div className="space-y-6">
        {/* Cabecera */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800">
              {t("questions.title")}
            </h2>

            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {t("questions.description")}
            </p>
          </div>

          <button
            onClick={() => setOpenCreateModal(true)}
            className="inline-flex items-center justify-center gap-2 h-11 sm:h-12 px-5 sm:px-6 rounded-xl sm:rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all shrink-0 active:scale-95"
          >
            <Plus size={18} />

            <span>{t("questions.new_question")}</span>
          </button>
        </div>

        {/* Estado de carga */}
        {loading && (
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
                  alt={t("questions.institute")}
                  className="w-20 h-20 object-contain"
                />
              </div>
            </div>

            <h2 className="mt-8 text-2xl font-bold text-slate-900">
              {t("questions.loading")}
            </h2>

            <p className="mt-3 text-slate-500">{t("questions.loading_wait")}</p>
          </div>
        )}

        {/* Estado vacío */}
        {!loading && questions.length === 0 && (
          <div className="rounded-2xl sm:rounded-3xl border border-dashed border-slate-300 bg-slate-50/50 p-8 sm:p-12 text-center text-slate-500 flex flex-col items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
              <HelpCircle size={24} />
            </div>

            <p className="text-base font-semibold text-slate-700">
              {t("questions.empty_title")}
            </p>

            <p className="text-xs sm:text-sm text-slate-400 max-w-sm">
              {t("questions.empty_description")}
            </p>
          </div>
        )}

        {/* Lista de consultas */}
        {!loading && questions.length > 0 && (
          <div className="space-y-3.5 sm:space-y-5">
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
