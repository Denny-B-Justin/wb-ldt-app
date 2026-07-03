import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("country landing actions expose one-click command center tasks", async () => {
  const source = await readFile("src/lib/country-landing-actions.ts", "utf8");

  assert.match(source, /CountryCommandCenterTask/);
  assert.match(source, /getCountryCommandCenterTasks/);
  assert.match(source, /Compare/);
  assert.match(source, /Map & drivers/);
  assert.match(source, /Planning brief/);
  assert.match(source, /Document readiness/);
  assert.match(source, /Trust center/);
  assert.match(source, /#document-readiness/);
  assert.match(source, /#country-trust-card/);
});

test("country landing page renders the command center task band", async () => {
  const source = await readFile(
    "src/components/country/country-landing-page.tsx",
    "utf8",
  );

  assert.match(source, /Command center/);
  assert.match(source, /getCountryCommandCenterTasks/);
  assert.match(source, /commandCenterTasks\.map/);
  assert.match(source, /id="document-readiness"/);
});
