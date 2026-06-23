import assert from "node:assert/strict";
import test from "node:test";

import {
  runWithAiStageCache,
} from "../src/lib/ai/run-store.ts";

const runContract = {
  cacheKey: "cache-123",
  inputHash: "input-123",
  sourceFingerprint: "source-123",
  promptHash: "prompt-123",
  modelSettingsHash: "settings-123",
};

function buildResponse(overrides = {}) {
  return {
    stage: "indicator_narrative",
    status: "completed",
    cacheHit: false,
    renderedOutput: "generated output",
    structuredOutput: {},
    sourceReferences: [],
    modelName: "gpt-4.1-mini",
    promptVersion: "v2",
    updatedAt: "2026-07-03T00:00:00.000Z",
    errorMessage: null,
    ...overrides,
  };
}

function buildFailureResponse(message) {
  return buildResponse({
    status: "failed",
    renderedOutput: null,
    errorMessage: message,
  });
}

test("read-through runner returns reusable cache without generating or persisting", async () => {
  let generateCalls = 0;
  let persistCalls = 0;
  const cached = buildResponse({
    cacheHit: true,
    cacheStatus: "cache_hit",
    runId: "run-cached",
    cacheKey: "cache-123",
    sourceFingerprint: "source-123",
    inputHash: "input-123",
    renderedOutput: "cached output",
  });

  const response = await runWithAiStageCache({
    mode: "generate",
    runContract,
    loadCached: async () => cached,
    generate: async () => {
      generateCalls += 1;
      return buildResponse();
    },
    buildFailureResponse,
    persistRun: async () => {
      persistCalls += 1;
      return "run-new";
    },
  });

  assert.equal(response.renderedOutput, "cached output");
  assert.equal(response.cacheHit, true);
  assert.equal(response.cacheStatus, "cache_hit");
  assert.equal(generateCalls, 0);
  assert.equal(persistCalls, 0);
});

test("read-through runner persists failed generation attempts without cache hit semantics", async () => {
  const persistedStatuses = [];

  const response = await runWithAiStageCache({
    mode: "generate",
    runContract,
    loadCached: async () => null,
    generate: async () => {
      throw new Error("OpenAI request failed");
    },
    buildFailureResponse,
    persistRun: async (stageResponse) => {
      persistedStatuses.push(stageResponse.status);
      return "run-failed";
    },
  });

  assert.equal(response.status, "failed");
  assert.equal(response.cacheHit, false);
  assert.equal(response.cacheStatus, "failed");
  assert.equal(response.runId, "run-failed");
  assert.equal(response.cacheKey, "cache-123");
  assert.equal(response.sourceFingerprint, "source-123");
  assert.equal(response.inputHash, "input-123");
  assert.match(response.errorMessage, /OpenAI request failed/);
  assert.deepEqual(persistedStatuses, ["failed"]);
});

test("load_cached miss returns a failure response without generation or persistence", async () => {
  let generateCalls = 0;
  let persistCalls = 0;

  const response = await runWithAiStageCache({
    mode: "load_cached",
    runContract,
    loadCached: async () => null,
    generate: async () => {
      generateCalls += 1;
      return buildResponse();
    },
    buildFailureResponse,
    persistRun: async () => {
      persistCalls += 1;
      return "run-new";
    },
    missingCacheMessage: "No cached indicator narrative found.",
  });

  assert.equal(response.status, "failed");
  assert.equal(response.cacheStatus, "failed");
  assert.match(response.errorMessage, /No cached indicator narrative/);
  assert.equal(generateCalls, 0);
  assert.equal(persistCalls, 0);
});
