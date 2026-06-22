# LDT Supplement: Version Roadmap and Add-on Sequencing

**Purpose:** Implementation sequencing guide for Codex and engineering planning.  
**Applies to:** Expanded LDT PRD, 2026-06-22.

---

## North Star

Move LDT from public local-development analytics to a PIM-ready evidence-to-investment platform while keeping decision authority with humans and official government systems.

---

## Version 1: Product Hardening and Trust Foundation

**Goal:** Make the current application reliable, consistent, and trustable before adding more AI or PIM workflow.

### Epics

| Epic | Description | Done when |
| --- | --- | --- |
| Release metadata source of truth | Replace hard-coded country/local-unit/year counts with one release metadata service. | Home, country pages, methodology, release notes, analytics, exports, and AI output all use same metadata. |
| Country Trust Card | Display country data coverage, boundary quality, plan readiness, source freshness, AI readiness, and caveats. | Every country command center shows a Trust Card. |
| Evidence gap badges | Show missing/sparse/blocked evidence beside charts, maps, and AI stages. | Users can see caveats at point of use. |
| Command center polish | Consolidate tasks: compare, map/drivers, planning brief, document readiness, trust center. | Users reach main tasks in one click. |
| Export MVP | Export comparison CSV and AI brief Markdown. | Exports include release ID, data year, methodology version, and caveats. |
| Responsive and loading states | Improve 375/768/1024/1440 layouts and add skeletons. | No broken core layouts. |

### Suggested Codex prompt

> Implement the V1 trust foundation for LDT. Create a typed release metadata service, replace hard-coded release counts, add a Country Trust Card component, add evidence gap badges, and make exports include release ID, data year, methodology version, and caveats. Keep all changes feature-flagged where possible.

---

## Version 2: Evidence-to-Brief and Investment Opportunity Finder

**Goal:** Convert diagnostics into auditable planning outputs and upstream investment opportunity families.

### Epics

| Epic | Description | Done when |
| --- | --- | --- |
| AI Planning Brief Report | Convert staged AI outputs into report view with sections, evidence gaps, citations, and export. | Users export Markdown/PDF-ready brief. |
| AI Audit Drawer | Show model, prompt version, source fingerprint, retrieval chunks, cost, and generation time. | Every AI output has inspectable audit metadata. |
| Investment Opportunity Finder | Generate opportunity families from deterministic evidence triggers and AI-assisted rationale. | At least 3 opportunity families for AI-ready local units where evidence supports them. |
| Evidence Graph MVP | Link local unit → indicator → source → plan passage → opportunity → recommendation. | Every recommendation has evidence links. |
| Concept Note Starter MVP | Generate pre-appraisal concept-note starter with caveats and source appendix. | Users can export concept-note starter as Markdown. |
| Recommendation review flow | Accept/edit/reject/escalate recommendations. | Every recommendation has human review status. |

### Suggested Codex prompt

> Implement the V2 evidence-to-brief workflow. Add an Investment Opportunity Finder with deterministic rules, an Evidence Graph MVP, an auditable AI Planning Brief report, and a Concept Note Starter export. AI can summarize rationale only from existing evidence links. Include human review statuses and block unsupported recommendations.

---

## Version 3: Country Scaling Platform and PIM Registry Beta

**Goal:** Make country onboarding repeatable and introduce a lightweight PIM lifecycle view.

### Epics

| Epic | Description | Done when |
| --- | --- | --- |
| Country Onboarding Factory | Country manifest, data/boundary/document packages, validation reports, release candidates. | New country can be staged without code changes after data prep. |
| Document Intelligence Workbench | Plan coverage, source lineage, parse/translation/validation status, retry queue. | Document readiness is an operations workflow, not just a dashboard. |
| Trust Center | Detailed validation, coverage, source, AI readiness, methodology diff. | Analysts/admins can inspect release trust state. |
| PIM Registry Beta | Track opportunity/project lifecycle stage. | Opportunities can be escalated to candidate projects. |
| OC4IDS-ready mapping | Add fields needed for future infrastructure project/contract disclosure mapping. | Registry can map to project and contract concepts later. |
| Admin Observability | Ingestion, parsing, AI runs, errors, costs, cache invalidation. | Admins can diagnose operations issues. |

### Suggested Codex prompt

> Implement the V3 country scaling platform. Add country manifests, validation reports, preview release candidates, document-readiness operations, admin observability, and a PIM Registry Beta. Keep official PIM/budget/procurement integrations out of scope but design schemas for future mapping.

---

## Version 4: Geospatial, Climate, Scenario, and Counterpart Layer

**Goal:** Add transparent spatial prioritization, climate-risk screening, scenario analysis, and workshop usability.

### Epics

| Epic | Description | Done when |
| --- | --- | --- |
| Geospatial Prioritization Studio | Multi-criteria spatial ranking with weights, contribution chart, and sensitivity. | Users can build transparent prioritization scenarios. |
| Climate and Hazard Screen | ThinkHazard/Aqueduct-style badges and caveats. | Opportunities have hazard-screen status where data exists. |
| Scenario Builder | Compare packages under budget, equity, climate, readiness assumptions. | Package outputs include map, table, caveats, and sensitivity. |
| Counterpart Mode | Plain-language profiles and meeting packs. | Government workshop outputs are exportable. |
| API/Data Product | Controlled endpoints and downloads. | Approved data can be reused by country teams. |

### Suggested Codex prompt

> Implement V4 decision-support expansions: Geospatial Prioritization Studio, Climate and Hazard Screen, Scenario Builder, Counterpart Mode, and API/data exports. Keep ranking logic deterministic and inspectable. AI may summarize tradeoffs only after showing weights, evidence, and caveats.

---

## Version 5+: Delivery Monitoring and Transparency

**Goal:** Link upstream planning to delivery monitoring, procurement transparency, and ex-post learning.

### Future epics

- GEMS/KoBo/ODK-style field evidence import.
- Geotagged project monitoring.
- Procurement/Open Contracting Bridge.
- Asset registry link.
- Public project transparency portal.
- Cost/delay/anomaly flags with transparent rules.
- Ex-post evaluation and lesson-learning module.

---

## Release gates

Each release must pass:

1. Type checks.
2. Unit tests for data providers and evidence gating.
3. Integration tests for release metadata consistency.
4. Accessibility checks for new UI surfaces.
5. Security review for AI/server routes.
6. Manual QA against at least one country workspace.
7. Export QA for Markdown/CSV/PDF-ready outputs.
8. Source/citation QA for AI outputs.
