import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer, Header } from "../../components";
import { games, getGame } from "../data";

export function generateStaticParams() {
  return games.map((game) => ({ slug: game.slug }));
}

export default async function GamePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) notFound();

  return (
    <main style={{"--game-accent": game.accent} as React.CSSProperties}>
      <Header />
      <section className="project-hero">
        <div className="project-hero-copy">
          <Link className="back-link" href="/games">← All games</Link>
          <div className="project-meta"><span>{game.year}</span><span>{game.genre}</span><span>{game.engine}</span></div>
          <h1>{game.title}</h1>
          <p>{game.kicker}</p>
        </div>
        <div className="project-hero-image"><img src={game.image} alt={game.imageAlt} /></div>
      </section>
      <section className="project-body">
        <div className="project-description">
          {game.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <aside>
          <span>Bob&apos;s role</span><strong>{game.role}</strong>
          <span>Project</span><strong>{game.collaborators}</strong>
          <a className="button button-primary" href={game.itchUrl} target="_blank" rel="noreferrer">Play on itch.io <span aria-hidden="true">↗</span></a>
        </aside>
      </section>
      <section className="next-project">
        <span>Continue exploring</span>
        <Link href="/bedbugs"><strong>BedBugs</strong><small>See the current WOWCube project →</small></Link>
      </section>
      <Footer />
    </main>
  );
}
