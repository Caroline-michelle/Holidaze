import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVenueById } from "../api/venues";
import { createBooking } from "../api/bookings";

import type { Venue } from "../types/venue";
import type { ApiResponse } from "../types/api";

function VenueDetails() {
  const { id } = useParams();

  const [venue, setVenue] = useState<Venue | null>(null);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const [bookingMessage, setBookingMessage] = useState("");

  useEffect(() => {
    async function loadVenue() {
      if (!id) return;

      try {
        const response = (await getVenueById(id)) as ApiResponse<Venue>;

        setVenue(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    loadVenue();
  }, [id]);

  async function handleBooking() {
    if (!venue) return;

    setBookingMessage("");

    try {
      await createBooking({
        dateFrom: checkIn,
        dateTo: checkOut,
        guests,
        venueId: venue.id,
      });

      setBookingMessage("Booking successful!");
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        setBookingMessage(error.message);
      } else {
        setBookingMessage("Booking failed");
      }
    }
  }

  if (!venue) {
    return <p>Loading venue...</p>;
  }

  const images = [
    ...(venue.media || []),

    {
      url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
      alt: "Room",
    },
    {
      url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      alt: "Cabin",
    },
    {
      url: "https://images.unsplash.com/photo-1494526585095-c41746248156",
      alt: "Kitchen",
    },
    {
      url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
      alt: "View",
    },
  ];

  return (
    <main className='venue-details'>
      <div className='venue-gallery'>
        {images.slice(0, 5).map((image, index) => (
          <img
            key={`${image.url}-${index}`}
            src={image.url}
            alt={image.alt || venue.name}
            onError={(event) => {
              event.currentTarget.src =
                "https://placehold.co/800x500?text=No+Image";
            }}
          />
        ))}
      </div>

      <div className='venue-bottom'>
        <section className='venue-details__main'>
          <h1>{venue.name}</h1>

          <p>
            {venue.location?.city || "Unknown location"}
            {venue.location?.country ? `, ${venue.location.country}` : ""}
          </p>

          <p>
            {venue.maxGuests} guests · {venue.rating} rating
          </p>

          <section className='venue-details__section'>
            <h2>About this place</h2>

            <p>{venue.description}</p>
          </section>

          <section className='venue-details__section'>
            <h2>Amenities</h2>

            <div className='amenities'>
              {venue.meta?.wifi && <span>WiFi</span>}
              {venue.meta?.parking && <span>Parking</span>}
              {venue.meta?.breakfast && <span>Breakfast</span>}
              {venue.meta?.pets && <span>Pets allowed</span>}
            </div>
          </section>
        </section>

        <aside className='booking-box'>
          <p>
            <strong>{venue.price} NOK</strong>/night
          </p>

          <label>
            Check in
            <input
              type='date'
              value={checkIn}
              onChange={(event) => setCheckIn(event.target.value)}
            />
          </label>

          <label>
            Check out
            <input
              type='date'
              value={checkOut}
              onChange={(event) => setCheckOut(event.target.value)}
            />
          </label>

          <label>
            Guests
            <input
              type='number'
              min='1'
              max={venue.maxGuests}
              value={guests}
              onChange={(event) => setGuests(Number(event.target.value))}
            />
          </label>

          <button type='button' onClick={handleBooking}>
            Book now
          </button>

          {bookingMessage && <p>{bookingMessage}</p>}
        </aside>
      </div>
    </main>
  );
}

export default VenueDetails;
