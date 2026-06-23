import assert from "node:assert/strict";
import test from "node:test";

import {
  buildAiRunCacheContract,
  createStableFingerprint,
  isCacheReusableRunStatus,
  shouldBypassAiRunCache,
} from "../src/lib/ai/run-store.ts";

const baseScope = {
  countryCode: "SRB",
  stage: "indicator_narrative",
  releaseKey: "srb-2025-v1",
  year: 2025,
  municipalityId: "srb-2025-v1:beograd",
  province: "Belgrade",
  scoreId: "prosperity_score",
  modelName: "gpt-4.1-mini",
  promptVersion: "v2",
  invalidationVersion: "v1",
};

test("stable fingerprints are independent of object key insertion order", () => {
  const left = createStableFingerprint({
    municipality: { id: "a", name: "Beograd" },
    score: { id: "prosperity_score", label: "Prosperity" },
  });
  const right = createStableFingerprint({
    score: { label: "Prosperity", id: "prosperity_score" },
    municipality: { name: "Beograd", id: "a" },
  });

  assert.equal(left, right);
});

test("AI run cache contract is stable for equivalent inputs", () => {
  const first = buildAiRunCacheContract({
    ...baseScope,
    input: {
      selectedIndicators: ["jobs", "mobility"],
      evidence: [{ url: "https://example.test/plan.pdf", fingerprint: "abc" }],
    },
    prompt: {
      system: "system prompt",
      user: "user prompt",
    },
    modelSettings: {
      temperature: 0,
      topP: 1,
    },
  });
  const second = buildAiRunCacheContract({
    ...baseScope,
    input: {
      evidence: [{ fingerprint: "abc", url: "https://example.test/plan.pdf" }],
      selectedIndicators: ["jobs", "mobility"],
    },
    prompt: {
      user: "user prompt",
      system: "system prompt",
    },
    modelSettings: {
      topP: 1,
      temperature: 0,
    },
  });

  assert.equal(first.cacheKey, second.cacheKey);
  assert.equal(first.inputHash, second.inputHash);
  assert.equal(first.sourceFingerprint, second.sourceFingerprint);
  assert.equal(first.promptHash, second.promptHash);
});

test("AI run source fingerprint changes when source evidence changes", () => {
  const first = buildAiRunCacheContract({
    ...baseScope,
    input: {
      selectedIndicators: ["jobs", "mobility"],
      evidence: [{ url: "https://example.test/plan.pdf", fingerprint: "abc" }],
    },
    prompt: {
      system: "system prompt",
      user: "user prompt",
    },
    modelSettings: {},
  });
  const second = buildAiRunCacheContract({
    ...baseScope,
    input: {
      selectedIndicators: ["jobs", "mobility"],
      evidence: [{ url: "https://example.test/plan.pdf", fingerprint: "changed" }],
    },
    prompt: {
      system: "system prompt",
      user: "user prompt",
    },
    modelSettings: {},
  });

  assert.notEqual(first.sourceFingerprint, second.sourceFingerprint);
  assert.notEqual(first.cacheKey, second.cacheKey);
});

test("regenerate mode bypasses reusable cache but load_cached does not", () => {
  assert.equal(shouldBypassAiRunCache("regenerate"), true);
  assert.equal(shouldBypassAiRunCache("generate"), false);
  assert.equal(shouldBypassAiRunCache("load_cached"), false);
});

test("only completed AI runs are reusable cache hits", () => {
  assert.equal(isCacheReusableRunStatus("completed"), true);
  assert.equal(isCacheReusableRunStatus("failed"), false);
  assert.equal(isCacheReusableRunStatus("running"), false);
});
