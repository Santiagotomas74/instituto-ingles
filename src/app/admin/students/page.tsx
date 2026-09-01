import { Suspense } from "react";
import AdminSidebar from "../dashboard/components/AdminSidebar";
import Navbar from "../dashboard/components/AdminNavbar";
import StudentsTable from "./StudentsTable";

type Student = {
  id: string;
  dni: number;
  nombre: string;
  apellido: string;
  email: string;
  status: string;
  nivel: string;
  classroom: string | null;
};

type Classroom = {
  id: string;
  nombre: string;
};

// 1. EXTRAEMOS LA LÓGICA DE CARGA DE DATOS A UN COMPONENTE SERVIDOR ASÍNCRONO
async function StudentsDataWrapper() {
  // STUDENTS
  const studentsRes = await fetch(
    `${process.env.BACKEND_URL}/api/admin/students`,
    { cache: "no-store" },
  );
  const studentsData = await studentsRes.json();
  const students: Student[] = studentsData.students || [];

  // CLASSROOMS
  const classroomsRes = await fetch(
    `${process.env.BACKEND_URL}/api/admin/classrooms`,
    { cache: "no-store" },
  );
  const classroomsData = await classroomsRes.json();
  const classrooms: Classroom[] = classroomsData.classrooms || [];

  return <StudentsTable students={students} classrooms={classrooms} />;
}

// 2. CREAMOS EL COMPONENTE DEL LOADER (El mismo que te gustó)
function LoadingState() {
  return (
    <div className="p-6 md:p-10 h-full flex flex-col">
      <div
        className="
          bg-white
          rounded-[32px]
          border
          border-slate-200
          shadow-sm
          p-16
          flex
          flex-col
          items-center
          justify-center
          flex-1
        "
      >
        <div className="relative">
          <div
            className="
              absolute
              inset-0
              rounded-full
              border-4
              border-cyan-200
              border-t-cyan-600
              animate-spin
            "
          />
          <div
            className="
              w-24
              h-24
              rounded-full
              bg-white
              flex
              items-center
              justify-center
              p-2
            "
          >
            <img
              src="/logo2.png"
              alt="Instituto"
              className="w-20 h-20 object-contain"
            />
          </div>
        </div>
        <h2 className="mt-8 text-2xl font-bold text-slate-900">
          Cargando estudiantes...
        </h2>
        <p className="mt-3 text-slate-500">Aguarde unos segundos.</p>
      </div>
    </div>
  );
}

// 3. TU PÁGINA PRINCIPAL QUE ENVUELVE TODO
export default function StudentsPage() {
  return (
    <main className="min-h-screen flex bg-slate-100">
      {/* SIDEBAR FIJO */}
      <aside className="sticky top-0 h-screen shrink-0">
        <AdminSidebar />
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        {/* HEADER FIJO */}
        <header className="sticky top-0 z-10">
          <Navbar />
        </header>

        <div className="flex-1 overflow-auto">
          {/* 
            SUSPENSE SE ENCARGA DEL LOADING:
            Mientras 'StudentsDataWrapper' espera la promesa del fetch, 
            muestra el 'LoadingState' automáticamente. 
          */}
          <Suspense fallback={<LoadingState />}>
            <StudentsDataWrapper />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
