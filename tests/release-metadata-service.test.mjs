import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("release metadata service centralizes country release facts", async () => {
  const source = await readFile("src/lib/release-metadata.ts", "utf8");

  assert.match(source, /export type ReleaseMetadata/);
  assert.match(source, /export function getAllReleaseMetadata/);
  assert.match(source, /export function getReleaseMetadataBySlug/);
  assert.match(source, /analyticsMunicipalityCount/);
  assert.match(source, /methodologyVersion/);
  assert.match(source, /caveats/);
});

test("home page consumes release metadata instead of generated datasets directly", async () => {
  const source = await readFile("src/app/page.tsx", "utf8");

  assert.match(source, /getAllReleaseMetadata/);
  assert.match(source, /getGlobalReleaseSummary/);
  assert.doesNotMatch(source, /@\/generated\/analytics-data\.json/);
  assert.doesNotMatch(source, /@\/generated\/zambia\/analytics-data\.json/);
  assert.doesNotMatch(source, /@\/generated\/serbia\/analytics-data\.json/);
});
