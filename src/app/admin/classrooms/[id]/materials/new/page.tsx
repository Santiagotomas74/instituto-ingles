import CreateMaterialForm from "./CreateMaterialForm";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  return <CreateMaterialForm classroomId={id} />;
}
