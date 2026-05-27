import CreateClassroomForm from "./CreateClassroomForm";

export default async function CreateClassroomPage() {
  const res = await fetch(`${process.env.BACKEND_URL}/api/admin/teachers`, {
    cache: "no-store",
  });

  const data = await res.json();

  return <CreateClassroomForm teachers={data.teachers || []} />;
}
