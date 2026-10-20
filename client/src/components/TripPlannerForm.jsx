
function TripPlannerForm({ form, onChange }) {
  function goToDestinations() {
    document.getElementById("destination-selector")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <section className="trip-form">
      <div className="trip-form-heading">
        <p className="eyebrow">01 / YOUR JOURNEY</p>
        <h2>Let's plan something unforgettable.</h2>
        <p>Start with the essentials. You can refine your journey as you go.</p>
      </div>

      <div className="trip-form-grid">
        <label className="trip-field trip-field-wide">
          Trip name
          <input
            name="tripName"
            value={form.tripName}
            onChange={onChange}
            placeholder="e.g. Summer in Japan"
            maxLength={70}
            required
          />
        </label>

        <label className="trip-field">
          Start date
          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={onChange}
            required
          />
        </label>

        <label className="trip-field">
          End date
          <input
            type="date"
            name="endDate"
            value={form.endDate}
            min={form.startDate || undefined}
            onChange={onChange}
            required
          />
        </label>

        <label className="trip-field">
          Travellers
          <input
            type="number"
            name="travelers"
            value={form.travelers}
            min="1"
            max="20"
            onChange={onChange}
            required
          />
        </label>

        <label className="trip-field">
          Total budget (USD)
          <input
            type="number"
            name="budget"
            value={form.budget}
            min="1"
            step="1"
            onChange={onChange}
            required
          />
        </label>
      </div>

      <button
        type="button"
        className="trip-primary-button"
        onClick={goToDestinations}
      >
        Choose destinations <span>↓</span>
      </button>
    </section>
  );
}

export default TripPlannerForm;
