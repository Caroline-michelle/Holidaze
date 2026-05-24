import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getProfileBookings } from "../api/bookings";
import { updateAvatar } from "../api/profiles";

import type { ApiResponse } from "../types/api";

type Booking = {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  venue?: {
    id: string;
    name: string;
    price: number;
    media?: {
      url: string;
      alt?: string;
    }[];
    location?: {
      city?: string;
      country?: string;
    };
  };
};

function Profile() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarMessage, setAvatarMessage] = useState("");

  useEffect(() => {
    async function loadBookings() {
      if (!user?.name) return;

      try {
        const response = (await getProfileBookings(user.name)) as ApiResponse<
          Booking[]
        >;

        setBookings(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    loadBookings();
  }, [user?.name]);

  async function handleAvatarUpdate() {
    if (!user?.name || !avatarUrl) return;

    try {
      await updateAvatar(user.name, {
        avatar: {
          url: avatarUrl,
          alt: user.name,
        },
      });

      const updatedUser = {
        ...user,
        avatar: {
          url: avatarUrl,
          alt: user.name,
        },
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));

      setAvatarMessage("Avatar updated!");

      window.location.reload();
    } catch (error) {
      console.error(error);
      setAvatarMessage("Failed to update avatar");
    }
  }

  return (
    <main className='profile profile-layout'>
      <div className='profile-sidebar'>
        <section className='profile-card'>
          {user?.avatar?.url && (
            <img
              src={user.avatar.url}
              alt={user.avatar.alt || user.name}
              className='profile-avatar'
            />
          )}

          <h1>{user?.name}</h1>

          <p>{user?.email}</p>

          <p>Venue manager: {user?.venueManager ? "Yes" : "No"}</p>

          <input
            className='profile-input'
            type='text'
            placeholder='Paste avatar image URL'
            value={avatarUrl}
            onChange={(event) => setAvatarUrl(event.target.value)}
          />

          <button type='button' onClick={handleAvatarUpdate}>
            Update avatar
          </button>

          {avatarMessage && <p>{avatarMessage}</p>}
        </section>

        {user?.venueManager && (
          <section className='profile-card'>
            <h2>Manager dashboard</h2>

            <p>Manage your venues and create new listings.</p>

            <Link to='/create' className='manager-button'>
              Create new venue
            </Link>
          </section>
        )}
      </div>

      <section className='profile-bookings'>
        <h2>My bookings</h2>

        <p>Here you can see your upcoming bookings.</p>

        {bookings.length === 0 && <p>You have no bookings yet.</p>}

        <div className='booking-list'>
          {bookings.map((booking) => (
            <article key={booking.id} className='booking-card'>
              {booking.venue?.media?.[0]?.url && (
                <img
                  src={booking.venue.media[0].url}
                  alt={booking.venue.media[0].alt || booking.venue.name}
                />
              )}

              <div className='booking-card__content'>
                <div>
                  <h3>{booking.venue?.name}</h3>

                  <p>
                    {booking.venue?.location?.city}
                    {booking.venue?.location?.country
                      ? `, ${booking.venue.location.country}`
                      : ""}
                  </p>

                  <p>
                    {new Date(booking.dateFrom).toLocaleDateString()} -{" "}
                    {new Date(booking.dateTo).toLocaleDateString()}
                  </p>

                  <p>{booking.guests} guests</p>
                </div>

                <div className='booking-card__side'>
                  <p>{booking.venue?.price} NOK/night</p>

                  {booking.venue?.id && (
                    <Link
                      to={`/venues/${booking.venue.id}`}
                      className='manager-button'
                    >
                      View details
                    </Link>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Profile;
