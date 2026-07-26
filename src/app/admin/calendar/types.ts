export interface CalendarEvent {
  id: string;

  titulo: string;

  descripcion: string;

  fecha: string;

  hora: string;

  tipo: "clase" | "examen" | "evento" | "reunion";

  classroom_id: string;

  classroom_name: string;
}

export interface Classroom {
  id: string;

  nombre: string;
}
