/**
 * Agri2rist Hub – Booking Client Store
 * Lightweight localStorage-backed store for bookings.
 */
import type { Booking } from "@/types/marketplace";

const BOOKINGS_KEY = "agri2rist_bookings";

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent("a2r:store-changed", { detail: { key } }));
  } catch {
    // storage full or unavailable – fail silently
  }
}

export function getBookings(): Booking[] {
  return read<Booking[]>(BOOKINGS_KEY, []);
}

export function saveBooking(booking: Booking): void {
  const bookings = getBookings();
  const idx = bookings.findIndex((b) => b.id === booking.id);
  if (idx >= 0) {
    bookings[idx] = booking;
  } else {
    bookings.unshift(booking);
  }
  write(BOOKINGS_KEY, bookings);
}

export function getBookingById(id: string): Booking | undefined {
  return getBookings().find((b) => b.id === id);
}

export function updateBookingStatus(id: string, status: Booking["status"]): void {
  const bookings = getBookings().map((b) =>
    b.id === id ? { ...b, status } : b
  );
  write(BOOKINGS_KEY, bookings);
}

export function deleteBooking(id: string): void {
  write(BOOKINGS_KEY, getBookings().filter((b) => b.id !== id));
}

export function buildBookingRef(): string {
  return `A2R-BK-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}
