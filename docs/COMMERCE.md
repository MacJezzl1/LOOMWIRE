# LOOMWIRE Commerce Connector

The first commerce lane is Shopify.

## What It Does

- Reads the latest Atelier brand system from browser storage.
- Builds a Shopify-ready draft product kit.
- Exports product title, handle, vendor, product type, tags, SEO, description,
  launch copy, variant notes, and publishing checklist.
- Tests a Shopify store connection with the user's Admin API token.
- Creates a draft product in Shopify.
- Saves the commerce proof record to the Creator Proof Vault.

## Shopify Setup

In Shopify, create or use a custom app for the store and generate an Admin API
access token with product write access. The connector uses:

```text
https://{store}.myshopify.com/admin/api/2026-04/graphql.json
```

The request sends the token through the `X-Shopify-Access-Token` header.

Minimum useful scope:

```text
write_products
```

## User-Owned Credentials

The user enters:

- Shopify store domain, for example `mystore.myshopify.com`.
- Admin API access token.

LOOMWIRE does not store Shopify tokens on the server. The user can choose to
remember the token in browser localStorage only.

## Safety Model

- Products are created as `DRAFT`.
- Variants, inventory, media, shipping, taxes, and publishing should be reviewed
  in Shopify before release.
- IP and trademark work remains preparation, not legal advice.

## Environment

No Shopify token is required in `.env`.

Optional:

```bash
SHOPIFY_ADMIN_API_VERSION=2026-04
```

## Release Test

```bash
npm run smoke
```

The smoke test verifies that `/commerce` renders and `/api/shopify` can prepare
a draft product payload without store credentials.
