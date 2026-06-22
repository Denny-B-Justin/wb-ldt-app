# LDT Supplement: Feature Backlog and Acceptance Criteria

**Purpose:** Codex-ready backlog derived from the expanded PRD.  
**Use:** Convert epics into GitHub issues or Codex tasks.

---

## Epic 1: Release Metadata Source of Truth

### User story

As a user, I want all pages and exports to show the same country, release, year, and local-unit counts so I can trust the app.

### Requirements

- Add typed release metadata model.
- Build server-side release metadata provider.
- Replace hard-coded counts in home/country pages.
- Include metadata in exports and AI runs.
- Add consistency test.

### Acceptance criteria

- `getReleaseMetadata(countryCode)` returns release status, years, default year, local-unit count, mapped count, plan counts, AI status, methodology version, and timestamps.
- Home and country pages use provider values.
- Exports include release ID and methodology version.
- Test fails if public page fixtures diverge from metadata.

---

## Epic 2: Country Trust Card

### User story

As an analyst, I want a quick trust summary before using a country workspace.

### Requirements

- Add component: `CountryTrustCard`.
- Display coverage, boundary quality, plan readiness, source freshness, AI readiness, caveats.
- Add local-unit-level trust card variant.

### Acceptance criteria

- Trust Card appears on command center.
- Trust Card has empty/loading/error states.
- Trust Card links to detailed Trust Center or validation report.
- Values are derived from validation and release metadata, not static copy.

---

## Epic 3: Evidence Gap Badges

### User story

As a decision-support user, I need to see where evidence is missing or weak directly beside the output.

### Badge types

- `missing-data`
- `sparse-coverage`
- `boundary-unmatched`
- `source-stale`
- `plan-not-found`
- `plan-not-parsed`
- `translation-needed`
- `validation-needed`
- `ai-blocked`
- `climate-layer-unavailable`
- `site-study-required`

### Acceptance criteria

- Badges are reusable UI components.
- Tooltips explain the caveat.
- Badges are included in exports.
- AI stages read badge state before generation.

---

## Epic 4: Investment Opportunity Finder

### User story

As a public investment specialist, I want LDT to translate local development gaps into investment opportunity families without pretending to approve projects.

### Deterministic trigger examples

| Trigger | Opportunity family |
| --- | --- |
| Low infrastructure score + poor road/service accessibility | Local roads and access |
| Flood exposure + low livability/infrastructure | Drainage/flood resilience |
| Low broadband/mobile indicators | Digital connectivity |
| Low school accessibility | School access/infrastructure |
| Low health accessibility | Health access/infrastructure |
| Plan mentions tourism + weak access/infrastructure | Tourism/local economic infrastructure |
| Water stress/flood layers + infrastructure gaps | Water/climate resilience |

### Data requirements

- Local unit scores.
- Indicator values/scores.
- Peer percentiles.
- Plan themes/passages where available.
- Climate/geospatial flags where available.
- Source/caveat status.

### Acceptance criteria

- Opportunity cannot be created without at least one evidence trigger.
- Opportunity includes evidence links and caveats.
- AI-generated rationale is optional and must cite evidence links.
- Opportunity has status: draft, analyst reviewed, counterpart discussed, rejected, escalated.

---

## Epic 5: Concept Note Starter

### User story

As an analyst, I want to export a pre-appraisal concept-note starter from evidence-backed opportunities.

### Required sections

- Problem statement.
- Geography and local unit.
- Strategic alignment.
- Local plan alignment.
- Preliminary intervention logic.
- Beneficiary/access evidence.
- Hazard screen.
- Implementation risks.
- Evidence gaps.
- Required next studies.
- Source appendix.

### Acceptance criteria

- Export as Markdown.
- Export includes release ID and source appendix.
- Includes disclaimer: not official appraisal/approval.
- Blocks unsupported cost-benefit claims.

---

## Epic 6: Evidence Graph MVP

### User story

As an AI reviewer, I want every recommendation to be traceable to its evidence.

### Graph nodes

- Country release.
- Local unit.
- Indicator.
- Score driver.
- Source record.
- Document.
- Document chunk.
- Plan theme.
- Hazard layer.
- Opportunity.
- AI output.
- Concept note.

### Graph edges

