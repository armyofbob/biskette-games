import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "BedBugs",
  description: "Guide Lily's bed, save the candy, and send the bugs tumbling in BedBugs, an action arcade game for WOWCube.",
};

function BedBugsHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Biskette Games home"><img src="/assets/biskette-games.png" alt="" /><span>Biskette Games</span></Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        <Link href="/bedbugs">BedBugs</Link><Link href="#story">Story</Link><Link href="#wowcube">WOWCube</Link>
        <Link className="social-link" href="/">Biskette Games</Link>
      </nav>
      <details className="mobile-menu">
        <summary aria-label="Open navigation"><span /><span /><span /></summary>
        <nav aria-label="Mobile navigation"><Link href="/">Home</Link><Link href="#story">Story</Link><Link href="#wowcube">WOWCube</Link></nav>
      </details>
    </header>
  );
}

export default function BedBugsPage() {
  return (
    <main className="bedbugs-page">
      <BedBugsHeader />

      <section className="bb-hero">
        <div className="bb-hero-copy reveal">
          <span className="eyebrow">Action / Arcade</span>
          <img className="bb-logo-large" src="/assets/bedbugs-logo.png" alt="BedBugs" />
          <h1>Don&apos;t let them bite!</h1>
          <p className="bb-tagline">Mama said not to leave candy out or it would attract bugs. She never said they&apos;d move in!</p>
          <div className="button-row"><a className="button button-primary" href="#story">Meet Lily <span aria-hidden="true">↓</span></a><a className="button button-ghost" href="#wowcube">Built for WOWCube</a></div>
        </div>
        <div className="bb-hero-art reveal delay-one">
          <img src="/assets/bedbugs-gameplay.webp" alt="BedBugs gameplay with Lily steering her bed across the bedroom floor" />
          <div className="night-label"><span>Night 1</span><strong>Keep the candy moving.</strong></div>
        </div>
      </section>

      <section className="story-section" id="story">
        <div className="story-art">
          <img src="/assets/lilys-room.webp" alt="Lily's bedroom at night, with small pairs of eyes watching from beneath the bed" />
          <img className="peeking-bug" src="/assets/dodger.png" alt="" aria-hidden="true" />
        </div>
        <div className="story-copy">
          <span className="eyebrow eyebrow-dark">Welcome to Lily&apos;s room</span>
          <h2>The sweets are out.<br />So are the bugs.</h2>
          <p>Keep Lily on her bed, the bugs off the candy, and the bedroom in one piece.</p>
          <p className="creator-note">Designed, developed, and illustrated by Bob Glahn.</p>
        </div>
      </section>

      <section className="score-section">
        <div>
          <span className="eyebrow">Build the streak</span>
          <h2>Fresh candy.<br />Bigger combos.</h2>
          <p>Grab candy before it goes stale. Feed bugs to the worm. Keep the combo alive.</p>
        </div>
        <div className="score-cards" aria-label="Scoring examples">
          <div><span>Fresh candy</span><strong>+50</strong><small>Extends your streak</small></div>
          <div><span>Stale candy</span><strong>+10</strong><small>No streak bonus</small></div>
          <div className="score-highlight"><span>Worm snack</span><strong>+100×</strong><small>Uses your multiplier</small></div>
        </div>
      </section>

      <section className="wowcube-section" id="wowcube">
        <div className="wowcube-copy">
          <span className="eyebrow">Built for WOWCube</span>
          <h2>One bedroom.<br />All six sides.</h2>
          <p>Lily&apos;s room spans the top. Bugs climb the walls. The worm waits below.</p>
          <div className="platform-points"><div><strong>24</strong><span>connected screens</span></div><div><strong>6</strong><span>playable sides</span></div><div><strong>0</strong><span>buttons required</span></div></div>
          <a className="text-link light-link" href="https://wowcube.com/specs/" target="_blank" rel="noreferrer">Explore the official WOWCube specifications <span aria-hidden="true">↗</span></a>
        </div>
        <div className="wowcube-art"><img src="/assets/bedbugs-wowcube.webp" alt="BedBugs displayed across the connected screens of a WOWCube" /></div>
      </section>

      <section className="closing-cta">
        <img src="/assets/bedbugs-icon.webp" alt="" aria-hidden="true" />
        <div><span className="eyebrow">Coming to WOWCube</span><h2>Bedtime is about to get buggy.</h2><p>Follow development and launch news.</p></div>
        <a className="button button-primary" href="https://armyofbob.itch.io/" target="_blank" rel="noreferrer">Follow the studio <span aria-hidden="true">↗</span></a>
      </section>

      <footer className="site-footer"><div><strong>BedBugs by Biskette Games</strong><span>© 2026 Bob Glahn / Biskette Games</span></div><div><Link href="/games">All games</Link><Link href="/about">About Bob</Link><a href="https://wowcube.com/" target="_blank" rel="noreferrer">WOWCube</a></div></footer>
    </main>
  );
}
