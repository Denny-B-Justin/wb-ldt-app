import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("country trust model covers release, boundary, plan, AI, and caveat status", async () => {
  const source = await readFile("src/lib/country-trust.ts", "utf8");

  assert.match(source, /export type CountryTrustModel/);
  assert.match(source, /export function buildCountryTrustModel/);
  assert.match(source, /Boundary quality/);
  assert.match(source, /Plan readiness/);
  assert.match(source, /AI readiness/);
  assert.match(source, /caveats/);
});

test("country landing page renders the Country Trust Card", async () => {
  const component = await readFile(
    "src/components/country/country-trust-card.tsx",
    "utf8",
  );
  const page = await readFile(
    "src/components/country/country-landing-page.tsx",
    "utf8",
  );

  assert.match(component, /Country Trust Card/);
  assert.match(component, /model\.items\.map/);
  assert.match(component, /statusLabel/);
  assert.match(page, /CountryTrustCard/);
  assert.match(page, /buildCountryTrustModel/);
});
