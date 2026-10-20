
import { NavLink, Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="navbar-logo">
        ROAM<span>.</span>
      </Link>

      <nav className="navbar-links">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/explore"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Explore
        </NavLink>
      </nav>

      <Link to="/explore" className="navbar-cta">
        Discover places <span>↗</span>
      </Link>
    </header>
  );
}

export default Navbar;
