import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("Nepal country page uses the shared country landing layout", async () => {
  const source = await readFile("src/app/nepal/page.tsx", "utf8");

  assert.match(source, /CountryLandingPage/);
  assert.match(source, /getCountryBySlug\("nepal"\)/);
  assert.doesNotMatch(source, /SngDisplaySection/);
  assert.doesNotMatch(source, /getSupabaseServerClient/);
});

test("shared country landing page places admin-level guide below snapshot", async () => {
  const source = await readFile(
    "src/components/country/country-landing-page.tsx",
    "utf8",
  );
  const snapshotIndex = source.indexOf("Country snapshot");
  const adminGuideIndex = source.indexOf("<CountryAdminLevelGuide country={country} />");
  const contextPanelIndex = source.indexOf("<CountryContextPanel country={country} />");

  assert.ok(snapshotIndex >= 0);
  assert.ok(adminGuideIndex > snapshotIndex);
  assert.ok(contextPanelIndex > adminGuideIndex);
  assert.match(source, /Admin levels 1 and 2 in/);
  assert.match(source, /aria-labelledby/);
});
