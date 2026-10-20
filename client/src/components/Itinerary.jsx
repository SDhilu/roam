
import { Link } from "react-router-dom";

function Itinerary({ plan }) {
  if (!plan) {
    return (
      <section className="trip-empty-state">
        <span className="trip-empty-icon">↗</span>
        <p className="eyebrow">YOUR NEXT ADVENTURE</p>
        <h2>Your journey starts here.</h2>
        <p>
          Enter your trip details, select your destinations,
          and generate your itinerary.
        </p>
      </section>
    );
  }

  return (
    <section className="trip-section itinerary-section">
      <div className="trip-section-heading">
        <p className="eyebrow">03 / YOUR ITINERARY</p>
        <h2>{plan.tripName || "Your adventure"}</h2>
        <p>
          {plan.itinerary.length} day
          {plan.itinerary.length === 1 ? "" : "s"} of exploring,
          made just for you.
        </p>
      </div>

      <div className="itinerary-list">
        {plan.itinerary.map((day) => (
          <article className="itinerary-day" key={day.day}>
            <div className="itinerary-day-number">
              {String(day.day).padStart(2, "0")}
            </div>

            <div className="itinerary-day-content">
              <p className="itinerary-date">
                DAY {day.day} · {day.date}
              </p>

              <h3>{day.destinationName}</h3>

              <p className="itinerary-country">{day.country}</p>

              <div className="itinerary-activity">
                <span>YOUR HIGHLIGHT</span>
                <p>{day.activity}</p>
              </div>

              <Link
                to={`/destinations/${day.destinationSlug}`}
                className="itinerary-detail-link"
              >
                Explore destination ↗
              </Link>
            </div>

            <div className="itinerary-day-cost">
              <span>EST. DAILY COST</span>
              <strong>
                ${day.estimatedCost.toLocaleString("en-US")}
              </strong>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Itinerary;
