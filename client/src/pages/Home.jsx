import Marquee from "../components/Marquee";
import Destinations from "../components/Destinations";
import PlanSection from "../components/PlanSection";
import ScrollAnimations from "../components/ScrollAnimations";

function Home() {
  return (
    <main>

      <section className="hero">

        <p className="hero-label">
          TRAVEL / DISCOVERY / EXPERIENCE
        </p>

        <h1>
          DISCOVER
          <br />
          SOMEWHERE
          <br />
          WORTH GETTING
          <br />
          LOST IN.
        </h1>

        <div className="hero-bottom">

          <p>
            A smarter way to discover
            places and plan your journey.
          </p>

          <span>
            ↓ SCROLL TO EXPLORE
          </span>

        </div>

      </section>

      <Marquee />

      <Destinations />

      <PlanSection />

      <ScrollAnimations />

    </main>
  );
}

export default Home;