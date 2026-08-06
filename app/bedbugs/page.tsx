import type { Metadata } from "next";
import Link from "next/link";
import {
  BEDBUGS_SOCIAL_IMAGE,
  BEDBUGS_STORE_URL,
  createPageMetadata,
  DISCORD_URL,
  INSTAGRAM_URL,
  JsonLd,
  SITE_URL,
} from "../site";

const bedBugsDescription =
  "BedBugs is an arcade game for WOWCube. Tilt Lily's bed, knock bugs from the walls, and feed the worm below. Available now from Biskette Games.";

export const metadata: Metadata = createPageMetadata({
  title: "BedBugs for WOWCube | Biskette Games",
  description: bedBugsDescription,
  path: "/bedbugs",
  image: BEDBUGS_SOCIAL_IMAGE,
  imageAlt: "BedBugs gameplay with Lily steering her bed",
});

const bedBugsJsonLd = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "@id": `${SITE_URL}/bedbugs#game`,
  name: "BedBugs",
  url: `${SITE_URL}/bedbugs`,
  description: bedBugsDescription,
  image: BEDBUGS_SOCIAL_IMAGE,
  genre: ["Action", "Arcade"],
  gamePlatform: "WOWCube",
  author: {
    "@id": `${SITE_URL}/about#bob-glahn`,
  },
  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },
  sameAs: [BEDBUGS_STORE_URL],
};

function BedBugsHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Biskette Games home"><img src="/assets/biskette-games.png" alt="" width="512" height="512" /><span>Biskette Games</span></Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        <Link href="/bedbugs">BedBugs</Link><Link href="#story">Story</Link><Link href="#how-to-play">How to play</Link>
        <Link className="social-link" href="/">Biskette Games</Link>
      </nav>
      <details className="mobile-menu">
        <summary aria-label="Open navigation"><span /><span /><span /></summary>
        <nav aria-label="Mobile navigation"><Link href="/">Home</Link><Link href="#story">Story</Link><Link href="#how-to-play">How to play</Link><Link href="#wowcube">WOWCube</Link></nav>
      </details>
    </header>
  );
}

export default function BedBugsPage() {
  return (
    <>
      <BedBugsHeader />
      <main className="bedbugs-page" id="main-content">
      <JsonLd data={bedBugsJsonLd} />
      <section className="bb-hero">
        <div className="bb-hero-copy reveal">
          <span className="eyebrow">Action / Arcade</span>
          <img className="bb-logo-large" src="/assets/bedbugs-logo.png" alt="BedBugs" width="240" height="240" />
          <h1><span className="visually-hidden">BedBugs: </span>Don&apos;t let them bite!</h1>
          <p className="bb-tagline">Mama said not to leave candy out or it would attract bugs. She never said they&apos;d move in!</p>
          <div className="button-row">
            <a
              className="button button-primary"
              href={BEDBUGS_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get BedBugs on WOWCube (opens in a new tab)"
            >
              Get BedBugs on WOWCube <span aria-hidden="true">↗</span>
            </a>
            <a className="button button-ghost" href="#story">Meet Lily <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <div className="bb-hero-art reveal delay-one">
          <img src="/assets/bedbugs-gameplay.webp" alt="BedBugs gameplay with Lily steering her bed across the bedroom floor" width="480" height="480" fetchPriority="high" />
        </div>
      </section>

      <section className="story-section" id="story">
        <div className="story-art">
          <img src="/assets/lilys-room.webp" alt="Lily's bedroom at night, with small pairs of eyes watching from beneath the bed" width="1600" height="1199" loading="lazy" />
          <img className="peeking-bug" src="/assets/dodger.png" alt="" aria-hidden="true" width="128" height="128" loading="lazy" />
        </div>
        <div className="story-copy">
          <span className="eyebrow eyebrow-dark">Welcome to Lily&apos;s room</span>
          <h2>The sweets are out.<br />So are the bugs.</h2>
          <p>Keep Lily on her bed, the bugs off the candy, and the bedroom in one piece.</p>
          <p className="creator-note">Designed, developed, and illustrated by Bob Glahn.</p>
        </div>
      </section>

      <section className="how-section compact-how" id="how-to-play" aria-labelledby="how-title">
        <div className="section-heading">
          <div><span className="eyebrow eyebrow-dark">How to play</span><h2 id="how-title">Tilt. Pat. Twist.</h2></div>
          <p>Three physical actions keep Lily and the candy moving.</p>
        </div>
        <div className="control-grid how-grid">
          <article><span>01</span><h3>Tilt</h3><p>Tilt to steer Lily&apos;s bed.</p></article>
          <article><span>02</span><h3>Pat</h3><p>Pat to knock bugs from the walls.</p></article>
          <article><span>03</span><h3>Twist</h3><p>Twist to feed the worm below.</p></article>
        </div>
      </section>

      <section className="wowcube-section" id="wowcube">
        <div className="wowcube-copy">
          <span className="eyebrow">Built for WOWCube</span>
          <h2>One bedroom.<br />All six sides.</h2>
          <p>Lily&apos;s room spans the top. Bugs climb the walls. The worm waits below.</p>
          <div className="platform-points"><div><strong>24</strong><span>connected screens</span></div><div><strong>6</strong><span>playable sides</span></div><div><strong>0</strong><span>buttons required</span></div></div>
          <a className="text-link light-link" href="https://wowcube.com/specs/" target="_blank" rel="noopener noreferrer">Explore the official WOWCube specifications <span aria-hidden="true">↗</span></a>
        </div>
        <div className="wowcube-art"><img src="/assets/bedbugs-wowcube.webp" alt="BedBugs displayed across the connected screens of a WOWCube" width="720" height="960" loading="lazy" /></div>
      </section>

      <section className="closing-cta">
        <img src="/assets/bedbugs-icon.webp" alt="" aria-hidden="true" width="480" height="480" loading="lazy" />
        <div><span className="eyebrow">AVAILABLE NOW</span><h2>The bugs are out.</h2><p>Save the candy. Dodge the bugs. Feed the worm below.</p></div>
        <a
          className="button button-primary"
          href={BEDBUGS_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Get BedBugs on the WOWCube Store (opens in a new tab)"
        >
          Get BedBugs on the WOWCube Store <span aria-hidden="true">↗</span>
        </a>
      </section>
      </main>
      <footer className="site-footer">
        <div><strong>BedBugs by Biskette Games</strong><span>© 2026 Robert Glahn / Biskette Games</span></div>
        <div className="footer-links">
          <Link href="/games">All games</Link>
          <Link href="/about">About Bob</Link>
          <a href="https://wowcube.com/" target="_blank" rel="noopener noreferrer">WOWCube</a>
          <a className="footer-social-link" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Follow Biskette Games on Instagram (opens in a new tab)"><span className="social-service-icon instagram-icon" aria-hidden="true" />Follow @biskettegames <span aria-hidden="true">↗</span></a>
          <a className="footer-social-link" href={DISCORD_URL} target="_blank" rel="noopener noreferrer" aria-label="Join Biskette on Discord (opens in a new tab)"><span className="social-service-icon discord-icon" aria-hidden="true" />Join Biskette on Discord <span aria-hidden="true">↗</span></a>
        </div>
      </footer>
    </>
  );
}
