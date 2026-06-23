import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("AI cache layer persists append-only run records and cache provenance", async () => {
  const cacheSource = await readFile("src/lib/ai/cache.ts", "utf8");

  assert.match(cacheSource, /export async function saveAiStageRun/);
  assert.match(cacheSource, /\.from\("ai_stage_runs"\)/);
  assert.match(cacheSource, /latest_run_id/);
  assert.match(cacheSource, /cache_key/);
  assert.match(cacheSource, /source_fingerprint/);
  assert.match(cacheSource, /input_hash/);
});

test("AI pipeline uses the v1.5 run-store contract before LLM generation", async () => {
  const pipelineSource = await readFile("src/lib/ai/pipeline.ts", "utf8");

  assert.match(pipelineSource, /buildAiRunCacheContract/);
  assert.match(pipelineSource, /runWithAiStageCache/);
  assert.match(pipelineSource, /saveAiStageRun/);
  assert.match(pipelineSource, /runId/);
  assert.doesNotMatch(pipelineSource, /if \(!shouldBypassAiRunCache\(mode\)\)/);
  assert.doesNotMatch(pipelineSource, /function buildStageFingerprint/);
});

test("AI cache persistence writes failed runs without replacing reusable cache entries", async () => {
  const pipelineSource = await readFile("src/lib/ai/pipeline.ts", "utf8");

  assert.match(pipelineSource, /if \(response\.status === "completed"\)/);
  assert.match(pipelineSource, /saveAiStageCache/);
});

test("AI stage cards expose cache provenance fields to users", async () => {
  const cardSource = await readFile("src/components/analytics/ai-stage-card.tsx", "utf8");

  assert.match(cardSource, /Run ID/);
  assert.match(cardSource, /Cache key/);
  assert.match(cardSource, /Source fingerprint/);
});

test("AI analytics tab can export a Markdown brief with cached run metadata", async () => {
  const tabSource = await readFile("src/components/analytics/ai-analytics-tab.tsx", "utf8");

  assert.match(tabSource, /buildAiBriefMarkdownExport/);
  assert.match(tabSource, /Download brief/);
  assert.match(tabSource, /new Blob/);
  assert.match(tabSource, /text\/markdown/);
  assert.match(tabSource, /stageResults\[stage\]/);
});
