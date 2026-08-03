"use client";

import { useEffect } from "react";
import { getSocket } from "@/lib/socket-client";

export function useSocket(userId: string) {
  useEffect(() => {
    if (!userId) return;

    const socket = getSocket();

    if (!socket.connected) {
      socket.connect();
    }

    function register() {
      socket.emit("register", userId);
      console.log("✅ Usuario registrado:", userId);
    }

    if (socket.connected) {
      register();
    } else {
      socket.once("connect", register);
    }

    return () => {
      socket.off("connect", register);
    };
  }, [userId]);
}
