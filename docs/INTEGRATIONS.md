# LOOMWIRE App Dock

The App Dock helps a creator choose and prepare the tools around a brand system.
Shopify is the first live connector. The rest are kit-ready lanes that generate
setup steps, credential checklists, env templates, and Vault proof.

## Included App Lanes

| App | Use |
| --- | --- |
| Shopify | Draft store products and drop commerce. |
| Stripe | Checkout, deposits, memberships, and paid access. |
| Printful | Print-on-demand blanks, samples, and fulfillment. |
| Supabase | Accounts, database, Vault storage, and teams. |
| Notion | Brand wiki, launch tasks, evidence database, and supplier notes. |
| Airtable | Supplier CRM, asset tracker, products, costs, and campaign tables. |
| Google Drive | Evidence folders, source files, contracts, lookbooks, and exports. |
| Discord | Private community, launch announcements, and member rooms. |
| Mailchimp | Waitlist, launch emails, tags, and audience sequences. |
| Zapier | No-code automation between Vault records and outside tools. |
| GitHub | Public build proof, releases, issues, and product credibility. |
| Netlify | Hosting, previews, production deploys, and release checks. |
| Figma | Design-system files, palette variables, mockups, and lookbook layouts. |

## Working Actions

- Filter apps by category.
- Search by app name, category, or use case.
- Prepare a connection kit through `/api/integrations`.
- Validate whether required fields are present without echoing secret values.
- Copy the full kit JSON.
- Copy the env template.
- Export the kit as JSON.
- Mark an app as connected in browser localStorage.
- Save the kit proof to the Creator Proof Vault.
- Open official app docs.
- Open the Shopify Commerce Room for the live Shopify connector.

## Secret Handling

- Secrets are typed into browser fields.
- `/api/integrations` returns only field presence, not secret values.
- The Vault stores kit proof, not tokens.
- Real tokens should live only in protected host environment variables or the
  user's own app account.

## Upgrade Path

The App Dock is designed so each kit-ready lane can later become a live
connector:

1. Keep the shared app definition in `lib/integrations.ts`.
2. Add a provider-specific route under `app/api`.
3. Keep every write action in draft, test, sandbox, or preview mode first.
4. Add the route to `scripts/smoke.mjs`.
5. Document scopes and setup in this folder.
