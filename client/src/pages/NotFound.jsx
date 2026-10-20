
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="page-placeholder">
      <p className="eyebrow">404 — OFF THE MAP</p>
      <h1>This destination doesn't exist.</h1>
      <p>Looks like we've wandered a little too far.</p>
      <Link to="/explore" className="navbar-cta">
        Explore destinations ↗
      </Link>
    </main>
  );
}

export default NotFound;
