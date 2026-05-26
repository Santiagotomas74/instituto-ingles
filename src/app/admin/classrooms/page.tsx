import ClassroomsClient from "./ClassroomsClient";

export default async function AdminClassroomsPage() {
  const res = await fetch("http://localhost:3000/api/admin/classrooms", {
    cache: "no-store",
  });

  const data = await res.json();

  return <ClassroomsClient classrooms={data.classrooms || []} />;
}
