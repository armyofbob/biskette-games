import Link from "next/link";
import { Footer, Header } from "./components";
import { games } from "./games/data";

export default function Home() {
  return (
    <main>
      <Header />
      <section className="home-hero">
        <div className="hero-copy reveal">
          <span className="eyebrow">Independent game studio</span>
          <h1>Playful worlds.<br /><em>Games with bite.</em></h1>
          <p>Playful systems, theatrical premises, and unusual ways to play.</p>
          <div className="button-row">
            <Link className="button button-primary" href="/bedbugs">Explore BedBugs <span aria-hidden="true">→</span></Link>
            <Link className="button button-ghost" href="/games">View Bob&apos;s portfolio</Link>
          </div>
          <div className="hero-note"><span className="status-dot" /> Currently building for WOWCube</div>
        </div>
        <div className="hero-art reveal delay-one">
          <div className="hero-frame"><img src="/assets/bedbugs-wowcube.webp" alt="BedBugs running across the screens of a WOWCube" /></div>
          <img className="hero-bug" src="/assets/sludge.png" alt="" aria-hidden="true" />
          <div className="hero-caption"><strong>BedBugs</strong><span>Action / Arcade</span></div>
        </div>
      </section>

      <section className="featured-game" aria-labelledby="featured-title">
        <div className="section-heading">
          <div><span className="eyebrow eyebrow-dark">Featured game</span><h2 id="featured-title">Bedtime has bugs.</h2></div>
          <p>A physical arcade scramble built for WOWCube.</p>
        </div>
        <article className="feature-card">
          <div className="feature-image"><img src="/assets/bedbugs-icon.webp" alt="BedBugs app icon featuring Lily, her bed, and two bugs" /></div>
          <div className="feature-copy">
            <img className="bedbugs-wordmark" src="/assets/bedbugs-logo.png" alt="BedBugs" />
            <div className="tag-row"><span>Action</span><span>Arcade</span><span>WOWCube</span></div>
            <h3>Don&apos;t let them bite!</h3>
            <p>Save the candy. Dodge the bugs. Feed the worm below.</p>
            <Link className="text-link" href="/bedbugs">Meet Lily and the bugs <span aria-hidden="true">→</span></Link>
          </div>
        </article>
      </section>

      <section className="home-work" aria-labelledby="work-title">
        <div className="section-heading">
          <div><span className="eyebrow eyebrow-dark">Bob&apos;s recent work</span><h2 id="work-title">Five games.<br />No repeated recipe.</h2></div>
          <p>One solo game, four team projects, and one irresponsible Viking helicopter.</p>
        </div>
        <div className="home-game-grid">
          {games.map((game) => (
            <Link className="home-game-card" href={`/games/${game.slug}`} key={game.slug} style={{"--game-accent": game.accent} as React.CSSProperties}>
              <div><img src={game.image} alt="" /></div>
              <span>{game.year} / {game.genre}</span>
              <h3>{game.title}</h3>
              <p>{game.short}</p>
            </Link>
          ))}
        </div>
        <Link className="button button-ghost work-button" href="/games">View Bob&apos;s portfolio →</Link>
      </section>

      <section className="studio-intro" id="studio">
        <div className="studio-mark"><img src="/assets/biskette-games.png" alt="Biskette Games logo" /></div>
        <div><span className="eyebrow eyebrow-dark">Bob Glahn / Solo developer</span><h2>Independent by design.</h2><p>I design, illustrate, and produce games, working solo or with small teams.</p><Link className="text-link" href="/about">About Bob and the studio →</Link></div>
      </section>

      <Footer />
    </main>
  );
}
