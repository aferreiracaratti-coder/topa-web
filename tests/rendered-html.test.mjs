import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Espacio TOPA landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="es">/i);
  assert.match(html, /<title>[^<]*Espacio TOPA/i);
  assert.match(html, /Un lugar para jugar, encontrarnos y disfrutar\./);
  assert.match(html, /Brasil 774/);
  assert.match(html, /Jueves/);
  assert.match(html, /17:00 a 19:00/);
  assert.match(html, /https:\/\/espaciotopa\.simplybook\.me\/v2\/#book/);
  assert.match(html, /https:\/\/wa\.me\/59899383698/);
  assert.match(html, /application\/ld\+json/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/i);
});

test("keeps the finished site metadata and brand asset in place", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /Espacio TOPA/);
  assert.match(page, /LocalBusiness/);
  assert.match(layout, /lang="es"/);
  assert.match(layout, /favicon\.png/);
  assert.match(packageJson, /"name": "espacio-topa-web"/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.doesNotMatch(page, /SkeletonPreview|codex-preview/);

  await access(
    new URL("../public/assets/brand/topa-logo.png", import.meta.url),
  );
  await access(new URL("../public/favicon.png", import.meta.url));
});
