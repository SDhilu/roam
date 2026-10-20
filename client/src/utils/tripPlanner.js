import destinations from "../data/destinations";

export function buildItinerary(form, selectedSlugs) {
  if (!form.tripName.trim()) {
    throw new Error("Please enter a name for your trip.");
  }

  if (!form.startDate || !form.endDate) {
    throw new Error("Please choose your start and end dates.");
  }

  const startDate = new Date(`${form.startDate}T00:00:00`);
  const endDate = new Date(`${form.endDate}T00:00:00`);

  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
    throw new Error("Please enter valid trip dates.");
  }

  if (endDate < startDate) {
    throw new Error("The end date cannot be before the start date.");
  }

  const travelers = Number(form.travelers);
  const budget = Number(form.budget);

  if (!Number.isFinite(travelers) || travelers < 1) {
    throw new Error("Please enter at least one traveller.");
  }

  if (!Number.isFinite(budget) || budget <= 0) {
    throw new Error("Please enter a budget greater than zero.");
  }

  if (!selectedSlugs || selectedSlugs.length === 0) {
    throw new Error("Please choose at least one destination.");
  }

  const selectedDestinations = selectedSlugs
    .map((slug) => destinations.find((destination) => destination.slug === slug))
    .filter(Boolean);

  if (selectedDestinations.length === 0) {
    throw new Error("The selected destinations could not be found.");
  }

  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const numberOfDays =
    Math.floor((endDate - startDate) / millisecondsPerDay) + 1;

  const itinerary = [];

  for (let index = 0; index < numberOfDays; index += 1) {
    const destination =
      selectedDestinations[index % selectedDestinations.length];

    const activity =
      destination.highlights?.[index % destination.highlights.length] ||
      `Explore ${destination.name}`;

    const dailyCost = Number(destination.budget) || 50;

    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);

    itinerary.push({
      day: index + 1,
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      destinationSlug: destination.slug,
      destinationName: destination.name,
      country: destination.country,
      activity,
      estimatedCost: dailyCost * travelers,
    });
  }

  const estimatedTotal = itinerary.reduce(
    (total, day) => total + Number(day.estimatedCost || 0),
    0
  );

  return {
    tripName: form.tripName.trim(),
    startDate: form.startDate,
    endDate: form.endDate,
    travelers,
    budget,
    selectedSlugs,
    itinerary,
    estimatedTotal,
    expenses: [],
  };
}