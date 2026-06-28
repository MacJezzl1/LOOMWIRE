import { spawn } from "node:child_process";
import { createServer } from "node:net";

const shouldStartServer = !process.env.BASE_URL;
const port = process.env.SMOKE_PORT || (shouldStartServer ? await getFreePort() : "");
const baseUrl = process.env.BASE_URL || `http://127.0.0.1:${port}`;
const routes = [
  "/",
  "/atelier",
  "/rooms",
  "/rooms/name-room",
  "/rooms/ip-room",
  "/rooms/studio",
  "/rooms/blank-room",
  "/rooms/lookbook-engine",
  "/rooms/drop-room",
  "/vault",
  "/gallery",
  "/cultural-map",
  "/critic",
  "/launch-board",
  "/connections",
  "/commerce",
  "/agents",
  "/archive"
];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getFreePort() {
  return new Promise((resolve, reject) => {
    const server = createServer();

    server.on("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      const nextPort =
        address && typeof address === "object" ? String(address.port) : "3010";

      server.close(() => resolve(nextPort));
    });
  });
}

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal
    });
  } finally {
    clearTimeout(timeout);
  }
}

async function waitForServer() {
  const deadline = Date.now() + 60000;

  while (Date.now() < deadline) {
    try {
      const response = await fetchWithTimeout(baseUrl);
      if (response.ok) {
        return;
      }
    } catch {
      await sleep(1000);
    }
  }

  throw new Error(`Timed out waiting for ${baseUrl}`);
}

async function checkRoutes() {
  const failures = [];

  for (const route of routes) {
    const response = await fetchWithTimeout(`${baseUrl}${route}`);
    if (response.status !== 200) {
      failures.push(`${route} returned ${response.status}`);
    }
  }

  return failures;
}

async function checkVaultApi() {
  const creatorId = `smoke-${Date.now()}`;
  const entry = {
    id: `entry-${Date.now()}`,
    title: "Smoke test launch proof",
    category: "Launch proof",
    notes: "Smoke test record created by scripts/smoke.mjs.",
    createdAt: new Date().toISOString()
  };

  const putResponse = await fetchWithTimeout(`${baseUrl}/api/vault`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ creatorId, entries: [entry] })
  });

  if (!putResponse.ok) {
    return [`PUT /api/vault returned ${putResponse.status}`];
  }

  const getResponse = await fetchWithTimeout(
    `${baseUrl}/api/vault?creatorId=${encodeURIComponent(creatorId)}`
  );

  if (!getResponse.ok) {
    return [`GET /api/vault returned ${getResponse.status}`];
  }

  const payload = await getResponse.json();
  const hasEntry = Array.isArray(payload.entries)
    ? payload.entries.some((item) => item.id === entry.id)
    : false;

  return hasEntry ? [] : ["GET /api/vault did not return the saved smoke entry"];
}

async function checkProviderApi() {
  const response = await fetchWithTimeout(`${baseUrl}/api/providers`);

  if (!response.ok) {
    return [`GET /api/providers returned ${response.status}`];
  }

  const payload = await response.json();
  const ids = Array.isArray(payload.providers)
    ? payload.providers.map((item) => item.id)
    : [];

  return ids.includes("demo") && ids.includes("openai")
    ? []
    : ["GET /api/providers did not return expected provider status"];
}

async function checkShopifyApi() {
  const kit = {
    platform: "shopify",
    sourceBrandName: "LOOMWIRE Smoke",
    productTitle: "LOOMWIRE Smoke DROP 001",
    handle: "loomwire-smoke-drop-001",
    vendor: "LOOMWIRE Smoke",
    productType: "Cultural product",
    descriptionHtml: "<p>Smoke test product.</p>",
    tags: ["LOOMWIRE", "Smoke"],
    variants: [
      {
        option1: "First Edition",
        sku: "LOOMWIRE-SMOKE-001",
        price: "120.00",
        inventoryQuantity: 1
      }
    ],
    launchCopy: ["Build", "Protect", "Release"],
    checklist: ["Review before publishing."],
    shopifyProduct: {
      title: "LOOMWIRE Smoke DROP 001",
      handle: "loomwire-smoke-drop-001",
      vendor: "LOOMWIRE Smoke",
      productType: "Cultural product",
      descriptionHtml: "<p>Smoke test product.</p>",
      status: "DRAFT",
      tags: ["LOOMWIRE", "Smoke"],
      seo: {
        title: "LOOMWIRE Smoke DROP 001",
        description: "Smoke test product."
      }
    }
  };
  const response = await fetchWithTimeout(`${baseUrl}/api/shopify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "prepare", kit })
  });

  if (!response.ok) {
    return [`POST /api/shopify prepare returned ${response.status}`];
  }

  const payload = await response.json();

  return payload.product?.status === "DRAFT"
    ? []
    : ["POST /api/shopify prepare did not return a draft product payload"];
}

async function checkIntegrationsApi() {
  const catalogResponse = await fetchWithTimeout(`${baseUrl}/api/integrations`);

  if (!catalogResponse.ok) {
    return [`GET /api/integrations returned ${catalogResponse.status}`];
  }

  const catalog = await catalogResponse.json();
  const apps = Array.isArray(catalog.apps) ? catalog.apps : [];
  const hasExpectedApps =
    apps.some((app) => app.id === "shopify") &&
    apps.some((app) => app.id === "stripe") &&
    apps.some((app) => app.id === "supabase");

  if (!hasExpectedApps) {
    return ["GET /api/integrations did not return the expected app catalog"];
  }

  const kitResponse = await fetchWithTimeout(`${baseUrl}/api/integrations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "prepare",
      appId: "stripe",
      credentials: {
        STRIPE_SECRET_KEY: "sk_test_smoke",
        NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: "pk_test_smoke"
      }
    })
  });

  if (!kitResponse.ok) {
    return [`POST /api/integrations prepare returned ${kitResponse.status}`];
  }

  const kit = await kitResponse.json();

  return kit.kit?.appId === "stripe" && kit.credentialStatus?.ready
    ? []
    : ["POST /api/integrations did not return a ready Stripe kit"];
}

let server;

try {
  if (shouldStartServer) {
    const command = process.platform === "win32" ? "cmd.exe" : "npx";
    const args =
      process.platform === "win32"
        ? ["/c", "npx", "next", "start", "-H", "127.0.0.1", "-p", port]
        : ["next", "start", "-H", "127.0.0.1", "-p", port];
    server = spawn(command, args, {
      cwd: process.cwd(),
      env: {
        ...process.env,
        NEXT_TELEMETRY_DISABLED: "1"
      },
      stdio: "inherit"
    });

    await waitForServer();
  }

  const failures = [
    ...(await checkRoutes()),
    ...(await checkVaultApi()),
    ...(await checkProviderApi()),
    ...(await checkShopifyApi()),
    ...(await checkIntegrationsApi())
  ];

  if (failures.length > 0) {
    throw new Error(failures.join("\n"));
  }

  console.log(`LOOMWIRE smoke passed at ${baseUrl}`);
} finally {
  if (server) {
    server.kill();
  }
}
