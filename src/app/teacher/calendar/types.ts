export type CalendarEvent = {
  id: string;

  classroom_id: string;

  titulo: string;

  descripcion: string;

  fecha: string;

  hora: string;

  tipo: "clase" | "examen" | "evento" | "reunion";

  classroom_nombre: string;
};
