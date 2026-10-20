function DestinationCard({ destination }) {
  return (
    <article className="destination-card">

      <div className="destination-image">

        <img
          src={destination.image}
          alt={destination.name}
        />

        <div className="destination-overlay">

          <span>
            EXPLORE ↗
          </span>

        </div>

      </div>

      <div className="destination-info">

        <div>

          <p className="destination-country">
            {destination.country}
          </p>

          <h3>
            {destination.name}
          </h3>

        </div>

        <p className="destination-description">
          {destination.description}
        </p>

      </div>

    </article>
  );
}

export default DestinationCard;