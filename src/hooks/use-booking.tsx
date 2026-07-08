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
import { addNotification } from "@/lib/notification-store";
import type { Booking, BookingItem } from "@/types/marketplace";

export function useBooking() {
  const bookings = useMemo(() => getBookings(), []);

  const createBooking = (
    item: BookingItem,
    form: Record<string, unknown>,
    paymentMethod: string
  ): Booking => {
    const subtotal = item.price * ((form.guests as number) || (form.nights as number) || (form.tickets as number) || 1);
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
      currentLocation: form.currentLocation as string | undefined,
      destinationFarm: form.destinationFarm as string | undefined,
      transportCategory: form.transportCategory as string | undefined,
      nationality: form.nationality as string | undefined,
      gender: form.gender as string | undefined,
      dateOfBirth: form.dateOfBirth as string | undefined,
      nationalId: form.nationalId as string | undefined,
      homeAddress: form.homeAddress as string | undefined,
      emergencyContact: form.emergencyContact as string | undefined,
      adults: form.adults as number | undefined,
      children: form.children as number | undefined,
      infants: form.infants as number | undefined,
      guestNames: form.guestNames as string | undefined,
      specialNeeds: form.specialNeeds as string | undefined,
      checkOutDate: form.checkOutDate as string | undefined,
      arrivalTime: form.arrivalTime as string | undefined,
      departureTime: form.departureTime as string | undefined,
      roomNumber: form.roomNumber as string | undefined,
      occupancy: form.occupancy as string | undefined,
      bookingReference: form.bookingReference as string | undefined,
      purposeOfVisit: form.purposeOfVisit as string | undefined,
      farmExperiencePackage: form.farmExperiencePackage as string | undefined,
      airportPickupRequired: form.airportPickupRequired as string | undefined,
      driverName: form.driverName as string | undefined,
      vehicleRegistration: form.vehicleRegistration as string | undefined,
      arrivalFlight: form.arrivalFlight as string | undefined,
      departureFlight: form.departureFlight as string | undefined,
      babyCot: form.babyCot as boolean | undefined,
      extraBed: form.extraBed as boolean | undefined,
      laundry: form.laundry as boolean | undefined,
      spa: form.spa as boolean | undefined,
      swimmingPool: form.swimmingPool as boolean | undefined,
      gym: form.gym as boolean | undefined,
      conferenceRoom: form.conferenceRoom as boolean | undefined,
      bbqEquipment: form.bbqEquipment as boolean | undefined,
      bicycleRental: form.bicycleRental as boolean | undefined,
      fishingEquipment: form.fishingEquipment as boolean | undefined,
      horseRental: form.horseRental as boolean | undefined,
      // paymentStatus will be computed below based on method
      invoiceNumber: form.invoiceNumber as string | undefined,
      receiptNumber: form.receiptNumber as string | undefined,
      amountPaid: form.amountPaid as string | undefined,
      balance: form.balance as string | undefined,
      discount: form.discount as string | undefined,
      taxes: form.taxes as string | undefined,
      roomPreference: form.roomPreference as string | undefined,
      bedPreference: form.bedPreference as string | undefined,
      pillowPreference: form.pillowPreference as string | undefined,
      smoking: form.smoking as boolean | undefined,
      petFriendly: form.petFriendly as boolean | undefined,
      tripType: form.tripType as string | undefined,
      preferredVehicle: form.preferredVehicle as string | undefined,
      distanceKm: form.distanceKm as number | undefined,
      estimatedTravelTime: form.estimatedTravelTime as string | undefined,
      seniors: form.seniors as number | undefined,
      luggage: form.luggage as number | undefined,
      pets: form.pets as number | undefined,
      accessibilityNeeds: form.accessibilityNeeds as string | undefined,
      roadCondition: form.roadCondition as string | undefined,
      weatherCondition: form.weatherCondition as string | undefined,
      routeDifficulty: form.routeDifficulty as string | undefined,
      // emergencyContact already mapped above
      airConditioning: form.airConditioning as boolean | undefined,
      wifi: form.wifi as boolean | undefined,
      childSeat: form.childSeat as boolean | undefined,
      femaleDriver: form.femaleDriver as boolean | undefined,
      englishSpeakingDriver: form.englishSpeakingDriver as boolean | undefined,
      localGuide: form.localGuide as boolean | undefined,
      luxuryVehicle: form.luxuryVehicle as boolean | undefined,
      farmGuideIncluded: form.farmGuideIncluded as boolean | undefined,
      licenseType: form.licenseType as string | undefined,
      trainingTopic: form.trainingTopic as string | undefined,
      tablePreference: form.tablePreference as string | undefined,
      occasion: form.occasion as string | undefined,
      country: form.country as string | undefined,
      cuisinePreferences: form.cuisinePreferences as string | undefined,
      dietaryPreferences: form.dietaryPreferences as string | undefined,
      allergies: form.allergies as string | undefined,
      accessibilityRequirements: form.accessibilityRequirements as string | undefined,
      specialRequests: form.specialRequests as string | undefined,
      serviceType: form.serviceType as string | undefined,
      farmAddress: form.farmAddress as string | undefined,
      subtotal,
      serviceFee,
      total,
      paymentMethod,
      paymentStatus: (paymentMethod === "pay_now" || paymentMethod === "mobile_money" || paymentMethod === "card") ? "paid" : "pending",
      status: "confirmed",
      notes: form.notes as string | undefined,
      createdAt: new Date().toISOString(),
    };

    saveBooking(base);

    // ── Persist notification so it shows in navbar bell + account page ──
    addNotification({
      type: "booking_confirmed",
      title: "Booking Confirmed",
      body: `${item.name} — ${base.date}. Ref: ${base.bookingRef}`,
      ref: base.bookingRef,
      link: "/account",
    });

    toast({
      title: "Booking confirmed ✓",
      description: `Ref: ${base.bookingRef} — check your account for details.`,
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
