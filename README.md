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
