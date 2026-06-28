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
npm audit
```

`npm run smoke` starts `next start` on a temporary local port after a build,
checks every route, and verifies that `/api/vault` can save and reload a record.

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
