/**
 * Agri2rist Hub – useNotifications hook
 * Reactively tracks the notification store and updates on changes.
 */
import { useState, useEffect, useCallback } from "react";
import {
  getNotifications,
  getUnreadCount,
  markAllRead,
  markRead,
  clearNotifications,
  type AppNotification,
} from "@/lib/notification-store";

export function useNotifications() {
  const [notifications, setNotifications] = useState<AppNotification[]>(() => getNotifications());
  const [unreadCount, setUnreadCount] = useState(() => getUnreadCount());

  const refresh = useCallback(() => {
    setNotifications(getNotifications());
    setUnreadCount(getUnreadCount());
  }, []);

  useEffect(() => {
    window.addEventListener("a2r:notifications-changed", refresh);
    return () => window.removeEventListener("a2r:notifications-changed", refresh);
  }, [refresh]);

  return {
    notifications,
    unreadCount,
    markAllRead: () => { markAllRead(); refresh(); },
    markRead: (id: string) => { markRead(id); refresh(); },
    clearAll: () => { clearNotifications(); refresh(); },
  };
}
