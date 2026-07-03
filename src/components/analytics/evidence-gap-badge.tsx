import type { EvidenceGapBadge as EvidenceGapBadgeModel } from "@/lib/evidence-gaps";

function toneClassName(tone: EvidenceGapBadgeModel["tone"]) {
  if (tone === "blocked") {
    return "border-rose-200 bg-rose-50 text-rose-800";
  }

  if (tone === "sparse") {
    return "border-amber-200 bg-amber-50 text-amber-800";
  }

  return "border-slate-200 bg-slate-50 text-slate-700";
}

export function EvidenceGapBadge({ gap }: { gap: EvidenceGapBadgeModel }) {
  return (
    <span
      className={`inline-flex max-w-full items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium ${toneClassName(gap.tone)}`}
      title={gap.detail}
    >
      <span aria-hidden="true">Evidence gap</span>
      <span className="truncate">{gap.label}</span>
    </span>
  );
}
