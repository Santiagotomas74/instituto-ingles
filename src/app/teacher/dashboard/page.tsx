import Aulas from "../components/Aulas";
import Navbar from "../components/Navbar"; // Ajusta la ruta si es necesario
import Sidebar from "../components/Sidebar";
export default function TeacherDashboardPage() {
  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      {/* 2. El Sidebar no necesita 'sticky'. Al ser flex y medir h-full, se queda fijo a la izquierda.
              Agregamos `hidden md:flex flex-shrink-0` para ocultarlo en mobile y que no se encoja. */}
      <div className="hidden md:flex flex-shrink-0 h-full z-50">
        <Sidebar />
      </div>
      <div className="fixed inset-y-0 left-0 z-50 md:static md:flex flex-shrink-0 h-full">
        <Sidebar />
      </div>

      {/* 3. Añadimos `overflow-y-auto` aquí. Solo esta columna derecha hará scroll. */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* 4. Navbar: Se mantiene `sticky`. 
                Importante: Asegúrate de agregarle un fondo (ej. bg-slate-100) para que 
                el texto del contenido no se superponga visualmente al scrollear por debajo. */}
        <header className="sticky top-0 z-48 bg-slate-100">
          <Navbar />
        </header>

        <main className="flex-1">
          {/* Quité un punto y coma (;) suelto que tenías al final de esta línea */}
          <Aulas />;
        </main>
      </div>
    </div>
  );
}
