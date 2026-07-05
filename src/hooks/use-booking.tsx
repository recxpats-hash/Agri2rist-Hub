/**
 * Agri2rist Hub – Booking Hook
 */
import { useMemo } from "react";
import { toast } from "@/components/data/hook/use-toast";
import {
  getBookings,
  saveBooking,
  getBookingById,
  updateBookingStatus,
  deleteBooking,
  buildBookingRef,
} from "@/lib/booking-store";
import type { Booking, BookingCategory, BookingItem } from "@/types/marketplace";

export function useBooking() {
  const bookings = useMemo(() => getBookings(), []);

  const createBooking = (
    item: BookingItem,
    form: Record<string, unknown>,
    paymentMethod: string
  ): Booking => {
    const subtotal = item.price;
    const serviceFee = Math.round(subtotal * 0.025);
    const total = subtotal + serviceFee;

    const base: Booking = {
      id: `bk-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
      bookingRef: buildBookingRef(),
      bookingCategory: item.bookingCategory,
      itemId: item.id,
      itemName: item.name,
      buyerName: form.name as string,
      buyerEmail: form.email as string,
      buyerPhone: form.phone as string,
      date: (form.date as string) || new Date().toISOString().split("T")[0],
      time: form.time as string | undefined,
      guests: form.guests as number | undefined,
      nights: form.nights as number | undefined,
      tickets: form.tickets as number | undefined,
      duration: form.duration as string | undefined,
      startDate: form.startDate as string | undefined,
      endDate: form.endDate as string | undefined,
      vehicleType: form.vehicleType as string | undefined,
      pickupLocation: form.pickupLocation as string | undefined,
      dropoffLocation: form.dropoffLocation as string | undefined,
      licenseType: form.licenseType as string | undefined,
      trainingTopic: form.trainingTopic as string | undefined,
      serviceType: form.serviceType as string | undefined,
      farmAddress: form.farmAddress as string | undefined,
      subtotal,
      serviceFee,
      total,
      paymentMethod,
      paymentStatus: paymentMethod === "pay_now" ? "paid" : "pending",
      status: "confirmed",
      notes: form.notes as string | undefined,
      createdAt: new Date().toISOString(),
    };

    saveBooking(base);
    toast({
      title: "Booking confirmed",
      description: `Reference: ${base.bookingRef}`,
    });
    return base;
  };

  return {
    bookings,
    createBooking,
    getBookingById,
    updateBookingStatus,
    deleteBooking,
  };
}
