# LOOMWIRE Release Guide

This guide is for shipping LOOMWIRE on Netlify from the GitHub repo.

## Netlify Setup

1. Create a new Netlify site from `MacJezzl1/LOOMWIRE`.
2. Use the default Next.js framework detection.
3. Keep the build command as:

```bash
npm run build
```

4. Netlify reads `netlify.toml` for Node 20, skew protection, and security headers.
5. Set `NEXT_PUBLIC_SITE_URL` in Netlify to the final production URL.

## Optional AI Keys

Users can bring their own keys in the UI. Server-side keys are optional for a
hosted demo:

```bash
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
OPENROUTER_API_KEY=
GROQ_API_KEY=
```

Do not commit real keys. Add them only in Netlify environment variables.

## Optional Commerce Setting

The Shopify connector uses each user's own store domain and Admin API token from
the browser. No Shopify token is required in Netlify environment variables.

You can pin the Admin API version used by `/api/shopify`:

```bash
SHOPIFY_ADMIN_API_VERSION=2026-04
```

The connector creates draft products only. Users should review media, variants,
shipping, taxes, inventory, legal/IP checks, and publishing settings in Shopify
before making a product live.

## App Dock

`/connections` exposes the broader App Dock. Shopify is live through
`/commerce`; other apps generate setup kits, env templates, required-field
checks, and Vault proof through `/api/integrations`.

No third-party app token is required in Netlify environment variables unless you
choose to turn a kit-ready lane into a live connector.

## Storage

The Creator Proof Vault is local-first and release-ready:

- Browser storage gives instant offline-friendly proof records.
- `/api/vault` syncs records to server storage.
- On Netlify, the API uses Netlify Blobs.
- In local Next development, it falls back to `.loomwire-storage/`, which is ignored by Git.

The app creates a browser creator ID and stores records against that anonymous
ID. This is not authentication; it is durable per-browser creator storage for
the MVP. Add user accounts later if you want cross-device identity.

## Release Checks

Run:

```bash
npm run typecheck
npm run build
npm run smoke
npm run responsive
npm audit
```

`npm run smoke` starts `next start` on a temporary local port after a build,
checks every route, and verifies that `/api/vault` can save and reload a record.
It also verifies provider status, Shopify draft-payload preparation, and App
Dock integration-kit generation.

`npm run responsive` starts the built app and checks every main route at phone,
tablet, desktop, large desktop, and wide desktop widths for horizontal overflow
or off-canvas layout elements.

To test an already-running deployment:

```bash
BASE_URL=https://your-site.netlify.app npm run smoke
```

## Deploy Commands

For local Netlify previews, install or use Netlify CLI:

```bash
npx netlify dev
npx netlify deploy --build
npx netlify deploy --build --prod
```

The package scripts also expose:

```bash
npm run netlify:dev
npm run netlify:deploy
npm run netlify:deploy:prod
```
