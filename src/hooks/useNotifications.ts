"use client";

import { useEffect } from "react";
import { getSocket } from "@/lib/socket-client";

type Notification = {
  id: string;
  title: string;
  message: string;
  type: string;
  created_at: string;
};

type Props = {
  onNotification: (notification: Notification) => void;
};

export function useNotifications({ onNotification }: Props) {
  useEffect(() => {
    const socket = getSocket();

    function handleNotification(notification: Notification) {
      onNotification(notification);
    }

    socket.on("notification", handleNotification);

    return () => {
      socket.off("notification", handleNotification);
    };
  }, [onNotification]);
}
