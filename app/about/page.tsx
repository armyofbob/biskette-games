import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Header } from "../components";
import { createPageMetadata } from "../site";

export const metadata: Metadata = createPageMetadata({
  title: "Bob Glahn | Independent Game Designer & Producer",
  description:
    "Bob Glahn is an independent game designer and producer who designs, illustrates, and produces playful, tactile games through Biskette Games.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <Header />
      <main id="main-content">
      <section className="about-hero">
        <div>
          <span className="eyebrow">The person behind Biskette</span>
          <h1>Bob Glahn</h1>
          <p>Independent game designer and producer.</p>
        </div>
      </section>
      <section className="about-body">
        <div className="about-lead">
          <h2>Games with a point of view.</h2>
          <p>Biskette Games is my independent studio. I design, illustrate, and produce playful, tactile daymares you won&apos;t want to wake up from, inspired by the bold designs and ludicrous, loose, occasionally creepy narratives of classic arcade and console games from the &apos;80s and &apos;90s.</p>
          <p>My background blends management, business, theatre, visual art, and game production. I also make miniature ceramic oddities: tiny hats, expressive candy corn, porcelain vegetables, and other objects that probably should not have faces. That same tactile, toy-like sensibility finds its way into my games.</p>
          <p>The result is theatrical mischief, sugar-glazed darkness, and games with a strong point of view. That&apos;s the flavor of Biskette.</p>
        </div>
        <div className="about-columns">
          <article><span>Design + art</span><h3>Playable ideas with a visual voice</h3><p>Clear systems and tactile inputs, with original artwork as the cherry on top.</p></article>
          <article><span>Production</span><h3>Creative work that ships</h3><p>Practical scope, useful documentation, and a production plan that never bites off more than it can chew.</p></article>
          <article><span>Perspective</span><h3>Theatre meets technology</h3><p>Games shaped by staging, audience, and timing.</p></article>
        </div>

        <details className="personal-details">
          <summary>
            <img src="/assets/biskette-games-512.png" alt="" aria-hidden="true" width="512" height="512" loading="lazy" />
            <span>Personal details</span>
          </summary>
          <div className="personal-details-panel">
            <span className="eyebrow">Extremely relevant artistic context</span>
            <p>Bob still cannot decide whether his favorite <cite>Garfield and Friends</cite> episode is the one where Garfield ships Nermal to Abu Dhabi, or the one he may have hallucinated in which Garfield asks Jon for more lasagna as a swarm of Odies spills from the thousand pupils on Garfield&apos;s back and his tentacles rip the heretic mailman in twain.</p>
          </div>
        </details>
      </section>
      <section className="about-cta">
        <div><span className="eyebrow">See the work</span><h2>Small studio.<br />Wide range.</h2></div>
        <div><p>Disco mythology. Desert photography. Candy thieves. It makes more sense in the portfolio.</p><Link className="button button-primary" href="/games">Explore the games →</Link></div>
      </section>
      </main>
      <Footer />
    </>
  );
}
