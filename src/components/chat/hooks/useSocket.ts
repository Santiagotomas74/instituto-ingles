"use client";

import { useEffect } from "react";
import { getSocket } from "@/lib/socket-client";

export function useSocket(userId: string) {
  useEffect(() => {
    const socket = getSocket();

    socket.emit("register", userId);

    return () => {};
  }, [userId]);
}
