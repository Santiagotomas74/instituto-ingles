export interface Conversation {
  id: string;

  type: "private" | "group";

  name: string | null;

  classroom_id: string | null;

  last_message: string | null;

  last_message_date: string | null;

  created_at: string;
}
export interface Message {
  id: string;

  conversation_id: string;

  sender_id: string;

  sender_role: "admin" | "teacher" | "student";

  content: string;

  created_at: string;

  read_at: string | null;

  name: string | null;

  lastname: string | null;
}
