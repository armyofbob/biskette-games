import type { MetadataRoute } from "next";
import { games } from "./games/data";
import { absoluteUrl } from "./site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "bedbugs", "games", "about"];
  const routes = [
    ...staticRoutes,
    ...games.map((game) => `games/${game.slug}`),
  ];

  return routes.map((route) => ({
    url: absoluteUrl(route),
    changeFrequency: route === "bedbugs" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "bedbugs" ? 0.9 : 0.7,
  }));
}
