import assert from "node:assert/strict";
import test from "node:test";

import { buildAiBriefMarkdownExport } from "../src/lib/ai/export.ts";

test("AI brief Markdown export includes cache provenance metadata", () => {
  const markdown = buildAiBriefMarkdownExport({
    countryName: "Serbia",
    municipalityName: "Beograd",
    provinceName: "Belgrade",
    scoreLabel: "Prosperity Score",
    releaseKey: "srb-2025-v1",
    year: 2025,
    generatedAt: "2026-07-03T00:00:00.000Z",
    stages: [
      {
        label: "Component score analysis",
        result: {
          stage: "indicator_narrative",
          status: "completed",
          cacheHit: true,
          cacheStatus: "cache_hit",
          runId: "run-123",
          cacheKey: "cache-123",
          sourceFingerprint: "source-123",
          inputHash: "input-123",
          renderedOutput: "Brief text",
          structuredOutput: {},
          sourceReferences: [
            {
              label: "Indicator series",
              type: "indicator_series",
              source: "supabase",
            },
          ],
          modelName: "gpt-4.1-mini",
          promptVersion: "v2",
          updatedAt: "2026-07-03T00:00:00.000Z",
          errorMessage: null,
        },
      },
    ],
  });

  assert.match(markdown, /# AI Planning Brief/);
  assert.match(markdown, /Local unit: Beograd, Belgrade/);
  assert.match(markdown, /Run ID: run-123/);
  assert.match(markdown, /Cache status: cache_hit/);
  assert.match(markdown, /Cache key: cache-123/);
  assert.match(markdown, /Source fingerprint: source-123/);
  assert.match(markdown, /Input hash: input-123/);
  assert.match(markdown, /Prompt version: v2/);
  assert.match(markdown, /Model: gpt-4\.1-mini/);
  assert.match(markdown, /Brief text/);
  assert.match(markdown, /Indicator series - supabase/);
});
