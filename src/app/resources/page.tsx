import Link from "next/link";
import { ArrowUpRight, FileText, FolderOpen, Presentation } from "lucide-react";

import { ldtResourceFiles, ldtResourceFolder, type ResourceFile } from "@/lib/resources";

function ResourceIcon({ format }: { format: ResourceFile["format"] }) {
  if (format === "Slide deck") {
    return <Presentation aria-hidden="true" className="size-5" />;
  }

  return <FileText aria-hidden="true" className="size-5" />;
}

function ResourceCard({ resource }: { resource: ResourceFile }) {
  return (
    <a
      href={resource.href}
      target="_blank"
      rel="noreferrer"
      className="group flex min-h-56 flex-col rounded-[1.25rem] border border-[var(--border-soft)] bg-[var(--surface-strong)] p-5 shadow-[0_14px_34px_rgba(2,20,32,0.07)] transition duration-200 hover:-translate-y-0.5 hover:border-[var(--border-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
    >
      <span className="inline-flex size-11 items-center justify-center rounded-[0.95rem] bg-[var(--accent-soft)] text-[var(--foreground)]">
        <ResourceIcon format={resource.format} />
      </span>
      <span className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted-foreground)]">
        {resource.format}
      </span>
      <h3 className="mt-2 text-xl font-semibold leading-7 text-[var(--foreground)]">
        {resource.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-7 text-[var(--muted-foreground)]">
        {resource.description}
      </p>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)]">
        Open resource
        <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </a>
  );
}

export default function ResourcesPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-12 px-6 pb-16 pt-10 sm:px-8 lg:px-12">
      <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted-foreground)]">
            Resources
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-[var(--foreground)] sm:text-5xl">
            LDT documents and working materials
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--muted-foreground)]">
            A curated set of reference materials for understanding the Local Development
            Tracker, sharing the GPB approach, and supporting country-facing discussions.
          </p>
        </div>

        <a
          href={ldtResourceFolder.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[0.95rem] bg-[var(--foreground)] px-5 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(2,20,32,0.18)] transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
        >
          <FolderOpen aria-hidden="true" className="size-4" />
          Open Drive folder
        </a>
      </section>

      <section>
        <div className="flex flex-col gap-3 border-b border-[var(--border-soft)] pb-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
              Core LDT materials
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-[var(--foreground)]">
              Start here
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-[var(--muted-foreground)]">
            {ldtResourceFolder.description}
          </p>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {ldtResourceFiles.map((resource) => (
            <ResourceCard key={resource.href} resource={resource} />
          ))}
        </div>
      </section>

      <section className="border-t border-[var(--border-soft)] pt-6">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          Looking for country workspaces?
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--muted-foreground)]">
          Country-specific documents, demos, and analyses will live here alongside the
          core materials so teams can move from general LDT context into country packs.
        </p>
        <Link
          href="/#country-workspaces"
          className="mt-4 inline-flex min-h-10 items-center text-sm font-semibold text-[var(--accent)] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
        >
          Browse country workspaces
        </Link>
      </section>
    </main>
  );
}
