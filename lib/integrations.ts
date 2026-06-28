export type IntegrationCategory =
  | "Commerce"
  | "Payments"
  | "Production"
  | "Storage"
  | "Content"
  | "Community"
  | "Automation"
  | "Launch";

export type IntegrationStatus = "live" | "kit-ready";

export type IntegrationField = {
  id: string;
  label: string;
  placeholder: string;
  required: boolean;
  secret?: boolean;
};

export type IntegrationApp = {
  id: string;
  name: string;
  category: IntegrationCategory;
  status: IntegrationStatus;
  tagline: string;
  description: string;
  bestFor: string[];
  outputs: string[];
  fields: IntegrationField[];
  setupSteps: string[];
  envTemplate: string;
  docsUrl: string;
  route?: string;
};

export type IntegrationKit = {
  appId: string;
  appName: string;
  generatedAt: string;
  status: IntegrationStatus;
  summary: string;
  bestFor: string[];
  outputs: string[];
  requiredFields: IntegrationField[];
  setupSteps: string[];
  envTemplate: string;
  nextActions: string[];
  securityNotes: string[];
  vaultRecord: {
    title: string;
    category: string;
    notes: string;
  };
};

export const integrationApps: IntegrationApp[] = [
  {
    id: "shopify",
    name: "Shopify",
    category: "Commerce",
    status: "live",
    tagline: "Turn a LOOMWIRE drop into a draft store product.",
    description:
      "Use the existing Commerce Room to prepare a Shopify draft product, test a store, export the kit, and save proof.",
    bestFor: ["Product drops", "Lookbook commerce", "Merch stores"],
    outputs: ["Draft product", "Tags", "SEO", "Launch copy", "Vault proof"],
    fields: [
      {
        id: "SHOPIFY_STORE_DOMAIN",
        label: "Store domain",
        placeholder: "mystore.myshopify.com",
        required: true
      },
      {
        id: "SHOPIFY_ADMIN_ACCESS_TOKEN",
        label: "Admin API token",
        placeholder: "shpat_...",
        required: true,
        secret: true
      }
    ],
    setupSteps: [
      "Create a Shopify custom app for the store.",
      "Give the app product write access.",
      "Use the Commerce Room to create the product as draft.",
      "Review images, variants, shipping, taxes, and publishing inside Shopify."
    ],
    envTemplate:
      "SHOPIFY_ADMIN_API_VERSION=2026-04\n# User enters store domain and Admin token in the Commerce Room.",
    docsUrl: "https://shopify.dev/docs/api/admin-graphql",
    route: "/commerce"
  },
  {
    id: "stripe",
    name: "Stripe",
    category: "Payments",
    status: "kit-ready",
    tagline: "Prepare checkout, deposits, memberships, and paid digital access.",
    description:
      "Build the payment layer for drops, waitlists, deposits, memberships, services, and digital products.",
    bestFor: ["Checkout", "Memberships", "Deposits", "Creator services"],
    outputs: ["Checkout plan", "Price map", "Webhook checklist", "Env template"],
    fields: [
      {
        id: "STRIPE_SECRET_KEY",
        label: "Secret key",
        placeholder: "sk_live_...",
        required: true,
        secret: true
      },
      {
        id: "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
        label: "Publishable key",
        placeholder: "pk_live_...",
        required: true
      },
      {
        id: "STRIPE_WEBHOOK_SECRET",
        label: "Webhook secret",
        placeholder: "whsec_...",
        required: false,
        secret: true
      }
    ],
    setupSteps: [
      "Create products and prices for the first drop or service.",
      "Map each LOOMWIRE blank to a Stripe price.",
      "Add a webhook for completed checkout events.",
      "Save payment evidence and launch pricing to the Vault."
    ],
    envTemplate:
      "STRIPE_SECRET_KEY=\nNEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=\nSTRIPE_WEBHOOK_SECRET=",
    docsUrl: "https://docs.stripe.com/api"
  },
  {
    id: "printful",
    name: "Printful",
    category: "Production",
    status: "kit-ready",
    tagline: "Turn blanks into print-on-demand production plans.",
    description:
      "Prepare apparel and merchandise production details for hoodies, tees, caps, posters, and sample drops.",
    bestFor: ["Print-on-demand", "Samples", "Merch blanks", "Fulfillment"],
    outputs: ["Product sync checklist", "Artwork specs", "Fulfillment notes"],
    fields: [
      {
        id: "PRINTFUL_API_TOKEN",
        label: "API token",
        placeholder: "Printful token",
        required: true,
        secret: true
      },
      {
        id: "PRINTFUL_STORE_ID",
        label: "Store ID",
        placeholder: "123456",
        required: false
      }
    ],
    setupSteps: [
      "Connect Printful to the commerce store.",
      "Select blank products that match the brand's price logic.",
      "Upload artwork from the Studio at production quality.",
      "Order samples before publishing the drop."
    ],
    envTemplate: "PRINTFUL_API_TOKEN=\nPRINTFUL_STORE_ID=",
    docsUrl: "https://developers.printful.com/docs/"
  },
  {
    id: "supabase",
    name: "Supabase",
    category: "Storage",
    status: "kit-ready",
    tagline: "Upgrade Vault records into accounts, database, and storage.",
    description:
      "Move LOOMWIRE from anonymous browser records to authenticated creator accounts, shared Vaults, files, and teams.",
    bestFor: ["Auth", "Vault database", "File storage", "Team workspaces"],
    outputs: ["Schema plan", "Auth checklist", "Storage bucket map"],
    fields: [
      {
        id: "NEXT_PUBLIC_SUPABASE_URL",
        label: "Project URL",
        placeholder: "https://project.supabase.co",
        required: true
      },
      {
        id: "NEXT_PUBLIC_SUPABASE_ANON_KEY",
        label: "Anon key",
        placeholder: "eyJ...",
        required: true
      },
      {
        id: "SUPABASE_SERVICE_ROLE_KEY",
        label: "Service role key",
        placeholder: "eyJ...",
        required: false,
        secret: true
      }
    ],
    setupSteps: [
      "Create creator, vault_record, brand_system, and asset tables.",
      "Enable email or social auth for creator accounts.",
      "Create a private storage bucket for evidence files.",
      "Map browser creator IDs to authenticated users after sign-in."
    ],
    envTemplate:
      "NEXT_PUBLIC_SUPABASE_URL=\nNEXT_PUBLIC_SUPABASE_ANON_KEY=\nSUPABASE_SERVICE_ROLE_KEY=",
    docsUrl: "https://supabase.com/docs"
  },
  {
    id: "notion",
    name: "Notion",
    category: "Content",
    status: "kit-ready",
    tagline: "Create an external operating room for brand tasks and evidence.",
    description:
      "Send launch plans, evidence records, supplier notes, and editorial calendars into a Notion workspace.",
    bestFor: ["Brand wiki", "Task board", "Evidence database", "Supplier CRM"],
    outputs: ["Database property map", "Launch page outline", "Sync checklist"],
    fields: [
      {
        id: "NOTION_TOKEN",
        label: "Integration token",
        placeholder: "secret_...",
        required: true,
        secret: true
      },
      {
        id: "NOTION_DATABASE_ID",
        label: "Database ID",
        placeholder: "database id",
        required: true
      }
    ],
    setupSteps: [
      "Create a Notion integration and share the target database with it.",
      "Add properties for room, status, proof date, app, link, and notes.",
      "Export LOOMWIRE kits into pages or database rows.",
      "Use the Vault as the source of truth for timestamps."
    ],
    envTemplate: "NOTION_TOKEN=\nNOTION_DATABASE_ID=",
    docsUrl: "https://developers.notion.com/docs"
  },
  {
    id: "airtable",
    name: "Airtable",
    category: "Content",
    status: "kit-ready",
    tagline: "Track suppliers, creators, products, costs, and campaign assets.",
    description:
      "Prepare an Airtable base for product production, supplier research, campaign content, and grant or investor follow-up.",
    bestFor: ["Supplier tracker", "Asset tracker", "Cost table", "CRM"],
    outputs: ["Base schema", "Table map", "Importer checklist"],
    fields: [
      {
        id: "AIRTABLE_API_KEY",
        label: "Personal access token",
        placeholder: "pat...",
        required: true,
        secret: true
      },
      {
        id: "AIRTABLE_BASE_ID",
        label: "Base ID",
        placeholder: "app...",
        required: true
      }
    ],
    setupSteps: [
      "Create tables for products, suppliers, assets, contacts, and launch tasks.",
      "Add status fields that match the LOOMWIRE room flow.",
      "Import product drop details from the generated brand system.",
      "Save the schema export to the Vault."
    ],
    envTemplate: "AIRTABLE_API_KEY=\nAIRTABLE_BASE_ID=",
    docsUrl: "https://airtable.com/developers/web/api/introduction"
  },
  {
    id: "google-drive",
    name: "Google Drive",
    category: "Storage",
    status: "kit-ready",
    tagline: "Store evidence packs, logo files, lookbooks, and contracts.",
    description:
      "Prepare a clean folder structure for ownership records, generated art, contracts, exports, and lookbook PDFs.",
    bestFor: ["Evidence folder", "Asset archive", "Team sharing"],
    outputs: ["Folder tree", "Naming rules", "Sharing checklist"],
    fields: [
      {
        id: "GOOGLE_CLIENT_ID",
        label: "OAuth client ID",
        placeholder: "client id",
        required: true
      },
      {
        id: "GOOGLE_CLIENT_SECRET",
        label: "OAuth client secret",
        placeholder: "client secret",
        required: true,
        secret: true
      },
      {
        id: "GOOGLE_DRIVE_FOLDER_ID",
        label: "Root folder ID",
        placeholder: "folder id",
        required: false
      }
    ],
    setupSteps: [
      "Create a root folder for the brand.",
      "Create subfolders for name, IP, studio, blank, lookbook, drop, and archive.",
      "Keep permissions private until the founder chooses collaborators.",
      "Export the folder tree into the Vault."
    ],
    envTemplate:
      "GOOGLE_CLIENT_ID=\nGOOGLE_CLIENT_SECRET=\nGOOGLE_DRIVE_FOLDER_ID=",
    docsUrl: "https://developers.google.com/drive/api/guides/about-sdk"
  },
  {
    id: "discord",
    name: "Discord",
    category: "Community",
    status: "kit-ready",
    tagline: "Launch a private community room for early believers.",
    description:
      "Prepare a Discord server structure, announcement webhook, founder channels, drop channels, and moderator notes.",
    bestFor: ["Community pass", "Drop announcements", "Private cohorts"],
    outputs: ["Channel map", "Webhook env", "Launch message"],
    fields: [
      {
        id: "DISCORD_WEBHOOK_URL",
        label: "Webhook URL",
        placeholder: "https://discord.com/api/webhooks/...",
        required: false,
        secret: true
      }
    ],
    setupSteps: [
      "Create channels for manifesto, drops, archive, support, and member proof.",
      "Add a webhook for launch announcements.",
      "Write one pinned post that explains what members get.",
      "Save the first community structure to the Vault."
    ],
    envTemplate: "DISCORD_WEBHOOK_URL=",
    docsUrl: "https://discord.com/developers/docs/resources/webhook"
  },
  {
    id: "mailchimp",
    name: "Mailchimp",
    category: "Community",
    status: "kit-ready",
    tagline: "Build the waitlist and launch email lane.",
    description:
      "Prepare an email audience, tags, welcome sequence, and drop announcement flow for first releases.",
    bestFor: ["Waitlists", "Launch emails", "Audience tags"],
    outputs: ["Audience map", "Email sequence", "Tag strategy"],
    fields: [
      {
        id: "MAILCHIMP_API_KEY",
        label: "API key",
        placeholder: "key-us1",
        required: true,
        secret: true
      },
      {
        id: "MAILCHIMP_AUDIENCE_ID",
        label: "Audience ID",
        placeholder: "audience id",
        required: true
      },
      {
        id: "MAILCHIMP_SERVER_PREFIX",
        label: "Server prefix",
        placeholder: "us1",
        required: true
      }
    ],
    setupSteps: [
      "Create audience tags for interest, product blank, and launch stage.",
      "Write a welcome email using the founder manifesto.",
      "Create a drop announcement email and reminder email.",
      "Save the email sequence outline to the Vault."
    ],
    envTemplate:
      "MAILCHIMP_API_KEY=\nMAILCHIMP_AUDIENCE_ID=\nMAILCHIMP_SERVER_PREFIX=",
    docsUrl: "https://mailchimp.com/developer/marketing/docs/fundamentals/"
  },
  {
    id: "zapier",
    name: "Zapier",
    category: "Automation",
    status: "kit-ready",
    tagline: "Move LOOMWIRE records into other tools without custom code.",
    description:
      "Prepare webhook automation for Vault records, lead capture, commerce events, and content operations.",
    bestFor: ["No-code automation", "Lead routing", "Evidence sync"],
    outputs: ["Webhook plan", "Zap map", "Data payload"],
    fields: [
      {
        id: "ZAPIER_WEBHOOK_URL",
        label: "Catch hook URL",
        placeholder: "https://hooks.zapier.com/...",
        required: false,
        secret: true
      }
    ],
    setupSteps: [
      "Create a catch-hook trigger.",
      "Map LOOMWIRE fields to the destination app.",
      "Test with a sample Vault record.",
      "Keep one automation map per room."
    ],
    envTemplate: "ZAPIER_WEBHOOK_URL=",
    docsUrl: "https://help.zapier.com/hc/en-us/articles/8496288813453-Trigger-Zaps-from-webhooks"
  },
  {
    id: "github",
    name: "GitHub",
    category: "Launch",
    status: "kit-ready",
    tagline: "Turn the product into a public, credible build record.",
    description:
      "Prepare issue templates, release notes, repo visuals, changelog, and automation for the product's public proof layer.",
    bestFor: ["Open source", "Investor proof", "Build logs", "Release history"],
    outputs: ["Repo checklist", "Release note shell", "Issue labels"],
    fields: [
      {
        id: "GITHUB_REPO",
        label: "Repository",
        placeholder: "owner/repo",
        required: true
      },
      {
        id: "GITHUB_TOKEN",
        label: "Token",
        placeholder: "ghp_...",
        required: false,
        secret: true
      }
    ],
    setupSteps: [
      "Add README visuals and product screenshots.",
      "Create release notes for each meaningful product change.",
      "Use issues for rooms, integrations, bugs, and launch work.",
      "Keep public proof separate from private IP evidence."
    ],
    envTemplate: "GITHUB_REPO=\nGITHUB_TOKEN=",
    docsUrl: "https://docs.github.com/rest"
  },
  {
    id: "netlify",
    name: "Netlify",
    category: "Launch",
    status: "kit-ready",
    tagline: "Deploy lookbook sites, launch pages, and app previews.",
    description:
      "Prepare deployment settings, environment variables, preview URLs, and production release checks.",
    bestFor: ["Hosting", "Preview deploys", "Launch pages", "Forms"],
    outputs: ["Deploy checklist", "Env map", "Preview workflow"],
    fields: [
      {
        id: "NETLIFY_SITE_ID",
        label: "Site ID",
        placeholder: "site id",
        required: false
      },
      {
        id: "NETLIFY_AUTH_TOKEN",
        label: "Auth token",
        placeholder: "token",
        required: false,
        secret: true
      }
    ],
    setupSteps: [
      "Connect the GitHub repo to Netlify.",
      "Add environment variables for AI and storage.",
      "Run typecheck, build, smoke, and audit before production deploy.",
      "Save the production URL as launch evidence."
    ],
    envTemplate: "NETLIFY_SITE_ID=\nNETLIFY_AUTH_TOKEN=",
    docsUrl: "https://docs.netlify.com/"
  },
  {
    id: "figma",
    name: "Figma",
    category: "Content",
    status: "kit-ready",
    tagline: "Move brand systems into design files and asset libraries.",
    description:
      "Prepare design library structure for logos, palettes, typography, lookbook pages, mockups, and campaign components.",
    bestFor: ["Design systems", "Logo review", "Lookbook layouts", "Mockups"],
    outputs: ["File structure", "Token map", "Asset checklist"],
    fields: [
      {
        id: "FIGMA_ACCESS_TOKEN",
        label: "Access token",
        placeholder: "figd_...",
        required: false,
        secret: true
      },
      {
        id: "FIGMA_FILE_KEY",
        label: "File key",
        placeholder: "file key",
        required: false
      }
    ],
    setupSteps: [
      "Create pages for Brand DNA, Logo, Palette, Type, Product, Lookbook, and Campaign.",
      "Add color variables from the LOOMWIRE palette.",
      "Save exported frames into the Vault evidence folder.",
      "Use the Studio room as the design source of truth."
    ],
    envTemplate: "FIGMA_ACCESS_TOKEN=\nFIGMA_FILE_KEY=",
    docsUrl: "https://www.figma.com/developers/api"
  }
];

