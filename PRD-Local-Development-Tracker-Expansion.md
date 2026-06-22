# PRD: Local Development Tracker Expansion

## 1. Summary

This PRD defines the next version of the Local Development Tracker (LDT): a country-configurable decision-support platform for local development analytics, planning evidence, and public investment recommendations. It is written so future ChatGPT Deep Research findings can be added to each section before engineering starts.

The current app already supports country workspaces, score comparison, maps, score drivers, AI planning stages, and local strategy inventory. The next version should make these parts easier to use, easier to expand to new countries, and safer to trust for investment discussions.

## 2. Contacts

| Name | Role | Comment |
| --- | --- | --- |
| TBD | Product owner | Owns scope, tradeoffs, and approval. |
| TBD | Engineering lead | Owns architecture, delivery plan, and technical risk. |
| TBD | Data/AI lead | Owns data model, AI pipeline, document parsing, and evidence quality. |
| TBD | UX/design lead | Owns workflow, accessibility, dashboard design, and report experience. |
| TBD | Country analyst lead | Owns country context, admin levels, sources, and validation rules. |
| TBD | Research owner | Adds ChatGPT Deep Research outputs into this PRD before build starts. |

## 3. Background

### Context

The Local Development Tracker helps users compare local development conditions across subnational governments. It uses the PIL lens: Prosperity, Infrastructure, and Livability.

The live app currently shows:

- 3 country workspaces.
- 1,028 loaded local government units.
- Latest data year of 2025.
- Country-specific workspaces for Nepal, Serbia, and Zambia.
- Serbia analytics with 161 mapped municipalities.
- Serbia strategy inventory with 151 of 161 local self-governments covered, 94% coverage, 68 parsed records ready for AI use, and 83 records blocked by translation or validation.

The live app already supports three core analytics jobs:

- Compare local units in 2D score space and optional 3D score space.
- Read a choropleth map and score-driver waterfall charts.
- Build an AI planning brief in evidence order.

It also has a strategy inventory that tracks whether local planning documents are found, parsed, translated, validated, and ready for AI analysis.

### Why Now

The app has moved beyond a single-country dashboard. It is becoming a repeatable platform for country teams. The next build should turn the current strong prototype into a more complete product with clearer user flows, stronger backend boundaries, better document intelligence, and a more polished report output.

This is now possible because:

- The country registry already supports multiple countries.
- The data layer already mixes Supabase data with local generated fallbacks.
- The AI pipeline already stages evidence before synthesis.
- The strategy inventory already exposes document readiness gaps.
- The UI already has the main surfaces needed for a public-sector analytics workflow.

### Deep Research Inputs To Add

Add ChatGPT Deep Research findings here before implementation:

- Comparable public-sector investment planning tools.
- World Bank and government team user needs.
- Data availability patterns across likely next countries.
- AI policy, citation, and audit standards for public-sector use.
- Best practices for subnational analytics dashboards.

## 4. Objective

### Objective

Make LDT a trusted evidence-to-investment platform that helps analysts and decision makers move from local development data to plan-aligned public investment options.

The product should:

- Reduce time spent finding local evidence.
- Make score drivers easier to explain.
- Make planning document readiness visible.
- Produce AI-assisted briefs that are grounded in clear evidence.
- Make new country onboarding faster and less risky.

### Strategic Fit

The app supports country teams that need to explain where local development gaps are, why they matter, and how they connect to plans and possible investments.

It should stay evidence-first. AI should help synthesize, not replace, the source data.

### Key Results

| Key Result | Target |
| --- | --- |
| KR1: Faster country onboarding | Add a new country workspace from prepared data and documents in less than 2 weeks of engineering time. |
| KR2: Better planning brief completion | At least 70% of AI-ready local units can generate a complete brief with score evidence, plan alignment, SWOT, and recommendations. |
| KR3: Clearer evidence trust | 100% of AI recommendations include source links, input status, and evidence gaps. |
| KR4: Better user comprehension | In usability testing, 80% of target users can explain a selected local unit's score drivers and plan-readiness status without help. |
| KR5: Better frontend performance | Analytics pages show useful content in under 3 seconds on a normal broadband connection, excluding heavy optional charts. |
| KR6: Better mobile/tablet access | Core pages are usable at 375px, 768px, 1024px, and 1440px widths with no broken layout. |

## 5. Market Segments

Markets are defined by jobs users need to do.

### Segment 1: Country Team Analysts

Job: Prepare a subnational diagnostic for a country, province, district, municipality, or local self-government.

Needs:

- Fast comparison across places.
- Clear score definitions.
- Data quality notes.
- Exportable charts and tables.
- Local planning evidence in one place.

Constraints:

- Time is short.
- Data may be incomplete.
- Local admin structures differ by country.

### Segment 2: Public Investment and Governance Specialists

Job: Connect local development gaps to practical investment options and planning documents.

Needs:

- Map-based evidence.
- Score-driver explanations.
- Plan alignment.
- Investment recommendation drafts.
- Evidence gaps and caveats.

