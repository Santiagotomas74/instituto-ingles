import Classroom from "@/app/student/components/Classroom";

interface Props {
  params: Promise<{
    classroomId: string;
  }>;
}

export default async function StudentClassroomPage({ params }: Props) {
  const { classroomId } = await params;

  return <Classroom classroomId={classroomId} />;
}