export function getIntegrationApp(id: string) {
  return integrationApps.find((app) => app.id === id);
}

export function buildIntegrationKit(appId: string): IntegrationKit {
  const app = getIntegrationApp(appId);

  if (!app) {
    throw new Error("Unknown integration app.");
  }

  return {
    appId: app.id,
    appName: app.name,
    generatedAt: new Date().toISOString(),
    status: app.status,
    summary: `${app.name}: ${app.description}`,
    bestFor: app.bestFor,
    outputs: app.outputs,
    requiredFields: app.fields,
    setupSteps: app.setupSteps,
    envTemplate: app.envTemplate,
    nextActions: [
      "Collect the required credentials from the app owner account.",
      "Paste credentials only into local browser fields or protected host env vars.",
      "Run a small test before putting real customer or creator data into the connection.",
      "Save the prepared connection kit to the Creator Proof Vault."
    ],
    securityNotes: [
      "Never commit tokens, secrets, webhook URLs, or private keys.",
      "Use draft, test, or sandbox mode before production where the app supports it.",
      "Keep legal, payment, and customer-data responsibilities with the account owner.",
      "The App Dock prepares integrations; final account permissions must be reviewed inside each app."
    ],
    vaultRecord: {
      title: `${app.name} connection kit`,
      category: "Launch proof",
      notes: `${app.name} kit prepared for ${app.bestFor.join(", ")}. Outputs: ${app.outputs.join(", ")}.`
    }
  };
}

export function credentialSummary(
  appId: string,
  credentials: Record<string, string | undefined>
) {
  const app = getIntegrationApp(appId);

  if (!app) {
    throw new Error("Unknown integration app.");
  }

  const fields = app.fields.map((field) => {
    const value = credentials[field.id]?.trim() || "";

    return {
      id: field.id,
      label: field.label,
      required: field.required,
      secret: Boolean(field.secret),
      present: value.length > 0
    };
  });

  return {
    ready: fields.every((field) => !field.required || field.present),
    fields,
    missing: fields
      .filter((field) => field.required && !field.present)
      .map((field) => field.label)
  };
}
