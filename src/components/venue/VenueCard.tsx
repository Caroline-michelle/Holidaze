import type { Venue } from "../../types/venue";
import { Link } from "react-router-dom";

type VenueCardProps = {
  venue: Venue;
};

function VenueCard({ venue }: VenueCardProps) {
  const image = venue.media?.[0];

  return (
    <Link to={`/venues/${venue.id}`} className='venue-card'>
      {image?.url && (
        <img
          src={image.url}
          alt={image.alt || venue.name}
          className='venue-card__image'
        />
      )}

      <div className='venue-card__content'>
        <h2>{venue.name}</h2>

        <p>
          {venue.location?.city || "Unknown location"}
          {venue.location?.country ? `, ${venue.location.country}` : ""}
        </p>

        <p>
          {venue.maxGuests} guests · {venue.rating} rating
        </p>

        <p>
          <strong>{venue.price} NOK</strong>/night
        </p>
      </div>
    </Link>
  );
}

export default VenueCard;
