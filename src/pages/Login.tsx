import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { loginUser } from "../api/auth";

type LoginResponse = {
  data: {
    name: string;
    email: string;
    accessToken: string;
    venueManager: boolean;
  };
};

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    try {
      const response = (await loginUser({
        email,
        password,
      })) as LoginResponse;

      localStorage.setItem("accessToken", response.data.accessToken);

      localStorage.setItem("user", JSON.stringify(response.data));

      navigate("/");
    } catch (error) {
      console.error(error);

      setError("Login failed. Check your email and password.");
    }
  }

  return (
    <main className='auth-page'>
      <h1>Welcome back</h1>

      <p>Log in to your account to continue</p>

      <form className='auth-form' onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type='email'
            placeholder='Enter your email'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>

        <label>
          Password
          <input
            type='password'
            placeholder='Enter your password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>

        {error && <p>{error}</p>}

        <button type='submit'>Log in</button>
      </form>

      <p className='auth-footer'>
        Don&apos;t have an account? <Link to='/register'>Register</Link>
      </p>
    </main>
  );
}

export default Login;
