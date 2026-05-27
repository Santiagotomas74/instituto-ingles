import EditTeacherForm from "./EditTeacherForm";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditTeacherPage({ params }: Props) {
  const { id } = await params;

  const res = await fetch(
    `${process.env.BACKEND_URL}/api/admin/teachers/${id}`,
    {
      cache: "no-store",
    },
  );

  const data = await res.json();

  return <EditTeacherForm teacher={data.teacher} />;
}