Constraints:

- Recommendations must be explainable.
- AI outputs must not look more certain than the data supports.

### Segment 3: Government Counterparts

Job: Understand local development patterns and discuss investment priorities.

Needs:

- Simple language.
- Country-specific labels.
- Clear maps and score summaries.
- Downloadable or shareable outputs.

Constraints:

- They may not know the score method.
- They may need local language support.
- They may challenge data sources.

### Segment 4: Data and Operations Teams

Job: Load new countries, update releases, parse documents, and fix data issues.

Needs:

- Country onboarding checklist.
- Data validation reports.
- Document readiness queue.
- Error logs and retry tools.

Constraints:

- Source links break.
- PDFs are inconsistent.
- Translation may be needed.
- Country admin levels do not match one global model.

## 6. Value Propositions

### For Analysts

LDT reduces the work needed to compare local areas and explain development gaps. Users can move from a map or scatterplot to score drivers, plan evidence, and a draft planning brief in one place.

### For Decision Makers

LDT turns scattered local data into a clear story: where a place stands, what drives its score, what plans say, and what investments may fit.

### For Data Teams

LDT creates a repeatable way to onboard countries, check coverage, track document readiness, and manage AI inputs.

### For Country Programs

LDT helps teams discuss public investments with more local evidence and fewer disconnected spreadsheets, maps, PDFs, and notes.

### What We Do Better Than A Static Dashboard

- We connect analytics to planning documents.
- We show document readiness before AI synthesis.
- We keep country-specific admin terms.
- We preserve filters in the URL.
- We stage AI output so recommendations come after evidence.

## 7. Solution

### 7.1 UX / Prototypes

#### Current Live Flow

1. User lands on the LDT home page.
2. User chooses a country workspace.
3. User reads country context, admin levels, sources, and coverage.
4. User opens analytics.
5. User selects year, district, and local unit.
6. User compares scores, reads map and drivers, or opens AI Planning Brief.
7. User checks strategy inventory to understand whether local plans are ready for AI use.

#### Target Flow

1. User chooses a country.
2. User sees a country command center with four clear tasks:
   - Compare places.
   - Read map and drivers.
   - Build planning brief.
   - Manage document readiness.
3. User selects a local unit once.
4. The selection follows them across analytics, AI brief, and inventory.
5. User builds a brief in steps:
   - Score evidence.
   - Local plan context.
   - National plan context.
   - Alignment.
   - Optional web context.
   - SWOT.
   - Investment recommendations.
6. User exports or shares the final evidence-backed brief.

#### UX Requirements

- Keep country labels specific. Do not force every country into one admin vocabulary.
- Preserve filters in the URL.
- Show loading states for charts, maps, AI stages, and document fetches.
- Show clear disabled states when an AI stage is blocked.
- Do not rely on hover only. Charts and maps need tap/click alternatives.
- Provide table alternatives for map and chart data.
- Keep wide data tables usable on mobile by using card views or controlled horizontal scroll.
- Use concise text. The app should explain enough, but avoid long teaching blocks inside the work surface.
- Keep one main action per screen.
- Make source links, release notes, and methodology easy to reach from analysis results.

### 7.2 Key Features

#### Feature 1: Country Command Center

Create a clearer country home experience that shows:

- Country snapshot.
- Admin levels.
- Data coverage.
- Available years.
- Local plan readiness.
- Main task buttons.
- Known data gaps.

Acceptance criteria:

- Users can reach analytics, AI brief, and strategy inventory in one click.
- Country-specific labels are used everywhere.
- The page shows whether analytics and plan data are ready.

#### Feature 2: Multi-Place Comparison

Allow users to save a comparison set of local units.

Acceptance criteria:

- Users can add and remove local units from a comparison set.
- The set works across scatterplots, score summaries, and tables.
- Users can export the comparison as CSV.

#### Feature 3: Map And Driver Improvements

Improve the map and waterfall experience.

Acceptance criteria:

- Users can switch between score, indicator, and percentile views.
- The map includes a clear legend and missing-data state.
- Waterfall charts explain positive and negative drivers in plain language.
- Tooltips work by click/tap as well as hover.

#### Feature 4: AI Planning Brief Report

Turn AI stages into a report-like output.

Acceptance criteria:

- Each AI section shows sources, inputs, and evidence gaps.
- Users can rerun a stage when inputs change.
- Blocked stages explain what is missing.
- The final report can be exported as Markdown or PDF.
- Recommendations include rank, rationale, linked evidence, and risk notes.

#### Feature 5: Document Readiness Workflow

Upgrade the strategy inventory from a dashboard into an operations workflow.

Acceptance criteria:

- Users can filter by readiness, translation, parsing, source status, document type, and local unit.
- Users can see why a document is blocked.
- Users can mark items for human validation.
- Users can see source errors and retry status.
- Future admin users can update status through authenticated controls.

#### Feature 6: Country Onboarding Pipeline

Create a standard backend path for adding or updating a country.

