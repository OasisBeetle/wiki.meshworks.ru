/* eslint-disable no-console */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const repoRoot = path.resolve(import.meta.dirname, "..");
const require = createRequire(import.meta.url);

function getBaseUrl() {
  const raw = process.argv[2] || process.env.BASE_URL || "http://127.0.0.1:3000";
  return raw.replace(/\/+$/, "");
}

function resolvePlaywright() {
  const candidate = "C:/Users/user/Documents/landing/node_modules/playwright";
  // Keep this explicit: we don't have Playwright in this repo's deps and network installs are restricted.
  return require(candidate);
}

function resolveBrowserExecutable() {
  const edge = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
  const chrome = "C:/Program Files/Google/Chrome/Application/chrome.exe";
  if (fs.existsSync(edge)) return edge;
  if (fs.existsSync(chrome)) return chrome;
  return null;
}

async function main() {
  const baseUrl = getBaseUrl();
  const pw = resolvePlaywright();
  const executablePath = resolveBrowserExecutable();

  if (!executablePath) {
    console.error("No Chromium-based browser found (Edge/Chrome).");
    process.exitCode = 1;
    return;
  }

  const browser = await pw.chromium.launch({
    headless: true,
    executablePath,
  });

  const broken = new Map();
  const seen = new Set();

  function record(url, info) {
    if (!url || seen.has(url)) return;
    seen.add(url);
    broken.set(url, info);
  }

  const routes = [
    "/",
    "/catalog-devices",
    "/introduction",
    "/introduction/network-basics",
    "/devices",
  ];
  const MAX_PAGES_PER_VIEWPORT = 30;

  const viewports = [
    { name: "desktop", width: 1280, height: 720 },
    { name: "mobile", width: 390, height: 844 },
  ];

  for (const vp of viewports) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
    });
    const page = await context.newPage();
    const pendingConsole = [];

    page.on("pageerror", (err) => {
      record(`pageerror:${vp.name}`, { viewport: vp.name, type: "pageerror", error: String(err) });
    });

    page.on("console", (msg) => {
      if (msg.type() !== "error") return;
      pendingConsole.push(
        (async () => {
          const loc = msg.location();
          const args = await Promise.all(msg.args().map((arg) => arg.jsonValue().catch(() => undefined)));
          record(`console:${vp.name}:${msg.text()}`, {
            viewport: vp.name,
            type: "console",
            error: msg.text(),
            args,
            location: loc && (loc.url || loc.lineNumber) ? loc : undefined,
          });
        })(),
      );
    });

    page.on("requestfailed", (request) => {
      if (request.resourceType() !== "image") return;
      record(request.url(), { viewport: vp.name, type: "requestfailed", error: request.failure()?.errorText });
    });

    page.on("response", (response) => {
      const request = response.request();
      if (request.resourceType() !== "image") return;
      const status = response.status();
      if (status >= 400) {
        record(response.url(), { viewport: vp.name, type: "http", status });
      }
    });

    const queue = [...routes];
    const visitedRoutes = new Set();

    while (queue.length > 0 && visitedRoutes.size < MAX_PAGES_PER_VIEWPORT) {
      const route = queue.shift();
      if (!route || visitedRoutes.has(route)) continue;
      visitedRoutes.add(route);

      // eslint-disable-next-line no-await-in-loop
      await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle", timeout: 60_000 });

      // Trigger lazy-loaded images.
      // eslint-disable-next-line no-await-in-loop
      await page.evaluate(async () => {
        await new Promise((resolve) => {
          let total = 0;
          const step = 900;
          const timer = setInterval(() => {
            window.scrollBy(0, step);
            total += step;
            if (total > document.body.scrollHeight + 2000) {
              clearInterval(timer);
              window.scrollTo(0, 0);
              resolve(true);
            }
          }, 40);
        });
      });

      // eslint-disable-next-line no-await-in-loop
      await page.waitForLoadState("networkidle");
      // eslint-disable-next-line no-await-in-loop
      await page.waitForTimeout(300);

      const discovered = await page.evaluate(() => {
        const hrefs = Array.from(document.querySelectorAll("a[href]"))
          .map((a) => a.getAttribute("href"))
          .filter(Boolean);

        const out = [];
        for (const href of hrefs) {
          if (!href) continue;
          if (!href.startsWith("/")) continue;
          if (href.startsWith("//")) continue;
          if (href.startsWith("/search")) continue;
          if (href.startsWith("/custom-pages")) continue;
          if (href.startsWith("/admin")) continue;
          if (href.includes("#")) continue;
          if (href.includes("?")) continue;
          if (href.includes(".")) continue;
          out.push(href);
        }
        return Array.from(new Set(out)).slice(0, 40);
      });

      for (const href of discovered) {
        if (!visitedRoutes.has(href)) queue.push(href);
      }
    }

    const domBroken = await page.evaluate(() => {
      const imgs = Array.from(document.images);
      return imgs
        .filter((img) => img.complete && img.naturalWidth === 0)
        .map((img) => img.currentSrc || img.src)
        .filter(Boolean);
    });
    for (const url of domBroken) record(url, { viewport: vp.name, type: "dom", error: "naturalWidth=0" });

    await Promise.allSettled(pendingConsole);
    await context.close();
  }

  await browser.close();

  if (broken.size === 0) {
    console.log("OK: no broken images detected on checked routes.");
    return;
  }

  console.log("Broken images:");
  for (const [url, info] of broken.entries()) {
    console.log("-", url, JSON.stringify(info));
  }

  process.exitCode = 2;
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
