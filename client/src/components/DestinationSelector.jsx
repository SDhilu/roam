
import destinations from "../data/destinations";

function DestinationSelector({ selectedSlugs, onToggle }) {
  return (
    <section className="trip-section" id="destination-selector">
      <div className="trip-section-heading">
        <p className="eyebrow">02 / YOUR DESTINATIONS</p>
        <h2>Where will you go?</h2>
        <p>Select one or more destinations for your journey.</p>
      </div>

      <div className="planner-destination-grid">
        {destinations.map((destination) => {
          const selected = selectedSlugs.includes(destination.slug);

          return (
            <button
              type="button"
              key={destination.slug}
              className={
                selected
                  ? "planner-destination selected"
                  : "planner-destination"
              }
              onClick={() => onToggle(destination.slug)}
              aria-pressed={selected}
            >
              <img
                src={destination.image}
                alt=""
                loading="lazy"
              />

              <span className="planner-destination-shade" />

              <span className="planner-destination-content">
                <span className="planner-destination-category">
                  {destination.category}
                </span>

                <span className="planner-destination-name">
                  {destination.name}
                </span>

                <span className="planner-destination-country">
                  {destination.country}
                </span>
              </span>

              <span className="planner-destination-check">
                {selected ? "✓" : "+"}
              </span>
            </button>
          );
        })}
      </div>

      <p className="selection-hint">
        {selectedSlugs.length} destination
        {selectedSlugs.length === 1 ? "" : "s"} selected
      </p>
    </section>
  );
}

export default DestinationSelector;
