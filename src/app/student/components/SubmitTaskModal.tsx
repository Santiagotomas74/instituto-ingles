"use client";

import SubmitTaskForm from "./SubmitTaskForm";

type Props = {
  open: boolean;
  onClose: () => void;
  classroomId: string;
  taskId: string;
};

export default function SubmitTaskModal({
  open,
  onClose,
  classroomId,
  taskId,
}: Props) {
  if (!open) return null;

  return (
    <div
      className="
      fixed
      inset-0
      bg-black/40
      flex
      items-center
      justify-center
      z-50
    "
    >
      <div className="bg-white rounded-3xl w-full max-w-2xl p-8">
        <SubmitTaskForm
          classroomId={classroomId}
          taskId={taskId}
          onSuccess={onClose}
        />
      </div>
    </div>
  );
}
