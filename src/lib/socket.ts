import { Server } from "socket.io";

let io: Server | null = null;

/**
 * Guarda la instancia global de Socket.IO
 */
export function setIO(server: Server) {
  io = server;
}

/**
 * Obtiene la instancia global
 */
export function getIO() {
  return io;
}
