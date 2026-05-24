import { useEffect, useState } from "react";
import { getVenues } from "../api/venues";
import VenueCard from "../components/venue/VenueCard";
import type { Venue } from "../types/venue";
import SearchBar from "../components/ui/SearchBar";

function Home() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function loadVenues() {
      try {
        const response = (await getVenues()) as { data: Venue[] };
        setVenues(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    loadVenues();
  }, []);

  const filteredVenues = venues.filter((venue) => {
    const query = searchQuery.toLowerCase();

    return (
      venue.name.toLowerCase().includes(query) ||
      venue.location?.city?.toLowerCase().includes(query) ||
      venue.location?.country?.toLowerCase().includes(query)
    );
  });

  return (
    <main>
      <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <div className='venue-grid'>
        {filteredVenues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>
    </main>
  );
}

export default Home;
