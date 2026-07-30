import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer, Header } from "../../components";
import { createPageMetadata } from "../../site";
import { games, getGame } from "../data";

type GamePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return games.map((game) => ({ slug: game.slug }));
}

export async function generateMetadata({
  params,
}: GamePageProps): Promise<Metadata> {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) notFound();

  return createPageMetadata({
    title: `${game.title} | Bob Glahn Portfolio`,
    description: game.short,
    path: `/games/${game.slug}`,
    image: game.image,
    imageAlt: game.imageAlt,
  });
}

export default async function GamePage({ params }: GamePageProps) {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) notFound();

  return (
    <>
      <Header />
      <main id="main-content" style={{"--game-accent": game.accent} as React.CSSProperties}>
      <section className="project-hero">
        <div className="project-hero-copy">
          <Link className="back-link" href="/games">← Portfolio</Link>
          <div className="project-meta"><span>{game.year}</span><span>{game.genre}</span><span>{game.engine}</span></div>
          <h1>{game.title}</h1>
          <p>{game.kicker}</p>
        </div>
        <div className="project-hero-image"><img src={game.image} alt={game.imageAlt} width="347" height="500" fetchPriority="high" /></div>
      </section>
      <section className="project-body">
        <div className="project-description">
          {game.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <aside>
          <span>Bob&apos;s role</span><strong>{game.role}</strong>
          <span>Project credits</span><strong>{game.collaborators}</strong>
          <a className="button button-primary" href={game.itchUrl} target="_blank" rel="noopener noreferrer">Play on itch.io <span aria-hidden="true">↗</span></a>
        </aside>
      </section>
      <section className="next-project">
        <span>Continue exploring</span>
        <Link href="/bedbugs"><strong>BedBugs</strong><small>BedBugs is available now on WOWCube →</small></Link>
      </section>
      </main>
      <Footer />
    </>
  );
}
