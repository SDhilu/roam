import destinations from "../data/destinations";
import DestinationCard from "./DestinationCard";

function Destinations() {
  return (
    <section className="destinations">

      <div className="section-heading">

        <p>
          01 — DESTINATIONS
        </p>

        <h2>
          PLACES
          <br />
          WORTH
          <br />
          DISCOVERING.
        </h2>

      </div>

      <div className="destination-grid">

        {destinations.map((destination) => (
          <DestinationCard
            key={destination.id}
            destination={destination}
          />
        ))}

      </div>

    </section>
  );
}

export default Destinations;