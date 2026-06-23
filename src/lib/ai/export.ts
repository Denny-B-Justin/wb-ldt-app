import type { AiStageResponsePayload } from "@/lib/ai/types";

export type AiBriefExportStage = {
  label: string;
  result?: AiStageResponsePayload | null;
};

export type AiBriefMarkdownExportInput = {
  countryName: string;
  municipalityName: string;
  provinceName: string;
  scoreLabel: string;
  releaseKey: string;
  year: number;
  generatedAt: string;
  stages: AiBriefExportStage[];
};

function valueOrMissing(value: string | number | boolean | null | undefined) {
  return value === null || value === undefined || value === "" ? "not recorded" : String(value);
}

function sanitizeMarkdown(value: string) {
  return value.replace(/\r\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
}

function buildStageSection({ label, result }: AiBriefExportStage) {
  if (!result) {
    return [`## ${label}`, "", "Status: not generated"].join("\n");
  }

  const lines = [
    `## ${label}`,
    "",
    `Stage: ${result.stage}`,
    `Status: ${result.status}`,
    `Cache status: ${valueOrMissing(result.cacheStatus)}`,
    `Run ID: ${valueOrMissing(result.runId)}`,
    `Cache key: ${valueOrMissing(result.cacheKey)}`,
    `Source fingerprint: ${valueOrMissing(result.sourceFingerprint)}`,
    `Input hash: ${valueOrMissing(result.inputHash)}`,
    `Prompt version: ${valueOrMissing(result.promptVersion)}`,
    `Model: ${valueOrMissing(result.modelName)}`,
    `Updated at: ${valueOrMissing(result.updatedAt)}`,
  ];

  if (result.errorMessage) {
    lines.push("", "### Error", "", sanitizeMarkdown(result.errorMessage));
  }

  if (result.renderedOutput) {
    lines.push("", "### Output", "", sanitizeMarkdown(result.renderedOutput));
  }

  if (result.sourceReferences.length > 0) {
    lines.push("", "### Sources", "");
    for (const source of result.sourceReferences) {
      lines.push(`- ${source.label} - ${source.source}`);
    }
  }

  return lines.join("\n");
}

export function buildAiBriefMarkdownExport({
  countryName,
  municipalityName,
  provinceName,
  scoreLabel,
  releaseKey,
  year,
  generatedAt,
  stages,
}: AiBriefMarkdownExportInput) {
  return [
    "# AI Planning Brief",
    "",
    `Country: ${countryName}`,
    `Local unit: ${municipalityName}, ${provinceName}`,
    `Score theme: ${scoreLabel}`,
    `Release: ${releaseKey}`,
    `Year: ${year}`,
    `Exported at: ${generatedAt}`,
    "",
    "This export preserves AI run provenance so generated outputs can be traced back to cached stage records, prompts, model settings, and evidence fingerprints.",
    "",
    ...stages.map((stage) => buildStageSection(stage)),
    "",
  ].join("\n");
}
