export type Game = {
  slug: string;
  title: string;
  kicker: string;
  year: string;
  genre: string;
  engine: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
  short: string;
  description: string[];
  role: string;
  collaborators: string;
  itchUrl: string;
  accent: string;
};

export const games: Game[] = [
  {
    slug: "scratcher",
    title: "Scratcher",
    kicker: "Scratch your little heart out, lucky you.",
    year: "2026",
    genre: "Card game / Pixel art",
    engine: "Godot",
    image: "/assets/portfolio/scratcher.webp",
    imageWidth: 1600,
    imageHeight: 893,
    imageAlt: "Scratcher gameplay",
    short: "Scratch a ticket. Test your luck. Try not to learn anything about probability.",
    description: [
      "A tactile scratch-off game about optimism meeting probability. Built solo for Global Game Jam 2026.",
    ],
    role: "Solo developer: design, production, programming, and art",
    collaborators: "Created by Bob Glahn",
    itchUrl: "https://armyofbob.itch.io/scratch",
    accent: "#d7894f",
  },
  {
    slug: "sonoran-snaps",
    title: "Sonoran Snaps",
    kicker: "A quiet camera walk through the desert.",
    year: "2025",
    genre: "Exploration / Educational",
    engine: "Godot",
    image: "/assets/portfolio/sonoran-snaps.webp",
    imageWidth: 800,
    imageHeight: 450,
    imageAlt: "Sonoran Snaps desert exploration gameplay",
    short: "Explore the Sonoran Desert through a camera lens.",
    description: [
      "Wander, photograph wildlife, and notice the desert at your own pace. Created for Global Game Jam 2025.",
    ],
    role: "Collaborative game jam development",
    collaborators: "With Tom, SwirlyGig, and CancermantisCreations",
    itchUrl: "https://tjpalmer.itch.io/sonoransnaps",
    accent: "#bb8557",
  },
  {
    slug: "gjallarcopter",
    title: "Gjallarcopter",
    kicker: "Defy Ragnarök from your own Viking helicopter.",
    year: "2024",
    genre: "Shooter / Boss battle",
    engine: "Godot",
    image: "/assets/portfolio/gjallarcopter.webp",
    imageWidth: 1600,
    imageHeight: 895,
    imageAlt: "Gjallarcopter boss battle gameplay",
    short: "Vikings. Helicopter. Alone. Somehow, it works.",
    description: [
      "Pilot a hand-drawn Norse helicopter and challenge mythic threats in an arcade boss battle. I created all of the artwork.",
    ],
    role: "All artwork",
    collaborators: "Created with SwirlyGig for MixJam 19",
    itchUrl: "https://swirlygig.itch.io/gjallarcopter",
    accent: "#89a6b1",
  },
  {
    slug: "highbrow-hijinks",
    title: "Highbrow Hijinks",
    kicker: "Save the stage from a comedian’s killer material.",
    year: "2024",
    genre: "Action / Arcade",
    engine: "Unreal Engine",
    image: "/assets/portfolio/highbrow-hijinks.webp",
    imageWidth: 879,
    imageHeight: 494,
    imageAlt: "Highbrow Hijinks arcade gameplay",
    short: "Catch the props. Save the stage. Survive the punchline.",
    description: [
      "A prop comic bombs in the most literal way possible. Scramble across the stage and catch the falling act before it dies.",
    ],
    role: "Game design and production",
    collaborators: "Created with Byron Beasley Jr., Chinami Michaels, Raj Uprety, Ryan Ehredt, and Tai",
    itchUrl: "https://lord-byron.itch.io/highbrowhijinks",
    accent: "#be7385",
  },
  {
    slug: "dyscophus",
    title: "Dyscophus",
    kicker: "Greek mythology meets disco.",
    year: "2023",
    genre: "Rhythm / Mythology",
    engine: "Unity",
    image: "/assets/portfolio/dyscophus.webp",
    imageWidth: 1366,
    imageHeight: 768,
    imageAlt: "Dyscophus rhythm game gameplay",
    short: "Dance uphill. Defy Hades. Keep the groove alive.",
    description: [
      "A disco rhythm climb through Greek mythology. I led production for the 14-person Weeksauce team, supported by two other producers.",
    ],
    role: "Lead producer",
    collaborators: "Created by a 14-person Weeksauce Jam team, with two supporting producers",
    itchUrl: "https://azurecoffin.itch.io/dyscophus",
    accent: "#a671c2",
  },
];

export function getGame(slug: string) {
  return games.find((game) => game.slug === slug);
}
