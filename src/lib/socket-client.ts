import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function getSocket() {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
      withCredentials: true,
    });

    const currentSocket = socket;

    currentSocket.on("connect", () => {
      console.log("✅ Socket conectado:", currentSocket.id);
    });

    currentSocket.on("disconnect", () => {
      console.log("❌ Socket desconectado");
    });
  }

  return socket;
}
