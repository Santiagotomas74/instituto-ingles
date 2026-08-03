"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  MessageCircle,
  CalendarDays,
  GraduationCap,
  Megaphone,
  FileText,
  UserPlus,
  ChevronRight,
} from "lucide-react";
import { useNotifications } from "@/hooks/useNotifications";

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

export default function NotificationBell() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const loadNotifications = useCallback(async () => {
    try {
      const res = await fetch("/api/notifications");
      const data = await res.json();
      console.log("📬 Notificaciones cargadas:", data.notifications);
      if (!res.ok || !data.success) return;
      setNotifications(data.notifications);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  useNotifications({
    onNotification(notification: Notification) {
      setNotifications((prev) => [notification, ...prev]);
    },
  });

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const unread = useMemo(
    () => notifications.filter((n) => !n.is_read).length,
    [notifications],
  );

  async function markAsRead(id: string) {
    try {
      await fetch(`/api/notifications/${id}/read`, { method: "PATCH" });
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)),
      );
    } catch (err) {
      console.error(err);
    }
  }

  async function markAllRead() {
    try {
      const res = await fetch("/api/notifications/read-all", {
        method: "PATCH",
      });
      const data = await res.json();
      if (!res.ok || !data.success) return;
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
    } catch (err) {
      console.error(err);
    }
  }

  async function openNotification(notification: Notification) {
    console.log("================================");
    console.log("📬 Notificación seleccionada");
    console.log(notification);

    if (!notification.is_read) {
      console.log("🟡 Marcando notificación como leída...");
      await markAsRead(notification.id);
    } else {
      console.log("🟢 La notificación ya estaba leída.");
    }

    setOpen(false);

    if (!notification.action_url) {
      console.warn("❌ La notificación no tiene action_url");
      return;
    }

    console.log("➡️ Intentando redirigir a:");
    console.log(notification.action_url);

    console.log("📍 Ruta actual:");
    console.log(window.location.pathname + window.location.search);

    router.push(notification.action_url);

    console.log("✅ router.push ejecutado");
  }
  function timeAgo(date: string) {
    const diff = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
    if (diff < 60) return "Hace unos segundos";
    if (diff < 3600) {
      const min = Math.floor(diff / 60);
      return `Hace ${min} ${min === 1 ? "minuto" : "minutos"}`;
    }
    if (diff < 86400) {
      const hs = Math.floor(diff / 3600);
      return `Hace ${hs} ${hs === 1 ? "hora" : "horas"}`;
    }
    if (diff < 604800) {
      const d = Math.floor(diff / 86400);
      return `Hace ${d} ${d === 1 ? "día" : "días"}`;
    }
    return new Date(date).toLocaleDateString("es-AR", {
      day: "numeric",
      month: "short",
    });
  }

  function getIcon(type: string) {
    switch (type) {
      case "message":
        return (
          <div className="bg-sky-100 text-sky-600 rounded-xl p-2">
            <MessageCircle size={18} />
          </div>
        );
      case "task_submission":
        return (
          <div className="bg-emerald-100 text-emerald-600 rounded-xl p-2">
            <FileText size={18} />
          </div>
        );
      case "task_grade":
        return (
          <div className="bg-violet-100 text-violet-600 rounded-xl p-2">
            <GraduationCap size={18} />
          </div>
        );
      case "announcement":
        return (
          <div className="bg-orange-100 text-orange-600 rounded-xl p-2">
            <Megaphone size={18} />
          </div>
        );
      case "calendar":
        return (
          <div className="bg-cyan-100 text-cyan-600 rounded-xl p-2">
            <CalendarDays size={18} />
          </div>
        );
      case "payment":
        return (
          <div className="bg-green-100 text-green-600 rounded-xl p-2">
            <FileText size={18} />
          </div>
        );
      case "inscription":
        return (
          <div className="bg-indigo-100 text-indigo-600 rounded-xl p-2">
            <UserPlus size={18} />
          </div>
        );
      default:
        return (
          <div className="bg-slate-100 text-slate-600 rounded-xl p-2">
            <Bell size={18} />
          </div>
        );
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="relative w-11 h-11 rounded-xl bg-slate-100 hover:bg-slate-200 transition flex items-center justify-center"
      >
        <Bell size={21} className="text-slate-700" />
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 min-w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-semibold flex items-center justify-center px-1">
            {unread > 99 ? "99+" : unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-[90vw] sm:w-[480px] md:w-[550px] rounded-2xl border bg-white shadow-2xl overflow-hidden z-50">
          {/* HEADER */}
          <div className="flex items-center justify-between p-5 border-b bg-slate-50">
            <div>
              <h3 className="font-bold text-slate-800 text-lg">
                Notificaciones
              </h3>
              <p className="text-sm text-slate-500">{unread} sin leer</p>
            </div>
            {unread > 0 && (
              <button
                onClick={markAllRead}
                className="text-sm font-semibold text-cyan-600 hover:text-cyan-700"
              >
                Marcar todas
              </button>
            )}
          </div>

          {/* BODY */}
          {/* Añadimos overscroll-contain y ajustamos el max-h para que no se rompa en pantallas pequeñas */}
          <div className="max-h-[60vh] md:max-h-[560px] overflow-y-auto overscroll-contain scrollbar-custom">
            {notifications.length === 0 ? (
              <div className="py-14 text-center">
                <Bell size={42} className="mx-auto text-slate-300 mb-3" />
                <p className="text-slate-500">No tienes notificaciones.</p>
              </div>
            ) : (
              notifications.slice(0, 30).map((notification) => (
                <button
                  key={notification.id}
                  onClick={() => openNotification(notification)}
                  className={`
                    w-full text-left flex gap-4 p-5 border-b transition hover:bg-slate-50 break-words whitespace-normal
                    ${notification.is_read ? "bg-white" : "bg-cyan-50"}
                  `}
                >
                  <div className="shrink-0 mt-1">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-slate-800 truncate">
                          {notification.title}
                        </h4>
                        <p className="mt-1 text-sm text-slate-600 leading-normal">
                          {notification.description}
                        </p>
                      </div>
                      <ChevronRight
                        size={18}
                        className="ml-4 shrink-0 text-slate-400 mt-1"
                      />
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-slate-400">
                        {timeAgo(notification.created_at)}
                      </span>
                      {!notification.is_read && (
                        <span className="w-2 h-2 rounded-full bg-cyan-500 shrink-0" />
                      )}
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>

          {/* FOOTER */}
          {notifications.length > 0 && (
            <div className="border-t bg-slate-50 p-3 text-center">
              <button
                onClick={() => {
                  setOpen(false);
                  router.push("/notifications");
                }}
                className="text-sm font-semibold text-cyan-600 hover:text-cyan-700"
              >
                Ver todas las notificaciones
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
