import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">NotifyHub</Link>
      </div>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/announcements">Announcements</Link>
        <Link to="/events">Events</Link>
        <Link to="/query">Submit Query</Link>

        {token ? (
          <>
            <Link to="/admin">Dashboard</Link>

            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">Admin Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;