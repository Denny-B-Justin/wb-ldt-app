import {
  ArrowUpRight,
  BookOpen,
  ExternalLink,
  FileText,
  FolderOpen,
  MapPin,
  Presentation,
} from "lucide-react";

import {
  countryResourcePacks,
  ldtResourceFiles,
  type CountryResourcePack,
  type ResourceFile,
} from "@/lib/resources";

function ResourceIcon({ format }: { format: ResourceFile["format"] }) {
  if (format === "Slide deck") {
    return <Presentation aria-hidden="true" className="size-5" />;
  }

  if (format === "Notebook") {
    return <BookOpen aria-hidden="true" className="size-5" />;
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

function CountryResourceCard({ pack }: { pack: CountryResourcePack }) {
  return (
    <article className="flex h-full flex-col rounded-[1.25rem] border border-[var(--border-soft)] bg-[var(--surface-strong)] p-5 shadow-[0_14px_34px_rgba(2,20,32,0.07)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted-foreground)]">
            {pack.country}
          </p>
          <h3 className="mt-2 text-xl font-semibold text-[var(--foreground)]">
            {pack.title}
          </h3>
        </div>
        <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-[0.85rem] bg-[var(--accent-soft)] text-[var(--foreground)]">
          <MapPin aria-hidden="true" className="size-5" />
        </span>
      </div>

      <p className="mt-4 text-sm leading-7 text-[var(--muted-foreground)]">
        {pack.description}
      </p>

      <a
        href={pack.href}
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-[var(--accent)] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
      >
        <FolderOpen aria-hidden="true" className="size-4" />
        Open country folder
      </a>

      <div className="mt-5 border-t border-[var(--border-soft)] pt-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted-foreground)]">
          Included materials
        </p>

        {pack.files.length > 0 ? (
          <ul role="list" className="mt-3 space-y-2">
            {pack.files.map((resource) => (
              <li key={resource.href}>
                <a
                  href={resource.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group/item flex min-h-14 items-start justify-between gap-3 rounded-[0.85rem] px-3 py-2 transition hover:bg-[var(--accent-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                >
                  <span>
                    <span className="block text-sm font-semibold leading-6 text-[var(--foreground)]">
                      {resource.title}
                    </span>
                    <span className="mt-1 inline-flex rounded-full border border-[var(--border-soft)] px-2 py-0.5 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[var(--muted-foreground)]">
                      {resource.format}
                    </span>
                  </span>
                  <ExternalLink
                    aria-hidden="true"
                    className="mt-1 size-4 shrink-0 text-[var(--muted-foreground)] transition group-hover/item:text-[var(--accent)]"
                  />
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 rounded-[0.85rem] border border-dashed border-[var(--border-soft)] p-3 text-sm leading-6 text-[var(--muted-foreground)]">
            {pack.emptyState}
          </p>
        )}
      </div>
    </article>
  );
}

export default function ResourcesPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-12 px-6 pb-16 pt-10 sm:px-8 lg:px-12">
      <section className="max-w-4xl">
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted-foreground)]">
          Resources
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--foreground)] sm:text-5xl">
          LDT documents and working materials
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--muted-foreground)]">
          A curated set of reference materials for understanding the Local Development
          Tracker, sharing the GPB approach, and supporting country-facing discussions.
        </p>
      </section>

      <section>
        <div className="border-b border-[var(--border-soft)] pb-5">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
            Core LDT materials
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-[var(--foreground)]">
            Start here
          </h2>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {ldtResourceFiles.map((resource) => (
            <ResourceCard key={resource.href} resource={resource} />
          ))}
        </div>
      </section>

      <section className="border-t border-[var(--border-soft)] pt-6">
        <div className="flex flex-col gap-3 pb-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
              Country resource spaces
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-[var(--foreground)]">
              Documents, demos, and analyses by country
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-[var(--muted-foreground)]">
            Each workspace groups country-facing reference material in one place, with
            direct links to visible files and a folder link for anything added later.
          </p>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          {countryResourcePacks.map((pack) => (
            <CountryResourceCard key={pack.href} pack={pack} />
          ))}
        </div>
      </section>
    </main>
  );
}
