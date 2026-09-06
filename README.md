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

## Analytics and consent

Google Analytics stream `G-H5YYLHY3ST` is controlled by
`app/consent-controller.ts` and `app/cookie-consent.tsx` in the root layout.
Basic consent mode: no Google library or pings before acceptance. Rejecting
or ignoring the banner leaves GA off. Advertising consent stays denied.

Both choices expire after 180 days. Cookie settings is available on every page.
Withdrawal disables GA, clears its accessible first-party cookies, and reloads
to unload the library. Expiry and changes in other tabs are handled too.
Cloudflare's independently injected cookieless beacon remains outside this
Google cookie control; the notice at `/privacy` explains that distinction.

For client-side page views, enable Enhanced measurement > Page views >
Page changes based on browser history events in the GA web stream. Do not add
manual page views while automatic history tracking is enabled.

Verify using Tag Assistant: no Google tag before consent or after rejection;
acceptance should load one tag and send a page_view. Check Portfolio navigation,
return visits, Cookie settings withdrawal, and Realtime in the correct property.
Google's installation detector may report no tag until analytics is accepted.

Run consent lifecycle checks with `node --test tests/consent.test.mjs`.
