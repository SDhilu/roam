
import { Link } from "react-router-dom";

function ExploreDestinationCard({ destination }) {
  return (
    <Link
      to={`/destinations/${destination.slug}`}
      className="explore-card"
    >
      <div className="explore-card-image">
        <img
          src={destination.image}
          alt={`${destination.name}, ${destination.country}`}
          loading="lazy"
        />

        <span className="explore-card-category">
          {destination.category}
        </span>

        <span className="explore-card-arrow" aria-hidden="true">
          ↗
        </span>
      </div>

      <div className="explore-card-info">
        <div>
          <h2>{destination.name}</h2>
          <p>{destination.country}</p>
        </div>

        <span className="explore-card-budget">
          From ${destination.budget}/day
        </span>
      </div>
    </Link>
  );
}

export default ExploreDestinationCard;
