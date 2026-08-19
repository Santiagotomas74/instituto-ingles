import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import EditBoletinForm from "./EditBoletinForm";

type Params = {
  params: Promise<{ id: string }>;
};

async function getBoletin(id: string) {
  try {
    const cookieStore = await cookies();

    const res = await fetch(
      `${process.env.BACKEND_URL}/api/teacher/boletines/editar/${id}`,
      {
        headers: {
          cookie: cookieStore.toString(),
        },
        cache: "no-store",
      },
    );

    if (!res.ok) return null;

    const data = await res.json();
    return data.boletin || null;
  } catch (error) {
    console.error("Error al obtener boletín para edición:", error);
    return null;
  }
}

export default async function EditarBoletinPage({ params }: Params) {
  const { id } = await params;
  const boletin = await getBoletin(id);

  if (!boletin) {
    redirect("/teacher/boletines");
  }

  return <EditBoletinForm boletin={boletin} />;
}
