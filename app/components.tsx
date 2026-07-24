import Link from "next/link";

export function Header() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Biskette Games home">
        <img src="/assets/biskette-games.png" alt="" />
        <span>Biskette Games</span>
      </Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        <Link href="/games">Games</Link>
        <Link href="/about">Bob Glahn</Link>
        <Link href="/bedbugs">BedBugs</Link>
        <a className="social-link" href="https://armyofbob.itch.io/" target="_blank" rel="noreferrer">Play on itch.io</a>
      </nav>
      <details className="mobile-menu">
        <summary aria-label="Open navigation"><span /><span /><span /></summary>
        <nav aria-label="Mobile navigation">
          <Link href="/games">Games</Link>
          <Link href="/about">Bob Glahn</Link>
          <Link href="/bedbugs">BedBugs</Link>
          <a href="https://armyofbob.itch.io/" target="_blank" rel="noreferrer">Itch.io</a>
        </nav>
      </details>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div><strong>Biskette Games</strong><span>© 2026 Bob Glahn / Biskette Games</span></div>
      <div><span>Follow us @BisketteGames</span><Link href="/games">Games</Link><Link href="/about">About Bob</Link><a href="https://armyofbob.itch.io/" target="_blank" rel="noreferrer">Itch.io</a></div>
    </footer>
  );
}
