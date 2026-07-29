import Link from "next/link";
import { Footer, Header } from "../components";
import { games } from "./data";

export default function GamesPage() {
  return (
    <main>
      <Header />
      <section className="inner-hero">
        <span className="eyebrow">Bob&apos;s selected work</span>
        <h1>Games built from<br /><em>strong, strange ideas.</em></h1>
        <p>A portfolio of solo experiments and collaborative projects, with Bob&apos;s role credited on each one.</p>
      </section>
      <section className="portfolio-list">
        {games.map((game, index) => (
          <article className="portfolio-row" key={game.slug} style={{"--game-accent": game.accent} as React.CSSProperties}>
            <Link className="portfolio-image" href={`/games/${game.slug}`}>
              <img src={game.image} alt={game.imageAlt} />
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
      <Footer />
    </main>
  );
}
