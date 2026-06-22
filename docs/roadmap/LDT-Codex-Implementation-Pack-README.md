# LDT Codex Implementation Pack

This pack expands the uploaded LDT PRD with the brainstorming outputs and public-governance/PIM technology research.

## Files

1. `PRD-Local-Development-Tracker-Expansion.md`  
   Expanded full PRD with all proposed capabilities, roadmap, architecture, risks, and success metrics.

2. `LDT-Version-Roadmap.md`  
   Version-by-version sequencing from product hardening through future field/procurement integrations.

3. `LDT-Feature-Backlog-and-Acceptance-Criteria.md`  
   Codex-ready backlog with user stories, requirements, and acceptance criteria.

4. `LDT-Architecture-and-Data-Model.md`  
   Technical architecture, proposed directory structure, schemas, API route sketch, and testing requirements.

5. `LDT-AI-Governance-and-Evidence-Policy.md`  
   AI guardrails, retrieval rules, audit requirements, red-team tests, and human review workflow.

6. `LDT-Integrations-Datasets-and-Standards.md`  
   Context for ThinkHazard, Aqueduct, GEMS-style monitoring, OC4IDS/open contracting, PIM/budget/procurement/asset integrations, and APIs.

7. `LDT-Codex-Implementation-Prompts.md`  
   Ready-to-use Codex prompts for the main epics.

## Recommended use order

1. Start with the expanded PRD.
2. Implement Version 1 from the roadmap.
3. Use the backlog file to create issues/tasks.
4. Use the architecture file before schema or API work.
5. Use the AI governance file before any new LLM feature.
6. Use integrations file only for Version 4+ design unless an integration is explicitly pulled forward.

## First build target

The first Codex implementation should focus on:

- Release metadata source of truth.
- Country Trust Card.
- Evidence gap badges.
- AI audit drawer schema/display if AI surfaces remain active.
- Investment Opportunity Finder only after evidence gating is ready.
