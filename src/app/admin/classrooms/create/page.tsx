import CreateClassroomForm from "./CreateClassroomForm";

export default async function CreateClassroomPage() {
  const res = await fetch("http://localhost:3000/api/admin/teachers", {
    cache: "no-store",
  });

  const data = await res.json();

  return <CreateClassroomForm teachers={data.teachers || []} />;
}
