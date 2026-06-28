# LOOMWIRE Feature Map

## Working Features

- Multi-page atelier architecture.
- Brand System Generator with demo engine and BYO AI lanes.
- Creator Proof Vault with local browser storage, lock/unlock state, timestamps,
  Netlify-ready sync API, lock/unlock state, timestamps, and JSON export.
- Gallery Wall with original LOOMWIRE paintings, room links, download actions,
  and Vault save actions.
- Cultural Map with selectable culture territories, signal score, recommended
  room path, and Vault save action.
- Brand Critic with live scorecard, critique report copy action, and Vault save
  action.
- Launch Board with latest Atelier-system import, editable release profile,
  milestone proof tasks, readiness scoring, drop math, JSON export, copy action,
  and Vault save action.
- Archive and Agent pages for product story and operating model.
- Netlify release configuration, security headers, route smoke test, Vault API
  smoke test, and clean npm audit.

## Original Site Art

- `loomwire-atelier-hero.png`
- `loomwire-poster-collage.png`
- `loomwire-vault-padlock.png`
- `loomwire-name-room-painting.png`
- `loomwire-cultural-map-painting.png`
- `loomwire-drop-room-painting.png`

## Click Paths To Test

- Home -> Atelier -> Generate -> Export JSON -> Save to Vault.
- Home -> Gallery -> Select painting -> Download Painting -> Save to Vault.
- Home -> Cultural Map -> Toggle territories -> Save to Vault.
- Home -> Critic -> Change fields -> Copy Report -> Save to Vault.
- Home -> Launch Board -> Toggle proof tasks -> Copy Brief -> Export -> Save to Vault.
- Home -> Vault -> Unlock -> Seal Evidence -> Export -> Lock.
- `npm run smoke` -> starts production server -> checks all routes -> verifies `/api/vault`.
