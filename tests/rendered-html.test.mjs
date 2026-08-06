import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const routes = [
  {
    path: "/",
    title: "Biskette Games | We make daymares come true.",
    canonical: "https://biskettegames.com/",
  },
  {
    path: "/bedbugs",
    title: "BedBugs for WOWCube | Biskette Games",
    canonical: "https://biskettegames.com/bedbugs",
  },
  {
    path: "/games",
    title: "Games & Portfolio | Bob Glahn, Biskette Games",
    canonical: "https://biskettegames.com/games",
  },
  {
    path: "/about",
    title: "Bob Glahn | Independent Game Designer & Producer",
    canonical: "https://biskettegames.com/about",
  },
  {
    path: "/games/scratcher",
    title: "Scratcher | Bob Glahn Portfolio",
    canonical: "https://biskettegames.com/games/scratcher",
  },
  {
    path: "/games/sonoran-snaps",
    title: "Sonoran Snaps | Bob Glahn Portfolio",
    canonical: "https://biskettegames.com/games/sonoran-snaps",
  },
  {
    path: "/games/gjallarcopter",
    title: "Gjallarcopter | Bob Glahn Portfolio",
    canonical: "https://biskettegames.com/games/gjallarcopter",
  },
  {
    path: "/games/highbrow-hijinks",
    title: "Highbrow Hijinks | Bob Glahn Portfolio",
    canonical: "https://biskettegames.com/games/highbrow-hijinks",
  },
  {
    path: "/games/dyscophus",
    title: "Dyscophus | Bob Glahn Portfolio",
    canonical: "https://biskettegames.com/games/dyscophus",
  },
];

const stalePhrases = [
  ["Currently", "building for WOWCube"].join(" "),
  ["COMING", "TO WOWCUBE"].join(" "),
  ["Bedtime is", "about to get buggy"].join(" "),
  ["Follow development", "and launch news"].join(" "),
  ["See the current", "WOWCube project"].join(" "),
  ["candy", "coated"].join("-"),
  ["codex", "preview"].join("-"),
];

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

