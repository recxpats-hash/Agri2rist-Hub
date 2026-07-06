/**
 * Agri2rist Hub – Notification Store
 * Lightweight localStorage-backed store for in-app notifications.
 */

export interface AppNotification {
  id: string;
  type: "booking_confirmed" | "booking_updated" | "info";
  title: string;
  body: string;
  ref?: string;       // booking ref or other reference
  link?: string;      // where to navigate on click
  read: boolean;
  createdAt: string;
}

const KEY = "agri2rist_notifications";

function read(): AppNotification[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as AppNotification[]) : [];
  } catch {
    return [];
  }
}

function write(items: AppNotification[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent("a2r:notifications-changed"));
  } catch { /* storage full */ }
}

export function getNotifications(): AppNotification[] {
  return read();
}

export function addNotification(n: Omit<AppNotification, "id" | "read" | "createdAt">): AppNotification {
  const item: AppNotification = {
    ...n,
    id: `notif-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 5)}`,
    read: false,
    createdAt: new Date().toISOString(),
  };
  write([item, ...read()].slice(0, 50)); // keep latest 50
  return item;
}

export function markAllRead(): void {
  write(read().map(n => ({ ...n, read: true })));
}

export function markRead(id: string): void {
  write(read().map(n => n.id === id ? { ...n, read: true } : n));
}

export function clearNotifications(): void {
  write([]);
}

export function getUnreadCount(): number {
  return read().filter(n => !n.read).length;
}
