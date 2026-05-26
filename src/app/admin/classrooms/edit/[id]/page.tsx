import EditClassroomForm from "./EditClassroomForm";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditClassroomPage({ params }: Props) {
  const { id } = await params;

  /* CLASSROOM */

  const classroomRes = await fetch(
    `http://localhost:3000/api/admin/classrooms/${id}`,
    {
      cache: "no-store",
    },
  );

  const classroomData = await classroomRes.json();

  /* TEACHERS */

  const teachersRes = await fetch("http://localhost:3000/api/admin/teachers", {
    cache: "no-store",
  });

  const teachersData = await teachersRes.json();

  return (
    <EditClassroomForm
      classroom={classroomData.classroom}
      teachers={teachersData.teachers}
    />
  );
}
