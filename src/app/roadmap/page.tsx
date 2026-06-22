import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BrainCircuit,
  CheckCircle2,
  CircleDot,
  ClipboardCheck,
  Database,
  FileText,
  GitBranch,
  Landmark,
  Layers,
  Map,
  Network,
  Radar,
  Scale,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Roadmap | Local Development Tracker",
  description:
    "Roadmap for expanding LDT from local development analytics into an evidence-to-investment platform.",
};

type RoadmapIcon = typeof ShieldCheck;

type RoadmapPhase = {
  version: string;
  name: string;
  horizon: string;
  goal: string;
  icon: RoadmapIcon;
  tone: {
    marker: string;
    icon: string;
    rail: string;
  };
  epics: string[];
  gate: string;
};

type Workstream = {
  name: string;
  description: string;
  icon: RoadmapIcon;
  steps: string[];
};

const northStarMetrics = [
  { value: "5", label: "Release horizons" },
  { value: "4", label: "Delivery workstreams" },
  { value: "8", label: "Release gates" },
] as const;

const roadmapPhases = [
  {
    version: "V1",
    name: "Trust Foundation",
    horizon: "Current product hardening",
    goal:
      "Make the current LDT reliable, consistent, and trustable before adding heavier AI or public investment workflows.",
    icon: ShieldCheck,
    tone: {
      marker: "border-sky-500 bg-sky-600 text-white",
      icon: "bg-sky-600/10 text-sky-700 dark:text-sky-200",
      rail: "from-sky-500 to-cyan-500",
    },
    epics: [
      "Release metadata source of truth",
      "Country Trust Card and evidence gap badges",
      "Command center polish, export MVP, responsive states",
    ],
    gate: "All public pages, exports, and AI stages use the same release metadata and caveats.",
  },
  {
    version: "V2",
    name: "Evidence to Brief",
    horizon: "Auditable planning outputs",
    goal:
      "Convert diagnostics into evidence-backed planning briefs, opportunity families, and concept-note starters.",
    icon: FileText,
    tone: {
      marker: "border-emerald-500 bg-emerald-600 text-white",
      icon: "bg-emerald-600/10 text-emerald-700 dark:text-emerald-200",
      rail: "from-emerald-500 to-teal-500",
    },
    epics: [
      "AI Planning Brief Report and AI Audit Drawer",
      "Investment Opportunity Finder and Evidence Graph MVP",
      "Concept Note Starter and recommendation review flow",
    ],
    gate: "Every recommendation is traceable to evidence links, caveats, and a human review status.",
  },
  {
    version: "V3",
    name: "Scaling Platform",
    horizon: "Country factory and registry beta",
    goal:
      "Make country onboarding repeatable and introduce a lightweight public investment lifecycle view.",
    icon: Database,
    tone: {
      marker: "border-indigo-500 bg-indigo-600 text-white",
      icon: "bg-indigo-600/10 text-indigo-700 dark:text-indigo-200",
      rail: "from-indigo-500 to-blue-500",
    },
    epics: [
      "Country Onboarding Factory and validation reports",
      "Document Intelligence Workbench and Trust Center",
      "PIM Registry Beta, OC4IDS-ready mapping, observability",
    ],
    gate: "A new country can be staged from manifests, data packages, source registries, and preview releases.",
  },
  {
    version: "V4",
    name: "Decision Studio",
    horizon: "Spatial, climate, scenario, counterpart layer",
    goal:
      "Add transparent spatial prioritization, climate-risk screening, scenario analysis, and workshop-ready outputs.",
    icon: Map,
    tone: {
      marker: "border-amber-500 bg-amber-600 text-white",
      icon: "bg-amber-600/10 text-amber-700 dark:text-amber-200",
      rail: "from-amber-500 to-orange-500",
    },
    epics: [
      "Geospatial Prioritization Studio and hazard screen",
      "Scenario Builder with weights, sensitivity, and caveats",
      "Counterpart Mode and controlled API/data product",
    ],
    gate: "Scenario outputs show the weights, evidence, assumptions, map, table, caveats, and sensitivity.",
  },
  {
    version: "V5+",
    name: "Delivery Loop",
    horizon: "Monitoring, transparency, and learning",
    goal:
      "Link upstream planning to delivery monitoring, procurement transparency, asset records, and ex-post learning.",
    icon: Radar,
    tone: {
      marker: "border-rose-500 bg-rose-600 text-white",
      icon: "bg-rose-600/10 text-rose-700 dark:text-rose-200",
      rail: "from-rose-500 to-red-500",
    },
    epics: [
      "GEMS, KoBo, or ODK-style field evidence imports",
      "Procurement bridge, asset registry, transparency portal",
      "Cost, delay, anomaly flags and evaluation learning loops",
    ],
    gate: "Project delivery evidence can inform public transparency and future investment decisions without hiding the rule logic.",
  },
] satisfies RoadmapPhase[];