Acceptance criteria:

- Each country has a manifest with admin levels, labels, data years, boundary keys, score definitions, plan source rules, and release metadata.
- Ingestion produces a validation report.
- The report checks missing local units, duplicate IDs, boundary joins, score coverage, source links, and plan readiness.
- Failed checks do not silently reach production.

#### Feature 7: Evidence And Citation Layer

Make source grounding visible across analytics and AI.

Acceptance criteria:

- AI outputs cite document passages or source records.
- Users can inspect the exact input used for each AI stage.
- Cache records include model, prompt version, source fingerprint, and generation time.
- If web context is used, it is labeled as supplemental.

#### Feature 8: Admin And Observability

Add internal controls for operations.

Acceptance criteria:

- Admin users can view ingestion runs, document parsing status, AI stage status, and errors.
- AI costs and token use are logged by country, stage, and user/session.
- Cache invalidation is explicit.
- Public users cannot trigger uncontrolled generation in production.

### 7.3 Technology

#### Current Stack

- Next.js App Router.
- React.
- TypeScript.
- Tailwind and component primitives.
- Supabase and PostGIS.
- MapLibre for maps.
- Plotly for charts.
- OpenAI for AI generation.
- Exa and document parsing for external/source context.

#### Backend Requirements

- Keep Supabase as the system of record for releases, local units, indicators, scores, boundaries, AI cache, document sources, and strategy inventory.
- Make local generated JSON fallback explicit and predictable.
- Add a country data provider interface so frontend code does not care whether data came from Supabase or local fallback.
- Add country manifests and validation reports.
- Add background jobs for document parsing, translation status, source checks, and AI precomputation.
- Add structured logs for ingestion, AI generation, cache hits, source failures, and export jobs.

#### Frontend Requirements

- Keep route and query state shareable.
- Lazy-load heavy charts and maps.
- Use skeletons or progress states for loads over 300ms.
- Keep charts accessible with legends, visible labels, and table alternatives.
- Improve responsive behavior for mobile and tablet.
- Reduce visual noise in dense screens.
- Use consistent design tokens for color, spacing, shadows, and radius.

#### Data Requirements

- Local unit stable ID.
- Country code.
- Release key.
- Year.
- Admin level labels.
- Boundary join key.
- Indicator definitions.
- Score definitions.
- Plan source links.
- Document parse status.
- Translation status.
- Validation status.
- AI readiness status.

### 7.4 Assumptions

- Users need explainable analysis more than automated final decisions.
- Country teams will accept AI assistance only if sources and gaps are visible.
- New countries will have uneven data and document quality.
- Public read-only access should remain the default mode.
- Admin workflows may need authentication later.
- Strategy inventory quality is a blocker for reliable AI planning briefs.
- ChatGPT Deep Research will add external benchmarks, user evidence, and policy guidance before final build.

## 8. Release

### Version 1: Product Hardening

Expected size: 2 to 4 weeks.

Scope:

- Clarify country command center.
- Improve loading and empty states.
- Improve mobile and tablet layout for current pages.
- Make Supabase/local fallback behavior explicit.
- Add country manifest draft.
- Add validation report format.
- Add basic export for comparison tables and AI brief Markdown.

Out of scope:

- Full admin editing.
- Full translation pipeline.
- New country onboarding automation.

### Version 2: Evidence-To-Brief Workflow

Expected size: 4 to 8 weeks.

Scope:

- Create polished AI Planning Brief report view.
- Add source citations and evidence-gap display.
- Add document chunk retrieval.
- Add multi-place comparison basket.
- Add strategy inventory action queue.
- Add AI stage observability and cost logs.

Out of scope:

- Full public collaboration tools.
- Complex role-based permissions beyond admin/internal access.

### Version 3: Country Scaling Platform

Expected size: 8 to 12 weeks.

Scope:

- Country onboarding pipeline.
- Background document ingestion jobs.
- Translation/readiness workflow.
- Admin dashboard.
- Saved views.
- PDF report export.
- New country onboarding using the manifest and validation flow.

### Future Versions

Possible future capabilities:

- Multi-language UI and translated outputs.
- Scenario planning and investment package comparison.
- Budget and capital project pipeline integration.
- User accounts and shared workspaces.
- API access for country teams.
- Automated monitoring of broken source links.
- Deep Research-assisted country onboarding packs.

## Deep Research Merge Guide

Use this PRD as the base. Add ChatGPT Deep Research findings in these places:

| Research Area | Add To |
| --- | --- |
| User interviews | Sections 3, 5, 6, and 7.1 |
| Market and tool comparison | Sections 3 and 6 |
| Public-sector AI guidance | Sections 4, 7.2, 7.3, and 7.4 |
| Country onboarding evidence | Sections 5, 7.2, 7.3, and 8 |
| Data availability research | Sections 3, 7.3, and 8 |
| UX benchmark research | Sections 7.1 and 7.2 |
| Delivery constraints | Sections 7.4 and 8 |

