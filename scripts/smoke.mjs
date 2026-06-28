import { spawn } from "node:child_process";

const port = process.env.SMOKE_PORT || "3010";
const baseUrl = process.env.BASE_URL || `http://127.0.0.1:${port}`;
const shouldStartServer = !process.env.BASE_URL;
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
  "/agents",
  "/archive"
];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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

  const failures = [...(await checkRoutes()), ...(await checkVaultApi())];

  if (failures.length > 0) {
    throw new Error(failures.join("\n"));
  }

  console.log(`LOOMWIRE smoke passed at ${baseUrl}`);
} finally {
  if (server) {
    server.kill();
  }
}
