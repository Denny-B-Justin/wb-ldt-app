import type { AiStageResponsePayload } from "@/lib/ai/types";
import type { ScoreWaterfallGroup } from "@/types/analytics";

export type EvidenceGapTone = "missing" | "sparse" | "blocked";

export type EvidenceGapBadge = {
  tone: EvidenceGapTone;
  label: string;
  detail: string;
};

export function deriveScatterEvidenceGap(
  points: Array<{ x: number | null; y: number | null }>,
): EvidenceGapBadge | null {
  const missing = points.filter((point) => point.x === null || point.y === null).length;

  if (missing === 0) {
    return null;
  }

  if (missing === points.length) {
    return {
      tone: "blocked",
      label: "Evidence gap",
      detail: "No comparable score pairs are available for this scatterplot.",
    };
  }

  return {
    tone: "sparse",
    label: `${missing} missing pairs`,
    detail: "Some places are hidden because one or both selected metrics are missing.",
  };
}

export function deriveWaterfallEvidenceGap(
  group: ScoreWaterfallGroup,
): EvidenceGapBadge | null {
  const missingRows = group.rows.filter((row) => row.contribution === null).length;

  if (
    group.municipalityScore === null ||
    group.nationalScore === null ||
    group.totalDifference === null
  ) {
    return {
      tone: "blocked",
      label: "Evidence gap",
      detail: "Score-driver evidence is incomplete for this selected score.",
    };
  }

  if (missingRows === 0) {
    return null;
  }

  return {
    tone: "sparse",
    label: `${missingRows} missing drivers`,
    detail: "Some score components are not shown because comparable values are missing.",
  };
}

export function deriveAiStageEvidenceGap(
  result: AiStageResponsePayload | null | undefined,
): EvidenceGapBadge | null {
  if (!result) {
    return {
      tone: "missing",
      label: "Not generated",
      detail: "Run this stage to create auditable AI evidence.",
    };
  }

  if (result.status === "failed") {
    return {
      tone: "blocked",
      label: "Generation failed",
      detail: result.errorMessage ?? "This stage did not produce a usable output.",
    };
  }

  if (!result.sourceFingerprint) {
    return {
      tone: "sparse",
      label: "Source gap",
      detail: "This output does not include a source fingerprint yet.",
    };
  }

  return null;
}
