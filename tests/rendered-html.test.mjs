import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

test("creates a Vercel Build Output API bundle", async () => {
  await access(
    new URL("../.vercel/output/functions/__server.func/index.mjs", import.meta.url),
  );
  await access(new URL("../.vercel/output/static/favicon.png", import.meta.url));
});

test("keeps the finished site metadata and brand asset in place", async () => {
  const [page, layout, packageJson, vercelConfig] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../vercel.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /Espacio TOPA/);
  assert.match(page, /LocalBusiness/);
  assert.match(page, /BookingPlanner/);
  assert.match(layout, /lang="es"/);
  assert.match(layout, /favicon\.png/);
  assert.match(packageJson, /"name": "espacio-topa-web"/);
  assert.match(packageJson, /"dev": "vinext dev"/);
  assert.match(packageJson, /"build": "vite build"/);
  assert.match(packageJson, /"nitro"/);
  assert.match(vercelConfig, /"buildCommand": "npm run build"/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.doesNotMatch(page, /SkeletonPreview|codex-preview/);
  assert.doesNotMatch(page, /simplybook/i);

  await access(
    new URL("../public/assets/brand/topa-logo.png", import.meta.url),
  );
  await access(new URL("../public/favicon.png", import.meta.url));
});
