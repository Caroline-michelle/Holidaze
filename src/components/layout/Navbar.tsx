import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");

  const user = JSON.parse(localStorage.getItem("user") || "null");

  function handleLogout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    navigate("/");
  }

  return (
    <header className='navbar'>
      <Link to='/' className='navbar__logo'>
        Holidaze
      </Link>

      <nav className='navbar__links'>
        <Link to='/'>Home</Link>

        {token ? (
          <>
            <Link to='/profile'>My profile</Link>

            <Link to='/create'>Create venue</Link>

            <span>{user?.name || "Profile"}</span>

            <button onClick={handleLogout}>Log out</button>
          </>
        ) : (
          <>
            <Link to='/login'>Log in</Link>

            <Link to='/register'>Sign up</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
