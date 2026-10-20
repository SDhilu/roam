
import destinations from "../data/destinations";

if (!form.tripName.trim()) {
  throw new Error("Please enter a name for your trip.");
}

if (!form.startDate || !form.endDate) {
  throw new Error("Please choose your start and end dates.");
}

// Parse a YYYY-MM-DD string as a local date.
// This avoids some timezone issues caused by new Date(dateString).
function parseLocalDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function formatDate(date) {
  return date.toLocaleDateString("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function buildItinerary(form, selectedSlugs) {
  const startDate = parseLocalDate(form.startDate);
  const endDate = parseLocalDate(form.endDate);

  if (
    Number.isNaN(startDate.getTime()) ||
    Number.isNaN(endDate.getTime()) ||
    endDate < startDate
  ) {
    throw new Error("Please enter valid trip dates.");
  }

  const travelers = Number(form.travelers);
  const budget = Number(form.budget);

  if (
    !Number.isInteger(travelers) ||
    travelers < 1 ||
    travelers > 20
  ) {
    throw new Error("Choose between 1 and 20 travellers.");
  }

  if (!Number.isFinite(budget) || budget <= 0) {
    throw new Error("Please enter a budget greater than zero.");
  }

  const selectedDestinations = destinations.filter(
    (destination) => selectedSlugs.includes(destination.slug)
  );

  if (selectedDestinations.length === 0) {
    throw new Error("Please select at least one destination.");
  }

  const totalDays =
    Math.round((endDate - startDate) / 86400000) + 1;

  // This demo keeps generated plans to a reasonable size.
  if (totalDays > 60) {
    throw new Error("For this demo, trips can be up to 60 days.");
  }

  const itinerary = [];

  for (let index = 0; index < totalDays; index += 1) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);

    // Cycle through the chosen places, one destination per day.
    const destination =
      selectedDestinations[index % selectedDestinations.length];

    const activities =
      destination.highlights || ["Explore the destination"];

    const activity = activities[index % activities.length];

    const estimatedCost =
      Number(destination.budget) * travelers;

    itinerary.push({
      day: index + 1,
      date: formatDate(date),
      destinationSlug: destination.slug,
      destinationName: destination.name,
      country: destination.country,
      activity,
      estimatedCost,
    });
  }

  const estimatedTotal = itinerary.reduce(
    (total, day) => total + day.estimatedCost,
    0
  );

  return {
    tripName: form.tripName.trim(),
    startDate: form.startDate,
    endDate: form.endDate,
    travelers,
    budget,
    selectedSlugs: selectedDestinations.map(
      (destination) => destination.slug
    ),
    itinerary,
    estimatedTotal,
    createdAt: new Date().toISOString(),
  };
}
