import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("home page derives loaded LSG stats from release metadata", async () => {
  const source = await readFile("src/app/page.tsx", "utf8");

  assert.match(source, /getGlobalReleaseSummary/);
  assert.match(source, /totalLoadedLocalUnits/);
  assert.match(source, /Latest data year/);
  assert.match(source, /Methodology version/);
  assert.doesNotMatch(source, /@\/generated\/analytics-data\.json/);
  assert.doesNotMatch(source, /@\/generated\/zambia\/analytics-data\.json/);
  assert.doesNotMatch(source, /@\/generated\/serbia\/analytics-data\.json/);
  assert.doesNotMatch(source, /Nepal LSGs currently loaded/);
  assert.doesNotMatch(source, /Nepal release/);
});