const workstreams = [
  {
    name: "Frontend experience",
    description:
      "The user-facing route from command center to brief, scenario studio, and transparency surfaces.",
    icon: Layers,
    steps: [
      "Trust Cards, evidence badges, command center actions, export touchpoints",
      "Planning Brief, Audit Drawer, Opportunity Finder, review status controls",
      "Document Workbench, Trust Center, PIM Registry, admin observability",
      "Scenario Builder, Counterpart Mode, geospatial prioritization workspace",
    ],
  },
  {
    name: "Backend and data model",
    description:
      "The services, manifests, validation states, and graph links that let every visible claim be traced.",
    icon: Database,
    steps: [
      "Typed release metadata provider, validation outputs, caveat model",
      "Evidence graph nodes and edges, opportunity triggers, export lineage",
      "Country manifests, document states, registry schema, OC4IDS-ready fields",
      "Climate/geospatial layers, scenario packages, API/download contracts",
    ],
  },
  {
    name: "AI and evidence governance",
    description:
      "The policy layer that keeps AI in a synthesis role and makes source quality visible at the point of use.",
    icon: Scale,
    steps: [
      "No source, no answer; block unsupported AI stages",
      "Prompt versions, source fingerprints, audit records, human review status",
      "Readiness gates for translations, OCR, validation, incident handling",
      "AI summarizes tradeoffs only after deterministic outputs are shown",
    ],
  },
  {
    name: "Operating model",
    description:
      "The repeatable country delivery motion for analysts, data teams, counterparts, and future transparency users.",
    icon: Landmark,
    steps: [
      "Country trust review and release QA",
      "Analyst-reviewed opportunities and concept-note starter exports",
      "Country onboarding factory and document operations queue",
      "Workshop packs, data products, field monitoring, public learning loop",
    ],
  },
] satisfies Workstream[];

const releaseGates = [
  "Type checks",
  "Unit tests for data providers and evidence gating",
  "Integration tests for release metadata consistency",
  "Accessibility checks for new UI surfaces",
  "Security review for AI and server routes",
  "Manual QA against at least one country workspace",
  "Export QA for Markdown, CSV, and PDF-ready outputs",
  "Source and citation QA for AI outputs",
] as const;

const guardrails = [
  {
    title: "Human authority stays explicit",
    body:
      "LDT can summarize, compare, draft, classify, and explain. It must not approve projects, appraise investments, commit budgets, or make procurement claims.",
    icon: BadgeCheck,
  },
  {
    title: "Deterministic logic comes first",
    body:
      "Opportunity and scenario logic should expose triggers, weights, assumptions, caveats, and supporting evidence before AI writes a rationale.",
    icon: GitBranch,
  },
  {
    title: "Evidence gaps are product states",
    body:
      "Missing plans, stale sources, blocked translations, unmatched boundaries, and sparse coverage need visible badges and exportable caveats.",
    icon: CircleDot,
  },
  {
    title: "Every output is inspectable",
    body:
      "AI outputs need model, prompt version, release ID, source fingerprint, retrieval IDs, generation time, caveats, and review status.",
    icon: ClipboardCheck,
  },
] as const;

