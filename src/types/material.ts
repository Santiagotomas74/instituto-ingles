export type Material = {
  id: string;
  titulo: string;
  descripcion: string | null;
  tipo: "file" | "link" | "text" | "video";

  material_category: string | null;
  sub_category: string | null;

  contenido_texto: string | null;

  archivo_url: string | null;
  archivo_nombre: string | null;
  archivo_size: number | null;

  url: string | null;

  is_published: boolean;
  orden: number;

  created_at: string;
};
