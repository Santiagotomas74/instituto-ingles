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
  X,
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

  /* Cerrar al hacer click afuera */
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

  /* Bloquear scroll del body cuando el panel mobile está abierto */
  useEffect(() => {
    if (!open) return;

    const isMobile = window.innerWidth < 640;

    if (isMobile) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const unread = useMemo(
    () => notifications.filter((n) => !n.is_read).length,
    [notifications],
  );

  async function markAsRead(id: string) {
    try {
      await fetch(`/api/notifications/${id}/read`, {
        method: "PATCH",
      });

      setNotifications((prev) =>
        prev.map((n) =>
          n.id === id
            ? {
                ...n,
                is_read: true,
              }
            : n,
        ),
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

      setNotifications((prev) =>
        prev.map((n) => ({
          ...n,
          is_read: true,
        })),
      );
    } catch (err) {
      console.error(err);
    }
  }

  async function openNotification(notification: Notification) {
    if (!notification.is_read) {
      await markAsRead(notification.id);
    }

    setOpen(false);

    if (!notification.action_url) return;

    router.push(notification.action_url);
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
      {/* BOTÓN */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Notificaciones"
        className="
          relative
          w-11
          h-11
          rounded-xl
          bg-slate-100
          hover:bg-slate-200
          transition
          flex
          items-center
          justify-center
        "
      >
        <Bell size={21} className="text-slate-700" />

        {unread > 0 && (
          <span
            className="
              absolute
              -top-1
              -right-1
              min-w-5
              h-5
              rounded-full
              bg-red-500
              text-white
              text-[10px]
              font-semibold
              flex
              items-center
              justify-center
              px-1
            "
          >
            {unread > 99 ? "99+" : unread}
          </span>
        )}
      </button>

      {open && (
        <>
          {/* ===================================== */}
          {/* OVERLAY MOBILE */}
          {/* ===================================== */}

          <div
            className="
              fixed
              inset-0
              bg-slate-950/30
              backdrop-blur-[2px]
              z-[90]
              sm:hidden
            "
            onClick={() => setOpen(false)}
          />

          {/* ===================================== */}
          {/* PANEL */}
          {/* ===================================== */}

          <div
            className="
              /* MOBILE */
              fixed
              z-[100]
              left-2
              right-2
              top-16
              bottom-2

              /* DESKTOP */
              sm:absolute
              sm:left-auto
              sm:right-0
              sm:top-auto
              sm:bottom-auto
              sm:mt-2
              sm:w-[480px]
              md:w-[550px]
              sm:max-h-[650px]

              w-auto
              max-w-none

              bg-white
              border
              border-slate-200
              rounded-2xl
              sm:rounded-2xl
              shadow-2xl

              flex
              flex-col

              overflow-hidden
            "
          >
            {/* HEADER */}

            <div
              className="
                shrink-0
                flex
                items-center
                justify-between
                gap-3
                px-4
                py-4
                sm:p-5
                border-b
                bg-slate-50
              "
            >
              <div className="min-w-0">
                <h3
                  className="
                    font-bold
                    text-slate-800
                    text-base
                    sm:text-lg
                  "
                >
                  Notificaciones
                </h3>

                <p
                  className="
                    text-xs
                    sm:text-sm
                    text-slate-500
                    mt-0.5
                  "
                >
                  {unread} sin leer
                </p>
              </div>

              <div className="flex items-center gap-2">
                {unread > 0 && (
                  <button
                    onClick={markAllRead}
                    className="
                      shrink-0
                      text-xs
                      sm:text-sm
                      font-semibold
                      text-cyan-600
                      hover:text-cyan-700
                      whitespace-nowrap
                    "
                  >
                    Marcar todas
                  </button>
                )}

                {/* Close SOLO MOBILE */}

                <button
                  onClick={() => setOpen(false)}
                  className="
                    flex
                    sm:hidden
                    w-9
                    h-9
                    items-center
                    justify-center
                    rounded-xl
                    bg-slate-100
                    text-slate-500
                    hover:bg-slate-200
                  "
                  aria-label="Cerrar"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* BODY */}

            <div
              className="
                flex-1
                min-h-0
                overflow-y-auto
                overscroll-contain
                scrollbar-custom
              "
            >
              {notifications.length === 0 ? (
                <div
                  className="
                    min-h-[300px]
                    flex
                    flex-col
                    items-center
                    justify-center
                    text-center
                    px-6
                  "
                >
                  <Bell size={42} className="text-slate-300 mb-3" />

                  <p className="text-slate-500 text-sm">
                    No tienes notificaciones.
                  </p>
                </div>
              ) : (
                notifications.slice(0, 30).map((notification) => (
                  <button
                    key={notification.id}
                    onClick={() => openNotification(notification)}
                    className={`
                        w-full
                        text-left
                        flex
                        gap-3
                        sm:gap-4
                        px-4
                        py-4
                        sm:p-5
                        border-b
                        transition
                        hover:bg-slate-50
                        ${notification.is_read ? "bg-white" : "bg-cyan-50"}
                      `}
                  >
                    {/* ICON */}

                    <div className="shrink-0">{getIcon(notification.type)}</div>

                    {/* CONTENT */}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2">
                        <div className="flex-1 min-w-0">
                          <h4
                            className="
                                font-semibold
                                text-slate-800
                                text-sm
                                sm:text-base
                                break-words
                              "
                          >
                            {notification.title}
                          </h4>

                          <p
                            className="
                                mt-1
                                text-xs
                                sm:text-sm
                                text-slate-600
                                leading-relaxed
                                break-words
                              "
                          >
                            {notification.description}
                          </p>
                        </div>

                        <ChevronRight
                          size={17}
                          className="
                              shrink-0
                              text-slate-400
                              mt-1
                            "
                        />
                      </div>

                      <div
                        className="
                            flex
                            items-center
                            justify-between
                            gap-2
                            mt-3
                          "
                      >
                        <span
                          className="
                              text-[11px]
                              sm:text-xs
                              text-slate-400
                            "
                        >
                          {timeAgo(notification.created_at)}
                        </span>

                        {!notification.is_read && (
                          <span
                            className="
                                w-2
                                h-2
                                rounded-full
                                bg-cyan-500
                                shrink-0
                              "
                          />
                        )}
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>

            {/* FOOTER */}

            {notifications.length > 0 && (
              <div
                className="
                  shrink-0
                  border-t
                  bg-slate-50
                  p-3
                  text-center
                "
              >
                <button
                  onClick={() => {
                    setOpen(false);
                    router.push("/notifications");
                  }}
                  className="
                    text-xs
                    sm:text-sm
                    font-semibold
                    text-cyan-600
                    hover:text-cyan-700
                    transition
                  "
                >
                  Ver todas las notificaciones
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
