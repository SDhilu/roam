
import { useState } from "react";
import destinations from "../data/destinations";
import ExploreDestinationCard from "../components/ExploreDestinationCard";

const categories = [
  "All",
  "Nature",
  "Culture",
  "Beaches",
  "Adventure",
];

function Explore() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredDestinations =
    activeCategory === "All"
      ? destinations
      : destinations.filter(
          (destination) => destination.category === activeCategory
        );

  return (
    <main className="explore-page">
      <section className="explore-heading">
        <p className="eyebrow">THE WORLD IS WAITING</p>

        <h1>
          Find your
          <br />
          <span>somewhere.</span>
        </h1>

        <p className="explore-intro">
          A collection of places worth getting lost in.
          Find a destination that feels like you.
        </p>
      </section>

      <section className="explore-results">
        <div className="explore-toolbar">
          <div className="category-filters" aria-label="Filter destinations">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={
                  activeCategory === category
                    ? "category-button selected"
                    : "category-button"
                }
                onClick={() => setActiveCategory(category)}
                aria-pressed={activeCategory === category}
              >
                {category}
              </button>
            ))}
          </div>

          <p className="results-count">
            {filteredDestinations.length} places
          </p>
        </div>

        {filteredDestinations.length > 0 ? (
          <div className="explore-grid">
            {filteredDestinations.map((destination) => (
              <ExploreDestinationCard
                key={destination.slug}
                destination={destination}
              />
            ))}
          </div>
        ) : (
          <p className="no-results">
            No destinations found in this category yet.
          </p>
        )}
      </section>
    </main>
  );
}

export default Explore;