const executionBacklog = [
  "Publish a first-class roadmap destination.",
  "Visualize the product expansion sequence.",
  "Map frontend, backend, and governance workstreams.",
  "Expose release gates and AI guardrails.",
  "Keep the roadmap page maintainable for future Deep Research inputs.",
] as const;

function SectionIntro({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-semibold uppercase text-[var(--muted-foreground)]">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-semibold leading-tight text-[var(--foreground)] sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-8 text-[var(--muted-foreground)]">
        {body}
      </p>
    </div>
  );
}

function RoadmapBlueprint() {
  return (
    <aside
      aria-label="Roadmap operating model diagram"
      className="rounded-lg border border-[var(--border-strong)] bg-[var(--surface-strong)] p-4 shadow-[0_18px_45px_var(--surface-shadow)] sm:p-5"
    >
      <div className="flex flex-col gap-4 border-b border-[var(--border-soft)] pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase text-[var(--muted-foreground)]">
            Operating thesis
          </p>
          <h2 className="mt-1 text-2xl font-semibold text-[var(--foreground)]">
            Evidence to investment loop
          </h2>
        </div>
        <span className="inline-flex min-h-10 w-fit items-center gap-2 rounded-lg border border-[var(--border-soft)] bg-[var(--accent-soft)] px-3 text-sm font-semibold text-[var(--foreground)]">
          <Network aria-hidden="true" className="size-4" />
          PIM-ready
        </span>
      </div>

      <ol className="mt-5 grid gap-3" role="list">
        {roadmapPhases.map((phase, index) => {
          const Icon = phase.icon;

          return (
            <li key={phase.version} className="grid grid-cols-[3rem_minmax(0,1fr)] gap-3">
              <div className="flex flex-col items-center">
                <span
                  className={cn(
                    "inline-flex size-10 items-center justify-center rounded-lg border text-sm font-bold",
                    phase.tone.marker,
                  )}
                >
                  {phase.version}
                </span>
                {index < roadmapPhases.length - 1 ? (
                  <span
                    className={cn(
                      "mt-2 h-full min-h-8 w-1 rounded-full bg-gradient-to-b",
                      phase.tone.rail,
                    )}
                    aria-hidden="true"
                  />
                ) : null}
              </div>
              <div className="rounded-lg border border-[var(--border-soft)] bg-white/75 p-3 dark:bg-white/[0.04]">
                <div className="flex items-start gap-3">
                  <span
                    className={cn(
                      "inline-flex size-9 shrink-0 items-center justify-center rounded-lg",
                      phase.tone.icon,
                    )}
                  >
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase text-[var(--muted-foreground)]">
                      {phase.horizon}
                    </p>
                    <h3 className="mt-1 text-base font-semibold text-[var(--foreground)]">
                      {phase.name}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">
                      {phase.goal}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}

function PhaseCard({ phase }: { phase: RoadmapPhase }) {
  const Icon = phase.icon;

  return (
    <article className="flex h-full flex-col rounded-lg border border-[var(--border-soft)] bg-[var(--surface-strong)] p-5 shadow-[0_14px_34px_rgba(2,20,32,0.07)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase text-[var(--muted-foreground)]">
            {phase.version}
          </p>
          <h3 className="mt-2 text-xl font-semibold leading-7 text-[var(--foreground)]">
            {phase.name}
          </h3>
        </div>
        <span
          className={cn(
            "inline-flex size-11 shrink-0 items-center justify-center rounded-lg",
            phase.tone.icon,
          )}
        >
          <Icon aria-hidden="true" className="size-5" />
        </span>
      </div>

      <p className="mt-4 text-sm leading-7 text-[var(--muted-foreground)]">
        {phase.goal}
      </p>

      <ul className="mt-5 space-y-3" role="list">
        {phase.epics.map((epic) => (
          <li key={epic} className="flex gap-3 text-sm leading-6 text-[var(--foreground)]">
            <CheckCircle2
              aria-hidden="true"
              className="mt-0.5 size-4 shrink-0 text-[var(--accent)]"
            />
            <span>{epic}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-1 items-end">
        <p className="rounded-lg border border-[var(--border-soft)] bg-[var(--accent-soft)] p-3 text-sm leading-6 text-[var(--foreground)]">
          <span className="font-semibold">Release gate:</span> {phase.gate}
        </p>
      </div>
    </article>
  );
}

function WorkstreamRow({ workstream }: { workstream: Workstream }) {
  const Icon = workstream.icon;

  return (
    <article className="grid gap-5 border-b border-[var(--border-soft)] p-5 last:border-b-0 lg:grid-cols-[18rem_minmax(0,1fr)] lg:p-6">
      <div className="flex items-start gap-4">
        <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-[var(--foreground)]">
          <Icon aria-hidden="true" className="size-5" />
        </span>
        <div>
          <h3 className="text-lg font-semibold text-[var(--foreground)]">
            {workstream.name}
          </h3>
          <p className="mt-2 text-sm leading-7 text-[var(--muted-foreground)]">
            {workstream.description}
          </p>
        </div>
      </div>
      <ol className="grid gap-3 md:grid-cols-2" role="list">
        {workstream.steps.map((step, index) => (
          <li
            key={step}
            className="rounded-lg border border-[var(--border-soft)] bg-white/70 p-3 text-sm leading-6 text-[var(--foreground)] dark:bg-white/[0.04]"
          >
            <span className="mb-2 inline-flex size-7 items-center justify-center rounded-lg bg-[var(--surface-muted)] font-mono text-xs font-semibold text-[var(--foreground)]">
              {index + 1}
            </span>
            <span className="block">{step}</span>
          </li>
        ))}
      </ol>
    </article>
  );
}

export default function RoadmapPage() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="border-b border-[var(--border-soft)] bg-[linear-gradient(180deg,var(--hero-wash-start),var(--hero-wash-end))]">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-12 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:px-12 lg:py-16">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase text-[var(--muted-foreground)]">
              Product roadmap
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight text-[var(--foreground)] sm:text-5xl lg:text-6xl">
              From local analytics to a PIM-ready evidence platform.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--muted-foreground)] sm:text-lg">
              The LDT roadmap sequences trust foundations, auditable AI outputs,
              country scaling, spatial scenario planning, and delivery transparency
              into one evidence-to-investment product arc.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/resources"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[var(--foreground)] px-5 text-sm font-semibold text-white transition duration-200 hover:bg-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] motion-reduce:transition-none"
              >
                View source materials
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
              <Link
                href="/release-notes"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--surface-strong)] px-5 text-sm font-semibold text-[var(--foreground)] transition duration-200 hover:border-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] motion-reduce:transition-none"
              >
                See release history
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>

            <dl className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
              {northStarMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-lg border border-[var(--border-soft)] bg-[var(--surface-strong)] p-4"
                >
                  <dt className="text-sm leading-6 text-[var(--muted-foreground)]">
                    {metric.label}
                  </dt>
                  <dd className="mt-2 font-mono text-3xl font-semibold text-[var(--foreground)]">
                    {metric.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <RoadmapBlueprint />
        </div>
      </section>

      <section className="border-b border-[var(--border-soft)]">
        <div className="mx-auto w-full max-w-7xl px-6 py-12 sm:px-8 lg:px-12">
          <SectionIntro
            eyebrow="Release horizons"
            title="Each version unlocks the next product capability."
            body="The roadmap is intentionally layered: first make the current app trustworthy, then add evidence-backed drafting, then scale countries and registry workflows, then move into scenarios, and only then close the loop with delivery transparency."
          />

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {roadmapPhases.map((phase) => (
              <PhaseCard key={phase.version} phase={phase} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--border-soft)] bg-[var(--surface)]">
        <div className="mx-auto w-full max-w-7xl px-6 py-12 sm:px-8 lg:px-12">
          <SectionIntro
            eyebrow="Execution map"
            title="The roadmap is both frontend and backend work."
            body="A credible LDT expansion needs visible product surfaces, typed data services, evidence governance, and a repeatable country operating model to advance together."
          />

          <div className="mt-8 overflow-hidden rounded-lg border border-[var(--border-soft)] bg-[var(--surface-strong)] shadow-[0_14px_34px_rgba(2,20,32,0.07)]">
            {workstreams.map((workstream) => (
              <WorkstreamRow key={workstream.name} workstream={workstream} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--border-soft)]">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-12 sm:px-8 lg:grid-cols-[0.88fr_1.12fr] lg:px-12">
          <div>
            <SectionIntro
              eyebrow="Governance"
              title="Ambition only ships through release gates."
              body="The roadmap treats quality, evidence, accessibility, and AI safety as part of the product architecture. These gates protect users from unsupported outputs and keep decision authority where it belongs."
            />
            <div className="mt-8 rounded-lg border border-[var(--border-soft)] bg-[var(--surface-strong)] p-5">
              <div className="flex items-start gap-3">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-[var(--foreground)]">
                  <BrainCircuit aria-hidden="true" className="size-5" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--foreground)]">
                    AI product position
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--muted-foreground)]">
                    AI is an evidence-synthesis and drafting assistant. It can support
                    analysis, but it cannot act as appraiser, budget authority,
                    procurement authority, or final decision maker.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {guardrails.map((guardrail) => {
              const Icon = guardrail.icon;

              return (
                <article
                  key={guardrail.title}
                  className="rounded-lg border border-[var(--border-soft)] bg-[var(--surface-strong)] p-5 shadow-[0_14px_34px_rgba(2,20,32,0.07)]"
                >
                  <span className="inline-flex size-11 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-[var(--foreground)]">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">
                    {guardrail.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">
                    {guardrail.body}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,var(--panel-gradient-start),var(--panel-gradient-end))]">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-12 sm:px-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:px-12">
          <div>
            <SectionIntro
              eyebrow="Release gates"
              title="Definition of ready for every future roadmap slice."
              body="These gates should be applied before the team treats a roadmap slice as ready for stakeholder use, especially when outputs feed planning or investment conversations."
            />
            <ol className="mt-8 grid gap-3 md:grid-cols-2" role="list">
              {releaseGates.map((gate, index) => (
                <li
                  key={gate}
                  className="flex gap-3 rounded-lg border border-[var(--border-soft)] bg-[var(--surface-strong)] p-4 text-sm leading-6 text-[var(--foreground)]"
                >
                  <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-soft)] font-mono text-xs font-semibold text-[var(--foreground)]">
                    {index + 1}
                  </span>
                  <span>{gate}</span>
                </li>
              ))}
            </ol>
          </div>

          <aside className="rounded-lg border border-[var(--border-soft)] bg-[var(--gpb-chrome-bg)] p-5 text-[var(--gpb-chrome-active)] shadow-[0_18px_45px_rgba(2,20,32,0.18)]">
            <div className="flex items-center gap-3">
              <span className="inline-flex size-11 items-center justify-center rounded-lg bg-white/[0.10] text-white">
                <Sparkles aria-hidden="true" className="size-5" />
              </span>
              <div>
                <p className="text-sm font-semibold uppercase text-[var(--gpb-chrome-muted)]">
                  WWA backlog
                </p>
                <h3 className="text-lg font-semibold">Roadmap page slice</h3>
              </div>
            </div>
            <ul className="mt-5 space-y-3" role="list">
              {executionBacklog.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-[var(--gpb-chrome-link)]">
                  <CheckCircle2
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-cyan-200"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </main>
  );
}
