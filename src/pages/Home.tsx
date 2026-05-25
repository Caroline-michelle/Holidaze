import { useEffect, useState } from "react";

import { getVenues } from "../api/venues";
import VenueCard from "../components/venue/VenueCard";
import SearchBar from "../components/ui/SearchBar";

import type { Venue } from "../types/venue";

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
      <section className='search-hero'>
        <h1>Find your perfect stay</h1>

        <p>From cozy cabins to luxury stays</p>

        <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      </section>

      <div className='venue-grid'>
        {filteredVenues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>
    </main>
  );
}

export default Home;
