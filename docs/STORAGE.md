# LOOMWIRE Storage Model

LOOMWIRE uses a local-first storage model for the MVP.

## Creator Proof Vault

The Vault writes every record to browser storage first so the interface stays
fast and resilient. It then syncs through `/api/vault`.

Storage layers:

- **Browser localStorage**: instant local proof records and offline fallback.
- **Netlify Blobs**: production server storage for records created on Netlify.
- **Local file fallback**: `.loomwire-storage/` during local Next development.

## API

`GET /api/vault?creatorId=...`

Returns the saved Vault payload for the anonymous creator ID.

`POST /api/vault`

Appends one sanitized record.

`PUT /api/vault`

Replaces the record list with a sanitized, capped list of entries.

## Current Limits

- Records are capped at 200 per creator ID.
- Titles, categories, and notes are sanitized and length-limited.
- Storage is anonymous per browser, not authenticated account storage.
- API keys are never stored in the Vault.

## Future Upgrade Path

For cross-device accounts, add Supabase or another auth provider and map the
Vault creator ID to an authenticated user. The current API boundary is already
separated from the UI, so the database layer can be swapped without rewriting
the product screens.
