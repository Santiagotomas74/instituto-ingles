import CreateMaterialForm from "./CreateMaterialForm";

type Props = {
  params: Promise<{
    classroomId: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { classroomId } = await params;

  return <CreateMaterialForm classroomId={classroomId} />;
}
