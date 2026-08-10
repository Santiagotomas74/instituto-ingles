export type ImportantDate = {
  id: string;
  classroom_id: string;

  titulo: string;
  descripcion: string;

  fecha: string;
  hora: string;

  tipo: "clase" | "examen" | "evento" | "reunion";

  created_at: string;
};

export type Classroom = {
  id: string;
  nombre: string;
  nivel: string;
  horario: string;
  profesor?: string;
};

export type Student = {
  id: string;
  nombre: string;
  apellido: string;
};

export type Material = {
  id: string;

  titulo: string;
  descripcion: string;

  archivo_url: string | null;
  url: string | null;

  tipo: "file" | "link";

  material_category: string;

  created_at: string;
  sub_category: string | null;
};

export type Announcement = {
  id: string;

  titulo: string;
  contenido: string;

  created_at: string;

  is_important?: boolean;
};
