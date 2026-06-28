import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { chromium } from "playwright";

const shouldStartServer = !process.env.BASE_URL;
const port = process.env.RESPONSIVE_PORT || (shouldStartServer ? await getFreePort() : "");
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

const viewports = [
  { name: "phone", width: 390, height: 1100 },
  { name: "tablet", width: 768, height: 1100 },
  { name: "desktop", width: 1280, height: 900 },
  { name: "desktop-large", width: 1440, height: 1000 },
  { name: "wide", width: 1920, height: 1080 }
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
        address && typeof address === "object" ? String(address.port) : "3011";

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

function findLayoutIssues() {
  const clientWidth = document.documentElement.clientWidth;
  const main = document.querySelector("main") || document.body;
  const offenders = Array.from(document.querySelectorAll("body *"))
    .filter((element) => !element.closest(".marquee-track"))
    .map((element) => {
      const rect = element.getBoundingClientRect();

      return {
        tag: element.tagName,
        className:
          typeof element.className === "string"
            ? element.className.slice(0, 110)
            : "",
        text: (element.textContent || "").replace(/\s+/g, " ").trim().slice(0, 80),
        left: Math.round(rect.left),
        right: Math.round(rect.right),
        width: Math.round(rect.width),
        height: Math.round(rect.height)
      };
    })
    .filter(
      (item) =>
        item.width > 1 &&
        item.height > 1 &&
        (item.right > clientWidth + 2 || item.left < -2)
    )
    .slice(0, 8);

  return {
    clientWidth,
    docOverflow: document.documentElement.scrollWidth - clientWidth,
    bodyOverflow: document.body.scrollWidth - clientWidth,
    mainOverflow: main.scrollWidth - clientWidth,
    offenders
  };
}

let server;
let browser;

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

  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ colorScheme: "dark" });
  const failures = [];

  for (const viewport of viewports) {
    await page.setViewportSize({
      width: viewport.width,
      height: viewport.height
    });

    for (const route of routes) {
      await page.goto(`${baseUrl}${route}`, { waitUntil: "load" });
      const issues = await page.evaluate(findLayoutIssues);
      const hasIssues =
        issues.docOverflow > 2 ||
        issues.bodyOverflow > 2 ||
        issues.mainOverflow > 2 ||
        issues.offenders.length > 0;

      if (hasIssues) {
        failures.push({
          route,
          viewport,
          issues
        });
      }
    }
  }

  if (failures.length > 0) {
    throw new Error(JSON.stringify(failures, null, 2));
  }

  console.log(`LOOMWIRE responsive passed at ${baseUrl}`);
} finally {
  if (browser) {
    await browser.close();
  }

  if (server) {
    server.kill();
  }
}
