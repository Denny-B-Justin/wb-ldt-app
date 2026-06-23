import { createHash } from "node:crypto";

import type { AiStageName, AiStageRequestPayload } from "@/lib/ai/types";

export type AiRunStatus = "running" | "completed" | "failed";

export type AiRunCacheContractInput = {
  countryCode: string;
  stage: AiStageName;
  releaseKey: string;
  year: number;
  municipalityId: string;
  province: string;
  scoreId: string;
  modelName: string;
  promptVersion: string;
  invalidationVersion: string;
  input: unknown;
  prompt: {
    system: string;
    user: string;
  };
  modelSettings: Record<string, unknown>;
};

export type AiRunCacheContract = {
  cacheKey: string;
  inputHash: string;
  sourceFingerprint: string;
  promptHash: string;
  modelSettingsHash: string;
};

function normalizeForHashing(value: unknown): unknown {
  if (value === undefined) {
    return null;
  }

  if (value === null || typeof value !== "object") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => normalizeForHashing(item));
  }

  const record = value as Record<string, unknown>;
  return Object.fromEntries(
    Object.keys(record)
      .sort()
      .map((key) => [key, normalizeForHashing(record[key])]),
  );
}

export function createStableFingerprint(value: unknown) {
  return createHash("sha256")
    .update(JSON.stringify(normalizeForHashing(value)))
    .digest("hex");
}

function getSourceEvidenceInput(input: unknown) {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return input;
  }

  const record = input as Record<string, unknown>;
  return (
    record.evidence ??
    record.sourceReferences ??
    record.sources ??
    record.documents ??
    record.documentFingerprints ??
    input
  );
}

export function buildAiRunCacheContract({
  input,
  prompt,
  modelSettings,
  ...scope
}: AiRunCacheContractInput): AiRunCacheContract {
  const inputHash = createStableFingerprint(input);
  const sourceFingerprint = createStableFingerprint(getSourceEvidenceInput(input));
  const promptHash = createStableFingerprint(prompt);
  const modelSettingsHash = createStableFingerprint(modelSettings);
  const cacheKey = createStableFingerprint({
    ...scope,
    inputHash,
    sourceFingerprint,
    promptHash,
    modelSettingsHash,
  });

  return {
    cacheKey,
    inputHash,
    sourceFingerprint,
    promptHash,
    modelSettingsHash,
  };
}

export function shouldBypassAiRunCache(mode: AiStageRequestPayload["mode"]) {
  return mode === "regenerate";
}

export function isCacheReusableRunStatus(status: AiRunStatus) {
  return status === "completed";
}
