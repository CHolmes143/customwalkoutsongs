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
        <a className="landing-hotspot close-learn" href="/order">
          Order Your Song
        </a>
      </section>

      <section className="landing-faq" aria-labelledby="faq-title">
        <h2 id="faq-title">FAQ&apos;s</h2>
        <div className="faq-list">
          <article className="faq-item">
            <h3>What if I don&apos;t like the song?</h3>
            <p>
              No problem, just send an email to customwalkoutsong@gmail.com and we&apos;ll send you an
              alternative variation at no additional charge.
            </p>
          </article>
          <article className="faq-item">
            <h3>
              Will my player&apos;s song be the same as another player&apos;s on their team with just a
              different name and number?
            </h3>
            <p>No! We have hundreds of hype lyrics for each sport and we continue to think of more!</p>
          </article>
          <article className="faq-item">
            <h3>What if I need an edit made so it can be used with the announcement app our team uses?</h3>
            <p>
              No problem, just send an email to customwalkoutsong@gmail.com letting us know which needs
              to be altered, the intro or the outro.
            </p>
          </article>
          <article className="faq-item">
            <h3>Is any payment method other than Venmo available?</h3>
            <p>
              We&apos;re working on adding additional methods however right now payment via Venmo is all
              we are able to accept.
            </p>
          </article>
          <article className="faq-item">
            <h3>How will my song be delivered?</h3>
            <p>Your song will be delivered via text and email to information provided on the order form.</p>
          </article>
          <article className="faq-item">
            <h3>What if I have a question that isn&apos;t addressed above?</h3>
            <p>
              Again, no problem, just send an email to customwalkoutsong@gmail.com and we&apos;ll get back
              to you within 24 hours.
            </p>
          </article>
        </div>
      </section>

      <footer className="landing-footer" id="contact">
        Questions? Contact: <a href="mailto:CustomWalkoutSong@gmail.com">CustomWalkoutSong@gmail.com</a>
      </footer>
    </main>
  );
}
