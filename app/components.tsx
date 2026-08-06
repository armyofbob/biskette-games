import Link from "next/link";
import { DISCORD_URL, INSTAGRAM_URL, ITCH_URL } from "./site";

export function Header() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Biskette Games home">
        <img src="/assets/biskette-games.png" alt="" width="512" height="512" />
        <span>Biskette Games</span>
      </Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        <Link href="/games">Portfolio</Link>
        <Link href="/about">Bob Glahn</Link>
        <Link href="/bedbugs">BedBugs</Link>
        <a className="social-link" href={ITCH_URL} target="_blank" rel="noopener noreferrer">Bob&apos;s itch.io</a>
      </nav>
      <details className="mobile-menu">
        <summary aria-label="Open navigation"><span /><span /><span /></summary>
        <nav aria-label="Mobile navigation">
          <Link href="/games">Portfolio</Link>
          <Link href="/about">Bob Glahn</Link>
          <Link href="/bedbugs">BedBugs</Link>
          <a href={ITCH_URL} target="_blank" rel="noopener noreferrer">Bob&apos;s itch.io</a>
        </nav>
      </details>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div><strong>Biskette Games</strong><span>© 2026 Robert Glahn / Biskette Games</span></div>
      <div className="footer-links">
        <span>Independent game studio</span>
        <Link href="/games">Portfolio</Link>
        <Link href="/about">About Bob</Link>
        <a href={ITCH_URL} target="_blank" rel="noopener noreferrer">Bob&apos;s itch.io</a>
        <a className="footer-social-link" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Follow Biskette Games on Instagram (opens in a new tab)"><span className="social-service-icon instagram-icon" aria-hidden="true" />Follow @biskettegames <span aria-hidden="true">↗</span></a>
        <a className="footer-social-link" href={DISCORD_URL} target="_blank" rel="noopener noreferrer" aria-label="Join Biskette on Discord (opens in a new tab)"><span className="social-service-icon discord-icon" aria-hidden="true" />Join Biskette on Discord <span aria-hidden="true">↗</span></a>
      </div>
    </footer>
  );
}
