
import { Link } from "react-router-dom";

function Itinerary({ plan, onUpdateActivity, onRemoveDay }) {
  if (!plan) {
    return (
      <section className="trip-empty-state">
        <span className="trip-empty-icon">↗</span>
        <p className="eyebrow">YOUR NEXT ADVENTURE</p>
        <h2>Your journey starts here.</h2>
        <p>Generate a plan to see your daily itinerary.</p>
      </section>
    );
  }

  return (
    <section className="trip-section itinerary-section">
      <div className="trip-section-heading">
        <p className="eyebrow">03 / YOUR ITINERARY</p>
        <h2>{plan.tripName || "Your adventure"}</h2>
        <p>
          {plan.itinerary.length} planned day
          {plan.itinerary.length === 1 ? "" : "s"}.
          Edit activities or remove days as needed.
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

              <label className="itinerary-edit-field">
                Planned activity
                <input
                  value={day.activity}
                  maxLength={200}
                  onChange={(event) =>
                    onUpdateActivity(day.day, event.target.value)
                  }
                />
              </label>

              <Link
                to={`/destinations/${day.destinationSlug}`}
                className="itinerary-detail-link"
              >
                Explore destination ↗
              </Link>

              <button
                type="button"
                className="remove-day-button"
                onClick={() => onRemoveDay(day.day)}
              >
                Remove this day
              </button>
            </div>

            <div className="itinerary-day-cost">
              <span>EST. DAILY COST</span>
              <strong>
                ${Number(day.estimatedCost).toLocaleString("en-US")}
              </strong>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Itinerary;