- `HAS_INDICATOR`
- `DRIVES_SCORE`
- `HAS_SOURCE`
- `MENTIONS_THEME`
- `SUPPORTS_OPPORTUNITY`
- `HAS_CAVEAT`
- `GENERATED_BY_AI_RUN`
- `ESCALATED_TO_CONCEPT_NOTE`

### Acceptance criteria

- Recommendations display evidence count and caveat count.
- User can expand evidence details.
- Missing evidence blocks review completion.

---

## Epic 7: AI Audit Drawer

### User story

As a data/AI lead, I want to inspect every AI output for reproducibility and risk review.

### Fields

- Model.
- Prompt version.
- Stage.
- Release ID.
- Local unit ID.
- Retrieval IDs.
- Source fingerprint.
- Generation time.
- Token counts.
- Estimated cost.
- User/session.
- Cache status.
- Error state.

### Acceptance criteria

- Audit drawer opens from each AI section.
- Public users see simplified source info; internal users see full metadata.
- AI cache records use same IDs.

---

## Epic 8: Document Intelligence Workbench

### User story

As a data operations user, I want to manage document readiness from source discovery through AI readiness.

### States

- Found.
- Fetched.
- Parsed.
- OCR needed.
- Translation needed.
- Translation complete.
- Validation needed.
- Validated.
- AI-ready.
- Blocked.
- Retired/stale.

### Acceptance criteria

- Filters by country, local unit, document type, language, status, blocked reason.
- Shows source URL, fetch date, checksum, parse status, translation status, validation status.
- Retry button records action.
- AI stages ignore blocked documents by default.

---

## Epic 9: Country Onboarding Factory

### User story

As a data team, I want to onboard countries from manifests and validation reports rather than code edits.

### Required files/objects

- Country manifest.
- Data package.
- Boundary package.
- Document package.
- Source registry.
- Validation report.
- Preview release.

### Acceptance criteria

- Manifest schema is typed and validated.
- Validation report includes pass/fail/warn checks.
- Failed critical checks block production publish.
- Preview workspace can be reviewed before publish.

---

## Epic 10: PIM Registry Beta

### User story

As a governance/PIM specialist, I want to track whether an opportunity is only diagnostic or has moved into preparation.

### Lifecycle stages

- Need identified.
- Plan-aligned opportunity.
- Concept note drafted.
- Pre-feasibility needed.
- Feasibility/appraisal underway.
- Selected in pipeline.
- Budgeted.
- Procured.
- Implementing.
- Completed/asset registered.
- Evaluated.

### Acceptance criteria

- Stage changes are audited.
- UI labels registry as non-official unless integrated with government system.
- Opportunities can link to candidate project records.

---

## Epic 11: Climate and Hazard Screen

### User story

As a planner, I want early warning when an investment opportunity may face climate or disaster risk.

### Acceptance criteria

- Hazard badge displayed for opportunity/local unit where data exists.
- Source and date shown.
- Output states site-specific study is required.
- Hazards can be marked reviewed/needs study/not applicable.

---

## Epic 12: Geospatial Prioritization Studio

### User story

As a planner, I want to prioritize local areas using transparent spatial criteria and sensitivity analysis.

### Acceptance criteria

- User can select criteria and weights.
- Ranking displays factor contribution.
- Sensitivity analysis shows ranking changes.
- Export CSV/GeoJSON/map image where supported.
- Ranking copy says decision support, not final selection.

---

## Epic 13: Scenario Builder

### User story

As a decision maker, I want to compare investment packages under constraints.

### Acceptance criteria

- User can define scenario constraints.
- Output includes package map, table, pillar balance, climate exposure, readiness, evidence gaps.
- AI summary is generated only after deterministic scenario output exists.

---

## Epic 14: Counterpart Mode

### User story

As a government counterpart, I want a simple, plain-language view for workshops.

### Acceptance criteria

- Plain-language local profile.
- Methodology explainer.
- Challenge-the-data button.
- Meeting pack export.
- Evidence appendix.

---

## Epic 15: Field Verification and Procurement Bridge

### User story

As an implementation/PFM user, I want future links from candidate projects to field evidence and procurement records.

### Acceptance criteria for design phase

- Schema supports geotagged field evidence.
- Schema supports tender/contract links.
- OC4IDS mapping document exists.
- Feature remains disabled until auth and official data integrations exist.
