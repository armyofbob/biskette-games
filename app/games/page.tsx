import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Header } from "../components";
import { createPageMetadata } from "../site";
import { games } from "./data";

export const metadata: Metadata = createPageMetadata({
  title: "Games & Portfolio | Bob Glahn, Biskette Games",
  description:
    "A portfolio of Bob Glahn's solo experiments and collaborative game projects, with his role credited on each one.",
  path: "/games",
});

export default function GamesPage() {
  return (
    <>
      <Header />
      <main id="main-content">
      <section className="inner-hero">
        <span className="eyebrow">Bob&apos;s selected work</span>
        <h1>Games built from<br /><em>strong, strange ideas.</em></h1>
        <p>A portfolio of solo experiments and collaborative projects, with Bob&apos;s role credited on each one.</p>
      </section>
      <section className="portfolio-list">
        {games.map((game, index) => (
          <article className="portfolio-row" key={game.slug} style={{"--game-accent": game.accent} as React.CSSProperties}>
            <Link className="portfolio-image" href={`/games/${game.slug}`}>
              <img src={game.image} alt={game.imageAlt} width="347" height="500" loading="lazy" />
              <span>0{index + 1}</span>
            </Link>
            <div className="portfolio-copy">
              <div className="project-meta"><span>{game.year}</span><span>{game.genre}</span><span>{game.engine}</span></div>
              <h2><Link href={`/games/${game.slug}`}>{game.title}</Link></h2>
              <p>{game.short}</p>
              <strong>{game.role}</strong>
              <Link className="text-link" href={`/games/${game.slug}`}>View project <span aria-hidden="true">→</span></Link>
            </div>
          </article>
        ))}
      </section>
      </main>
      <Footer />
    </>
  );
}
