
import { useEffect, useState } from "react";

import TripPlannerForm from "../components/TripPlannerForm";
import DestinationSelector from "../components/DestinationSelector";
import Itinerary from "../components/Itinerary";
import BudgetSummary from "../components/BudgetSummary";

import { buildItinerary } from "../utils/tripPlanner";

const initialForm = {
  tripName: "",
  startDate: "",
  endDate: "",
  travelers: "1",
  budget: "1000",
};

function PlanTrip() {
  const [form, setForm] = useState(initialForm);
  const [selectedSlugs, setSelectedSlugs] = useState([]);
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState("");
  const [savedTrips, setSavedTrips] = useState([]);

  // Load saved trips once when this page opens.
  useEffect(() => {
    try {
      const stored = localStorage.getItem("roam-saved-trips");
      const parsed = stored ? JSON.parse(stored) : [];

      if (Array.isArray(parsed)) {
        setSavedTrips(parsed);
      }
    } catch {
      setSavedTrips([]);
    }
  }, []);

  function handleFormChange(event) {
    const { name, value } = event.target;

    setForm((current) => {
      const updated = { ...current, [name]: value };

      // Keep the end date from falling before the start date.
      if (
        name === "startDate" &&
        updated.endDate &&
        updated.endDate < value
      ) {
        updated.endDate = value;
      }

      return updated;
    });

    setError("");
  }

  function handleToggleDestination(slug) {
    setSelectedSlugs((current) =>
      current.includes(slug)
        ? current.filter((item) => item !== slug)
        : [...current, slug]
    );

    setError("");
  }

  function handleGenerate(event) {
    event.preventDefault();
    setError("");

    try {
      const generatedPlan = buildItinerary(form, selectedSlugs);
      setPlan(generatedPlan);

      // Bring the generated itinerary into view.
      window.setTimeout(() => {
        document.getElementById("generated-itinerary")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    }
  }

  function handleSaveTrip() {
    if (!plan) {
      return;
    }

    try {
      const tripToSave = {
        ...plan,
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        savedAt: new Date().toISOString(),
      };

      const updatedTrips = [tripToSave, ...savedTrips];

      localStorage.setItem(
        "roam-saved-trips",
        JSON.stringify(updatedTrips)
      );

      setSavedTrips(updatedTrips);
      setError("");
    } catch {
      setError("Unable to save this trip in your browser.");
    }
  }

  function handleLoadTrip(trip) {
    setForm({
      tripName: trip.tripName,
      startDate: trip.startDate,
      endDate: trip.endDate,
      travelers: String(trip.travelers),
      budget: String(trip.budget),
    });

    setSelectedSlugs(trip.selectedSlugs);
    setPlan(trip);
    setError("");

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleDeleteTrip(id) {
    const updatedTrips = savedTrips.filter((trip) => trip.id !== id);

    try {
      localStorage.setItem(
        "roam-saved-trips",
        JSON.stringify(updatedTrips)
      );

      setSavedTrips(updatedTrips);
    } catch {
      setError("Unable to update your saved trips.");
    }
  }

  return (
    <main className="plan-trip-page">
      <section className="plan-trip-hero">
        <p className="eyebrow">YOUR WORLD, YOUR WAY</p>
        <h1>
          Make room
          <br />
          <span>for somewhere new.</span>
        </h1>
        <p>
          Your next great story starts with a plan.
          Choose your places, set your budget, and let ROAM
          map out the first draft of your adventure.
        </p>
      </section>

      <div className="plan-trip-layout">
        <div className="plan-trip-main">
          <TripPlannerForm
            form={form}
            onChange={handleFormChange}
          />

          <DestinationSelector
            selectedSlugs={selectedSlugs}
            onToggle={handleToggleDestination}
          />

          {error && (
            <p className="trip-error" role="alert">
              {error}
            </p>
          )}

          <div className="generate-again">
            <button
              type="button"
              className="trip-primary-button"
              onClick={handleGenerate}
            >
              Generate itinerary ↗
            </button>
          </div>

          <div id="generated-itinerary">
            <Itinerary plan={plan} />

            {plan && (
              <div className="save-trip-actions">
                <button
                  type="button"
                  className="trip-primary-button"
                  onClick={handleSaveTrip}
                >
                  Save this trip
                </button>
              </div>
            )}

            <BudgetSummary plan={plan} />
          </div>
        </div>

        <aside className="saved-trips-panel">
          <p className="eyebrow">YOUR COLLECTION</p>
          <h2>Saved journeys</h2>
          <p className="saved-trips-intro">
            Your plans, ready when you are.
          </p>

          {savedTrips.length === 0 ? (
            <p className="saved-trips-empty">
              Your saved trips will appear here once you create one.
            </p>
          ) : (
            <div className="saved-trips-list">
              {savedTrips.map((trip) => (
                <article className="saved-trip-card" key={trip.id}>
                  <h3>{trip.tripName}</h3>
                  <p>
                    {trip.startDate} — {trip.endDate}
                  </p>
                  <p>
                    ${Number(trip.estimatedTotal).toLocaleString("en-US")}
                    {" "}estimated
                  </p>

                  <div className="saved-trip-actions">
                    <button
                      type="button"
                      onClick={() => handleLoadTrip(trip)}
                    >
                      Open
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteTrip(trip.id)}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}

export default PlanTrip;
