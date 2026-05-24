import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { registerUser } from "../api/auth";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [venueManager, setVenueManager] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!email.endsWith("@stud.noroff.no")) {
      setError("You must use a stud.noroff.no email");
      return;
    }

    try {
      await registerUser({
        name,
        email,
        password,
        venueManager,
      });

      navigate("/login");
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Registration failed");
      }
    }
  }

  return (
    <main className='auth-page'>
      <h1>Create account</h1>

      <p>Join Holidaze and start your next adventure</p>

      <form className='auth-form' onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type='text'
            placeholder='Enter your name'
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </label>

        <label>
          Email
          <input
            type='email'
            placeholder='Enter your stud.noroff.no email'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>

        <label>
          Password
          <input
            type='password'
            placeholder='Create a password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>

        <label className='checkbox-label'>
          <input
            type='checkbox'
            checked={venueManager}
            onChange={(event) => setVenueManager(event.target.checked)}
          />
          Register as Venue Manager
        </label>

        {error && <p>{error}</p>}

        <button type='submit'>Register</button>
      </form>

      <p className='auth-footer'>
        Already have an account? <Link to='/login'>Log in</Link>
      </p>
    </main>
  );
}

export default Register;
