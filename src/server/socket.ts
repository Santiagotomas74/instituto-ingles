import { Server } from "socket.io";
import type { Server as HttpServer } from "http";

let io: Server | null = null;

/**
 * Usuarios conectados
 *
 * key   -> user_id
 * value -> socket.id
 */
const onlineUsers = new Map<string, string>();

export function initSocket(server: HttpServer) {
  if (io) return io;

  io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("✅ Socket conectado:", socket.id);

    /*
    ========================================
    Registrar usuario
    ========================================
    */

    socket.on("register", (userId: string) => {
      onlineUsers.set(userId, socket.id);

      console.log(`🟢 Usuario conectado: ${userId}`);

      io?.emit("user_online", {
        userId,
      });
    });

    /*
    ========================================
    Entrar a una conversación
    ========================================
    */

    socket.on("join_conversation", (conversationId: string) => {
      socket.join(`conversation_${conversationId}`);

      console.log(`Entró a ${conversationId}`);
    });

    /*
    ========================================
    Salir conversación
    ========================================
    */

    socket.on("leave_conversation", (conversationId: string) => {
      socket.leave(`conversation_${conversationId}`);
    });

    /*
    ========================================
    Nuevo mensaje
    ========================================
   

    socket.on(
      "send_message",
      (data: { conversationId: string; message: unknown }) => {
        io?.to(`conversation_${data.conversationId}`).emit(
          "new_message",
          data.message,
        );
      },
    ); */

    /*
    ========================================
    Escribiendo...
    ========================================
    */

    socket.on("typing", (data: { conversationId: string; userId: string }) => {
      socket
        .to(`conversation_${data.conversationId}`)
        .emit("typing", data.userId);
    });

    /*
    ========================================
    Dejó de escribir
    ========================================
    */

    socket.on(
      "stop_typing",
      (data: { conversationId: string; userId: string }) => {
        socket
          .to(`conversation_${data.conversationId}`)
          .emit("stop_typing", data.userId);
      },
    );

    /*
    ========================================
    Mensajes leídos
    ========================================
    */

    socket.on(
      "read_messages",
      (data: { conversationId: string; userId: string }) => {
        socket
          .to(`conversation_${data.conversationId}`)
          .emit("messages_read", data.userId);
      },
    );

    /*
    ========================================
    Desconexión
    ========================================
    */

    socket.on("disconnect", () => {
      let disconnectedUser: string | null = null;

      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          disconnectedUser = userId;

          onlineUsers.delete(userId);

          break;
        }
      }

      if (disconnectedUser) {
        io?.emit("user_offline", {
          userId: disconnectedUser,
        });

        console.log(`🔴 Usuario desconectado: ${disconnectedUser}`);
      }

      console.log("Socket desconectado:", socket.id);
    });
  });

  return io;
}

/**
 * Obtener socket de un usuario
 */
export function getUserSocket(userId: string) {
  return onlineUsers.get(userId);
}

/**
 * Saber si un usuario está online
 */
export function isUserOnline(userId: string) {
  return onlineUsers.has(userId);
}

/**
 * Lista de usuarios online
 */
export function getOnlineUsers() {
  return Array.from(onlineUsers.keys());
}
