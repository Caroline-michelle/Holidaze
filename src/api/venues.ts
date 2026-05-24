import { apiFetch } from "./client";

export function getVenues() {
  return apiFetch("/holidaze/venues");
}

export function getVenueById(id: string) {
  return apiFetch(`/holidaze/venues/${id}?_bookings=true&_owner=true`);
}

type CreateVenueData = {
  name: string;
  description: string;

  price: number;
  maxGuests: number;

  media: {
    url: string;
    alt: string;
  }[];

  meta: {
    wifi: boolean;
    parking: boolean;
    breakfast: boolean;
    pets: boolean;
  };

  location: {
    city: string;
    country: string;
  };
};

export function createVenue(data: CreateVenueData) {
  return apiFetch("/holidaze/venues", {
    method: "POST",

    body: JSON.stringify(data),
  });
}
