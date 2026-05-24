import { apiFetch } from "./client";

type CreateBookingData = {
  dateFrom: string;
  dateTo: string;
  guests: number;
  venueId: string;
};

export function createBooking(data: CreateBookingData) {
  return apiFetch("/holidaze/bookings", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
export function getProfileBookings(name: string) {
  return apiFetch(`/holidaze/profiles/${name}/bookings?_venue=true`);
}
