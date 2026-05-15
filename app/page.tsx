import { LandingSampleHotspots } from "@/components/LandingSampleHotspots";

export default function HomePage() {
  return (
    <main className="landing">
      <section className="landing-art landing-art-main" id="samples" aria-label="Custom walkout songs overview and song samples">
        <a className="landing-hotspot hero-player" href="#individual-packages">
          Create Walkout Song
        </a>
        <LandingSampleHotspots />
        <a className="landing-hotspot lower-player" href="#individual-packages">
          Individual Player Package
        </a>
      </section>

      <section
        className="landing-art landing-art-individual"
        id="individual-packages"
        aria-label="Individual player packages"
      >
        <a className="landing-hotspot individual-basic" href="#order-individual-basic">
          Order Now
        </a>
      </section>

      <section className="landing-art landing-art-team" id="team-packages" aria-label="Team packages">
        <a className="landing-hotspot team-order" href="#order-team-package">
          Order Now
        </a>
      </section>

      <section className="landing-art landing-art-close" aria-label="Making an All-Star Team is a big deal">
        <a className="landing-hotspot close-learn" href="#individual-packages">
          Learn More
        </a>
      </section>

      <section className="landing-order-panel" id="order">
        <div id="order-individual-basic">
          <h2>Individual Player Packages</h2>
          <p>Connect this button to the individual player order form or checkout.</p>
        </div>
        <div id="order-team-package">
          <h2>Team Packages</h2>
          <p>Connect this button to the team package order form or checkout.</p>
        </div>
      </section>
    </main>
  );
}
