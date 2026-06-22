# LDT Supplement: Architecture, Data Model, and API Notes

**Purpose:** Technical context for Codex implementation.  
**Scope:** Architecture additions needed for trust, investment opportunities, concept notes, evidence graph, AI governance, PIM registry, and future integrations.

---

## 1. Architecture Principles

1. Supabase/Postgres/PostGIS remains the system of record.
2. Frontend uses a typed data provider layer, not ad hoc Supabase calls from every component.
3. Release metadata is a first-class entity.
4. Evidence links are stored as IDs, not only as rendered text.
5. AI outputs are reproducible from release ID, prompt version, model, retrieval IDs, and source fingerprint.
6. Public routes are read-only unless authentication is introduced.
7. Feature flags control V2+ surfaces.
8. PIM/procurement/field monitoring schemas should be future-compatible but not active until integrations exist.

---

## 2. Proposed Directory Structure

```txt
src/
  app/
    page.tsx
    countries/[countryCode]/page.tsx
    countries/[countryCode]/analytics/page.tsx
    countries/[countryCode]/trust/page.tsx
    countries/[countryCode]/documents/page.tsx
    countries/[countryCode]/opportunities/page.tsx
    countries/[countryCode]/admin/page.tsx
  components/
    trust/
      CountryTrustCard.tsx
      EvidenceGapBadge.tsx
      TrustCenterPanel.tsx
    opportunities/
      InvestmentOpportunityCard.tsx
      OpportunityEvidencePanel.tsx
      OpportunityReviewControls.tsx
    ai/
      AIPlanningBriefReport.tsx
      AIAuditDrawer.tsx
      SourceCitationList.tsx
    documents/
      DocumentReadinessTable.tsx
      DocumentStatusBadge.tsx
    pim/
      PIMLifecycleStepper.tsx
      ConceptNoteStarter.tsx
    maps/
      PrioritizationMap.tsx
      HazardBadgeLayer.tsx
  lib/
    data/
      releaseMetadataProvider.ts
      countryDataProvider.ts
      validationProvider.ts
      opportunityProvider.ts
      documentProvider.ts
      evidenceProvider.ts
      aiRunProvider.ts
    schemas/
      releaseMetadata.ts
      countryManifest.ts
      validationReport.ts
      opportunity.ts
      evidenceGraph.ts
      aiRun.ts
    ai/
      retrieval.ts
      promptVersions.ts
      sourceFingerprint.ts
      guardrails.ts
    flags/
      featureFlags.ts
  server/
    jobs/
      ingestCountry.ts
      validateRelease.ts
      parseDocuments.ts
      checkSources.ts
      precomputeAI.ts
      exportReport.ts
```

---

## 3. Core Tables

### 3.1 `country_releases`

```sql
create table country_releases (
  id uuid primary key default gen_random_uuid(),
  country_code text not null,
  country_name text not null,
  release_label text not null,
  release_status text not null check (release_status in ('draft','preview','published','retired')),
  data_years int[] not null,
  default_year int not null,
  local_unit_count int,
  mapped_unit_count int,
  plan_found_count int,
  plan_ai_ready_count int,
  boundary_coverage_pct numeric,
  indicator_coverage_pct numeric,
  ai_enabled boolean default false,
  methodology_version text,
  release_notes_url text,
  created_at timestamptz default now(),
  published_at timestamptz,
  last_validated_at timestamptz
);
```

### 3.2 `country_manifests`

