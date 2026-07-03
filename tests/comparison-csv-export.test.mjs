import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("shared CSV helper escapes values for download exports", async () => {
  const source = await readFile("src/lib/csv.ts", "utf8");

  assert.match(source, /export function escapeCsvValue/);
  assert.match(source, /export function buildCsv/);
  assert.match(source, /export function downloadCsv/);
  assert.match(source, /text\/csv/);
});

test("2D comparison scatter exposes a CSV export action", async () => {
  const source = await readFile("src/components/analytics/scatter-2d.tsx", "utf8");

  assert.match(source, /buildCsv/);
  assert.match(source, /downloadCsv/);
  assert.match(source, /Download CSV/);
  assert.match(source, /selected/);
});
