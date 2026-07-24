import Link from "next/link";
import { Footer, Header } from "../components";

export default function AboutPage() {
  return (
    <main>
      <Header />
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
          <p>Biskette Games is my independent studio. I design, illustrate, and produce approachable games with tactile ideas, theatrical premises, and a little mischief.</p>
        </div>
        <div className="about-columns">
          <article><span>Design + art</span><h3>Playable ideas with a visual voice</h3><p>Clear systems, tactile inputs, and original artwork.</p></article>
          <article><span>Production</span><h3>Creative work that ships</h3><p>Practical scope, useful documentation, and steady coordination.</p></article>
          <article><span>Perspective</span><h3>Theatre meets technology</h3><p>Games shaped by staging, audience, and timing.</p></article>
        </div>
      </section>
      <section className="about-cta">
        <div><span className="eyebrow">See the work</span><h2>Small studio.<br />Wide range.</h2></div>
        <div><p>Disco mythology. Desert photography. Candy thieves. It makes more sense in the portfolio.</p><Link className="button button-primary" href="/games">Explore the games →</Link></div>
      </section>
      <Footer />
    </main>
  );
}