```sql
create table country_manifests (
  id uuid primary key default gen_random_uuid(),
  country_code text not null,
  manifest_version text not null,
  admin_labels jsonb not null,
  boundary_config jsonb not null,
  score_config jsonb not null,
  source_rules jsonb default '{}'::jsonb,
  language_config jsonb default '{}'::jsonb,
  release_config jsonb default '{}'::jsonb,
  status text not null default 'draft',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

### 3.3 `validation_runs`

```sql
create table validation_runs (
  id uuid primary key default gen_random_uuid(),
  release_id uuid references country_releases(id),
  validation_type text not null,
  status text not null check (status in ('pass','warn','fail','running')),
  summary jsonb,
  checks jsonb not null default '[]'::jsonb,
  created_by text,
  created_at timestamptz default now()
);
```

### 3.4 `source_registry`

```sql
create table source_registry (
  id uuid primary key default gen_random_uuid(),
  country_code text,
  source_type text not null,
  title text not null,
  url text,
  publisher text,
  license text,
  fetch_status text,
  last_checked_at timestamptz,
  source_fingerprint text,
  caveats jsonb default '[]'::jsonb,
  created_at timestamptz default now()
);
```

### 3.5 `document_chunks`

```sql
create table document_chunks (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null,
  country_code text not null,
  local_unit_id text,
  chunk_index int not null,
  language text,
  text_content text not null,
  page_start int,
  page_end int,
  char_start int,
  char_end int,
  embedding vector,
  source_fingerprint text,
  validation_status text default 'unvalidated',
  created_at timestamptz default now()
);
```

### 3.6 `evidence_items` and `evidence_edges`

```sql
create table evidence_items (
  id uuid primary key default gen_random_uuid(),
  release_id uuid,
  country_code text not null,
  local_unit_id text,
  evidence_type text not null,
  title text not null,
  summary text,
  source_id uuid,
  source_url text,
  source_fingerprint text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create table evidence_edges (
  id uuid primary key default gen_random_uuid(),
  from_evidence_id uuid not null references evidence_items(id),
  to_evidence_id uuid not null references evidence_items(id),
  edge_type text not null,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);
```

---

## 4. API Route Sketch

| Route | Method | Purpose | Auth |
| --- | --- | --- | --- |
| `/api/releases/:countryCode` | GET | Release metadata | Public |
| `/api/countries/:countryCode/trust` | GET | Trust Card data | Public/internal variant |
| `/api/countries/:countryCode/validation-runs` | GET | Validation reports | Internal |
| `/api/countries/:countryCode/documents` | GET | Document readiness | Public/internal variant |
| `/api/opportunities` | GET | List opportunities | Public/internal depending status |
| `/api/opportunities/generate` | POST | Generate opportunities | Internal |
| `/api/opportunities/:id/review` | POST | Review status | Internal |
| `/api/concept-notes/generate` | POST | Generate concept-note starter | Internal |
| `/api/ai/runs/:id` | GET | AI audit metadata | Internal/simplified public |
| `/api/exports/brief` | POST | Export Markdown/PDF | Internal/public depending data |
| `/api/hazards/screen` | POST | Hazard screen | Internal |

---

## 5. TypeScript Interfaces

```ts
export interface ReleaseMetadata {
  id: string;
  countryCode: string;
  countryName: string;
  releaseLabel: string;
  releaseStatus: 'draft' | 'preview' | 'published' | 'retired';
  dataYears: number[];
  defaultYear: number;
  localUnitCount: number | null;
  mappedUnitCount: number | null;
  planFoundCount: number | null;
  planAIReadyCount: number | null;
  boundaryCoveragePct: number | null;
  indicatorCoveragePct: number | null;
  aiEnabled: boolean;
  methodologyVersion: string | null;
  publishedAt: string | null;
  lastValidatedAt: string | null;
}

export interface EvidenceGap {
  code:
    | 'missing-data'
    | 'sparse-coverage'
    | 'boundary-unmatched'
    | 'source-stale'
    | 'plan-not-found'
    | 'plan-not-parsed'
    | 'translation-needed'
    | 'validation-needed'
    | 'ai-blocked'
    | 'climate-layer-unavailable'
    | 'site-study-required';
  severity: 'info' | 'warning' | 'critical';
  message: string;
  sourceId?: string;
}

export interface InvestmentOpportunity {
  id: string;
  countryCode: string;
  releaseId: string;
  localUnitId: string;
  opportunityFamily: string;
  sector?: string;
  primaryPillar?: 'Prosperity' | 'Infrastructure' | 'Livability';
  title: string;
  rationale?: string;
  evidenceStatus: 'draft' | 'sufficient' | 'weak' | 'blocked';
  readinessStatus: 'diagnostic' | 'concept-note-draft' | 'pre-feasibility-needed' | 'escalated';
  humanReviewStatus: 'draft' | 'analyst-reviewed' | 'counterpart-discussed' | 'rejected' | 'escalated';
  caveats: EvidenceGap[];
  evidenceLinks: OpportunityEvidenceLink[];
}
```

---

## 6. Testing Requirements

### Unit tests

- Release metadata parsing.
- Manifest validation.
- Evidence gap badge mapping.
- Opportunity trigger rules.
- Source fingerprint generation.
- AI output evidence gating.

### Integration tests

- Home/country pages use release metadata provider.
- AI generation blocked when evidence requirements fail.
- Concept note export includes source appendix.
- Document readiness filters work.
- Opportunity review status persists.

### Security tests

- Public users cannot invoke uncontrolled generation.
- Prompt injection examples in document chunks do not override system instructions.
- Internal audit metadata not exposed publicly.

---

## 7. Feature Flag Strategy

Start with flags in code and environment variables. Turn on modules progressively by country and environment.

```ts
export type FeatureFlagName =
  | 'trustCenter'
  | 'investmentOpportunityFinder'
  | 'conceptNoteStarter'
  | 'evidenceGraph'
  | 'aiAuditDrawer'
  | 'documentWorkbench'
  | 'countryOnboardingFactory'
  | 'pimRegistry'
  | 'geospatialPrioritization'
  | 'hazardScreen'
  | 'scenarioBuilder'
  | 'counterpartMode'
  | 'fieldEvidence'
  | 'procurementBridge';
```
