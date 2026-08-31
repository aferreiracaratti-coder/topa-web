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
  const [page, cafeteria, talleres, alquileres, eventos, bookingPlanner, footer, layout, packageJson, vercelConfig] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/cafeteria/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/talleres/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/alquileres/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/eventos/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/booking-planner.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/site-footer.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../vercel.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /Espacio TOPA/);
  assert.match(page, /LocalBusiness/);
  assert.match(page, /Bienvenidos al mundo TOPA/);
  assert.match(cafeteria, /BookingPlanner/);
  assert.match(talleres, /initialActivity="WORKSHOP"/);
  assert.doesNotMatch(cafeteria, /page-hero/);
  assert.doesNotMatch(talleres, /page-hero/);
  assert.doesNotMatch(alquileres, /page-hero/);
  assert.match(alquileres, /Catálogo de alquileres TOPA/);
  assert.match(alquileres, /Castillo inflable blanco/);
  assert.match(alquileres, /Plaza de madera/);
  assert.match(alquileres, /Plaza Apego/);
  assert.match(alquileres, /Consultar disponibilidad/);
  assert.match(eventos, /wa\.me\/59899383698/);
  assert.doesNotMatch(eventos, /BookingPlanner|Solicitud de evento/);
  assert.match(bookingPlanner, /Cafetería y juego/);
  assert.match(bookingPlanner, /Taller TOPA/);
  assert.doesNotMatch(bookingPlanner, /label: "Evento"/);
  assert.match(bookingPlanner, /is-awaiting-selection/);
  assert.match(bookingPlanner, /Email del padre o madre/);
  assert.match(bookingPlanner, /Próxima semana/);
  assert.match(bookingPlanner, /nextWeekRange/);
  assert.match(bookingPlanner, /Nombre y apellido del niño/);
  assert.match(bookingPlanner, /La reserva requiere al menos un adulto/);
  assert.match(bookingPlanner, /Celular \*/);
  assert.doesNotMatch(bookingPlanner, /lugares disponibles/);
  assert.match(footer, /Brasil 774/);
  assert.match(footer, /google\.com\/maps/);
  assert.match(footer, /Mapa de Espacio TOPA/);
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
  await access(new URL("../public/og.png", import.meta.url));
  await access(new URL("../public/assets/topa/rental-castillo-catalog.png", import.meta.url));
  await access(new URL("../public/assets/topa/rental-plaza-madera-catalog.png", import.meta.url));
  await access(new URL("../public/assets/topa/rental-plaza-apego-catalog.png", import.meta.url));
  await access(new URL("../public/assets/topa/rental-hero-mesas.jpeg", import.meta.url));
});
