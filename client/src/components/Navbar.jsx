
import { NavLink, Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="navbar-logo">
        ROAM<span>.</span>
      </Link>

      <nav className="navbar-links">
        <NavLink to="/" end className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }>
          Home
        </NavLink>

        <NavLink to="/explore" className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }>
          Explore
        </NavLink>

        <NavLink to="/plan" className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }>
          Plan a trip
        </NavLink>
      </nav>

      <Link to="/plan" className="navbar-cta">
        Start planning <span>↗</span>
      </Link>
    </header>
  );
}

export default Navbar;
