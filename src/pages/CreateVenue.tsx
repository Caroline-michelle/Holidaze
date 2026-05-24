import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createVenue } from "../api/venues";

function CreateVenue() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(100);
  const [maxGuests, setMaxGuests] = useState(1);

  const [imageUrl, setImageUrl] = useState("");

  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const [wifi, setWifi] = useState(false);
  const [parking, setParking] = useState(false);
  const [breakfast, setBreakfast] = useState(false);
  const [pets, setPets] = useState(false);

  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage("");

    try {
      await createVenue({
        name,
        description,
        price,
        maxGuests,

        media: [
          {
            url: imageUrl,
            alt: name,
          },
        ],

        meta: {
          wifi,
          parking,
          breakfast,
          pets,
        },

        location: {
          city,
          country,
        },
      });

      setMessage("Venue created!");

      navigate("/");
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("Could not create venue");
      }
    }
  }

  return (
    <main className='form-page'>
      <h1>Create venue</h1>

      <form className='venue-form' onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type='text'
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </label>

        <label>
          Description
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          />
        </label>

        <label>
          City
          <input
            type='text'
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
        </label>

        <label>
          Country
          <input
            type='text'
            value={country}
            onChange={(event) => setCountry(event.target.value)}
          />
        </label>

        <label>
          Price per night
          <input
            type='number'
            min='1'
            value={price}
            onChange={(event) => setPrice(Number(event.target.value))}
            required
          />
        </label>

        <label>
          Max guests
          <input
            type='number'
            min='1'
            value={maxGuests}
            onChange={(event) => setMaxGuests(Number(event.target.value))}
            required
          />
        </label>

        <label>
          Image URL
          <input
            type='url'
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
            required
          />
        </label>

        <div className='checkbox-group'>
          <label>
            <input
              type='checkbox'
              checked={wifi}
              onChange={(event) => setWifi(event.target.checked)}
            />
            WiFi
          </label>

          <label>
            <input
              type='checkbox'
              checked={parking}
              onChange={(event) => setParking(event.target.checked)}
            />
            Parking
          </label>

          <label>
            <input
              type='checkbox'
              checked={breakfast}
              onChange={(event) => setBreakfast(event.target.checked)}
            />
            Breakfast
          </label>

          <label>
            <input
              type='checkbox'
              checked={pets}
              onChange={(event) => setPets(event.target.checked)}
            />
            Pets allowed
          </label>
        </div>

        <button type='submit'>Create venue</button>

        {message && <p>{message}</p>}
      </form>
    </main>
  );
}

export default CreateVenue;
