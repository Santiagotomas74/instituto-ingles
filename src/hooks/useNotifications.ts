"use client";

import { useEffect } from "react";
import { getSocket } from "@/lib/socket-client";

type Notification = {
  id: string;
  title: string;
  description: string;
  type: string;
  role: string;
  is_read: boolean;
  created_at: string;
  reference_id: string | null;
  reference_type: string | null;
  action_url: string | null;
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
