# LDT Roadmap Page: WWA Execution Backlog

**Purpose:** Sprint-sized backlog for exposing the roadmap inside the public LDT app.
**Source:** `docs/roadmap/LDT-Version-Roadmap.md` and related roadmap supplements.
**Design reference:** In-app Roadmap page using an accessible public-sector SaaS/white-paper diagram style.
**Schedule model:** `v1.5`-`v1.9` close at two-week sprint deadlines from July 17, 2026 through September 11, 2026; `v2` targets World Bank MEGA migration on October 31, 2026.

---

## Item 1: Publish a First-Class Roadmap Destination

**Why:** Users and stakeholders need a stable place to understand where LDT is headed before the team begins building new backend and frontend capabilities.

**What:** Add a `/roadmap` route and include it in shared header/footer navigation. The page should be static, fast, and reachable from the same global shell as About, Methodology, Resources, and Release Notes.

**Acceptance Criteria:**
- Roadmap appears in the primary navigation and mobile navigation.
- `/roadmap` renders without requiring country-specific data or authenticated services.
- The page has metadata for title and description.
- Navigation focus and active states work consistently with other top-level pages.

## Item 2: Visualize the Product Expansion Sequence

**Why:** The roadmap spans multiple releases, so teams need a scannable mental model that shows how trust, evidence, scaling, geospatial decision support, and transparency build on each other.

**What:** Convert the `v1.5` through `v2` roadmap into a visual sequence with goals, epics, release intent, sprint windows, and deadline dates. The design should feel like an executive white-paper diagram while remaining responsive and readable on mobile.

**Acceptance Criteria:**
- `v1.5`, `v1.6`, `v1.7`, `v1.8`, `v1.9`, and `v2` are all represented with explicit goals and core epics.
- Each version shows a sprint window and deadline at the end of a two-week sprint.
- `v2` clearly states the October 2026 goal to migrate the full backend and frontend to the World Bank's MEGA platform.
- `v1.5` clearly includes the AI Brief Cache and Run Store as part of the trust foundation.
- The visual sequence works at 375px, 768px, 1024px, and 1440px widths.
- Information is not conveyed by color alone.
- Text wraps cleanly without horizontal scroll.

## Item 2a: Fix Primary CTA Dark-Mode Readability

**Why:** The Roadmap page primary CTA became unreadable in dark mode because the button background and text both resolved to near-white values.

**What:** Update the "View source materials" CTA to use an accessible semantic color pair in both light and dark themes, while preserving keyboard focus and hover states.

**Acceptance Criteria:**
- CTA text is readable in the deployed dark theme.
- CTA maintains a visible focus outline.
- CTA has a minimum 44px touch target.
- Hover styling does not reduce contrast.

## Item 3: Map Frontend, Backend, and Governance Workstreams

**Why:** The roadmap must support better tasking and execution across product surfaces, data/backend foundations, and AI governance.

**What:** Add a workstream view that maps the roadmap into experience, data/backend, AI/evidence governance, and operating model layers. The v1.5 layer should show that every LLM-backed AI brief step is persisted and replayed from a cache/run store before later AI brief expansion.

**Acceptance Criteria:**
- Each workstream describes how it evolves across the roadmap.
- Backend/data capabilities and frontend/product capabilities are both visible.
- AI governance is presented as a required layer, not a later add-on.
- AI cache provenance is visible as both a frontend state and backend data-model responsibility.
- MEGA platform migration is visible in the frontend, backend, governance, and operating-model workstreams.
- The view is clear enough to seed later GitHub issues or implementation plans.

## Item 4: Expose Release Gates and AI Guardrails

**Why:** LDT is intended for public investment decision support, so release quality and evidence discipline need to be visible alongside feature ambition.

**What:** Surface release gates and AI policy principles from the roadmap supplements, including source/citation QA, human review, deterministic triggers, and the "no source, no answer" posture.

**Acceptance Criteria:**
- Release gates include tests, accessibility, security, manual QA, export QA, and source/citation QA.
- AI guardrails state that AI assists synthesis and drafting but does not approve, appraise, budget, or procure.
- The page distinguishes deterministic evidence logic from AI-generated rationale.
- Guardrail content is written for stakeholders, not only engineers.

## Item 5: Keep the Roadmap Page Maintainable

**Why:** The roadmap will continue to evolve as Deep Research outputs, user feedback, and implementation findings are incorporated.

**What:** Structure page content as typed data arrays and small presentational helpers so later updates can be made without redesigning the route.

**Acceptance Criteria:**
- Roadmap phases, workstreams, gates, and principles are represented as editable structured data.
- The page uses existing app styling conventions and icon dependencies.
- The implementation passes lint/build checks available in the repo.
- Future work can replace local arrays with docs-derived or CMS-backed content without changing the public route contract.
