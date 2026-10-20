
import { useEffect, useState } from "react";

import TripPlannerForm from "../components/TripPlannerForm";
import DestinationSelector from "../components/DestinationSelector";
import Itinerary from "../components/Itinerary";
import BudgetSummary from "../components/BudgetSummary";
import ExpenseTracker from "../components/ExpenseTracker";

import { buildItinerary } from "../utils/tripPlanner";

const STORAGE_KEY = "roam-saved-trips";

const initialForm = {
  tripName: "",
  startDate: "",
  endDate: "",
  travelers: "1",
  budget: "1000",
};

function recalculatePlan(plan) {
  const itinerary = plan.itinerary || [];

  return {
    ...plan,
    itinerary,
    estimatedTotal: itinerary.reduce(
      (total, day) => total + Number(day.estimatedCost || 0),
      0
    ),
    expenses: plan.expenses || [],
  };
}

function PlanTrip() {
  const [form, setForm] = useState(initialForm);
  const [selectedSlugs, setSelectedSlugs] = useState([]);
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [savedTrips, setSavedTrips] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const parsed = stored ? JSON.parse(stored) : [];

      if (Array.isArray(parsed)) {
        setSavedTrips(
          parsed.map((trip) => ({
            ...trip,
            expenses: trip.expenses || [],
            itinerary: trip.itinerary || [],
            estimatedTotal: Number(trip.estimatedTotal || 0),
          }))
        );
      }
    } catch {
      setSavedTrips([]);
      setError("Saved trips could not be loaded from this browser.");
    }
  }, []);

  function handleFormChange(event) {
    const { name, value } = event.target;

    setForm((current) => {
      const updated = { ...current, [name]: value };

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
    setNotice("");
  }

  function handleToggleDestination(slug) {
    setSelectedSlugs((current) =>
      current.includes(slug)
        ? current.filter((item) => item !== slug)
        : [...current, slug]
    );

    setError("");
    setNotice("");
  }

  function handleGenerate(event) {
    event?.preventDefault?.();
    setError("");
    setNotice("");

    try {
      const generated = buildItinerary(form, selectedSlugs);

      const updatedPlan = {
        ...generated,
        id: plan?.id || `trip-${Date.now()}`,
        expenses: plan?.expenses || [],
      };

      setPlan(recalculatePlan(updatedPlan));
      setNotice("Your itinerary has been generated.");
    } catch (err) {
      setError(err.message || "Unable to generate the itinerary.");
    }
  }

  function persistTrips(trips) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
      setSavedTrips(trips);
      return true;
    } catch {
      setError("Unable to save changes in your browser.");
      return false;
    }
  }

  function handleSaveTrip() {
    if (!plan) {
      return;
    }

    const tripToSave = recalculatePlan({
      ...plan,
      tripName: form.tripName.trim(),
      budget: Number(form.budget),
      travelers: Number(form.travelers),
      selectedSlugs,
      savedAt: new Date().toISOString(),
    });

    const exists = savedTrips.some((trip) => trip.id === tripToSave.id);

    const updatedTrips = exists
      ? savedTrips.map((trip) =>
          trip.id === tripToSave.id ? tripToSave : trip
        )
      : [tripToSave, ...savedTrips];

    if (persistTrips(updatedTrips)) {
      setPlan(tripToSave);
      setNotice(exists ? "Your saved trip has been updated." : "Trip saved successfully.");
      setError("");
    }
  }

  function handleLoadTrip(trip) {
    const loadedPlan = recalculatePlan({
      ...trip,
      expenses: trip.expenses || [],
    });

    setPlan(loadedPlan);

    setForm({
      tripName: trip.tripName || "",
      startDate: trip.startDate || "",
      endDate: trip.endDate || "",
      travelers: String(trip.travelers || 1),
      budget: String(trip.budget || 1000),
    });

    setSelectedSlugs(trip.selectedSlugs || []);
    setError("");
    setNotice(`Opened "${trip.tripName}".`);

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleDeleteTrip(id) {
    const updatedTrips = savedTrips.filter((trip) => trip.id !== id);

    if (persistTrips(updatedTrips)) {
      if (plan?.id === id) {
        setPlan(null);
      }

      setNotice("Saved trip deleted.");
      setError("");
    }
  }

  function handleUpdateActivity(dayNumber, activity) {
    setPlan((current) => {
      if (!current) return current;

      return {
        ...current,
        itinerary: current.itinerary.map((day) =>
          day.day === dayNumber ? { ...day, activity } : day
        ),
      };
    });

    setNotice("");
  }

  function handleRemoveDay(dayNumber) {
    if (!plan || plan.itinerary.length <= 1) {
      setError("Keep at least one day in your itinerary.");
      return;
    }

    const updatedDays = plan.itinerary
      .filter((day) => day.day !== dayNumber)
      .map((day, index) => ({
        ...day,
        day: index + 1,
      }));

    setPlan(recalculatePlan({
      ...plan,
      itinerary: updatedDays,
    }));

    setNotice("Day removed. Save your trip to keep the change.");
    setError("");
  }

  function handleAddExpense(expense) {
    if (!plan) return;

    const newExpense = {
      ...expense,
      id: `expense-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    };

    setPlan((current) => ({
      ...current,
      expenses: [...(current.expenses || []), newExpense],
    }));

    setNotice("Expense added. Save your trip to keep the change.");
    setError("");
  }

  function handleDeleteExpense(expenseId) {
    if (!plan) return;

    setPlan((current) => ({
      ...current,
      expenses: current.expenses.filter(
        (expense) => expense.id !== expenseId
      ),
    }));

    setNotice("Expense removed. Save your trip to keep the change.");
    setError("");
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
          Choose your destinations, build your itinerary,
          and keep your spending in one place.
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

          {notice && (
            <p className="trip-notice" role="status">
              {notice}
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
            <Itinerary
              plan={plan}
              onUpdateActivity={handleUpdateActivity}
              onRemoveDay={handleRemoveDay}
            />

            {plan && (
              <>
                <div className="save-trip-actions">
                  <button
                    type="button"
                    className="trip-primary-button"
                    onClick={handleSaveTrip}
                  >
                    Save trip and changes
                  </button>
                </div>

                <ExpenseTracker
                  expenses={plan.expenses || []}
                  onAddExpense={handleAddExpense}
                  onDeleteExpense={handleDeleteExpense}
                />

                <BudgetSummary plan={plan} />
              </>
            )}
          </div>
        </div>

        <aside className="saved-trips-panel">
          <p className="eyebrow">YOUR COLLECTION</p>
          <h2>Saved journeys</h2>

          <p className="saved-trips-intro">
            Open a trip to continue planning or tracking expenses.
          </p>

          {savedTrips.length === 0 ? (
            <p className="saved-trips-empty">
              Save your first trip and it will appear here.
            </p>
          ) : (
            <div className="saved-trips-list">
              {savedTrips.map((trip) => (
                <article className="saved-trip-card" key={trip.id}>
                  <h3>{trip.tripName || "Untitled trip"}</h3>

                  <p>
                    {trip.startDate} — {trip.endDate}
                  </p>

                  <p>
                    ${Number(trip.estimatedTotal || 0).toLocaleString("en-US")}
                    {" "}estimated
                  </p>

                  <p>
                    {(trip.expenses || []).length} recorded expense
                    {(trip.expenses || []).length === 1 ? "" : "s"}
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