async function fetchRoute(path) {
  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

function htmlDecode(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'")
    .replaceAll("&#39;", "'");
}

function findTag(html, tagName, attribute, value) {
  const tags = html.match(new RegExp(`<${tagName}\\b[^>]*>`, "gi")) ?? [];
  return tags.find((tag) => {
    const attributes = Object.fromEntries(
      [...tag.matchAll(/([:\w-]+)=["']([^"']*)["']/g)].map((match) => [
        match[1].toLowerCase(),
        htmlDecode(match[2]),
      ]),
    );
    return attributes[attribute] === value;
  });
}

function tagAttribute(tag, attribute) {
  const match = tag?.match(
    new RegExp(`${attribute}=["']([^"']*)["']`, "i"),
  );
  return match ? htmlDecode(match[1]) : null;
}

test("all public pages render complete, unique production metadata", async (t) => {
  const titles = new Set();
  const descriptions = new Set();

  for (const route of routes) {
    await t.test(route.path, async () => {
      const response = await fetchRoute(route.path);
      const html = await response.text();

      assert.equal(response.status, 200);
      assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

      const title = htmlDecode(
        html.match(/<title>([^<]+)<\/title>/i)?.[1] ?? "",
      );
      const description = tagAttribute(
        findTag(html, "meta", "name", "description"),
        "content",
      );
      const canonical = tagAttribute(
        findTag(html, "link", "rel", "canonical"),
        "href",
      );

      assert.equal(title, route.title);
      assert.ok(description);
      assert.equal(canonical, route.canonical);
      assert.equal(
        tagAttribute(findTag(html, "meta", "property", "og:title"), "content"),
        route.title,
      );
      assert.equal(
        tagAttribute(findTag(html, "meta", "property", "og:description"), "content"),
        description,
      );
      assert.equal(
        tagAttribute(findTag(html, "meta", "property", "og:url"), "content"),
        route.canonical,
      );
      assert.ok(tagAttribute(findTag(html, "meta", "property", "og:image"), "content")?.startsWith("http"));
      assert.equal(
        tagAttribute(findTag(html, "meta", "property", "og:type"), "content"),
        "website",
      );
      assert.equal(
        tagAttribute(findTag(html, "meta", "name", "twitter:card"), "content"),
        "summary_large_image",
      );
      assert.equal(
        tagAttribute(findTag(html, "meta", "name", "twitter:title"), "content"),
        route.title,
      );
      assert.equal(
        tagAttribute(findTag(html, "meta", "name", "twitter:description"), "content"),
        description,
      );
      assert.ok(tagAttribute(findTag(html, "meta", "name", "twitter:image"), "content")?.startsWith("http"));
      assert.equal((html.match(/<main\b/gi) ?? []).length, 1);
      assert.equal((html.match(/<h1\b/gi) ?? []).length, 1);
      assert.match(html, /class=["']skip-link["'][^>]*href=["']#main-content["']/i);
      assert.doesNotMatch(html, /\/workspace\/sites\//i);
      assert.match(html, /\/assets\/_vinext_fonts\//i);

      for (const phrase of stalePhrases) {
        assert.doesNotMatch(html, new RegExp(phrase, "i"));
      }

      assert.ok(!titles.has(title), `duplicate title: ${title}`);
      assert.ok(
        !descriptions.has(description),
        `duplicate description: ${description}`,
      );
      titles.add(title);
      descriptions.add(description);
    });
  }
});

test("launch CTAs and structured data use the official store URL", async () => {
  const [homeResponse, bedBugsResponse] = await Promise.all([
    fetchRoute("/"),
    fetchRoute("/bedbugs"),
  ]);
  const home = await homeResponse.text();
  const bedBugs = await bedBugsResponse.text();
  const storeUrl = "https://wowcube.com/store/bedbugs";

  assert.ok((home.match(new RegExp(storeUrl, "g")) ?? []).length >= 2);
  assert.ok((bedBugs.match(new RegExp(storeUrl, "g")) ?? []).length >= 3);
  assert.match(home, /BEDBUGS IS AVAILABLE NOW ON WOWCUBE/);
  assert.match(home, /Five more games\./);
  assert.match(bedBugs, /Tilt to steer Lily(?:&#x27;|')s bed\./);
  assert.match(bedBugs, /Pat to knock bugs from the walls\./);
  assert.match(bedBugs, /Twist to feed the worm below\./);
  assert.match(bedBugs, /"@type":"VideoGame"/);
  assert.match(bedBugs, /BedBugs: <\/span>Don(?:&#x27;|')t let them bite!/);
  assert.match(home, /"@type":"Organization"/);
  assert.match(home, /"@type":"Person"/);
});

test("every public page links to Biskette Games on Instagram and Discord", async (t) => {
  const instagramUrl = "https://www.instagram.com/biskettegames/";
  const discordUrl = "https://discord.gg/QtGWN3fBT";

  for (const route of routes) {
    await t.test(route.path, async () => {
      const response = await fetchRoute(route.path);
      const html = htmlDecode(await response.text());

      assert.equal(response.status, 200);
      assert.match(html, new RegExp(`href=["']${instagramUrl.replaceAll("/", "\\/")}["']`, "i"));
      assert.match(html, new RegExp(`href=["']${discordUrl.replaceAll("/", "\\/")}["']`, "i"));
      assert.match(html, /Follow @biskettegames/i);
      assert.match(html, /instagram-icon/i);
      assert.match(html, /discord-icon/i);
      assert.match(html, /Join Biskette on Discord/i);
    });
  }
});

test("social links use the locally packaged official service marks", async () => {
  const [css, instagram, discord] = await Promise.all([
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../public/assets/instagram-glyph-white.svg", import.meta.url), "utf8"),
    readFile(new URL("../public/assets/discord-symbol-blurple.svg", import.meta.url), "utf8"),
  ]);

  assert.match(css, /instagram-glyph-white\.svg/);
  assert.match(css, /discord-symbol-blurple\.svg/);
  assert.match(instagram, /viewBox="0 0 1000 1000"/);
  assert.match(instagram, /fill:#fff/);
  assert.match(discord, /viewBox="0 0 65 48"/);
  assert.match(discord, /fill="#5865F2"/);
});

test("sitemap and robots cover every public route", async () => {
  const [sitemapResponse, robotsResponse] = await Promise.all([
    fetchRoute("/sitemap.xml"),
    fetchRoute("/robots.txt"),
  ]);
  const sitemap = await sitemapResponse.text();
  const robots = await robotsResponse.text();

  assert.equal(sitemapResponse.status, 200);
  assert.equal(robotsResponse.status, 200);
  for (const route of routes) {
    assert.match(sitemap, new RegExp(route.canonical.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
  assert.match(robots, /Allow: \//);
  assert.match(robots, /Sitemap: https:\/\/biskettegames\.com\/sitemap\.xml/);
});

test("only above-the-fold imagery is eager", async () => {
  const [homeResponse, bedBugsResponse, gamesResponse] = await Promise.all([
    fetchRoute("/"),
    fetchRoute("/bedbugs"),
    fetchRoute("/games"),
  ]);
  const home = await homeResponse.text();
  const bedBugs = await bedBugsResponse.text();
  const games = await gamesResponse.text();

  assert.match(home, /bedbugs-wowcube\.webp[^>]*fetchpriority=["']high["']/i);
  assert.match(bedBugs, /bedbugs-gameplay\.webp[^>]*fetchpriority=["']high["']/i);
  assert.ok((home.match(/loading=["']lazy["']/gi) ?? []).length >= 7);
  assert.ok((bedBugs.match(/loading=["']lazy["']/gi) ?? []).length >= 4);
  assert.equal((games.match(/loading=["']lazy["']/gi) ?? []).length, 5);
});

test("mobile navigation remains available without client JavaScript", async () => {
  const [homeResponse, bedBugsResponse] = await Promise.all([
    fetchRoute("/"),
    fetchRoute("/bedbugs"),
  ]);
  const pages = [await homeResponse.text(), await bedBugsResponse.text()];

  for (const html of pages) {
    assert.match(html, /<details class=["']mobile-menu["']>/i);
    assert.match(html, /<summary aria-label=["']Open navigation["']>/i);
    assert.match(html, /<nav aria-label=["']Mobile navigation["']>/i);
  }
});
