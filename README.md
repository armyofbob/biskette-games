# Biskette Games

Portfolio website for Biskette Games, the independent studio of Bob Glahn.

The site includes:

- Studio homepage
- BedBugs and WOWCube feature page
- Games portfolio and individual project pages
- About page

## Local development

Requires Node.js 22.13 or newer.

```bash
npm ci
npm run dev
```

## Checks

```bash
npm test
npm run lint
```

## Production build

```bash
npm run build
```

The application uses Next.js, React, Vite, Vinext, and Cloudflare's Vite
integration. The current deployment target is Cloudflare.

## Project structure

- `app/` — pages, shared components, and styles
- `public/assets/` — optimized site artwork
- `worker/` — Cloudflare worker entry point
- `tests/` — rendered-page checks

## Publishing

Connect this repository to Cloudflare and deploy the `main` branch. Add
`biskettegames.com` as the production custom domain after the first successful
deployment.

## Google Analytics

The shared layout includes an optional GA4 tag. To change the destination, set
`GA_MEASUREMENT_ID` in `app/layout.tsx` to the verified `G-...` ID from
Google Analytics > Admin > Data streams > the biskettegames.com web stream.
The configured production stream is `G-H5YYLHY3ST`. A blank ID emits no Google tag. The ID is public, not a secret.
Do not copy an ID from an unrelated portfolio property merely because its
email report reaches the same inbox.

For client-side navigation, enable Enhanced measurement > Page views >
Page changes based on browser history events in that stream. This patch uses
Google's automatic page views; do not add a second manual route tracker.

Review and test locally with a separate test stream. After an approved production
deployment, verify the tag ID with Tag Assistant, visit the homepage, then click
Portfolio and a game. Confirm one page_view per navigation with the correct
page_location and page_title in DebugView/Realtime. Allow up to 30 minutes for
initial collection. Check internal/developer traffic filters if the test is
missing. Compare production traffic with Cloudflare Web Analytics over the same
dates; its beacon is separate from GA4. Untracked historical visits cannot be
recovered by installing this tag.
