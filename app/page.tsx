import { LandingSampleHotspots } from "@/components/LandingSampleHotspots";

export default function HomePage() {
  return (
    <main className="landing">
      <section className="landing-art landing-art-main" id="samples" aria-label="Custom walkout songs overview and song samples">
        <span className="landing-music-style-line" aria-hidden="true">2. Select music style</span>
        <a className="landing-hotspot hero-player" href="/order">
          Get Your Song
        </a>
        <LandingSampleHotspots />
        <a className="landing-hotspot lower-player" href="/order">
          Individual Player Package
        </a>
      </section>

      <section
        className="landing-art landing-art-individual"
        id="individual-packages"
        aria-label="Individual player packages"
      >
        <a className="landing-hotspot individual-basic" href="/order">
          Order Now
        </a>
      </section>

      <section className="landing-art landing-art-team" id="team-packages" aria-label="Team packages">
        <a className="landing-hotspot team-order" href="/order">
          Order Now
        </a>
      </section>

      <section className="landing-art landing-art-close" aria-label="Making an All-Star Team is a big deal">
        <a className="landing-hotspot close-learn" href="#individual-packages">
          Learn More
        </a>
      </section>

      <footer className="landing-footer" id="contact">
        Questions? Contact: <a href="mailto:CustomWalkoutSong@gmail.com">CustomWalkoutSong@gmail.com</a>
      </footer>
    </main>
  );
}
