"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

import type { Scatter3DCardProps } from "@/components/analytics/scatter-3d";

const DeferredScatter3DCard = dynamic(
  () => import("@/components/analytics/scatter-3d").then((module) => module.Scatter3DCard),
  {
    ssr: false,
    loading: () => (
      <section
        role="status"
        className="rounded-[2rem] border border-[var(--border-soft)] bg-[var(--surface-strong)] p-6 shadow-[0_18px_50px_rgba(2,20,32,0.08)]"
      >
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted-foreground)]">
          3D scatterplot
        </p>
        <p className="sr-only">Loading 3D chart</p>
        <div className="mt-6 min-h-[420px] rounded-[1.5rem] border border-[var(--border-soft)] bg-white/70" />
      </section>
    ),
  },
);

export function Scatter3DLoader(props: Scatter3DCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  if (isLoaded) {
    return <DeferredScatter3DCard {...props} />;
  }

  return (
    <section className="rounded-[2rem] border border-[var(--border-soft)] bg-[var(--surface-strong)] p-6 shadow-[0_18px_50px_rgba(2,20,32,0.08)]">
      <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted-foreground)]">
        Optional 3D scatterplot
      </p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--foreground)]">
        Prosperity, Infrastructure, and Livability
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--muted-foreground)]">
        Load the 3D point cloud when you need rotation, pan, and depth comparison.
        This keeps the default analytics view lighter on slower machines.
      </p>
      <button
        type="button"
        onClick={() => setIsLoaded(true)}
        className="mt-6 inline-flex h-[46px] items-center justify-center rounded-full bg-[var(--accent)] px-5 text-sm font-medium text-white shadow-[0_12px_28px_rgba(54,117,183,0.24)]"
      >
        Load 3D chart
      </button>
    </section>
  );
}
