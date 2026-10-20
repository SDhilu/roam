
import { Link, useParams } from "react-router-dom";
import destinations from "../data/destinations";

function DestinationDetails() {
  const { slug } = useParams();

  const destination = destinations.find(
    (place) => place.slug === slug
  );

  // Show a helpful message if the slug doesn't match a destination.
  if (!destination) {
    return (
      <main className="destination-not-found">
        <p className="eyebrow">DESTINATION NOT FOUND</p>
        <h1>Not every road leads somewhere.</h1>
        <Link to="/explore" className="detail-back-link">
          ← Back to Explore
        </Link>
      </main>
    );
  }

  return (
    <main className="destination-detail">
      <section className="detail-hero">
        <img
          className="detail-hero-image"
          src={destination.image}
          alt={`${destination.name}, ${destination.country}`}
        />

        <div className="detail-hero-overlay" />

        <div className="detail-hero-content">
          <Link to="/explore" className="detail-back-link">
            ← All destinations
          </Link>

          <p className="eyebrow">
            {destination.country} / {destination.category}
          </p>

          <h1>{destination.name}</h1>

          <p className="detail-hero-description">
            {destination.description}
          </p>
        </div>
      </section>

      <section className="detail-content">
        <div className="detail-main">
          <p className="eyebrow">GET TO KNOW THE PLACE</p>

          <h2>
            More than a destination.
            <br />
            <span>An experience.</span>
          </h2>

          <p className="detail-description">
            {destination.description}
          </p>

          <div className="detail-highlights">
            <h3>Things worth experiencing</h3>

            <ul>
              {destination.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="detail-facts">
          <div className="detail-fact">
            <span>COUNTRY</span>
            <p>{destination.country}</p>
          </div>

          <div className="detail-fact">
            <span>BEST TIME TO VISIT</span>
            <p>{destination.bestTime}</p>
          </div>

          <div className="detail-fact">
            <span>RECOMMENDED STAY</span>
            <p>{destination.duration}</p>
          </div>

          <div className="detail-fact">
            <span>ESTIMATED DAILY BUDGET</span>
            <p>${destination.budget} USD / day</p>
          </div>

          <Link to="/explore" className="detail-explore-button">
            Discover another place ↗
          </Link>

          <p className="detail-budget-note">
            Budget figures are illustrative estimates per person,
            per day. Actual costs vary by season, accommodation,
            transport, and travel style.
          </p>
        </aside>
      </section>
    </main>
  );
}

export default DestinationDetails;
